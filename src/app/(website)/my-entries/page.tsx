import MyContests from "@/components/profile/MyContests";
import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page ?? "1";

  const { data: ongoingAnalytics } = await apiRequest(`/orders/analysis`, {
    method: "GET",
  });

  const ongoingContestsRes = await apiRequest(
    `/orders/my-orders?limit=2&page=${page}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

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

  return (
    <div className="min-h-[calc(100vh-64px)] pt-10 bg-[#FAFFFC]">
      <ContainerLayout>
        <MyContests
          ongoingAnalytics={ongoingAnalytics}
          ongoingContestsRes={ongoingContestsRes}
          pastAnalytics={pastAnalytics}
          pastContestsRes={pastContestsRes}
        />
      </ContainerLayout>
    </div>
  );
};

export default page;
