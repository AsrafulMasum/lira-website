import { OngoingContests } from "@/components/profile/ongoingContests/OngoingContests";
import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = async () => {
  const ongoingContestsRes = await apiRequest(
    `/orders/my-orders?limit=2&page=${page}`,
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
        <OngoingContests viewAll={true} ongoingContests={ongoingContestsRes?.data} ongoingAnalytics={ongoingAnalytics} />
      </ContainerLayout>
    </section>
  );
};

export default page;
