import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LatestNews from "@/components/website/contestsDetails/LatestNews";
import { LiveChart } from "@/components/website/contestsDetails/LiveChart";
import RangeSheet from "@/components/website/contestsDetails/RangeSheet";
import { SelectPredictions } from "@/components/website/contestsDetails/SelectPredictions";
import ContestCountdown from "@/helpers/ContestCountdown";
import ContainerLayout from "@/layout/ContainerLayout";
import { CircleQuestionMark, Clock, Plus, Search, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

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

const page = () => {
  return (
    <section className="bg-[#FAFFFC]">
      <ContainerLayout>
        <div className="grid grid-cols-3 gap-28 pt-10">
          {/* left */}
          <div className="col-span-2">
            <div className="sticky top-10">
              <h4 className="text-3xl font-semibold text-[#002913]">
                {contest?.contestName.split("on")[0] + "on"}{" "}
                <span className="text-primary">
                  {contest?.contestName.split("on")[1]}
                </span>{" "}
              </h4>

              <div className="flex items-center gap-4 text-[#717A75] font-semibold mt-4">
                <p className="flex items-center gap-2">
                  <Clock size={16} /> Ends In:{" "}
                  <ContestCountdown
                    endDate={contest.endsIn}
                    isMarketPlace={true}
                  />
                </p>
                <p className="flex items-center gap-2">
                  <Users size={16} />
                  {contest.totalEntries} entries
                </p>
              </div>

              <div className="pt-10">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-semibold text-[#002913]">
                    Select your predictions
                  </h4>
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-primary border-[#E6EBE8] bg-[#F2F7F5]`}
                    >
                      <Search size={16} /> Search
                    </button>

                    <Sheet>
                      <SheetTrigger asChild>
                        <button
                          className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-primary border-[#E6EBE8] bg-[#F2F7F5]`}
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

                    <button
                      className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-primary border-[#E6EBE8] bg-[#F2F7F5]`}
                    >
                      <Plus size={16} /> Value
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <SelectPredictions />
              </div>

              <p className="text-[#96A39C] font-semibold text-sm mt-4 text-center">
                * Price is according to Bloomberg. Each prediction must be
                unique. Closest prediction to the actual value wins
              </p>
            </div>
          </div>

          {/* right */}
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
              <ContestCountdown
                endDate={contest.endsIn}
                isMarketPlace={false}
              />
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

              <p className="text-[#96A39C] text-xs mb-5">
                Data from CoinGecko API
              </p>

              <LiveChart />
            </div>

            <div>
              <LatestNews />
            </div>
          </div>
        </div>
      </ContainerLayout>

      {/* bottom */}
      <div className="mt-16 bg-[#F2F7F5] py-12">
        <ContainerLayout>
          <h4 className="text-2xl font-semibold text-[#004721] text-center">
            Learn how easy Lira is!
          </h4>
          <div className="mt-6 grid grid-cols-2 justify-center items-center gap-6">
            <div className="bg-[#FAFFFC] rounded-2xl border border-[#E6EBE8] p-6 space-y-3 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 29.3333C14.1556 29.3333 12.4222 28.9831 10.8 28.2826C9.1778 27.5822 7.76669 26.6324 6.56669 25.4333C5.36669 24.2342 4.41691 22.8231 3.71736 21.2C3.0178 19.5768 2.66758 17.8435 2.66669 16C2.6658 14.1564 3.01602 12.4231 3.71736 10.8C4.41869 9.17685 5.36847 7.76574 6.56669 6.56663C7.76491 5.36751 9.17602 4.41774 10.8 3.71729C12.424 3.01685 14.1574 2.66663 16 2.66663C17.8427 2.66663 19.576 3.01685 21.2 3.71729C22.824 4.41774 24.2351 5.36751 25.4334 6.56663C26.6316 7.76574 27.5818 9.17685 28.284 10.8C28.9862 12.4231 29.336 14.1564 29.3334 16C29.3307 17.8435 28.9805 19.5768 28.2827 21.2C27.5849 22.8231 26.6351 24.2342 25.4334 25.4333C24.2316 26.6324 22.8205 27.5826 21.2 28.284C19.5796 28.9853 17.8462 29.3351 16 29.3333ZM16 26.6666C18.9778 26.6666 21.5 25.6333 23.5667 23.5666C25.6334 21.5 26.6667 18.9777 26.6667 16C26.6667 13.0222 25.6334 10.5 23.5667 8.43329C21.5 6.36663 18.9778 5.33329 16 5.33329C13.0222 5.33329 10.5 6.36663 8.43336 8.43329C6.36669 10.5 5.33336 13.0222 5.33336 16C5.33336 18.9777 6.36669 21.5 8.43336 23.5666C10.5 25.6333 13.0222 26.6666 16 26.6666ZM16 24C13.7778 24 11.8889 23.2222 10.3334 21.6666C8.7778 20.1111 8.00002 18.2222 8.00002 16C8.00002 13.7777 8.7778 11.8888 10.3334 10.3333C11.8889 8.77774 13.7778 7.99996 16 7.99996C18.2222 7.99996 20.1111 8.77774 21.6667 10.3333C23.2222 11.8888 24 13.7777 24 16C24 18.2222 23.2222 20.1111 21.6667 21.6666C20.1111 23.2222 18.2222 24 16 24ZM16 21.3333C17.4667 21.3333 18.7222 20.8111 19.7667 19.7666C20.8111 18.7222 21.3334 17.4666 21.3334 16C21.3334 14.5333 20.8111 13.2777 19.7667 12.2333C18.7222 11.1888 17.4667 10.6666 16 10.6666C14.5334 10.6666 13.2778 11.1888 12.2334 12.2333C11.1889 13.2777 10.6667 14.5333 10.6667 16C10.6667 17.4666 11.1889 18.7222 12.2334 19.7666C13.2778 20.8111 14.5334 21.3333 16 21.3333ZM16 18.6666C15.2667 18.6666 14.6391 18.4057 14.1174 17.884C13.5956 17.3622 13.3342 16.7342 13.3334 16C13.3325 15.2657 13.5938 14.6382 14.1174 14.1173C14.6409 13.5964 15.2685 13.3351 16 13.3333C16.7316 13.3315 17.3596 13.5928 17.884 14.1173C18.4085 14.6417 18.6694 15.2693 18.6667 16C18.664 16.7306 18.4031 17.3586 17.884 17.884C17.3649 18.4093 16.7369 18.6702 16 18.6666Z"
                  fill="#00E069"
                />
              </svg>
              <h4 className="text-[#004721] text-lg font-semibold">
                Make a prediction
              </h4>
              <h6 className="text-[#4B524E] font-semibold">
                Choose a single value or a range. You can also input a custom
                number.
              </h6>
              <p className="text-[#717A75] text-sm">
                Some values may be taken by other users. If you enter a range,
                we will show what is available and what is already taken.
              </p>
            </div>

            <div className="bg-[#FAFFFC] rounded-2xl border border-[#E6EBE8] p-6 space-y-3 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 2.66663C8.64 2.66663 2.66667 8.63996 2.66667 16C2.66667 23.36 8.64 29.3333 16 29.3333C23.36 29.3333 29.3333 23.36 29.3333 16C29.3333 8.63996 23.36 2.66663 16 2.66663ZM16 26.6666C10.12 26.6666 5.33334 21.88 5.33334 16C5.33334 10.12 10.12 5.33329 16 5.33329C21.88 5.33329 26.6667 10.12 26.6667 16C26.6667 21.88 21.88 26.6666 16 26.6666ZM16.4133 14.8533C14.0533 14.2533 13.2933 13.6 13.2933 12.6266C13.2933 11.5066 14.3467 10.72 16.0933 10.72C17.9333 10.72 18.6267 11.6 18.68 12.9066H20.96C20.8933 11.12 19.8 9.47996 17.64 8.94663V6.66663H14.5333V8.91996C12.52 9.34663 10.9067 10.6533 10.9067 12.6666C10.9067 15.0533 12.8933 16.2533 15.7867 16.9466C18.3867 17.56 18.9067 18.48 18.9067 19.44C18.9067 20.1466 18.3867 21.2933 16.1067 21.2933C13.9733 21.2933 13.1333 20.3333 13.0133 19.1066H10.72C10.8533 21.3733 12.5333 22.6533 14.5333 23.0666V25.3333H17.6533V23.1066C19.68 22.72 21.28 21.56 21.2933 19.4133C21.28 16.48 18.76 15.4666 16.4133 14.8533Z"
                  fill="#00E069"
                />
              </svg>
              <h4 className="text-[#004721] text-lg font-semibold">
                Win the Prize
              </h4>
              <h6 className="text-[#4B524E] font-semibold">
                If your prediction is correct and your position wins, you
                receive the prize.
              </h6>
              <p className="text-[#717A75] text-sm">
                In case of optional multi-entry (non-unique) setups, payouts are
                split accordingly.
              </p>
            </div>
          </div>
        </ContainerLayout>
      </div>
    </section>
  );
};

export default page;
