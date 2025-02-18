import { ModeToggle } from "./darkmodeToggler";
import { Input } from "./ui/input";
import { UserBadge } from "./UserBadge";

export default function NavBar() {
    return (
        <div className="my-2 rounded-sm flex flex-row justify-between items-center">
            <Input placeholder="Search..." className="bg-zinc-100 w-[30%] dark:bg-zinc-800 h-8" />
            <div className="flex flex-row gap-2 items-center">
                <UserBadge />
                <ModeToggle />
            </div>
        </div>
    );
}