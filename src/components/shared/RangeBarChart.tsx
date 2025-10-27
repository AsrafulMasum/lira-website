"use client";

import type React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, Cell } from "recharts";

interface ChartDataItem {
  value: number;
  amount: number;
  height: number;
}

interface RangeBarChartProps {
  data: ChartDataItem[];
  rangeStart: number;
  rangeEnd: number;
  onRangeChange: (start: number, end: number) => void;
  minValue: number;
  maxValue: number;
  formatValue: (value: number) => string;
  title?: string;
  className?: string;
}

const RangeBarChart: React.FC<RangeBarChartProps> = ({
  data,
  rangeStart,
  rangeEnd,
  onRangeChange,
  minValue,
  maxValue,
  formatValue,
  title,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const isInRange = useCallback(
    (amount: number) => {
      return amount >= rangeStart && amount <= rangeEnd;
    },
    [rangeStart, rangeEnd]
  );

  const getPositionFromValue = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * 100;
  };

  // const getValueFromPosition = (position: number) => {
  //   return Math.round(minValue + (position / 100) * (maxValue - minValue));
  // };

  const getValueFromPosition = useCallback(
    (position: number) => {
      return Math.round(minValue + (position / 100) * (maxValue - minValue));
    },
    [minValue, maxValue]
  );

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
        const newStart = Math.max(
          minValue,
          Math.min(value, rangeEnd - (maxValue > 1000 ? 1000 : 1))
        );
        onRangeChange(newStart, rangeEnd);
      } else {
        const newEnd = Math.min(
          maxValue,
          Math.max(value, rangeStart + (maxValue > 1000 ? 1000 : 1))
        );
        onRangeChange(rangeStart, newEnd);
      }
    },
    [
      isDragging,
      rangeStart,
      rangeEnd,
      minValue,
      maxValue,
      onRangeChange,
      getValueFromPosition,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  const handleTouchStart =
    (handle: "start" | "end") => (e: React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(handle);
    };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const position = Math.max(
        0,
        Math.min(100, ((e.touches[0].clientX - rect.left) / rect.width) * 100)
      );
      const value = getValueFromPosition(position);

      if (isDragging === "start") {
        const newStart = Math.max(
          minValue,
          Math.min(value, rangeEnd - (maxValue > 1000 ? 1000 : 1))
        );
        onRangeChange(newStart, rangeEnd);
      } else {
        const newEnd = Math.min(
          maxValue,
          Math.max(value, rangeStart + (maxValue > 1000 ? 1000 : 1))
        );
        onRangeChange(rangeStart, newEnd);
      }
    },
    [
      isDragging,
      rangeStart,
      rangeEnd,
      minValue,
      maxValue,
      onRangeChange,
      getValueFromPosition,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  const startPosition = getPositionFromValue(rangeStart);
  const endPosition = getPositionFromValue(rangeEnd);

  return (
    <div className={`space-y-4 ${className}`}>
      <h4 className="text-gray font-semibold">{title}</h4>

      {/* Bar Chart */}
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis hide />
            <Bar dataKey="height" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
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
          onTouchStart={handleTouchStart("start")}
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
          onTouchStart={handleTouchStart("end")}
        />
      </div>

      {/* Range Value labels */}
      <div className="flex justify-between text-sm">
        <span className="text-primary font-semibold">
          {formatValue(rangeStart)}
        </span>
        <span className="text-primary font-semibold text-lg">
          {formatValue(rangeEnd)}
        </span>
        <span className="text-muted-foreground font-semibold">
          {formatValue(maxValue)}
        </span>
      </div>
    </div>
  );
};

export default RangeBarChart;
