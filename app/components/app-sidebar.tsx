import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { SidebarItemsGroup1 } from "~/shared/SidebarContent"
import { Link, useLocation, useRouteLoaderData } from "@remix-run/react";
import { Separator } from "./ui/separator";
import { GalleryVerticalEnd, Plus } from "lucide-react";
import { Project } from "@prisma/client";

export function AppSidebar() {
  return (
    <Sidebar>
      <SideBarHeader />
      <SidebarContent>
      </SidebarContent>
      <SideBarFooter />
    </Sidebar>
  )
}

function SideBarHeader() {
  const location = useLocation();
  const { projects } = useRouteLoaderData("root") as { projects: Project[] };
  const maxVisibleProjects = 5; // Limit projects shown in the sidebar

  return (
    <>
      <SidebarHeader className="flex flex-row items-center gap-[7px] mx-1.5 mt-2">
        <Link to="/" className="flex flex-row items-center gap-[7px]">
          <GalleryVerticalEnd />
          <h1 className="text-zinc-900 dark:text-white text-xl font-semibold tracking-wide">GitTalk</h1>
        </Link>
      </SidebarHeader>
      <Separator className="bg-zinc-700 mt-2.5" />
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs text-zinc-900 dark:text-zinc-200">Main Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {SidebarItemsGroup1.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                        ? "bg-zinc-900 text-white dark:bg-zinc-900 font-semibold hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-900"
                        : "hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-900 font-semibold"

                        }`}
                    >
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Projects Section */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs text-zinc-900 dark:text-zinc-200">Projects</SidebarGroupLabel>
        <SidebarGroupAction title="Create a Project">
          <Link to="/createproject">
            <Plus className="size-5 text-zinc-900 dark:text-zinc-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-900 rounded-md duration-150" />
          </Link>
        </SidebarGroupAction>
        <SidebarGroupContent className="mt-1">
          <SidebarMenu>
            {projects && projects.length > 0 ? (
              <>
                {projects.slice(0, maxVisibleProjects).map((project) => {
                  // Extracting initials from first and last word of project name
                  const words = project.projectName.split(" ");
                  const initials =
                    words.length > 1
                      ? words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase()
                      : words[0][0].toUpperCase();

                  const isActive = location.pathname === `/projects/${project.id}`;
                  return (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={`/projects/${project.id}`}
                          className={`flex items-center gap-2 px-3 py-3 rounded-md transition-colors ${isActive
                              ? "bg-zinc-900 text-white dark:bg-zinc-900 font-semibold hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-900"
                              : "hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-900"
                            }`}
                        >
                          <span className="size-6 flex items-center justify-center rounded-full shadow-sm shadow-zinc-400 bg-white dark:shadow-none dark:bg-zinc-800 text-[10px] font-bold text-zinc-900 dark:text-white">
                            {initials}
                          </span>
                          <span className="font-semibold">{project.projectName}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

                {/* Load More Button */}
                {projects.length > maxVisibleProjects && (
                  <Link to="/projects" className="flex items-center justify-center mt-2.5 py-1.5 px-3 rounded-md font-semibold text-xs text-zinc-900 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-900 dark:text-white duration-150 w-fit mx-auto">
                    Load More
                  </Link>
                )}
              </>
            ) : (
              <SidebarMenuItem>
                <span className="px-3 py-2 text-sm text-zinc-500">No projects available</span>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}

function SideBarFooter() {
  return (
    <SidebarFooter>
      {/* <SidebarGroup> */}
      {/* <SidebarGroupLabel className="text-xs text-zinc-900 dark:text-zinc-200">Help & Support</SidebarGroupLabel> */}
      {/* <SidebarGroupContent> */}
      {/* <div className="dark:bg-zinc-900 p-2 rounded-sm bg-zinc-100 border border-zinc-300 dark:border-none"> */}
      {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. */}
      {/* </div> */}
      {/* </SidebarGroupContent> */}
      {/* </SidebarGroup> */}
    </SidebarFooter>
  )
}