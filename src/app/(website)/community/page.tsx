import CommunityTabs from "@/components/website/community/CommunityTabs";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = () => {
  return (
    <section className="bg-[#FAFFFC] min-h-[calc(100vh-64px)] pb-10">
      <CommunityTabs />
    </section>
  );
};

export default page;
