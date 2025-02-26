/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm, validateLoginData } from "~/components/login-form"
import { json, Link } from "@remix-run/react"
import { ModeToggle } from "~/components/darkmodeToggler" 
import prisma from "./../../prisma/prisma"
import { setSession } from "~/sessions"
import bcrypt from "bcryptjs";

export async function action({ request }: { request: Request }) {
  const body = await request.formData();
  const email = body.get("email") as string;
  const password = body.get("password") as string;

  const validationError = validateLoginData(email, password);
  if (validationError) {
    return json(validationError, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return json({ error: "Email not found, please sign up" }, { status: 401 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return json({ error: "Incorrect Password" }, { status: 401 });
  }

  return setSession(user.id, user.firstName, user.lastName, user.email);
}

export default function LoginPage() {
  return (
    <div className="p-3 min-h-screen">
      <div className="flex flex-row items-center justify-between">
        <Link to="/" className="flex flex-row items-center gap-[7px] font-semibold">
          <div><GalleryVerticalEnd className="size-5" /></div>
          GitTalk
        </Link>
        <ModeToggle />
      </div>
      <div>
        <div className="flex flex-row items-center justify-center mt-10">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
