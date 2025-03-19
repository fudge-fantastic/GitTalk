import { Form, json, redirect } from "@remix-run/react";
import { createProject } from "prisma/queries";
import { Input } from "~/components/ui/input";
import { getSession } from "~/sessions";
import { Textarea } from "~/components/ui/textarea"
import { pollCommits } from "~/lib/github";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const repoURL = formData.get("repoURL") as string;
    const projectName = formData.get("projectName") as string;
    const description = formData.get("description") as string;
    const githubToken = formData.get("githubToken") as string;
    console.log("Received FormData:", Object.fromEntries(formData));
    
    // Obtaining userID from the session
    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");
  
    if (!userId) {return json({ error: "Unauthorized" }, { status: 401 });}
  
    try {
      // Create the project in the database.
      const project = await createProject(userId, projectName, repoURL, description, githubToken);
  
      // Trigger pollCommits in the background. Any errors are logged but won't block the redirect, Fire-and-forget (asynchronous processing)
      pollCommits(project.id).catch((err) =>
        console.error("Poll commits error:", err)
      );
  
      // Immediately redirect the user.
      return redirect(`/projects/${project.id}`);
    } catch (error) {
      return json({ error: "Error creating project" }, { status: 500 });
    }
  }
  
export default function CreateProject() {
    return (
        <div className="flex justify-center items-center h-full gap-6 p-3">
            <div className="md:block hidden md:p-32 dark:bg-zinc-900 bg-zinc-200 rounded-md shadow-lg">PlaceHolder</div>
            <div>
                <h1 className="text-xl text-zinc-800 dark:text-zinc-200 font-bold">Link your GitHub repository here!</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">Enter your GitHub repository details below!</p>
                <div className="my-4">
                    <Form method="post" className="space-y-3">
                        <Input
                            required
                            name="projectName"
                            placeholder="Project Name"
                            className="bg-zinc-100 dark:bg-zinc-900 h-7.5 mb-2 text-sm"
                        />
                        <Input
                            required
                            name="repoURL"
                            type="url"
                            placeholder="Repository URL"
                            className="bg-zinc-100 dark:bg-zinc-900 h-7.5 mb-2 text-sm"
                        />

                        <Input
                            // required
                            name="githubToken"
                            type="password"
                            placeholder="GitHub Token (Optional)"
                            className="bg-zinc-100 dark:bg-zinc-900 h-7.5 mb-2 text-sm"
                        />

                        <Textarea
                            placeholder="Description (Optional)"
                            className="bg-zinc-100 dark:bg-zinc-900 h-28 mb-2 text-sm"
                            name="description"
                        />
                        <button type="submit" className="font-semibold px-3 py-1.5 text-[12px] rounded-md outline-none shadow-sm hover:shadow-md dark:shadow-none shadow-zinc-400 hover:shadow-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors">
                            Submit
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
