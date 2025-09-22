"use client";

import React from "react";

interface ContestData {
  // Add timing-specific fields as needed
  timing: {
    startTime: string;
    endTime: string;
  };
}

interface TimingStepProps {
  data: ContestData;
  onUpdate: (data: Partial<ContestData>) => void;
}

const TimingStep: React.FC<TimingStepProps> = ({ data, onUpdate }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Timing</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Timing configuration will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimingStep;
