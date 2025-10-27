import AllPastContests from "@/components/profile/pastContests/AllPastContests";
import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = async () => {
  const pastContestsRes = await apiRequest(
    `/orders/past-orders?limit=3&page=${page}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const { data: pastAnalytics } = await apiRequest(
    `/orders/past-order-analysis`,
    {
      method: "GET",
    }
  );

  const statsData = [
    { value: pastAnalytics?.totalEntries, label: "Entries" },
    {
      value: pastAnalytics?.totalContest,
      label: "Contests",
      value2: pastAnalytics?.totalWon,
      label2: "Won",
    },
    {
      value: `$ ${pastAnalytics?.totalWin}`,
      label: "Earnings",
    },
  ];

  return (
    <section>
      <ContainerLayout>
        <AllPastContests
          statsData={statsData}
          allPastContests={pastContestsRes?.data}
        />
      </ContainerLayout>
    </section>
  );
};

export default page;
