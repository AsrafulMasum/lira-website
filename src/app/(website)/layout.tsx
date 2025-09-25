import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </section>
  );
};

export default layout;
