"use client";

import type React from "react";

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useCallback, useRef, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, Cell } from "recharts";
import { useMediaQuery } from "react-responsive";

// Sample data for the chart
const chartData = [
  { value: 3, amount: 118000, height: 60 },
  { value: 4, amount: 119000, height: 80 },
  { value: 6, amount: 120000, height: 100 },
  { value: 8, amount: 121000, height: 70 },
  { value: 4, amount: 122000, height: 50 },
  { value: 3, amount: 124000, height: 40 },
];

const RangeSheet = () => {
  const [rangeStart, setRangeStart] = useState(118000);
  const [rangeEnd, setRangeEnd] = useState(120500);
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const minValue = 118000;
  const maxValue = 124000;

  // const isDesktop = useMediaQuery({ minWidth: 1024 });
  // const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Calculate which bars are in the selected range
  const isInRange = useCallback(
    (amount: number) => {
      return amount >= rangeStart && amount <= rangeEnd;
    },
    [rangeStart, rangeEnd]
  );

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
    }
    return `$${value}`;
  };

  const formatInputValue = (value: number) => {
    return value.toLocaleString();
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/,/g, "");
    const numericValue = Number(cleanValue);

    if (!isNaN(numericValue) && numericValue >= minValue) {
      const clampedValue = Math.min(numericValue, rangeEnd - 1000);
      setRangeStart(clampedValue);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/,/g, "");
    const numericValue = Number(cleanValue);

    if (!isNaN(numericValue) && numericValue <= maxValue) {
      const clampedValue = Math.max(numericValue, rangeStart + 1000);
      setRangeEnd(clampedValue);
    }
  };

  const getPositionFromValue = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * 100;
  };

  const getValueFromPosition = (position: number) => {
    return Math.round(minValue + (position / 100) * (maxValue - minValue));
  };

  const handleMouseDown =
    (handle: "start" | "end") => (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(handle);
    };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const position = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const value = getValueFromPosition(position);

      if (isDragging === "start") {
        setRangeStart(Math.max(minValue, Math.min(value, rangeEnd - 1000)));
      } else {
        setRangeEnd(Math.min(maxValue, Math.max(value, rangeStart + 1000)));
      }
    },
    [isDragging, rangeStart, rangeEnd, minValue, maxValue]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClear = () => {
    setRangeStart(minValue);
    setRangeEnd(maxValue);
  };

  const takenValues = chartData
    .filter((item) => isInRange(item.amount))
    .map((item) => formatCurrency(item.amount));

  const startPosition = getPositionFromValue(rangeStart);
  const endPosition = getPositionFromValue(rangeEnd);

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
          {/* Chart Section */}
          <div className="space-y-4">
            {/* Value labels above chart */}
            <div className="flex justify-around text-sm">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className={`text-center font-semibold ${
                    isInRange(item.amount)
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  ${item.value}
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis hide />
                  <Bar dataKey="height" radius={[2, 2, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={isInRange(entry.amount) ? "#0047217A" : "#e5e7eb"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Range Selector */}
            <div className="relative h-6 px-2 -mt-6" ref={sliderRef}>
              {/* Base line */}
              <div className="absolute top-2 left-2 right-2 h-0.5 bg-gray-300">
                {/* Selected range line */}
                <div
                  className="absolute h-0.5 bg-primary"
                  style={{
                    left: `${startPosition}%`,
                    width: `${endPosition - startPosition}%`,
                  }}
                />
              </div>

              {/* Start handle */}
              <div
                className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                style={{
                  left: `calc(${startPosition}% + 8px)`,
                  top: "2px",
                  transform: "translateX(-50%)",
                }}
                onMouseDown={handleMouseDown("start")}
              />

              {/* End handle */}
              <div
                className="absolute w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                style={{
                  left: `calc(${endPosition}% + 8px)`,
                  top: "-2px",
                  transform: "translateX(-50%)",
                }}
                onMouseDown={handleMouseDown("end")}
              />
            </div>

            {/* Value labels below chart */}
            <div className="flex justify-between text-sm">
              <span className="text-primary font-semibold">
                {formatCurrency(rangeStart)}
              </span>
              <span className="text-primary font-semibold text-lg">
                {formatCurrency(rangeEnd)}
              </span>
              <span className="text-muted-foreground font-semibold">
                {formatCurrency(maxValue)}
              </span>
            </div>
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

export default RangeSheet;
