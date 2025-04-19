import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Create a matcher for public routes that don't require authentication
const publicRoutes = createRouteMatcher(["/", "/about", "/sign-in(.*)", "/sign-up(.*)"])

export default clerkMiddleware({
  publicRoutes,
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
