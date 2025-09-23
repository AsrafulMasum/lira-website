import PastContests from "@/components/website/profile/PastContests";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = () => {
  return (
    <section>
      <ContainerLayout>
        <PastContests viewAll={true} />
      </ContainerLayout>
    </section>
  );
};

export default page;
