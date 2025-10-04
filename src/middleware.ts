// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { apiRequest } from "./helpers/apiRequest";

// // This middleware runs before every request
// export async function middleware(request: NextRequest) {
//   const { data: groups } = await apiRequest("/groups", { method: "GET" });
//   const { data: tabs } = await apiRequest(
//     `/categories/?groupId=${groups[0]?._id}`,
//     {
//       method: "GET",
//     }
//   );
//   const { pathname } = request.nextUrl;

//   // Example 1: Redirect root "/" to another route
//   if (pathname === "/") {
//     return NextResponse.redirect(
//       new URL(`/marketplace/${groups[0]?._id}?tab=${tabs[0]?._id}`, request.url)
//     );
//   }
// }

// // Configure which routes run through this middleware
// export const config = {
//   matcher: ["/"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiRequest } from "./helpers/apiRequest";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Get accessToken from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // ✅ Protected routes
  const protectedRoutes = ["/contests", "/profile", "/community"];

  // Check if current path matches any protected route
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ✅ If route is protected and no accessToken → redirect to /login
  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ If logged in and trying to go to login page → redirect to home
  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Example: redirect root "/" to first group/tab
  if (pathname === "/") {
    try {
      const { data: groups } = await apiRequest("/groups", { method: "GET" });
      const { data: tabs } = await apiRequest(
        `/categories/?groupId=${groups?.[0]?._id}`,
        { method: "GET" }
      );

      if (groups?.length && tabs?.length) {
        return NextResponse.redirect(
          new URL(
            `/marketplace/${groups[0]._id}?tab=${tabs[0]._id}`,
            request.url
          )
        );
      }

      // fallback if data missing
      return NextResponse.redirect(new URL("/marketplace", request.url));
    } catch (err) {
      console.error("Middleware error:", err);
      return NextResponse.redirect(new URL("/marketplace", request.url));
    }
  }

  // ✅ Allow request to continue
  return NextResponse.next();
}

// ✅ Configure matcher for routes that use this middleware
export const config = {
  matcher: [
    "/", // for home redirection
    "/login", // for login redirect logic
    "/contests/:path*", // protect contest pages
    "/community/:path*", // protected community pages
    // "/dashboard/:path*", // protected admin pages
    "/profile", // protect profile page
  ],
};
