import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";
import LearnToUse from "@/components/website/contestsDetails/LearnToUse";
import ContestDetailsRightSection from "@/components/website/contestsDetails/ContestDetailsRightSection";
import ContestDetailsLeftSection from "@/components/website/contestsDetails/ContestDetailsLeftSection";
import ContestDetailsMobileView from "@/components/website/contestsDetails/ContestDetailsMobileView";
import { apiRequest } from "@/helpers/apiRequest";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
};

const page = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const searchParamsValue = await searchParams;

  const customValue = searchParamsValue?.customValue;

  const { data } = await apiRequest(`/contest/contest/${id}`, {
    method: "GET",
  });

  const { data: tiers } = await apiRequest(`/contest/${id}/tiers`, {
    method: "GET",
  });

  // console.log("Hukka hua full data", data);

  const rule = data?.rule;
  const group = data?.group;
  const category = data?.category;

  let livePrice = null;
  let liveNews = null;

  if (group?.toLowerCase().includes("crypto")) {
    try {
      const { data: priceData } = await apiRequest(
        `/contest/crypto/price-history?crypto=${data?.category}&days=365`,
        { method: "GET", cache: "no-store" }
      );
      livePrice = priceData;
    } catch (error) {
      console.error("Error fetching live price:", error);
    }
  }

  if (group?.toLowerCase().includes("stock")) {
    try {
      const { data: priceData } = await apiRequest(
        `/contest/stock/history?symbol=${data?.category}&days=365`,
        { method: "GET", cache: "no-store" }
      );
      livePrice = priceData;
    } catch (error) {
      console.error("Error fetching live price:", error);
    }
  }

  if (group?.toLowerCase().includes("economic")) {
    try {
      const { data: priceData } = await apiRequest(
        `/contest/economic/data?series=${data?.category}&days=365`,
        { method: "GET", cache: "no-store" }
      );
      livePrice = priceData;
    } catch (error) {
      console.error("Error fetching live price:", error);
    }
  }

  if (category?.toLowerCase().includes("oil")) {
    try {
      const { data: priceData } = await apiRequest(
        `/contest/energy/data?days=365`,
        { method: "GET", cache: "no-store" }
      );
      livePrice = priceData;
    } catch (error) {
      console.error("Error fetching live news:", error);
    }
  }

  if (category?.toLowerCase().includes("bitcoin")) {
    try {
      const { data: newsData } = await apiRequest(`/contest/contest/news`, {
        method: "GET",
        cache: "no-store",
      });
      liveNews = newsData;
    } catch (error) {
      console.error("Error fetching live news:", error);
    }
  }

  return (
    <section className="bg-[#FAFFFC]">
      <ContainerLayout>
        <div className="hidden lg:grid grid-cols-3 gap-20 pt-10">
          {/* left */}
          <ContestDetailsLeftSection
            contest={data}
            tiers={tiers}
            customValue={customValue}
          />

          {/* right */}
          <ContestDetailsRightSection
            contest={data}
            livePrice={livePrice}
            liveNews={liveNews}
          />
        </div>

        <div className="lg:hidden">
          <ContestDetailsMobileView
            contest={data}
            tiers={tiers}
            livePrice={livePrice}
            rules={rule}
            liveNews={liveNews}
          />
        </div>
      </ContainerLayout>

      {/* bottom */}
      <div className="mt-16 bg-bg py-12">
        <ContainerLayout>
          <h4 className="text-2xl font-semibold text-dark-primary text-center">
            Learn how easy Lira is!
          </h4>
          <LearnToUse />
        </ContainerLayout>
      </div>
    </section>
  );
};

export default page;
