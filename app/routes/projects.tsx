import { Outlet, useLoaderData} from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
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
    const { projects }: { projects: Project[] } = useLoaderData()
    return (
        <div>
            <Outlet context={{projects}} />
        </div>
    );
}
