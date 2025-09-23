"use server";

import ForgotPassword from "@/components/auth/forgotPassword/ForgotPassword";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  );
};

export default page;
