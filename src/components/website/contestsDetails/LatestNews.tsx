import React from "react";
import img from "@/assets/crpytocoins-news.svg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const LatestNews = () => {
  return (
    <section>
      <h4 className="text-lg text-[#002913] font-semibold">
        Latest News about Bitcoin
      </h4>
      <p className="text-xs text-[#96A39C]">Powered by CoinMarketCap</p>

      <div className="space-y-4 mt-5">
        <div className="flex justify-center items-center gap-3 bg-[#F2F7F5] p-2 pr-3 rounded-2xl border border-[#E6EBE8]">
          <Image src={img} alt="Thumbnail" />
          <div>
            <h6 className="text-[#004721] font-semibold">
              Bitcoin Alert: Significant Chang...
            </h6>
            <p className="text-sm text-[#717A75] ">
              Meteorologists predict unusual weathe...
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 bg-[#F2F7F5] p-2 pr-3 rounded-2xl border border-[#E6EBE8]">
          <Image src={img} alt="Thumbnail" />
          <div>
            <h6 className="text-[#004721] font-semibold">
              Bitcoin Alert: Significant Chang...
            </h6>
            <p className="text-sm text-[#717A75] ">
              Meteorologists predict unusual weathe...
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 bg-[#F2F7F5] p-2 pr-3 rounded-2xl border border-[#E6EBE8]">
          <Image src={img} alt="Thumbnail" />
          <div>
            <h6 className="text-[#004721] font-semibold">
              Bitcoin Alert: Significant Chang...
            </h6>
            <p className="text-sm text-[#717A75] ">
              Meteorologists predict unusual weathe...
            </p>
          </div>
        </div>

        <button
          className={`w-full flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-primary border-[#E6EBE8] bg-[#F2F7F5]`}
        >
          View More <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default LatestNews;
