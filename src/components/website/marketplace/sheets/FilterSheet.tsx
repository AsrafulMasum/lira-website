"use client";

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import RangeBarChart from "@/components/shared/RangeBarChart";

const chartData = [
  { value: 3, amount: 118000, height: 60 },
  { value: 4, amount: 119000, height: 80 },
  { value: 6, amount: 120000, height: 100 },
  { value: 8, amount: 121000, height: 70 },
  { value: 4, amount: 122000, height: 50 },
  { value: 3, amount: 124000, height: 40 },
];

const entriesChartData = [
  { value: 2, amount: 5, height: 40 },
  { value: 5, amount: 10, height: 70 },
  { value: 8, amount: 15, height: 100 },
  { value: 6, amount: 20, height: 80 },
  { value: 4, amount: 25, height: 60 },
  { value: 3, amount: 30, height: 50 },
];

const FilterSheet = () => {
  const [prizeRangeStart, setPrizeRangeStart] = useState(118000);
  const [prizeRangeEnd, setPrizeRangeEnd] = useState(120500);
  const [entriesRangeStart, setEntriesRangeStart] = useState(5);
  const [entriesRangeEnd, setEntriesRangeEnd] = useState(20);

  const [sortBy, setSortBy] = useState("Numbers of entries");
  const [prizeType, setPrizeType] = useState("All");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const prizeMinValue = 118000;
  const prizeMaxValue = 124000;
  const entriesMinValue = 5;
  const entriesMaxValue = 30;

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
    }
    return `$${value}`;
  };

  const formatEntries = (value: number) => {
    return `$${value}`;
  };

  const handlePrizeRangeChange = (start: number, end: number) => {
    setPrizeRangeStart(start);
    setPrizeRangeEnd(end);
  };

  const handleEntriesRangeChange = (start: number, end: number) => {
    setEntriesRangeStart(start);
    setEntriesRangeEnd(end);
  };

  const handleClear = () => {
    setPrizeRangeStart(prizeMinValue);
    setPrizeRangeEnd(prizeMaxValue);
    setEntriesRangeStart(entriesMinValue);
    setEntriesRangeEnd(entriesMaxValue);
    setSortBy("Numbers of entries");
    setPrizeType("All");
  };

  const sortOptions = [
    "Numbers of entries",
    "Prize value",
    "End date",
    "Popularity",
  ];
  const prizeTypes = ["All", "Cash", "Product", "Other"];

  return (
    <SheetContent
      className="w-full h-[75%] lg:h-full sm:max-w-md px-6 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl pt-10 bg-[#FAFFFC] overflow-y-auto scrollbar-hide"
      side={isMobile ? "bottom" : "right"}
    >
      <SheetHeader className="space-y-0 p-0 pb-6">
        <SheetTitle className="text-xl font-semibold text-[#002913]">
          Filter / Sort
        </SheetTitle>
      </SheetHeader>

      <div className="space-y-6 h-full flex flex-col justify-between">
        <div>
          <div className="space-y-4 mb-6">
            <h4 className="text-gray font-semibold">Sort by</h4>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white text-left"
              >
                <span className="text-[#0D7A3A] font-medium">{sortBy}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {showSortDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setShowSortDropdown(false);
                      }}
                      className="w-full text-left p-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h4 className="text-gray font-semibold">Type of prize</h4>
            <div className="grid grid-cols-2 gap-3">
              {prizeTypes.map((type) => {
                const isSelected = prizeType === type;
                const isAvailable = true;

                return (
                  <button
                    key={type}
                    onClick={() => isAvailable && setPrizeType(type)}
                    disabled={!isAvailable}
                    className={cn(
                      "relative h-12 transition-all duration-200 font-medium text-sm flex items-center justify-center cursor-pointer",
                      isSelected && isAvailable
                        ? "bg-primary text-white rounded-2xl px-4 gap-2"
                        : isAvailable
                        ? "bg-white text-primary rounded-2xl border border-gray-200 hover:border-gray-300"
                        : "bg-gray-50 text-gray-400 rounded-2xl border border-gray-200 cursor-not-allowed"
                    )}
                  >
                    {!isSelected && isAvailable && (
                      <div className="absolute left-4 w-5 h-5 border-2 border-gray-300 rounded-full" />
                    )}

                    {!isSelected && !isAvailable && (
                      <div className="absolute left-4 w-5 h-5 bg-border-color rounded-full" />
                    )}

                    {isSelected && isAvailable && (
                      <div className="absolute left-4 w-5 h-5 bg-white rounded-full flex justify-center items-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}

                    <span>{type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <RangeBarChart
            data={chartData}
            rangeStart={prizeRangeStart}
            rangeEnd={prizeRangeEnd}
            onRangeChange={handlePrizeRangeChange}
            minValue={prizeMinValue}
            maxValue={prizeMaxValue}
            formatValue={formatCurrency}
            title="Prize Range"
          />

          <RangeBarChart
            data={entriesChartData}
            rangeStart={entriesRangeStart}
            rangeEnd={entriesRangeEnd}
            onRangeChange={handleEntriesRangeChange}
            minValue={entriesMinValue}
            maxValue={entriesMaxValue}
            formatValue={formatEntries}
            title="Entries Price Range"
            className="mt-6"
          />
        </div>

        <div className="flex gap-3 pb-6">
          <Button
            onClick={handleClear}
            variant="outline"
            className="bg-bg h-12 px-4 text-base font-bold text-primary rounded-2xl cursor-pointer flex-1"
          >
            Clear
          </Button>
          <Button
            variant="outline"
            className="bg-bg h-12 px-4 text-base font-bold text-primary rounded-2xl cursor-pointer flex-1"
          >
            View list
          </Button>
          <Button className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer flex-1">
            Select
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};

export default FilterSheet;
