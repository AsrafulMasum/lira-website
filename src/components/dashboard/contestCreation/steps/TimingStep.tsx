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
    { value: "6hours", label: "6 hours", hours: 6 },
    { value: "12hours", label: "12 hours", hours: 12 },
    { value: "1day", label: "1 day", hours: 24 },
    { value: "2days", label: "2 days", hours: 48 },
    { value: "3days", label: "3 days", hours: 72 },
    { value: "1week", label: "1 week", hours: 168 },
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
