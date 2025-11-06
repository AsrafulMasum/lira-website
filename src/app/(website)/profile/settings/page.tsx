import Settings from "@/components/profile/settings/Settings";
import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = async () => {
  const { data:notificationData } = await apiRequest("/notifications/user-preferences", {
    method: "GET",
  });
  
  return (
    <section className="bg-[#FAFFFC]">
      <ContainerLayout>
        <Settings notificationData={notificationData} />
      </ContainerLayout>
    </section>
  );
};

export default page;
