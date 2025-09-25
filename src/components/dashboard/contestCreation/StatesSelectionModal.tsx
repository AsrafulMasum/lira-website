"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface StatesSelectionModalProps {
  selectedStates: string[];
  onStatesChange: (states: string[]) => void;
  children: React.ReactNode;
}

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const StatesSelectionModal: React.FC<StatesSelectionModalProps> = ({
  selectedStates,
  onStatesChange,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedStates, setTempSelectedStates] =
    useState<string[]>(selectedStates);

  const handleStateToggle = (state: string) => {
    setTempSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
  };

  const handleDone = () => {
    onStatesChange(tempSelectedStates);
    setIsOpen(false);
  };

  // const handleCancel = () => {
  //   setTempSelectedStates(selectedStates);
  //   setIsOpen(false);
  // };

  const handleSelectAll = () => {
    setTempSelectedStates([...US_STATES]);
  };

  const handleUnselectAll = () => {
    setTempSelectedStates([]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-[600px] sm:w-[540px] p-6 rounded-l-3xl"
      >
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <SheetTitle className="text-lg font-semibold">
            Select states allowed
          </SheetTitle>
        </SheetHeader>

        <div className="flex gap-2 mb-4">
          <Button
            onClick={handleSelectAll}
            variant="outline"
            size="sm"
            className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
          >
            Select All
          </Button>
          <Button
            onClick={handleUnselectAll}
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
          >
            Unselect All
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-4">
            {US_STATES.map((state) => (
              <div
                key={state}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm font-medium text-gray-700">
                  {state}
                </span>
                <Switch
                  checked={tempSelectedStates.includes(state)}
                  onCheckedChange={() => handleStateToggle(state)}
                  className="data-[state=checked]:bg-green-600 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button
            onClick={handleDone}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Done
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StatesSelectionModal;
