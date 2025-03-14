import { Project } from "@prisma/client";
import { Outlet, useRouteLoaderData} from "@remix-run/react";

interface ProjectContext {
    projects: Project[]
}

export default function Projects() {
    const { projects } = useRouteLoaderData("root") as ProjectContext;
    return (
        <div>
            <Outlet context={{projects}} />
        </div>
    );
}
