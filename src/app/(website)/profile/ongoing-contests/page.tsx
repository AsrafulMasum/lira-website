import AllOngoingContests from "@/components/profile/ongoingContests/AllOngoingContests";
import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = async () => {
  const ongoingContestsRes = await apiRequest(
    `/orders/my-orders?limit=3&page=${page}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const { data: ongoingAnalytics } = await apiRequest(`/orders/analysis`, {
    method: "GET",
  });

  return (
    <section>
      <ContainerLayout>
        <AllOngoingContests
          meta={ongoingContestsRes?.meta}
          contestData={ongoingContestsRes?.data}
          ongoingAnalytics={ongoingAnalytics}
        />
      </ContainerLayout>
    </section>
  );
};

export default page;
