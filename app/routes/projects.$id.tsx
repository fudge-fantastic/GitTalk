import { Link, useOutletContext, useParams } from "@remix-run/react";
import { BsGithub } from "react-icons/bs";
import { Textarea } from "~/components/ui/textarea";
import { PiProjectorScreen } from "react-icons/pi";
import { FiUpload } from "react-icons/fi";
import { Project } from "~/root";
import BeautifiedResponse from "~/components/MarkDownRenderer";

export default function ProjectDetail() {
    const { id } = useParams();
    const { projects }: { projects: Project[] } = useOutletContext();
    const project = projects.find((p) => p.id === String(id));

    if (!project) {
        return <p className="text-center text-zinc-500">Project not found.</p>;
    }
    return (
        <div>
            <div className="px-3 py-2 mb-3 bg-white dark:bg-zinc-900 rounded-md shadow-sm shadow-zinc-400 border dark:shadow-none">
                <div className="flex flex-row items-center gap-2.5">
                    <BsGithub className="text-4xl" />
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{project.projectName}</h1>
                        <p className="text-sm">This project is linked to <Link to={project.url} className="hover:underline underline-offset-2 font-semibold">this repository</Link></p>
                    </div>
                </div>
            </div>

            <div className="md:flex flex-row">
                <div className="mr-3 flex flex-col px-3 py-2 dark:bg-zinc-900 rounded-md pb-3 shadow-sm shadow-zinc-400 border dark:shadow-none w-full">
                    <h1 className="font-semibold">Ask a question</h1>
                    <p className="text-zinc-500 text-sm">GitTalk has the knowledge of the codebase</p>
                    <Textarea name="description" placeholder="Ask any question about the codebase you've entered!" className="bg-zinc-100 dark:bg-zinc-900 text-sm mt-2 border border-zinc-500 h-20" />
                    <div className="mt-3">
                        <button className="font-semibold px-3 py-1 text-[13px] rounded-md bg-zinc-900 hover:bg-white hover:text-zinc-900 hover:border-zinc-900 dark:hover:text-white text-white dark:bg-zinc-800 dark:hover:border-zinc-700 border duration-150">Submit</button>
                    </div>
                </div>
                <div className="text-center p-4 flex flex-col justify-center items-center dark:bg-zinc-900 rounded-md shadow-sm shadow-zinc-400 border dark:shadow-none w-[60%]">
                    <PiProjectorScreen className="text-5xl"/>
                    <p className="font-semibold">Create a new meeting!</p>
                    <p className="text-zinc-500 text-sm text-center">Analyze your meetings with GitTalk <br /> Powered by AI</p>
                    <div className="mt-3">
                        <button className="flex items-center gap-2 font-semibold px-3 py-1.5 text-[13px] rounded-md bg-zinc-900 hover:bg-white hover:text-zinc-900 hover:border-zinc-900 dark:hover:text-white text-white dark:bg-zinc-800 dark:hover:border-zinc-700 border duration-150">
                            <FiUpload className="font-semibold text-lg" />
                            Upload Video
                        </button>
                    </div>
                </div>
            </div>
            <div className="dark:bg-zinc-900 my-3 p-4 rounded-md border dark:shadow-none shadow-sm shadow-zinc-400">
            <div className="w-full">
                    <h2 className="text-xl font-semibold mb-3">Recent Commits</h2>
                    {project.commits && project.commits.length > 0 ? (
                        project.commits.map((commit) => (
                            <div key={commit.commitHash} className="mb-3 p-3 border rounded-md bg-white dark:bg-zinc-900 shadow-sm shadow-zinc-400 dark:shadow-none">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={commit.commitAuthorAvatar}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">{commit.commitAuthorName}</p>
                                        <p className="text-xs text-zinc-500">{new Date(commit.commitDate).toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className="mt-2 font-medium">{commit.commitMessage}</p>
                                {commit.summary && (
                                    <BeautifiedResponse rawText={commit.summary} className="list-disc mt-1 text-sm text-zinc-600 dark:text-zinc-400" />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-zinc-500">No commit data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}


