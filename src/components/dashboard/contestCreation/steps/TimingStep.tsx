"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContestData {
  predictionEventDate: string;
  predictionEventTime: string;
  endOffset: string;
}

interface TimingStepProps {
  data: ContestData;
  onUpdate: (data: Partial<ContestData>) => void;
}

const TimingStep: React.FC<TimingStepProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: keyof ContestData, value: string) => {
    onUpdate({ [field]: value });
  };

  const endOffsetOptions = [
    { value: "1hour", label: "1 hour" },
    { value: "2hours", label: "2 hours" },
    { value: "3hours", label: "3 hours" },
    { value: "6hours", label: "6 hours" },
    { value: "12hours", label: "12 hours" },
    { value: "1day", label: "1 day" },
    { value: "2days", label: "2 days" },
    { value: "3days", label: "3 days" },
    { value: "1week", label: "1 week" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Timing</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Prediction Event Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Prediction Event Date
          </label>
          <Input
            type="date"
            value={data.predictionEventDate || ""}
            onChange={(e) =>
              handleInputChange("predictionEventDate", e.target.value)
            }
            className="w-full mt-2 bg-bg rounded-xl [&::-webkit-calendar-picker-indicator]:ml-14"
          />
        </div>

        {/* Prediction Event Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Prediction Event Time
          </label>
          <Input
            type="time"
            value={data.predictionEventTime || ""}
            onChange={(e) =>
              handleInputChange("predictionEventTime", e.target.value)
            }
            className="w-full mt-2 bg-bg rounded-xl [&::-webkit-calendar-picker-indicator]:ml-24"
          />
        </div>

        {/* End Offset */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            End Offset
          </label>
          <Select
            value={data.endOffset || ""}
            onValueChange={(value) => handleInputChange("endOffset", value)}
          >
            <SelectTrigger className="w-full mt-2 py-6 bg-bg rounded-xl">
              <SelectValue placeholder="Select offset" />
            </SelectTrigger>
            <SelectContent>
              {endOffsetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TimingStep;
