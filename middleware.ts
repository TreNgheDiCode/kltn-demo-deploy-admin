import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher(["/login(.*)", "/api(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { protect, userId, redirectToSignIn } = auth();
  const role = auth().sessionClaims?.metadata.role;
  if (userId) {
    if (role !== "ADMIN") {
      return auth().redirectToSignIn();
    }
  }

  if (!isPublicRoutes(req)) protect();
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
