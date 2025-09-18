"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Divide, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface SelectableItem {
  id: string;
  price: string;
  value: number;
  available: boolean;
}

const priceRanges: PriceRange[] = [
  { id: "range1", label: "118k - 118.5k", min: 118000, max: 118500 },
  { id: "range2", label: "118.5k - 119k", min: 118500, max: 119000 },
  { id: "range3", label: "119k - 199.5k", min: 119000, max: 199500 },
  { id: "range4", label: "751 - 1000", min: 751, max: 1000 },
];

const allItems: SelectableItem[] = [
  { id: "1", price: "118k", value: 118000, available: true },
  { id: "2", price: "118.1k", value: 118100, available: true },
  { id: "3", price: "118.15k", value: 118150, available: false },
  { id: "4", price: "118.2k", value: 118200, available: true },
  { id: "5", price: "118.3k", value: 118300, available: true },
  { id: "6", price: "118.2k", value: 118200, available: true },
  { id: "7", price: "118.25k", value: 118250, available: false },
  { id: "8", price: "118.3k", value: 118300, available: true },
  { id: "9", price: "118.3k", value: 118300, available: true },
  { id: "10", price: "118.4k", value: 118400, available: true },
  { id: "11", price: "118.45k", value: 118450, available: true },
  { id: "12", price: "118.5k", value: 118500, available: false },
  { id: "13", price: "118.55k", value: 118550, available: true },
  { id: "14", price: "118.6k", value: 118600, available: true },
  { id: "15", price: "118.65k", value: 118650, available: false },
  { id: "16", price: "118.7k", value: 118700, available: true },
  { id: "17", price: "118.75k", value: 118750, available: true },
  { id: "18", price: "118.8k", value: 118800, available: true },
  { id: "19", price: "118.85k", value: 118850, available: true },
  { id: "20", price: "118.9k", value: 118900, available: false },
  { id: "21", price: "118.95k", value: 118950, available: true },
];

export function SelectPredictions() {
  const [activeRange, setActiveRange] = useState("range1");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set(["2", "5", "11", "16", "19"])
  );

  const filteredItems = allItems.filter((item) => {
    const range = priceRanges.find((r) => r.id === activeRange);
    if (!range) return false;
    return item.value >= range.min && item.value <= range.max;
  });

  const toggleItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const totalPrice = Array.from(selectedItems).reduce((sum, itemId) => {
    const item = allItems.find((i) => i.id === itemId);
    return sum + (item ? 3 : 0);
  }, 0);

  const takenPercentage = Math.round(
    (selectedItems.size / allItems.length) * 100
  );

  return (
    <Card className="w-full max-w-4xl mx-auto pt-6 pb-0 border border-[#E6EBE8] shadow-none rounded-3xl gap-0">
      {/* Price Range Tabs */}
      <div className="flex gap-1 px-6 border-b">
        {priceRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => setActiveRange(range.id)}
            className={cn(
              "mx-4 py-2 text-base font-semibold border-b-2 transition-colors cursor-pointer",
              activeRange === range.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 bg-[#F2F7F5] px-6 pt-3 pb-5">
        <Badge
          variant="secondary"
          className="bg-[#E6EBE8] h-8 px-3 text-sm text-[#717A75] rounded-xl"
        >
          <span className="text-primary text-base">$3</span> Each
        </Badge>
        <Badge
          variant="secondary"
          className="bg-[#E6EBE8] h-8 px-3 text-sm text-[#717A75] rounded-xl"
        >
          {takenPercentage}% Taken
        </Badge>
        <Badge
          variant="secondary"
          className="bg-[#E6EBE8] h-8 px-3 text-sm text-[#717A75] rounded-xl"
        >
          {filteredItems.length} Entries
        </Badge>
      </div>

      {/* Selection Grid */}
      <div className="grid grid-cols-5 gap-3 px-6 pb-3 bg-[#F2F7F5]">
        {filteredItems.map((item) => {
          const isSelected = selectedItems.has(item.id);
          const isAvailable = item.available;

          return (
            <button
              key={item.id}
              onClick={() => isAvailable && toggleItem(item.id)}
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
                <div className="absolute left-4 w-5 h-5 bg-[#E6EBE8] rounded-full" />
              )}

              {isSelected && isAvailable && (
                <div className="absolute left-4 w-5 h-5 bg-white rounded-full flex justify-center items-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              )}

              <span>{item.price}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-6 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-2xl font-semibold text-[#004721]">
            {selectedItems.size}
          </span>
          <span>Selected</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M9 3.5C5.25 3.5 2.0475 5.8325 0.75 9.125C2.0475 12.4175 5.25 14.75 9 14.75C12.75 14.75 15.9525 12.4175 17.25 9.125C15.9525 5.8325 12.75 3.5 9 3.5ZM9 12.875C6.93 12.875 5.25 11.195 5.25 9.125C5.25 7.055 6.93 5.375 9 5.375C11.07 5.375 12.75 7.055 12.75 9.125C12.75 11.195 11.07 12.875 9 12.875ZM9 6.875C7.755 6.875 6.75 7.88 6.75 9.125C6.75 10.37 7.755 11.375 9 11.375C10.245 11.375 11.25 10.37 11.25 9.125C11.25 7.88 10.245 6.875 9 6.875Z"
              fill="#717A75"
            />
          </svg>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-primary">
            ${totalPrice}
          </span>
          <Button className="bg-[#004721] h-12 px-4 text-base font-bold hover:bg-[#004721]/90 text-primary-foreground rounded-2xl cursor-pointer">
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
}
