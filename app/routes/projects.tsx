import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { FaPlus } from "react-icons/fa";
import { getSession } from "~/sessions";
import prisma from "prisma/prisma";
import { Project } from "@prisma/client";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");

    if (!userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const projects = await prisma.project.findMany({
            where: { userId },
        });
        return json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return json({ error: "Failed to fetch projects" }, { status: 500 });
    }
};

export default function Projects() {
    const { projects }: { projects: Project[] } = useLoaderData();

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {projects?.length > 0 ? (
                    projects.map((project) => (
                        <Link to={`/projects/${project.id}`}
                            key={project.id}
                            className="dark:hover:bg-zinc-800 flex flex-col p-3 rounded-sm bg-zinc-100 dark:bg-zinc-900 gap-2 duration-150"
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
        </div>
    );
}
