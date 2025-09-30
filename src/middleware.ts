import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiRequest } from "./helpers/apiRequest";

// This middleware runs before every request
export async function middleware(request: NextRequest) {
  const { data: groups } = await apiRequest("/groups", { method: "GET" });
  const { data: tabs } = await apiRequest(
    `/categories/?groupId=${groups[0]?._id}`,
    {
      method: "GET",
    }
  );
  const { pathname } = request.nextUrl;

  // Example 1: Redirect root "/" to another route
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/marketplace/${groups[0]?._id}?tab=${tabs[0]?._id}`, request.url)
    );
  }
}

// Configure which routes run through this middleware
export const config = {
  matcher: ["/"], // only runs on root
};
