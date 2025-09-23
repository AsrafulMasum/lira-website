import Navbar from "@/components/website/shared/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default layout;
