import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/unauthorized"],
  afterAuth: (auth, req) => {
    const isAdmin = auth.sessionClaims?.metadata.role === "ADMIN";

    const isLoggedIn = auth.sessionId;

    if (isLoggedIn) {
      if (!isAdmin) {
        return Response.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
