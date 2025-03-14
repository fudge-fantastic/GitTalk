import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { ThemeProvider } from "./components/theme-provider";
import NavBar from "./components/NavBar";
import { ScrollArea } from "./components/ui/scroll-area";
import { requireUserSession } from "./sessions";
import prisma from "prisma/prisma";
import { Project } from "@prisma/client";


export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// This ensures login and signup remain accessible while protecting everything else.
export const loader = async ({ request }: { request: Request }) => {
  const authRoutes = ["/login", "/signup"];
  const url = new URL(request.url);

  if (authRoutes.includes(url.pathname)) {
    return json({ user: null, projects: [] });
  }

  // Getting Authenticated User
  const user = await requireUserSession(request);

  // Fetching Projects of the Authenticated User
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { userId: user.userId },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return json({ user, projects });
};

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const location = useLocation();
  const data = useLoaderData<typeof loader>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = data?.user || null;
  const authRoutes = ["/login", "/signup"];

  // Routes where we don't want sidebar/navbar
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <ScrollArea className="h-screen w-screen">
            {isAuthPage ? (
              <div>
                {children}
              </div>
            ) : (
              <SidebarProvider>
                <AppSidebar />
                <div className="flex flex-col w-full">
                  <NavBar />
                  <div className="m-2 h-full bg-zinc-50 dark:bg-zinc-950">
                    {children}
                  </div>
                </div>
              </SidebarProvider>
            )}
            <ScrollRestoration />
            <Scripts />
          </ScrollArea>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
