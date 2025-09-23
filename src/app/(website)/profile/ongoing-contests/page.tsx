import { OngoingContests } from "@/components/profile/OngoingContests";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = () => {
  return (
    <section>
      <ContainerLayout>
        <OngoingContests viewAll={true} />
      </ContainerLayout>
    </section>
  );
};

export default page;
