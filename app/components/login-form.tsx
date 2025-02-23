/* eslint-disable import/no-unresolved */
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Form, Link, useActionData } from "@remix-run/react";
import { FaGithubAlt } from "react-icons/fa";

type ActionResponse = {
  error?: string;
};

// Function to validate login data
export function validateLoginData(email: string, password: string): ActionResponse | null {
  if (!email) {
    return { error: "Enter your Email" };
  } else if (!email.includes("@")) {
    return { error: "Enter a valid email" };
  }

  if (!password) {
    return { error: "Enter your Password" };
  }
  return null;
}

export function LoginForm({ ...props }) {
  const actionData = useActionData<ActionResponse>();

  return (
    <Form method="post" className={cn("flex flex-col gap-10")} {...props}>
      {/* Heading */}
      <div className="flex flex-col items-center gap-0 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Error Message */}
      {actionData?.error && (
        <p className="text-red-500 text-center">{actionData.error}</p>
      )}

      {/* Form Fields */}
      <div className="grid gap-6">
        {/* Email Input */}
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@example.com"
            required
          />
        </div>

        {/* Password Input */}
        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-xs underline-offset-3 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>

        {/* Divider */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* GitHub Login Button */}
        <button className="text-sm w-full flex items-center gap-2 dark:bg-zinc-900 justify-center py-1.5 rounded-md shadow-lg dark:border-none border border-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <FaGithubAlt className="h-5 w-5" />
          Login with GitHub
        </button>
      </div>

      {/* Signup Link */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-2">
          Sign up
        </Link>
      </div>
    </Form>
  );
}