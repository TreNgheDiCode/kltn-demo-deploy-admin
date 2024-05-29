import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/login", "/api(.*)"]);

export default clerkMiddleware(
  (auth, req) => {
    if (!auth().userId && !isPublicRoute(req)) {
      return auth().redirectToSignIn();
    }

    if (auth().userId && auth().sessionClaims?.metadata.role !== "ADMIN") {
      return auth().redirectToSignIn();
    }
  },
  { debug: true }
);

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
