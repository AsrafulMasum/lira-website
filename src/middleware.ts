import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getProfile from "./helpers/getProfile";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const protectedRoutes = ["/contests", "/profile", "/community", "/dashboard"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Try to get the user (may return null or user object with role)
  const user = await getProfile();

  // Handle OAuth(Google) callback (login)
  if (pathname === "/auth/callback") {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const success = searchParams.get("success");

    if (accessToken && refreshToken && success === "true") {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.set("accessToken", accessToken, {
        path: "/",
        httpOnly: false,
      });
      response.cookies.set("refreshToken", refreshToken, {
        path: "/",
        httpOnly: false,
      });
      return response;
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!user && (accessToken || refreshToken)) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  // If it's a protected route and no valid user (or no token) → redirect to login
  if (isProtected && (!user || !accessToken)) {
    // Also, optionally clear cookies if token present but user invalid
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  // If requesting /dashboard, enforce role check
  if (pathname.startsWith("/dashboard")) {
    if (!user || user.role !== "SUPER_ADMIN") {
      // Not allowed → redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Root redirection (custom logic)
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL("/marketplace/All?tab=All", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/auth/callback",
    "/contests/:path*",
    "/community/:path*",
    "/dashboard/:path*",
    "/profile",
  ],
};
