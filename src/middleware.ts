import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE_NAME, parseSessionCookie } from "@/lib/auth";

const publicRoutes = ["/", "/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const isProtectedRoute = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await parseSessionCookie(sessionCookie);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && session.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/dashboard", "/admin"],
};
