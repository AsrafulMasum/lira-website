"use server";

import SignUp from "@/components/auth/sign-up/SignUp";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
};

export default page;
