import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import RangeSheet from "@/components/website/contestsDetails/RangeSheet";
import { SelectPredictions } from "@/components/website/contestsDetails/SelectPredictions";
import ContestCountdown from "@/helpers/ContestCountdown";
import ContainerLayout from "@/layout/ContainerLayout";
import { Clock, Plus, Search, Users } from "lucide-react";
import React from "react";
import AddCustomValue from "@/components/website/contestsDetails/AddCustomValue";
import LearnToUse from "@/components/website/contestsDetails/LearnToUse";
import ContestDetailsRightSection from "@/components/website/contestsDetails/ContestDetailsRightSection";

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

                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-primary border-[#E6EBE8] bg-[#F2F7F5]`}
                        >
                          <Plus size={16} /> Value
                        </button>
                      </DialogTrigger>
                      <AddCustomValue />
                    </Dialog>
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
          <ContestDetailsRightSection contest={contest} />
        </div>
      </ContainerLayout>

      {/* bottom */}
      <div className="mt-16 bg-[#F2F7F5] py-12">
        <ContainerLayout>
          <h4 className="text-2xl font-semibold text-[#004721] text-center">
            Learn how easy Lira is!
          </h4>
          <LearnToUse />
        </ContainerLayout>
      </div>
    </section>
  );
};

export default page;
