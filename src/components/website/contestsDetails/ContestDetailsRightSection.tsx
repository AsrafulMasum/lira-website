import React from "react";
import { LiveChart } from "./LiveChart";
import LatestNews from "./LatestNews";
import ContestCountdown from "@/helpers/ContestCountdown";
import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";

const ContestDetailsRightSection = ({contest}:any) => {
  return (
    <div className="col-span-1">
      <Image
        src={contest?.prize?.image}
        alt={contest.prize.name}
        width={400}
        height={400}
        className="w-full h-[200px] rounded-2xl object-cover"
      />

      <h4 className="text-[#004721] text-2xl font-semibold mt-4 leading-[120%] tracking-[-0.52px]">
        Win a {contest?.prize?.name}
      </h4>

      <p className="text-primary font-semibold text-2xl mt-2">
        ${contest?.prize?.price}{" "}
        <span className="text-[#96A39C] text-base">Prize pool</span>
      </p>

      <p className="flex items-center gap-1 text-[#717A75] font-semibold text-sm mt-3">
        <CircleQuestionMark size={16} /> Learn how it works
      </p>

      <div className="bg-[#F2F7F5] py-4 px-6 rounded-2xl mt-8 flex items-center gap-6">
        <p className="text-[#004721] text-sm font-semibold">
          Make your prediction before it ends!
        </p>
        <ContestCountdown endDate={contest.endsIn} isMarketPlace={false} />
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
          <p className="text-[#96A39C] text-xs">Current</p>
        </div>

        <p className="text-[#96A39C] text-xs mb-5">Data from CoinGecko API</p>

        <LiveChart />
      </div>

      <div>
        <LatestNews />
      </div>
    </div>
  );
};

export default ContestDetailsRightSection;
