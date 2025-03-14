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
  // SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  // SidebarMenuForProjects,
} from "~/components/ui/sidebar"
// import { ScrollArea } from "~/components/ui/scroll-area"
import { SidebarItemsGroup1 } from "~/shared/SidebarContent"
import { Link, useLocation, useRouteLoaderData } from "@remix-run/react";
import { Separator } from "./ui/separator";
import { GalleryVerticalEnd, Plus } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { Project } from "@prisma/client";


export function AppSidebar() {
  return (
    <Sidebar>
      <SideBarHeader />
      <SidebarContent>
      </SidebarContent>
      {/* Let FOOTER be used as a subscription plan and not as a User profile */}
      <SideBarFooter />
    </Sidebar>
  )
}


function SideBarHeader() {
  const location = useLocation();
  const { projects } = useRouteLoaderData("root") as { projects: Project[] };

  return (
    <>
      <SidebarHeader className="flex flex-row items-center gap-[7px] mx-1.5 mt-2">
        <Link to="/" className="flex flex-row items-center gap-[7px]">
          <GalleryVerticalEnd />
          <h1 className="text-xl font-semibold tracking-wide">GitTalk</h1>
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
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "hover:bg-zinc-900 hover:text-white bg-zinc-900 dark:bg-zinc-900 text-white dark:text-white font-semibold"
                          : "dark:hover:bg-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900 dark:text-white font-semibold"
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

      {/* For Projects */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs text-zinc-900 dark:text-zinc-200">
          Projects
        </SidebarGroupLabel>
        <SidebarGroupAction title="Add Project">
          <Link to="/createproject">
            <Plus className="size-4 text-zinc-900 dark:text-zinc-200" />
            <span className="sr-only">Create a Project</span>
          </Link>
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuSub>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <SidebarMenuSubItem key={project.id}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        to={`/projects/${project.id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-900"
                      >
                        {project.projectName}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))
              ) : (
                <SidebarMenuSubItem>
                  <span className="px-3 py-2 text-sm text-zinc-500">No projects available</span>
                </SidebarMenuSubItem>
              )}
            </SidebarMenuSub>
          </SidebarMenuItem>
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


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function unUsed() {
  return (
    <SidebarMenu>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem />
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sidebarLayoutDonotuse() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}