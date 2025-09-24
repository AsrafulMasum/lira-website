import Settings from "@/components/profile/settings/Settings";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = () => {
  return (
    <section className="bg-[#FAFFFC]">
      <ContainerLayout>
        <Settings />
      </ContainerLayout>
    </section>
  );
};

export default page;
