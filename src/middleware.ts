import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware runs before every request
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example 1: Redirect root "/" to another route
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/marketplace/crypto", request.url));
  }
}

// Configure which routes run through this middleware
export const config = {
  matcher: ["/"], // only runs on root
};
