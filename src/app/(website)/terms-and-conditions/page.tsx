import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = async () => {
  const { data } = await apiRequest("/settings?key=termsOfService", {
    method: "GET",
  });

  return (
    <section className="bg-bg min-h-[calc(100vh-64px)] py-10">
      <ContainerLayout>
        <h4 className="text-xl text-dark-primary font-medium mb-10">Terms & Conditions</h4>
        <div className="prose" dangerouslySetInnerHTML={{ __html: data }} />
      </ContainerLayout>
    </section>
  );
};

export default page;
