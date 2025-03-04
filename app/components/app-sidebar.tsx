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
  // SidebarMenuForProjects,
} from "~/components/ui/sidebar"
// import { ScrollArea } from "~/components/ui/scroll-area"
import { SidebarItemsGroup1 } from "~/shared/SidebarContent"
import { Link, useLocation } from "@remix-run/react";
import { Separator } from "./ui/separator";
import { GalleryVerticalEnd } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="p-2">
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
  return (
    <>
      <SidebarHeader className="flex flex-row items-center gap-[7px] mx-1.5 mt-1">
        <Link to="/" className="flex flex-row items-center gap-[7px]">
          <GalleryVerticalEnd />
          <h1 className="text-lg font-bold">GitTalk</h1>
        </Link>
      </SidebarHeader>
      <Separator className="bg-zinc-700 mt-2" />
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
                        ? "hover:bg-zinc-900 hover:text-white bg-zinc-900 dark:bg-zinc-800 text-white dark:text-white font-semibold"
                        : "dark:hover:bg-zinc-900 text-zinc-900 dark:text-white font-semibold"
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
    </>
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
