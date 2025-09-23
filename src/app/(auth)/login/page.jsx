"use server";

import Login from "@/components/auth/login/Login";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default page;
