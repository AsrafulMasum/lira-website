import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContestCountdown from "@/hooks/ContestCountdown";
import { Clock, Users } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type contest = {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  totalEntries: number;
  endOffsetTime: string;
  image: string;
  isPrivate: boolean;
  prize: {
    title: string;
    prizePool: string;
    image: string;
  };
  pricing: {
    predictionType: string;
    flatPrice: string;
    tiers: { pricePerPrediction: string }[];
  };
  predictions: {
    minPrediction: number;
  };
  category: string;
};

const Contests = ({ data, category }: { data: any; category: string }) => {

  return (
    <section>
      <h4 className="text-2xl font-semibold text-[#4B524E] capitalize mt-10 mb-3 px-1">
        {category}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
        {data?.result?.map((contest: contest) => (
          <Link key={contest._id} href={`/contests/${contest._id}`}>
            <Card className="max-w-[390px] lg:w-auto shadow-none">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#002913] leading-[132%]">
                  {contest?.name} on{" "}
                  <span className="text-primary">
                    {moment(contest?.endTime).format("MMMM D [at] h:mm A")}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-sm text-gray">
                  <p className="flex items-center gap-2">
                    <Clock size={16} /> Ends In:{" "}
                    <ContestCountdown
                      endDate={contest?.endOffsetTime}
                      isMarketPlace={true}
                    />
                  </p>
                  <p className="flex items-center gap-2 text-gray-text">
                    <Users size={16} />
                    {contest?.totalEntries} entries
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Image
                    width={48}
                    height={48}
                    src={`${process.env.IMAGE_BASE_URL}${contest?.image}`}
                    alt={contest?.prize?.title}
                    className="mt-2 size-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-dark-primary font-semibold leading-[124%] my-2">
                      {contest?.prize?.title}
                    </p>
                    <p className="text-primary text-sm font-semibold">
                      $ {contest?.prize?.prizePool}{" "}
                      <span className="text-gray-text font-normal pl-1.5">
                        Prize pool
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="bg-bg py-2 px-3 rounded-lg text-sm text-gray">
                  {contest.category}
                </p>
                <CardAction>
                  <p className="bg-primary py-2 px-3 rounded-lg font-semibold text-white">
                    <span className="text-sm font-normal">From</span> $ {" "}
                    {contest?.pricing?.predictionType === "priceOnly"
                      ? `${contest?.pricing?.flatPrice}`
                      : `${contest?.pricing?.tiers[0]?.pricePerPrediction}`}
                  </p>
                </CardAction>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Contests;
