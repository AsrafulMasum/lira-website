"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContestData {
  minValue: string;
  maxValue: string;
  increment: string;
  unit: string;
  entriesPerPrediction: number;
}

interface PredictionsStepProps {
  data: ContestData;
  onUpdate: (data: Partial<ContestData>) => void;
}

const PredictionsStep: React.FC<PredictionsStepProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: keyof ContestData, value: string | number) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Predictions</h1>
      </div>

      {/* Prediction Range */}
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Min Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Min Value</label>
            <Input
              placeholder="Placeholder"
              value={data.minValue}
              onChange={(e) => handleInputChange('minValue', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Max Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Max Value</label>
            <Input
              placeholder="Placeholder"
              value={data.maxValue}
              onChange={(e) => handleInputChange('maxValue', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Increment */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Increment</label>
            <Input
              placeholder="Placeholder"
              value={data.increment}
              onChange={(e) => handleInputChange('increment', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Increment Unit */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Increment</label>
            <Input
              placeholder="Placeholder"
              value={data.increment}
              onChange={(e) => handleInputChange('increment', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Unit / Shorthand */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Unit / Shorthand</label>
            <Select value={data.unit} onValueChange={(value) => handleInputChange('unit', value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Percentage %">Percentage %</SelectItem>
                <SelectItem value="Dollar $">Dollar $</SelectItem>
                <SelectItem value="Points">Points</SelectItem>
                <SelectItem value="Units">Units</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Predictions Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">0 predictions • Grouped in 0 tabs</span>
          </div>
        </div>

        {/* Number of entries per prediction */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Number of entries per prediction</label>
          <Input
            type="number"
            value={data.entriesPerPrediction}
            onChange={(e) => handleInputChange('entriesPerPrediction', parseInt(e.target.value) || 1)}
            className="w-full"
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionsStep;