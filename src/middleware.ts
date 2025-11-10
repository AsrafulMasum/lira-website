import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiRequest } from "./helpers/apiRequest";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Check if we're on the callback route
  if (pathname === "/auth/callback") {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const success = searchParams.get("success");

    if (accessToken && refreshToken && success === "true") {
      // Store tokens in cookies (secure & HTTP-only)
      const response = NextResponse.redirect(new URL("/", request.url));

      response.cookies.set("accessToken", accessToken, {
        httpOnly: false,
        path: "/",
      });

      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: false,
        path: "/",
      });

      return response;
    }

    // If something’s missing, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Get accessToken from cookies for protected routes
  const accessToken = request.cookies.get("accessToken")?.value;
  const protectedRoutes = ["/contests", "/profile", "/community", "/dashboard"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Block access if not authenticated
  if (isProtected && !accessToken) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from visiting /login
  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Root redirection logic
  if (pathname === "/") {
    try {
      const { data: groups } = await apiRequest("/groups", {
        method: "GET",
        cache: "no-store",
      });
      const { data: tabs } = await apiRequest(
        `/categories/?groupId=${groups?.[0]?._id}`,
        { method: "GET", cache: "no-store" }
      );

      if (groups?.length && tabs?.length) {
        return NextResponse.redirect(
          new URL(
            `/marketplace/${groups[0]._id}?category=${tabs[0]._id}`,
            request.url
          )
        );
      }

      return NextResponse.redirect(new URL("/marketplace", request.url));
    } catch (err) {
      console.error("Middleware error:", err);
      return NextResponse.redirect(new URL("/marketplace", request.url));
    }
  }

  // Let the request continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/auth/callback", // include callback route
    "/contests/:path*",
    "/community/:path*",
    "/dashboard/:path*",
    "/profile",
  ],
};
