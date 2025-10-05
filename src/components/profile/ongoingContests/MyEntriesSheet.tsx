"use client";

import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";

const listItems = [
  "118k",
  "118.1k",
  "118.2k",
  "118.3k",
  "118.35k",
  "118.4k",
  "118.5k",
  "118.6k",
];

const MyEntriesSheet = ({ items }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <SheetContent
      className="w-full h-[75%] lg:h-full sm:max-w-md px-6 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl pt-10 bg-[#FAFFFC] flex flex-col overflow-y-auto scrollbar-hide"
      side={isMobile ? "bottom" : "right"}
    >
      <SheetHeader className="space-y-0 p-0 pb-6">
        <SheetTitle className="text-2xl font-semibold text-[#002913]">
          My Entries
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto space-y-3 pb-6 scrollbar-hide">
        {items.map((item: any) => (
          <div
            key={item?._id}
            className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3"
          >
            <span className="text-dark-primary font-medium">
              {item?.predictionValue}
            </span>
          </div>
        ))}
      </div>
    </SheetContent>
  );
};

export default MyEntriesSheet;
