"use client";

import React, { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ContestData {
  predictionEventDate: string;
  predictionEventTime: string;
  endOffset: string;
  endOffsetTime?: string;
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
    { value: "1hour", label: "1 hour", hours: 1 },
    { value: "2hours", label: "2 hours", hours: 2 },
    { value: "3hours", label: "3 hours", hours: 3 },
    { value: "4hours", label: "4 hours", hours: 4 },
    { value: "5hours", label: "5 hours", hours: 5 },
    { value: "6hours", label: "6 hours", hours: 6 },
    { value: "7hours", label: "7 hours", hours: 7 },
    { value: "8hours", label: "8 hours", hours: 8 },
    { value: "9hours", label: "9 hours", hours: 9 },
    { value: "10hours", label: "10 hours", hours: 10 },
    { value: "11hours", label: "11 hours", hours: 11 },
    { value: "12hours", label: "12 hours", hours: 12 },
    { value: "13hours", label: "13 hours", hours: 13 },
    { value: "14hours", label: "14 hours", hours: 14 },
    { value: "15hours", label: "15 hours", hours: 15 },
    { value: "16hours", label: "16 hours", hours: 16 },
    { value: "17hours", label: "17 hours", hours: 17 },
    { value: "18hours", label: "18 hours", hours: 18 },
    { value: "19hours", label: "19 hours", hours: 19 },
    { value: "20hours", label: "20 hours", hours: 20 },
    { value: "21hours", label: "21 hours", hours: 21 },
    { value: "22hours", label: "22 hours", hours: 22 },
    { value: "23hours", label: "23 hours", hours: 23 },
    { value: "24hours", label: "24 hours", hours: 24 },
  ];

  // Calculate endOffsetTime based on predictionEventDate, predictionEventTime, and endOffset
  const endOffsetTime = useMemo(() => {
    if (
      !data.predictionEventDate ||
      !data.predictionEventTime ||
      !data.endOffset
    ) {
      return "";
    }

    try {
      // Create a Date object from the prediction event date and time in UTC
      const eventDateTime = new Date(
        `${data.predictionEventDate}T${data.predictionEventTime}:00.000Z`
      );

      // Find the selected offset option
      const selectedOffset = endOffsetOptions.find(
        (option) => option.value === data.endOffset
      );

      if (!selectedOffset) {
        return "";
      }

      // Subtract the offset hours from the event date/time
      const endDateTime = new Date(
        eventDateTime.getTime() - selectedOffset.hours * 60 * 60 * 1000
      );

      // Return as ISO string for backend compatibility
      return endDateTime.toISOString();
    } catch (error) {
      console.error("Error calculating endOffsetTime:", error);
      return "";
    }
  }, [data.predictionEventDate, data.predictionEventTime, data.endOffset]);

  // Calculate display time for UI (separate from backend value)
  const displayEndOffsetTime = useMemo(() => {
    if (!endOffsetTime) return "";

    try {
      const date = new Date(endOffsetTime);
      const endDate = date.toISOString().split("T")[0];
      const endTime = date.toTimeString().slice(0, 5);
      return `${endDate} ${endTime}`;
    } catch (error) {
      toast.error("Error formatting endOffsetTime");
      return "";
    }
  }, [endOffsetTime]);

  // Update the parent component with the calculated endOffsetTime
  useEffect(() => {
    if (endOffsetTime !== data.endOffsetTime) {
      onUpdate({ endOffsetTime });
    }
  }, [endOffsetTime, data.endOffsetTime, onUpdate]);

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

      {/* Display calculated End Offset Time */}
      {displayEndOffsetTime && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Calculated End Offset Time:
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {displayEndOffsetTime}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Contest will end at this time (before the prediction event)
          </div>
        </div>
      )}
    </div>
  );
};

export default TimingStep;
