/* eslint-disable import/no-unresolved */
import { Link } from "@remix-run/react"
import { GalleryVerticalEnd } from "lucide-react"
import { ModeToggle } from "~/components/darkmodeToggler"
import SignUpForm from "~/components/signup-form"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-3">
                <div className="flex flex-row items-center justify-between">
                    <Link to="/" className="flex flex-row items-center gap-[7px] font-semibold">
                        <div><GalleryVerticalEnd className="size-5" /></div>
                        GitTalk
                    </Link>
                    <ModeToggle />
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignUpForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/public/kan-liu-666k-4patreon-2.jpg"
                    alt="someimage"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
