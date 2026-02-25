import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",            // главная публичная
  "/sign-in(.*)", // сделай публичным, иначе будет цикл
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  // 1) Если пользователь залогинен и попал на публичную страницу (например "/") — перекинуть
  if (userId && isPublicRoute(req)) {
    const path = orgId ? `/organization/${orgId}` : "/select-org";
    return NextResponse.redirect(new URL(path, req.url));
  }

  // 2) Если не залогинен и маршрут НЕ публичный — редирект на /sign-in
  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url); // Clerk понимает это
    return NextResponse.redirect(signInUrl);
  }

  // 3) Если залогинен, но org не выбран — на /select-org
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
