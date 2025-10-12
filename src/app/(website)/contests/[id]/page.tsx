import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";
import LearnToUse from "@/components/website/contestsDetails/LearnToUse";
import ContestDetailsRightSection from "@/components/website/contestsDetails/ContestDetailsRightSection";
import ContestDetailsLeftSection from "@/components/website/contestsDetails/ContestDetailsLeftSection";
import ContestDetailsMobileView from "@/components/website/contestsDetails/ContestDetailsMobileView";
import { apiRequest } from "@/helpers/apiRequest";

const contest = {
  _id: "c1a7f2e9-8b91-4a23-9f3c-1f9e12d92b10",
  contestName: "Predict the BTC price on July 1 at 9:00 PM",
  endsIn: "2025-11-01T21:00:00Z",
  totalEntries: 325,
  entryPrice: 10,
  category: "BTC",
  prize: {
    name: "Rolex Submariner Black",
    price: 12000,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  const { data } = await apiRequest(`/contest/contest/${id}`, {
    method: "GET",
  });

  const { data: tiers } = await apiRequest(`/contest/${id}/tiers`, {
    method: "GET",
  });

  return (
    <section className="bg-[#FAFFFC]">
      <ContainerLayout>
        <div className="hidden lg:grid grid-cols-3 gap-20 pt-10">
          {/* left */}
          <ContestDetailsLeftSection contest={data} tiers={tiers} />

          {/* right */}
          <ContestDetailsRightSection contest={data} />
        </div>

        <div className="lg:hidden">
          <ContestDetailsMobileView contest={data} />
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
