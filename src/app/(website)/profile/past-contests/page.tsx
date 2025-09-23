import PastContests from "@/components/profile/PastContests";
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
