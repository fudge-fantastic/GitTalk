import { createCookieSessionStorage, redirect } from "@remix-run/node";

type SessionData = {
  userId: number; 
  userFirstName: string;
  userLastName: string;
  userEmail: string;
};

type SessionFlashData = {
  error?: string;
};

// Create session storage configuration
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "GT_session",
      domain: "localhost", // Change for production (example: "yourdomain.com")
      httpOnly: true, // Prevents JavaScript access (security measure)
      // 7 days (session expiration for below)
      // maxAge: 60 * 60 * 24 * 7, 
      maxAge: 60 * 60, // one hour for now 
      path: "/",
      sameSite: "lax", // Helps prevent CSRF attacks
      secrets: [process.env.SESSION_SECRET ?? "default-secret"], // Use env variable in production
      secure: process.env.NODE_ENV === "production",
    },
  });

// Store user data in session after successful login
export async function setSession(userId: number, userFirstName: string, userLastName: string, userEmail: string, redirectTo = "/dashboard") {
  const session = await getSession();
  session.set("userId", userId);
  session.set("userFirstName", userFirstName);
  session.set("userLastName", userLastName);
  session.set("userEmail", userEmail);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

// Retrieve user session and enforce authentication on protected routes 
export async function requireUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    // Redirect if user is not logged in
    throw redirect("/login"); 
  }

  return session.data as SessionData;
}

// Logout function to destroy session and redirect user
export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export { getSession, commitSession, destroySession };
