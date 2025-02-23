import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getUsers } from "./../../prisma/queries";
import { Input } from "~/components/ui/input";

// Gets the data fomr the DB
export async function loader() {
  try {
      const users = await getUsers();
      console.log("Calling users from loader, (via unwanted route)",users[1])
      return json(users || [])
  } catch (error) {
      throw new Response("Failed to load users", {status : 500})
  }
}

export default function Unwanted() {
  const someData = useLoaderData();

  return (
    <div className="px-8 py-2">
      {someData[0].map((user) => (
        <ul className="list-decimal" key={user.id}>
          <li >{user.firstName} {user.lastname}</li>
          <li className="mt-2">
            <Form method="post" className="flex gap-4">
              <Input type="text" className="dark:border-zinc-400 h-7" name="firstName" />
              <Input type="text" className="dark:border-zinc-400 h-7" name="lastName" />
              <button type="submit" className="text-sm">Submit</button>
            </Form>
          </li>
        </ul>
      ))}
    </div>
  );
}
