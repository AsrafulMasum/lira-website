import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContestCountdown from "@/helpers/ContestCountdown";
import { Clock, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const contests = [
  {
    _id: "c1a7f2e9-8b91-4a23-9f3c-1f9e12d92b10",
    contestName: "Predict the BTC price on July 1 at 9:00 PM",
    endsIn: "2025-11-01T21:00:00Z",
    totalEntries: 325,
    entryPrice: 10,
    category: "BTC",
    prize: {
      name: "Rolex Submariner Black Dial",
      price: 12000,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
  },
  {
    _id: "4b92d6a3-f1e0-4631-bac7-21af76a4cb54",
    contestName: "Predict the Ethereum price on July 5 at 6:00 PM",
    endsIn: "2025-07-05T18:00:00Z",
    totalEntries: 210,
    entryPrice: 5,
    category: "Ethereum",
    prize: {
      name: "Louis Vuitton Monogram Bag",
      price: 2500,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.gfdsddKcZSL2aoe4VWC-fAHaFj?pid=Api",
    },
  },
  {
    _id: "8a5f37dd-0f93-4c4f-b36e-29c118ebaf11",
    contestName: "Predict the Solana price on July 10 at 8:30 PM",
    endsIn: "2025-07-10T20:30:00Z",
    totalEntries: 155,
    entryPrice: 3,
    category: "Solana",
    prize: {
      name: "Titan Raga Deluxe Women’s Watch",
      price: 120,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.EBJXv29-7rHLHO_phSIyQgHaHa?pid=Api",
    },
  },
  {
    _id: "d90d2238-78a4-4694-b9ec-13e8b64cfa19",
    contestName: "Predict the BTC price on July 15 at 9:00 PM",
    endsIn: "2025-07-15T21:00:00Z",
    totalEntries: 480,
    entryPrice: 15,
    category: "BTC",
    prize: {
      name: "Designer Pink Tote Bag",
      price: 200,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.GBcxailhF-3q3MwxQ-T5HAHaFj?pid=Api",
    },
  },
  {
    _id: "af24cc2c-d41c-41f6-9df7-2cbdfc5e45c7",
    contestName: "Predict the Ethereum price on July 20 at 7:00 PM",
    endsIn: "2025-07-20T19:00:00Z",
    totalEntries: 275,
    entryPrice: 8,
    category: "Ethereum",
    prize: {
      name: "Luxury Quilted White Handbag",
      price: 1800,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.GBcxailhF-3q3MwxQ-T5HAHaFj?pid=Api",
    },
  },
  {
    _id: "f7b2b3ef-414f-46a7-9d2b-91d73cbf4456",
    contestName: "Predict the BTC price on August 1 at 10:00 PM",
    endsIn: "2025-08-01T22:00:00Z",
    totalEntries: 500,
    entryPrice: 20,
    category: "BTC",
    prize: {
      name: "Rolex Submariner Green Bezel",
      price: 16500,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.KLKL-vm0h_7tqg8Cle02RAHaLU?pid=Api",
    },
  },
  // {
  //   _id: "6dbd89a4-2a8d-4d84-84ac-02fb0c15c98e",
  //   contestName: "Predict the Solana price on August 8 at 8:00 PM",
  //   endsIn: "2025-08-08T20:00:00Z",
  //   totalEntries: 140,
  //   entryPrice: 4,
  //   category: "Solana",
  //   prize: {
  //     name: "Apple iPhone 15 Pro",
  //     price: 1199,
  //     image:
  //       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-select-202309?wid=940&hei=1112&fmt=png-alpha&.v=1692829091959",
  //   },
  // },
  // {
  //   _id: "db812fe0-5a4d-44bb-94e7-5ed7a1c453c1",
  //   contestName: "Predict the Ethereum price on August 15 at 6:30 PM",
  //   endsIn: "2025-08-15T18:30:00Z",
  //   totalEntries: 330,
  //   entryPrice: 7,
  //   category: "Ethereum",
  //   prize: {
  //     name: "Sony WH-1000XM5 Headphones",
  //     price: 400,
  //     image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
  //   },
  // },
];

const Contests = ({ type }: { type: string }) => {
  return (
    <section>
      <h4 className="text-2xl font-semibold text-[#4B524E] capitalize mt-10 mb-3 px-1">
        {type}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
        {contests?.map((contest) => (
          <Link key={contest._id} href={`/contests/${contest._id}`}>
            <Card className="w-[390px] lg:w-auto shadow-none">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#002913] leading-[132%]">
                  {contest?.contestName.split("on")[0] + "on"}{" "}
                  <span className="text-primary">
                    {contest?.contestName.split("on")[1]}
                  </span>{" "}
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-sm text-gray">
                  <p className="flex items-center gap-2">
                    <Clock size={16} /> Ends In:{" "}
                    <ContestCountdown endDate={contest.endsIn} isMarketPlace={true} />
                  </p>
                  <p className="flex items-center gap-2 text-gray-text">
                    <Users size={16} />
                    {contest.totalEntries} entries
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <img
                    src={contest.prize.image}
                    alt={contest.prize.name}
                    className="mt-2 size-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-dark-primary font-semibold leading-[124%] my-2">
                      {contest.prize.name}
                    </p>
                    <p className="text-primary text-sm font-semibold">
                      $ {contest.prize.price}{" "}
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
                    <span className="text-sm font-normal">From</span> $
                    {contest.entryPrice}
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
