import { Project } from "@prisma/client";
import { Link, useOutletContext } from "@remix-run/react";
import { FaPlus } from "react-icons/fa";

export default function ProjectsMain() {
    const { projects }: { projects: Project[] } = useOutletContext();

    return (
        <div className="grid grid-cols-3 gap-2">
            {projects?.length > 0 ? (
                projects.map((project) => (
                    <Link to={`/projects/${project.id}`}
                        key={project.id}
                        className="dark:hover:border-zinc-700 border flex flex-col p-3 rounded-sm bg-zinc-100 dark:bg-zinc-900 gap-2 duration-150"
                    >
                        <h1 className="text-lg font-semibold">{project.projectName}</h1>
                        <p className="text-sm text-zinc-400">{project.description}</p>
                    </Link>
                ))
            ) : (
                <p className="text-center text-zinc-500 col-span-3">No projects found.</p>
            )}
            <Link
                to="/createproject"
                className="gap-1 flex flex-col items-center justify-center dark:bg-zinc-900 px-3 py-8 rounded-md border-2 border-dashed dark:border-zinc-700 dark:hover:bg-zinc-800 duration-150"
            >
                <div className="flex items-center">
                    <h1 className="font-semibold text-md">Create Project</h1>
                    <FaPlus className="ml-2" />
                </div>
                <p className="text-xs text-zinc-400">Create a new project and explore the repository</p>
            </Link>
        </div>
    )
}
