import { Octokit } from "octokit";
import prisma from "./prisma.js";

// eslint-disable-next-line no-undef
export const octokit = new Octokit({auth: process.env.GITHUB_TOKEN});
export const getFullCommitData = async (githubUrl) => {
    try {
        // eslint-disable-next-line no-useless-escape
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
            throw new Error("Invalid GitHub URL format.");
        }
        const [owner, repo] = match; 

        // Fetch commits from GitHub API
        const { data } = await octokit.rest.repos.listCommits({ owner, repo });

        // Sort commits by date (newest first) using committer or fallback to author date
        const sortedCommits = data.sort(
            (a, b) => new Date(b.commit.committer?.date || b.commit.author?.date) -
                      new Date(a.commit.committer?.date || a.commit.author?.date)
        );

        // Extract top 10 latest commits mapped to required fields
        return sortedCommits.slice(0, 10).map((commit) => ({
            commitHash: commit.sha ?? "",
            commitMessage: commit.commit.message ?? "",
            commitAuthorName: commit.commit.author?.name ?? "Unknown",
            // Use commit.author (GitHub user data) for the avatar
            commitAuthorAvatar: commit.author?.avatar_url ?? "",
            commitDate: commit.commit.committer?.date || commit.commit.author?.date || "",
        }));
    } catch (error) {
        console.error("Error fetching commits:", error);
        // Return an empty array on error
        return []; 
    }
};

export const pollCommits = async (projectId) => {
    try {
        // Get project and its GitHub URL from the database
        const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
        // Fetch commit data from GitHub
        const commitData = await getFullCommitData(githubUrl);
        // Filter out commits that have already been processed
        const unProcessedCommits = await filterUnprocessedCommits(projectId, commitData);
        // Return the project and the filtered commits
        return { project, commits: unProcessedCommits };
    } catch (error) {
        console.error("Error polling commits:", error);
        return { project: null, commits: [] };
    }
};

export async function fetchProjectGithubUrl(projectId) {
    // Retrieve only the githubUrl field from the project record
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { githubUrl: true },
    });

    if (!project?.githubUrl) {
        throw new Error("Project not found or githubUrl missing");
    }
    return { project, githubUrl: project.githubUrl };
}

export async function filterUnprocessedCommits(projectId, commitData) {
    // Retrieve commits already processed for this project from your database
    const processedCommits = await prisma.commit.findMany({
        where: { projectId },
    });
    // Filter commitData to remove commits that are already processed
    const unprocessedCommits = commitData.filter((commit) => {
        return !processedCommits.some((processedCommit) => 
            processedCommit.commitHash === commit.commitHash
        );
    });
    return unprocessedCommits;
}
