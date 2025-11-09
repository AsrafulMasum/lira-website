"use client";

import type React from "react";

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "next/navigation";
import RangeBarChart from "@/components/shared/RangeBarChart";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

function generateChartData(minAmount: number, maxAmount: number) {
  const fixedHeights = [60, 80, 100, 70, 50];
  const numberOfPoints = 5;
  const step = (maxAmount - minAmount) / (numberOfPoints - 1);

  const data = [];

  for (let i = 0; i < numberOfPoints; i++) {
    const amount = Math.round(minAmount + step * i);
    const value = Math.floor(Math.random() * 6) + 1;
    const height = fixedHeights[i];

    data.push({ value, amount, height });
  }

  return data;
}

const RangeSheet = ({
  minValue,
  maxValue,
}: {
  minValue: number;
  maxValue: number;
}) => {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const chartData = generateChartData(minValue, maxValue);

  const [rangeStart, setRangeStart] = useState<number | null>(null);
  const [rangeEnd, setRangeEnd] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const paramStart = searchParams.get("rangeStart");
    const paramEnd = searchParams.get("rangeEnd");

    if (paramStart && paramEnd) {
      setRangeStart(Number(paramStart));
      setRangeEnd(Number(paramEnd));
    } else {
      setRangeStart(minValue);
      setRangeEnd(maxValue);
    }
    setIsLoaded(true);
  }, [minValue, maxValue, searchParams]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
    }
    return `$${value}`;
  };

  const formatInputValue = (value: number | null) => {
    if (value === null || value === undefined) return "";
    return value.toLocaleString();
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/,/g, "");
    const numericValue = Number(cleanValue);

    if (!isNaN(numericValue) && numericValue >= minValue) {
      const clampedValue = Math.min(
        numericValue,
        rangeEnd ? rangeEnd - 1000 : maxValue
      );
      setRangeStart(clampedValue);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/,/g, "");
    const numericValue = Number(cleanValue);

    if (!isNaN(numericValue) && numericValue <= maxValue) {
      const clampedValue = Math.max(
        numericValue,
        rangeStart ? rangeStart + 1000 : minValue
      );
      setRangeEnd(clampedValue);
    }
  };

  const handleClear = () => {
    setRangeStart(minValue);
    setRangeEnd(maxValue);
  };

  const handleSelect = () => {
    updateSearchParams({
      rangeStart: String(rangeStart),
      rangeEnd: String(rangeEnd),
    });
  };

  const takenValues = chartData
    .filter(
      (item) =>
        item.amount >= (rangeStart || 0) &&
        item.amount <= (rangeEnd || maxValue)
    )
    .map((item) => formatCurrency(item.amount));

  if (!isLoaded) {
    return null;
  }

  return (
    <SheetContent
      className="w-full h-[75%] lg:h-full sm:max-w-md px-6 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl pt-10 bg-[#FAFFFC] overflow-y-auto scrollbar-hide"
      side={isMobile ? "bottom" : "right"}
    >
      <SheetHeader className="space-y-0 p-0 pb-16">
        <SheetTitle className="text-xl font-semibold text-[#002913]">
          Choose a range
        </SheetTitle>
      </SheetHeader>

      <div className="space-y-6 h-full flex flex-col justify-between">
        <div>
          <div className="space-y-4">
            <RangeBarChart
              data={chartData}
              rangeStart={rangeStart ?? minValue}
              rangeEnd={rangeEnd ?? maxValue}
              onRangeChange={(start, end) => {
                setRangeStart(start);
                setRangeEnd(end);
              }}
              minValue={minValue}
              maxValue={maxValue}
              formatValue={formatCurrency}
            />
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4 py-8">
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm text-muted-foreground">
                From
              </Label>
              <Input
                id="from"
                type="text"
                value={formatInputValue(rangeStart)}
                onChange={handleFromChange}
                className="bg-muted h-14"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm text-muted-foreground">
                To
              </Label>
              <Input
                id="to"
                type="text"
                value={formatInputValue(rangeEnd)}
                onChange={handleToChange}
                className="bg-muted h-14"
              />
            </div>
          </div>

          {/* Information Text */}
          <div className="text-center text-sm font-medium text-muted-foreground">
            These numbers are taken: {takenValues.join(", ")}
            <br />
            you will receive the rest
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <Button
            onClick={handleClear}
            variant="outline"
            className="bg-bg h-12 px-4 text-base font-bold text-primary rounded-2xl cursor-pointer flex-1"
          >
            Clear
          </Button>
          {/* <Button
            variant="outline"
            className="bg-bg h-12 px-4 text-base font-bold text-primary rounded-2xl cursor-pointer flex-1"
          >
            View list
          </Button> */}
          <Button
            onClick={handleSelect}
            className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer flex-1"
          >
            Select
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};

export default RangeSheet;
