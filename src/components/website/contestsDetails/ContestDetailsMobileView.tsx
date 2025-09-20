import ContestCountdown from "@/helpers/ContestCountdown";
import { CircleQuestionMark, Clock, Plus, Search, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { SelectPredictions } from "./SelectPredictions";
import { LiveChart } from "./LiveChart";
import LatestNews from "./LatestNews";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import RangeSheet from "./RangeSheet";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddCustomValue from "./AddCustomValue";

const ContestDetailsMobileView = ({ contest }: any) => {
  return (
    <section className="pt-5">
      <h4 className="text-2xl font-semibold text-[#002913]">
        {contest?.contestName.split("on")[0] + "on"}{" "}
        <span className="text-primary">
          {contest?.contestName.split("on")[1]}
        </span>{" "}
      </h4>

      <div className="flex items-center gap-4 text-[#717A75] mt-3">
        <p className="flex items-center gap-2">
          <Clock size={16} /> Ends In:{" "}
          <ContestCountdown endDate={contest.endsIn} isMarketPlace={true} />
        </p>
        <p className="flex items-center gap-2">
          <Users size={16} />
          {contest.totalEntries} entries
        </p>
      </div>

      <div className="flex items-center gap-4 mt-6 bg-[#F2F7F5] rounded-2xl py-2 pl-2 pr-3">
        <Image
          src={contest?.prize?.image}
          alt={contest.prize.name}
          width={400}
          height={400}
          className="w-20 h-20 rounded-2xl object-cover"
        />

        <div>
          <h4 className="text-[#004721] text-lg font-semibold leading-[120%] tracking-[-0.52px]">
            Win a {contest?.prize?.name}
          </h4>

          <p className="text-primary font-semibold text-base mt-2">
            ${contest?.prize?.price}{" "}
            <span className="text-[#96A39C] text-sm font-normal">
              Prize pool
            </span>
          </p>

          <p className="flex items-center gap-1 text-[#717A75] font-semibold text-sm mt-2">
            <CircleQuestionMark size={16} /> Learn how it works
          </p>
        </div>
      </div>

      <h4 className="text-2xl font-semibold text-[#002913] mt-6">
        Select your predictions
      </h4>

      <div className="mt-6">
        <SelectPredictions />
      </div>

      <div className="grid grid-cols-2 lg:flex justify-center items-center gap-3">
        <button
          className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-[#004721] border-[#E6EBE8] bg-[#F2F7F5]`}
        >
          <Search size={16} /> Search
        </button>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-[#004721] border-[#E6EBE8] bg-[#F2F7F5]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.50832 11.6667H1.66666V13.3334H7.50832V15.8334L10.8333 12.5L7.50832 9.16669V11.6667ZM12.4917 10.8334V8.33335H18.3333V6.66669H12.4917V4.16669L9.16666 7.50002L12.4917 10.8334Z"
                  fill="#004721"
                />
              </svg>{" "}
              Range
            </button>
          </SheetTrigger>
          <RangeSheet />
        </Sheet>

        <Dialog>
          <DialogTrigger asChild className="col-span-2">
            <button
              className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-[#004721] border-[#E6EBE8] bg-[#F2F7F5]`}
            >
              <Plus size={16} /> Add a custom value
            </button>
          </DialogTrigger>
          <AddCustomValue />
        </Dialog>
      </div>

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
    </section>
  );
};

export default ContestDetailsMobileView;
