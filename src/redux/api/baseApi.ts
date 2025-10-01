import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

// Read base URL from environment variables - using NEXT_PUBLIC prefix for client-side access
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://10.10.7.62:7008/api/v1";
const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || "http://10.10.7.62:7008";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    // Get access token from cookies
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";");
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("accessToken=")
      );

      if (accessTokenCookie) {
        const accessToken = accessTokenCookie
          .trim()
          .substring("accessToken=".length);
        if (accessToken) {
          headers.set("authorization", `Bearer ${accessToken}`);
        }
      }
    }

    return headers;
  },
  credentials: "include", // This ensures cookies are sent with requests
});

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // If 401 is encountered, perform logout and redirect
  if (result?.error?.status === 401) {
    // Cookies are handled by the server, no need to clear them here

    // Optionally clear Redux state
    api.dispatch({ type: "auth/logout" });

    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  }

  return result;
};

const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "contests",
    "categories",
    "userProfile",
    "notification",
    "dashboard",
    "Category",
    "UnitOrType",
    "Group",
  ],
});

export const { reducer } = api;
export default api;
export const imageUrl = IMAGE_BASE_URL;
