"use server";

import { cookies } from "next/headers";

const getProfile = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.BASE_URL}/users/profile`, {
      next: {
        tags: ["user-profile"],
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res?.json();
    return resData;
  } catch (error) {
    console.log("Error fetching data:", error);
    return error;
  }
};

export default getProfile;
