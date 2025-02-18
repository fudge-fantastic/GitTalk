import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuForProjects,
} from "~/components/ui/sidebar"

import { ScrollArea } from "~/components/ui/scroll-area"
import { SidebarItemsGroup1, SidebarItemsGroup3 } from "~/shared/SidebarContent"
import { Link, useLocation } from "@remix-run/react";
import { Separator } from "./ui/separator";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="p-2">
      <SideBarHeader />
      <Separator className="bg-zinc-400 mt-2" />
      <SidebarContent>
        <ScrollArea>
          <SideBarGroup />
        </ScrollArea>
      </SidebarContent>
      {/* Let FOOTER be used as a subscription plan and not as a User profile */}
      <SideBarFooter />
    </Sidebar>
  )
}


function SideBarHeader() {
  return (
    <SidebarHeader className="flex flex-row items-center gap-[7px] mx-1 mt-1">
      <div className="bg-zinc-400 p-[13px] rounded-sm"></div>
      <h1 className="text-lg font-semibold">GitTalk</h1>
    </SidebarHeader>
  )
}

function SideBarFooter() {
  return (
    <SidebarFooter>
      <SidebarGroup>
        {/* <SidebarGroupLabel className="text-xs text-zinc-900 dark:text-zinc-200">Help & Support</SidebarGroupLabel> */}
        <SidebarGroupContent>
          <div className="dark:bg-zinc-900 p-2 rounded-md bg-zinc-100 border border-zinc-300 dark:border-none">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarFooter>
  )
}
function SideBarGroup() {
  const location = useLocation();

  return (
    <>
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
                      className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                        isActive
                          ? "hover:bg-zinc-800 hover:text-white bg-zinc-800 dark:bg-zinc-700 text-white dark:text-white"
                          : "dark:hover:bg-zinc-800 text-zinc-600 dark:text-white"
                      }`}
                    >
                      <item.icon className={`size-5`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Your Projects */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs text-zinc-900 dark:text-zinc-200">
          Your Projects
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuForProjects>
            {SidebarItemsGroup3.map((project) => {
              const isActive = location.pathname === project.url; // Check if active

              return (
                <SidebarMenuItem key={project.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={project.url}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "hover:bg-zinc-800 hover:text-white bg-zinc-800 dark:bg-zinc-700 text-white dark:text-white"
                          : "dark:hover:bg-zinc-800 text-zinc-600 dark:text-white"
                      }`}
                    >
                      <div
                        className={`px-2 py-0.5 rounded-sm font-semibold ${
                          isActive ? "dark:bg-zinc-900 bg-zinc-300 text-black dark:text-white" : "bg-zinc-200 text-zinc-900"
                        }`}
                      >
                        P
                      </div>
                      <span className={`text-xs ${isActive ? "font-semibold" : ""}`}>{project.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenuForProjects>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
