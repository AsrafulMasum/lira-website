"use server";

import ChangePassword from "@/components/auth/changePassword/ChangePassword";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <ChangePassword />
    </Suspense>
  );
};

export default page;
