"use client";

import React, { useEffect, useState } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/helpers/apiRequest";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type Prediction = {
  value: string;
};

type SearchSheetProps = {
  contestId: string;
  tiers: {
    tiers: { _id: string }[];
  };
};

const SearchSheet = ({ contestId, tiers }: SearchSheetProps) => {
  const searchParams = useSearchParams();
  const activeRange = searchParams.get("range") || tiers?.tiers[0]._id;
  const [apiResult, setApiResult] = useState<Prediction[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [items, setItems] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredPredictions, setFilteredPredictions] = useState<string[]>([]);

  // ✅ Fetch data dynamically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest(
          `/contest/contest/prediction/${contestId}/tiers/${activeRange}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        setApiResult(response.data || []);
      } catch (error) {
        console.error("Failed to fetch prediction data:", error);
      }
    };

    if (contestId && activeRange) {
      fetchData();
    }
  }, [contestId, activeRange]);

  // ✅ Dynamic filtering based on backend data
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredPredictions([]);
    } else if (apiResult?.length > 0) {
      // convert apiResult values to readable strings for display
      const predictionValues = apiResult.map((item) => item.value.toString());

      const filtered = predictionValues.filter(
        (value) =>
          value.toLowerCase().includes(searchValue.toLowerCase()) &&
          !items.includes(value)
      );
      setFilteredPredictions(filtered.slice(0, 5));
    }
  }, [searchValue, items, apiResult]);

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleRemoveAll = () => {
    setItems([]);
  };

  const addPrediction = (prediction: string) => {
    if (!items.includes(prediction)) {
      setItems([...items, prediction]);
      setSearchValue("");
      setFilteredPredictions([]);
    }
  };

  const handlePayment = () => {
    toast.info("Payment will be available soon.");
  };

  return (
    <SheetContent
      className="w-full h-[75%] lg:h-full sm:max-w-md px-6 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl pt-10 bg-[#FAFFFC] flex flex-col overflow-y-auto scrollbar-hide"
      side={isMobile ? "bottom" : "right"}
    >
      <SheetHeader className="space-y-0 p-0 pb-6">
        <SheetTitle className="text-2xl font-semibold text-[#002913]">
          Your list
        </SheetTitle>
      </SheetHeader>

      {/* 🔍 Search Input */}
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search values..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-border-color focus:border-dark-primary focus:ring-1 focus:ring-[#002913]"
        />

        {filteredPredictions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-10 bg-white border border-border-color rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
            {filteredPredictions.map((prediction, index) => (
              <button
                key={index}
                onClick={() => addPrediction(prediction)}
                className="w-full text-left px-4 py-3 hover:bg-bg border-b border-border-color last:border-b-0 transition-colors"
              >
                <span className="text-dark-primary font-medium">
                  {prediction}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 🧾 Selected Items */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-6 scrollbar-hide">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3"
          >
            <span className="text-dark-primary font-medium">{item}</span>
            <button onClick={() => removeItem(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM16.3 16.3C16.2075 16.3927 16.0976 16.4663 15.9766 16.5164C15.8557 16.5666 15.726 16.5924 15.595 16.5924C15.464 16.5924 15.3343 16.5666 15.2134 16.5164C15.0924 16.4663 14.9825 16.3927 14.89 16.3L12 13.41L9.11 16.3C8.92302 16.487 8.66943 16.592 8.405 16.592C8.14057 16.592 7.88698 16.487 7.7 16.3C7.51302 16.113 7.40798 15.8594 7.40798 15.595C7.40798 15.4641 7.43377 15.3344 7.48387 15.2135C7.53398 15.0925 7.60742 14.9826 7.7 14.89L10.59 12L7.7 9.11C7.51302 8.92302 7.40798 8.66943 7.40798 8.405C7.40798 8.14057 7.51302 7.88698 7.7 7.7C7.88698 7.51302 8.14057 7.40798 8.405 7.40798C8.66943 7.40798 8.92302 7.51302 9.11 7.7L12 10.59L14.89 7.7C14.9826 7.60742 15.0925 7.53398 15.2135 7.48387C15.3344 7.43377 15.4641 7.40798 15.595 7.40798C15.7259 7.40798 15.8556 7.43377 15.9765 7.48387C16.0975 7.53398 16.2074 7.60742 16.3 7.7C16.3926 7.79258 16.466 7.90249 16.5161 8.02346C16.5662 8.14442 16.592 8.27407 16.592 8.405C16.592 8.53593 16.5662 8.66558 16.5161 8.78654C16.466 8.90751 16.3926 9.01742 16.3 9.11L13.41 12L16.3 14.89C16.68 15.27 16.68 15.91 16.3 16.3Z"
                  fill="#004721"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* ⚙️ Bottom Summary */}
      <div
        className="bg-white p-2 rounded-2xl mb-6"
        style={{
          boxShadow: "0 0 48px 0 rgba(45, 51, 48, 0.20)",
        }}
      >
        <div className="flex items-center justify-between pl-4">
          <div className="flex items-center gap-2">
            <span className="text-dark-primary text-lg font-semibold">
              {items.length}
            </span>
            <button className="cursor-pointer" onClick={handleRemoveAll}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM12.225 12.225C12.1556 12.2945 12.0732 12.3497 11.9825 12.3873C11.8917 12.425 11.7945 12.4443 11.6962 12.4443C11.598 12.4443 11.5008 12.425 11.41 12.3873C11.3193 12.3497 11.2369 12.2945 11.1675 12.225L9 10.0575L6.8325 12.225C6.69227 12.3652 6.50207 12.444 6.30375 12.444C6.10543 12.444 5.91523 12.3652 5.775 12.225C5.63477 12.0848 5.55598 11.8946 5.55598 11.6962C5.55598 11.5981 5.57533 11.5008 5.6129 11.4101C5.65048 11.3194 5.70556 11.2369 5.775 11.1675L7.9425 9L5.775 6.8325C5.63477 6.69227 5.55598 6.50207 5.55598 6.30375C5.55598 6.10543 5.63477 5.91523 5.775 5.775C5.91523 5.63477 6.10543 5.55598 6.30375 5.55598C6.50207 5.55598 6.69227 5.63477 6.8325 5.775L9 7.9425L11.1675 5.775C11.2369 5.70556 11.3194 5.65048 11.4101 5.6129C11.5008 5.57533 11.5981 5.55598 11.6962 5.55598C11.7944 5.55598 11.8917 5.57533 11.9824 5.6129C12.0731 5.65048 12.1556 5.70556 12.225 5.775C12.2944 5.84444 12.3495 5.92687 12.3871 6.01759C12.4247 6.10832 12.444 6.20555 12.444 6.30375C12.444 6.40195 12.4247 6.49918 12.3871 6.58991C12.3495 6.68063 12.2944 6.76306 12.225 6.8325L10.0575 9L12.225 11.1675C12.51 11.4525 12.51 11.9325 12.225 12.225Z"
                  fill="#717A75"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-primary font-semibold text-lg">
              {items.length * 3}
            </div>
            <Button
              onClick={handlePayment}
              className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer"
              disabled={!items.length}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  );
};

export default SearchSheet;
