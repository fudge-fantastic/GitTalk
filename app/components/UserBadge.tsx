/* eslint-disable import/no-unresolved */
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog"
import { Form, useLoaderData } from "@remix-run/react"

const dropDownItems1 = ["Profile", "Billing", "Settings"]
const dropDownItems2 = ["Support", "Logout"]

export function getInitials(name: string) {
  if (!name) return "";
  const nameParts = name.trim().split(" ");

  // If there's only one word, take the first letter
  if (nameParts.length === 1) {return nameParts[0][0].toUpperCase();}

  // Otherwise, take the first letter of the first and last words
  return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
}

interface UserData {
  user: {
    userId: string;
    userName: string;
    userEmail: string;
  };
}

export function UserBadge() {
  const [open, setOpen] = useState(false)
  const userData = useLoaderData<UserData>(); 
  const initials = getInitials(userData.user?.userName || ""); 
  const userButtonStyle = "font-semibold px-3 py-1.5 text-sm rounded-full shadow-sm hover:shadow-md shadow-zinc-400 hover:shadow-zinc-400 dark:bg-zinc-900 dark:hover:border-zinc-700 border dark:shadow-none duration-150"

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={userButtonStyle}>{initials}</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {dropDownItems1.map((item, index) => (
              <DropdownMenuItem className="cursor-pointer hover:dark:bg-zinc-900" key={index}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {dropDownItems2.map((item, index) =>
              item === "Logout" ? (
                <DropdownMenuItem
                  key={index}
                  className="cursor-pointer"
                  onSelect={() => setOpen(true)}
                >
                  {item}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="cursor-pointer hover:dark:bg-zinc-900" key={index}>
                  {item}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will log you out of your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-1">
            <button className="px-2 py-0.5 text-xs shadow-sm dark:shadow-none hover:shadow-md shadow-zinc-400 hover:shadow-zinc-400 dark:bg-zinc-800 border dark:hover:border-zinc-700 rounded-md font-semibold duration-150" onClick={() => setOpen(false)}>Cancel</button>
            <Form method="post" action="/logout">
              <button type="submit" className="px-3 py-2 text-xs font-semibold bg-red-600 shadow-sm hover:shadow-md hover:shadow-red-500 shadow-red-500 text-white rounded-md duration-150">Logout</button>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
