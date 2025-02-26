import { Form } from "@remix-run/react";
import { useState } from "react";
import { Input } from "~/components/ui/input";

type FormInput = {
    repoURL: string;
    projectName: string;
    githubToken: string;
};

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const repoURL = formData.get("repoURL") as string;
    const projectName = formData.get("projectName") as string;
    const githubToken = formData.get("githubToken") as string;

    console.log(repoURL, projectName, githubToken);
    return { repoURL, projectName, githubToken };
}

export default function CreateProject() {
    const [formData, setFormData] = useState<FormInput>({
        repoURL: "",
        projectName: "",
        githubToken: "",
    });

    // Handle input change for all fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center h-full gap-6 p-3">
            <div className="md:block hidden md:p-32 dark:bg-zinc-800 bg-zinc-200 rounded-md shadow-lg">PlaceHolder</div>
            <div>
                <h1 className="text-xl text-zinc-800 dark:text-zinc-200 font-bold">Link your GitHub repository here!</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">Enter your GitHub repository details below!</p>
                <div className="my-4">
                    <Form method="post" className="space-y-3">
                        <Input
                            required
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            placeholder="Project Name"
                            className="bg-zinc-100 dark:bg-zinc-800 h-7.5 mb-2 text-sm"
                        />
                        <Input
                            required
                            name="repoURL"
                            type="url"
                            value={formData.repoURL}
                            onChange={handleChange}
                            placeholder="Repository URL"
                            className="bg-zinc-100 dark:bg-zinc-800 h-7.5 mb-2 text-sm"
                        />

                        <Input
                            // required
                            name="githubToken"
                            type="password"
                            value={formData.githubToken}
                            onChange={handleChange}
                            placeholder="GitHub Token (Optional)"
                            className="bg-zinc-100 dark:bg-zinc-800 h-7.5 mb-2 text-sm"
                        />
                        <button type="submit" className="font-semibold px-3 py-1.5 text-[12px] rounded-md outline-none shadow-md bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors">
                            Submit
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
