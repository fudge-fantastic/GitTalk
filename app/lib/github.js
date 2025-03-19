import { Octokit } from "octokit";              
import prisma from "../../prisma/prisma.js";    
import axios from "axios";                    
import { summarizeCommits } from "./llmLogic.js";   

// eslint-disable-next-line no-undef
export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
if (!octokit) {throw new Error("GitHub token not found.");} 
else {console.log("GitHub token found.");}

// Fetches commit data from a given GitHub repository URL
export async function getFullCommitData(githubUrl) {
    try {
        // Using regular expression to extract the owner and repo from the URL. Example: https://github.com/owner/repo
        // eslint-disable-next-line no-useless-escape
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {throw new Error("Invalid GitHub URL format.");}
        // Destructuring to access the captured groups: owner and repo
        const [, owner, repo] = match;

        // Fetching commits using the GitHub API via octokit.
        const { data } = await octokit.rest.repos.listCommits({ owner, repo });

        // Sorting the commits by date (newest first). If a commit's committer date is not available, fallback to the author's date.
        const sortedCommits = data.toSorted((a, b) =>
            new Date(b.commit.committer?.date || b.commit.author?.date) -
            new Date(a.commit.committer?.date || a.commit.author?.date)
        );

        // Returning top 12 commits, mapping each to the required fields
        return sortedCommits.slice(0, 12).map((commit) => ({
            commitHash: commit.sha ?? "",
            commitMessage: commit.commit.message ?? "",
            commitAuthorName: commit.commit.author?.name ?? "Unknown",
            // For the avatar, we use the commit.author data (GitHub user data)
            commitAuthorAvatar: commit.author?.avatar_url ?? "",
            commitDate: commit.commit.committer?.date || commit.commit.author?.date || "",
        }));
    } catch (error) {
        console.error("Error fetching commits:", error);
        // On error, return an empty array
        return [];
    }
}

// Processes new commits for a given project
export async function pollCommits(projectId) {
    try {
        // Retrieve project data and the associated GitHub URL from the database
        // const { project, githubUrl } = fetchProjectGithubUrl(projectId);
        const { githubUrl } = await fetchProjectGithubUrl(projectId);
        
        // Get the commit data from GitHub (currently the latest 12 commits).
        const commitData = await getFullCommitData(githubUrl);
        
        // Filter out commits that have already been processed for this project.
        const unProcessedCommits = await filterUnprocessedCommits(projectId, commitData);

        // For each unprocessed commit, get a summary using the LLM. Promise.allSettled is used to handle all promises without failing if one fails
        const summaryResponse = await Promise.allSettled(
            unProcessedCommits.map((commit) =>
                summarizeCommitsData(githubUrl, commit.commitHash)
            )
        );

        // Map the results to extract the summary text or an empty string on failure.
        const summaries = summaryResponse.map((response) => {
            if (response.status === "fulfilled") {
                return response.value;
            } else {
                return "";
            }
        });

        // Save the commit information and summary into the database in bulk.
        const commits = await prisma.commit.createMany({
            data: summaries.map((summary, index) => ({
                commitHash: unProcessedCommits[index].commitHash,
                commitMessage: unProcessedCommits[index].commitMessage,
                commitAuthorName: unProcessedCommits[index].commitAuthorName,
                commitAuthorAvatar: unProcessedCommits[index].commitAuthorAvatar,
                commitDate: unProcessedCommits[index].commitDate,
                projectId: projectId,
                summary: summary
            }))
        });

        // Return the newly created commits.
        return commits;
    } catch (error) {
        console.error("Error polling commits:", error);
        return { project: null, commits: [] };
    }
}

// Retrieves the diff for a commit and summarizes it
export async function summarizeCommitsData(githubUrl, commitHash) {
    // Construct the URL for the commit diff. Example: https://github.com/owner/repo/commits/commitHash.diff
    const { data } = await axios.get(
        `${githubUrl}/commits/${commitHash}.diff`,
        { headers: { Accept: "application/vnd.github.v3.diff" } }
    );
    // Pass the diff data to the LLM to get a summary.
    return await summarizeCommits(data);
}

// Retrieves the GitHub URL for a project from the database
export async function fetchProjectGithubUrl(projectId) {
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { url: true },
    });

    if (!project?.url) {
        throw new Error("Project not found or repository URL missing");
    }
    return { project, githubUrl: project.url };
}


// Filters out commits that have already been processed
export async function filterUnprocessedCommits(projectId, commitData) {
    // Get already processed commits from the database for this project.
    const processedCommits = await prisma.commit.findMany({
        where: { projectId },
    });
    // Return only those commits that are not already in the processed list.
    const unprocessedCommits = commitData.filter((commit) =>
        !processedCommits.some(
            (processedCommit) => processedCommit.commitHash === commit.commitHash
        )
    );
    return unprocessedCommits;
}
