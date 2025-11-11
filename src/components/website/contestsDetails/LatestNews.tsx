import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const LatestNews = ({ liveNews }: any) => {
  const slicedNews = liveNews?.slice(0, 3) || [];
  console.log(slicedNews[0]?.title, "liveNews");
  // interface NewsItem {
  //   url?: string;
  //   banner_image?: string;
  //   title?: string;
  //   summary?: string;
  //   [key: string]: any;
  // }

  // type LiveNews = NewsItem[] | undefined;

  // const typedLiveNews = liveNews as LiveNews;

  // const filteredNews: NewsItem[] =
  //   typedLiveNews?.filter((news) =>
  //     (news?.title?.toLowerCase()?.includes("bitcoin") ||
  //       news?.title?.toLowerCase()?.includes("btc"))
  //   ) || [];

  // console.log(filteredNews);
  return (
    <section>
      <h4 className="text-lg text-[#002913] font-semibold">
        Latest News about Bitcoin
      </h4>
      <p className="text-xs text-gray-text">Powered by CoinMarketCap</p>

      <div className="space-y-4 mt-5">
        {slicedNews?.map((news: any, index: number) => (
          <Link
            href={news?.url}
            key={index}
            className="flex justify-center items-center gap-3 bg-bg p-2 pr-3 rounded-2xl border border-border-color"
          >
            <Image
              src={news?.banner_image}
              width={100}
              height={100}
              alt="Thumbnail"
              className="w-12 h-12 object-cover rounded-md"
            />
            <div>
              <h6 className="text-dark-primary font-semibold">{news?.title?.slice(0, 28)} ...</h6>
              <p className="text-sm text-gray ">
                {news?.summary?.slice(0, 25)}...
              </p>
            </div>
          </Link>
        ))}
        {/* <div className="flex justify-center items-center gap-3 bg-bg p-2 pr-3 rounded-2xl border border-border-color">
          <Image src={img} alt="Thumbnail" />
          <div>
            <h6 className="text-dark-primary font-semibold">
              Bitcoin Alert: Significant Chang...
            </h6>
            <p className="text-sm text-gray ">
              Meteorologists predict unusual weathe...
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 bg-bg p-2 pr-3 rounded-2xl border border-border-color">
          <Image src={img} alt="Thumbnail" />
          <div>
            <h6 className="text-dark-primary font-semibold">
              Bitcoin Alert: Significant Chang...
            </h6>
            <p className="text-sm text-gray ">
              Meteorologists predict unusual weathe...
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 bg-bg p-2 pr-3 rounded-2xl border border-border-color">
          <Image src={img} alt="Thumbnail" />
          <div>
            <h6 className="text-dark-primary font-semibold">
              Bitcoin Alert: Significant Chang...
            </h6>
            <p className="text-sm text-gray ">
              Meteorologists predict unusual weathe...
            </p>
          </div>
        </div> */}

        <button
          className={`w-full flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-primary border-border-color bg-bg`}
        >
          View More <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default LatestNews;
