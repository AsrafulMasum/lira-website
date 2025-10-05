import React from "react";
import { LiveChart } from "./LiveChart";
import LatestNews from "./LatestNews";
import ContestCountdown from "@/hooks/ContestCountdown";
import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";

const ContestDetailsRightSection = ({ contest }: any) => {
  return (
    <div className="col-span-1">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${contest?.image}`}
        alt={contest?.image}
        width={400}
        height={400}
        className="w-full h-[200px] rounded-2xl object-contain"
      />

      <h4 className="text-dark-primary text-2xl font-semibold mt-4 leading-[120%] tracking-[-0.52px]">
        Win a {contest?.prize?.title}
      </h4>

      <p className="text-primary font-semibold text-2xl mt-2">
        $ {contest?.prize?.prizePool}{" "}
        <span className="text-gray-text text-base">Prize pool</span>
      </p>

      <p className="flex items-center gap-1 text-gray font-semibold text-sm mt-3">
        <CircleQuestionMark size={16} /> Learn how it works
      </p>

      <div className="bg-bg py-4 px-6 rounded-2xl mt-8 flex items-center gap-6">
        <p className="text-dark-primary text-sm font-semibold">
          Make your prediction before it ends!
        </p>
        <ContestCountdown endDate={contest?.endTime} isMarketPlace={false} />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h4 className="text-lg text-[#002913] font-semibold">
            Live Bitcoin Price
          </h4>
          <h4 className="text-primary font-semibold">$118,845.42</h4>
        </div>

        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-primary font-semibold">
            24H Change: +1.3%
          </p>
          <p className="text-gray-text text-xs">Current</p>
        </div>

        <p className="text-gray-text text-xs mb-5">Data from CoinGecko API</p>

        <LiveChart />
      </div>

      <div>
        <LatestNews />
      </div>
    </div>
  );
};

export default ContestDetailsRightSection;
