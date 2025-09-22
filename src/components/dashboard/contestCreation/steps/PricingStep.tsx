"use client";

import React from "react";

interface ContestData {
  // Add pricing-specific fields as needed
  pricing: {
    price: string;
    currency: string;
  };
}

interface PricingStepProps {
  data: ContestData;
  onUpdate: (data: Partial<ContestData>) => void;
}

const PricingStep: React.FC<PricingStepProps> = ({ data, onUpdate }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Pricing</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Pricing configuration will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;
