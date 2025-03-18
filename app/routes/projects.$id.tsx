import { Link, useOutletContext, useParams } from "@remix-run/react";
import { Project } from "@prisma/client";
import { BsGithub } from "react-icons/bs";
import { Textarea } from "~/components/ui/textarea";
import { PiProjectorScreen } from "react-icons/pi";
import { FiUpload } from "react-icons/fi";

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

            <div className="md:flex flex-row gap-3">
                <div className="flex flex-col px-3 py-2 dark:bg-zinc-900 rounded-md pb-3 shadow-sm shadow-zinc-400 border dark:shadow-none w-full">
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
        </div>
    );
}


