"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import RangeBarChart from "@/components/shared/RangeBarChart";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

const chartData = [
  { value: 1, amount: 50, height: 40 },
  { value: 2, amount: 500, height: 60 },
  { value: 3, amount: 1200, height: 100 },
  { value: 4, amount: 3000, height: 80 },
  { value: 5, amount: 4800, height: 50 },
];

const entriesChartData = [
  { value: 2, amount: 5, height: 40 },
  { value: 5, amount: 10, height: 70 },
  { value: 8, amount: 15, height: 100 },
  { value: 6, amount: 20, height: 80 },
  { value: 4, amount: 25, height: 60 },
  { value: 3, amount: 30, height: 50 },
];

const FilterSheet = ({ range }: any) => {
  const updateSearchParams = useUpdateSearchParams();

  // 🧭 Extract dynamic range from server (with safe fallbacks)
  const prizeMinValue = range?.minPrize ?? 0;
  const prizeMaxValue = range?.maxPrize ?? 10000;
  const entriesMinValue = range?.minPrediction ?? 0;
  const entriesMaxValue = range?.maxPrediction ?? 100;

  // 🧠 States
  const [prizeRangeStart, setPrizeRangeStart] = useState<number>(prizeMinValue);
  const [prizeRangeEnd, setPrizeRangeEnd] = useState<number>(prizeMaxValue);
  const [entriesRangeStart, setEntriesRangeStart] =
    useState<number>(entriesMinValue);
  const [entriesRangeEnd, setEntriesRangeEnd] =
    useState<number>(entriesMaxValue);
  const [sortBy, setSortBy] = useState<string>("Latest");
  const [prizeType, setPrizeType] = useState<string>("All");
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 🧩 When range updates (from API), sync the filters
  useEffect(() => {
    if (range) {
      setPrizeRangeStart(range.minPrize);
      setPrizeRangeEnd(range.maxPrize);
      setEntriesRangeStart(range.minPrediction);
      setEntriesRangeEnd(range.maxPrediction);
    }
  }, [range]);

  // 💰 Formatters
  const formatCurrency = (value: number): string => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
    }
    return `$${value}`;
  };

  const formatEntries = (value: number): string => `$${value}`;

  // 🧮 Handlers
  const handlePrizeRangeChange = (start: number, end: number) => {
    setPrizeRangeStart(start);
    setPrizeRangeEnd(end);
  };

  const handleEntriesRangeChange = (start: number, end: number) => {
    setEntriesRangeStart(start);
    setEntriesRangeEnd(end);
  };

  // 🧹 Clear filters
  const handleClear = () => {
    setPrizeRangeStart(prizeMinValue);
    setPrizeRangeEnd(prizeMaxValue);
    setEntriesRangeStart(entriesMinValue);
    setEntriesRangeEnd(entriesMaxValue);
    setSortBy("Latest");
    setPrizeType("All");

    updateSearchParams({
      sortBy: null,
      prizeType: null,
      prizeMin: null,
      prizeMax: null,
      entriesMin: null,
      entriesMax: null,
    });
  };

  // ✅ Apply filters
  const handleApplyFilters = () => {
    updateSearchParams({
      sortBy,
      prizeType,
      prizeMin: String(prizeRangeStart),
      prizeMax: String(prizeRangeEnd),
      entriesMin: String(entriesRangeStart),
      entriesMax: String(entriesRangeEnd),
    });
  };

  const sortOptions: string[] = [
    "Latest",
    "Numbers of entries",
    "Prize value",
    "Popularity",
  ];

  const prizeTypes: string[] = ["All", "Cash", "Product", "Other"];

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
          {/* Sort by */}
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

          {/* Prize type */}
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

          {/* Range sliders */}
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

        {/* Action buttons */}
        <div className="flex gap-3 pb-6">
          <Button
            onClick={handleClear}
            variant="outline"
            className="bg-bg h-12 px-4 text-base font-bold text-primary rounded-2xl flex-1 cursor-pointer"
          >
            Clear
          </Button>

          <Button
            onClick={handleApplyFilters}
            className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl flex-1 cursor-pointer"
          >
            View list
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};

export default FilterSheet;
