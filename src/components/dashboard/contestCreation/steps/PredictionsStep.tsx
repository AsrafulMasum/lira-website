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
import { useGetAllUnitOrTypeQuery } from "@/redux/apiSlices/categoryUnitTypeSlice";
import Loading from "@/app/loading";

interface ContestData {
  minValue: string;
  maxValue: string;
  increment: string;
  unit: string;
  entriesPerPrediction: number;
  placePercentages: number[];
}

interface PredictionsStepProps {
  data: ContestData;
  onUpdate: (data: Partial<ContestData>) => void;
}

const PredictionsStep: React.FC<PredictionsStepProps> = ({
  data,
  onUpdate,
}) => {
  const handleInputChange = (
    field: keyof ContestData,
    value: string | number
  ) => {
    onUpdate({ [field]: value });
  };

  const { data: getAllUnit, isLoading: isLoadingUnits } =
    useGetAllUnitOrTypeQuery("unit");

  if (isLoadingUnits) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const unitOptions = getAllUnit?.data?.map((unit: any) => ({
    value: unit.content,
    label: unit.content,
  }));

  const handleEntriesPerPredictionChange = (value: number) => {
    const equalPercentage = Math.floor(100 / value);
    const remainder = 100 - equalPercentage * value;
    const percentages = Array(value).fill(equalPercentage);

    // Add remainder to the first place
    if (remainder > 0) {
      percentages[0] += remainder;
    }

    onUpdate({
      entriesPerPrediction: value,
      placePercentages: percentages,
    });
  };

  const handlePercentageChange = (index: number, value: number) => {
    const newPercentages = [...(data.placePercentages || [])];
    newPercentages[index] = value;
    onUpdate({ placePercentages: newPercentages });
  };

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Predictions
        </h1>
      </div>

      {/* Prediction Range */}
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Min Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Min Value
            </label>
            <Input
              type="number"
              placeholder="Placeholder"
              value={data.minValue}
              onChange={(e) => handleInputChange("minValue", e.target.value)}
              className="w-full mt-2"
            />
          </div>

          {/* Max Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Max Value
            </label>
            <Input
              type="number"
              placeholder="Placeholder"
              value={data.maxValue}
              onChange={(e) => handleInputChange("maxValue", e.target.value)}
              className="w-full mt-2"
            />
          </div>

          {/* Increment */}
          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Increment
            </label>
            <Input
              type="number"
              placeholder="Placeholder"
              value={data.increment}
              onChange={(e) => handleInputChange("increment", e.target.value)}
              className="w-full mt-2"
            />
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Increment Unit */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Increment
            </label>
            <Input
              placeholder="Placeholder"
              value={data.increment}
              onChange={(e) => handleInputChange("increment", e.target.value)}
              className="w-full mt-2"
            />
          </div>

          {/* Unit / Shorthand */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Unit / Shorthand
            </label>
            <Select
              value={data.unit}
              onValueChange={(value) => handleInputChange("unit", value)}
            >
              <SelectTrigger className="w-full mt-2 py-[22px] bg-bg font-bold text-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {unitOptions?.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Predictions Summary */}
        <div className="bg-bg rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              0 predictions • Grouped in 0 tabs
            </span>
          </div>
        </div>

        {/* Number of entries per prediction */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Number of entries per prediction
          </label>
          <Select
            value={data.entriesPerPrediction?.toString() || "4"}
            onValueChange={(value) =>
              handleEntriesPerPredictionChange(parseInt(value))
            }
          >
            <SelectTrigger className="w-full mt-2 py-[22px] bg-bg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Place Percentages */}
        {data.entriesPerPrediction > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: data.entriesPerPrediction }, (_, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {index + 1}
                    {getOrdinalSuffix(index + 1)} place
                  </label>
                  <Select
                    value={`${data.placePercentages?.[index] || 25}%`}
                    onValueChange={(value) =>
                      handlePercentageChange(
                        index,
                        parseInt(value.replace("%", ""))
                      )
                    }
                  >
                    <SelectTrigger className="w-full py-[22px] bg-bg font-bold text-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5%">5%</SelectItem>
                      <SelectItem value="10%">10%</SelectItem>
                      <SelectItem value="15%">15%</SelectItem>
                      <SelectItem value="20%">20%</SelectItem>
                      <SelectItem value="25%">25%</SelectItem>
                      <SelectItem value="30%">30%</SelectItem>
                      <SelectItem value="35%">35%</SelectItem>
                      <SelectItem value="40%">40%</SelectItem>
                      <SelectItem value="45%">45%</SelectItem>
                      <SelectItem value="50%">50%</SelectItem>
                      <SelectItem value="55%">55%</SelectItem>
                      <SelectItem value="60%">60%</SelectItem>
                      <SelectItem value="65%">65%</SelectItem>
                      <SelectItem value="70%">70%</SelectItem>
                      <SelectItem value="75%">75%</SelectItem>
                      <SelectItem value="80%">80%</SelectItem>
                      <SelectItem value="85%">85%</SelectItem>
                      <SelectItem value="90%">90%</SelectItem>
                      <SelectItem value="95%">95%</SelectItem>
                      <SelectItem value="100%">100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionsStep;
