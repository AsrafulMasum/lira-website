"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PricingModel = "flat" | "tiered" | "tiered-percent";

interface Tier {
  id: string;
  minValue?: string;
  maxValue?: string;
  fromPercent?: string;
  toPercent?: string;
  pricePerPrediction: string;
}

interface ContestData {
  pricingModel: PricingModel;
  flatPrice: string;
  tiers: Tier[];
}

interface PricingStepProps {
  data: ContestData;
  onUpdate: (data: Partial<ContestData>) => void;
}

const PricingStep: React.FC<PricingStepProps> = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<PricingModel>(
    data.pricingModel || "flat"
  );

  const handleTabChange = (tab: PricingModel) => {
    setActiveTab(tab);
    onUpdate({ pricingModel: tab });
  };

  const handleFlatPriceChange = (value: string) => {
    onUpdate({ flatPrice: value });
  };

  const handleTierChange = (
    tierId: string,
    field: keyof Tier,
    value: string
  ) => {
    const updatedTiers = (data.tiers || []).map((tier) =>
      tier.id === tierId ? { ...tier, [field]: value } : tier
    );
    onUpdate({ tiers: updatedTiers });
  };

  const addTier = () => {
    const newTier: Tier = {
      id: `tier-${Date.now()}`,
      minValue: "",
      maxValue: "",
      fromPercent: "",
      toPercent: "",
      pricePerPrediction: "",
    };
    const updatedTiers = [...(data.tiers || []), newTier];
    onUpdate({ tiers: updatedTiers });
  };

  const removeTier = (tierId: string) => {
    const updatedTiers = (data.tiers || []).filter(
      (tier) => tier.id !== tierId
    );
    onUpdate({ tiers: updatedTiers });
  };

  const renderFlatTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Per Prediction ($)
        </label>
        <Input
          placeholder="Placeholder"
          value={data.flatPrice || ""}
          onChange={(e) => handleFlatPriceChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderTieredTab = () => (
    <div className="space-y-6">
      {/* Bitcoin Price Display */}
      <div className="text-center space-y-2">
        <div className="text-2xl font-bold text-primary">$118,845.4</div>
        <div className="text-xl text-gray-900">Live Bitcoin Price</div>
        <div className="text-sm text-primary font-medium">
          24H Change: +1.3%
        </div>
      </div>

      {/* Tiers */}
      <div className="space-y-4">
        {(data.tiers || []).map((tier, index) => (
          <div key={tier.id} className="border rounded-lg p-4 bg-bg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Tier {index + 1}</h3>
              {(data.tiers || []).length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTier(tier.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Value
                </label>
                <Input
                  type="number"
                  placeholder="Placeholder"
                  value={tier.minValue || ""}
                  onChange={(e) =>
                    handleTierChange(tier.id, "minValue", e.target.value)
                  }
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Value
                </label>
                <Input
                  type="number"
                  placeholder="Placeholder"
                  value={tier.maxValue || ""}
                  onChange={(e) =>
                    handleTierChange(tier.id, "maxValue", e.target.value)
                  }
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Prediction ($)
                </label>
                <Input
                  type="number"
                  placeholder="Placeholder"
                  value={tier.pricePerPrediction || ""}
                  onChange={(e) =>
                    handleTierChange(
                      tier.id,
                      "pricePerPrediction",
                      e.target.value
                    )
                  }
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addTier}
          className="w-full bg-bg hover:bg-gray-200 text-primary font-bold"
        >
          Add another tier
        </Button>
      </div>
    </div>
  );

  const renderTieredPercentTab = () => (
    <div className="space-y-6">
      {/* Bitcoin Price Display */}
      <div className="text-center space-y-2">
        <div className="text-2xl font-bold text-primary">$118,845.4</div>
        <div className="text-xl text-gray-900">Live Bitcoin Price</div>
        <div className="text-sm text-primary font-medium">
          24H Change: +1.3%
        </div>
      </div>

      {/* Tiers */}
      <div className="space-y-4">
        {(data.tiers || []).map((tier, index) => (
          <div key={tier.id} className="border bg-bg rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Tier {index + 1}</h3>
              {(data.tiers || []).length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTier(tier.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From % (below current)
                </label>
                <Input
                  type="number"
                  placeholder="Placeholder"
                  value={tier.fromPercent || ""}
                  onChange={(e) =>
                    handleTierChange(tier.id, "fromPercent", e.target.value)
                  }
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To % (above current)
                </label>
                <Input
                  type="number"
                  placeholder="Placeholder"
                  value={tier.toPercent || ""}
                  onChange={(e) =>
                    handleTierChange(tier.id, "toPercent", e.target.value)
                  }
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Prediction ($)
                </label>
                <Input
                  type="number"
                  placeholder="Placeholder"
                  value={tier.pricePerPrediction || ""}
                  onChange={(e) =>
                    handleTierChange(
                      tier.id,
                      "pricePerPrediction",
                      e.target.value
                    )
                  }
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addTier}
          className="w-full bg-bg hover:bg-gray-200 text-primary font-bold"
        >
          Add another tier
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "flat":
        return renderFlatTab();
      case "tiered":
        return renderTieredTab();
      case "tiered-percent":
        return renderTieredPercentTab();
      default:
        return renderFlatTab();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Pricing</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose pricing model
            </label>

            {/* Tab Navigation */}
            <div className="flex bg-bg rounded-xl p-1 mb-6">
              <button
                onClick={() => handleTabChange("flat")}
                className={`flex-1 py-2 px-4 rounded-xl text-sm transition-colors ${
                  activeTab === "flat"
                    ? "bg-white text-primary font-bold shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Flat
              </button>
              <button
                onClick={() => handleTabChange("tiered")}
                className={`flex-1 py-2 px-4 rounded-xl text-sm transition-colors ${
                  activeTab === "tiered"
                    ? "bg-white text-primary font-bold shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tiered
              </button>
              <button
                onClick={() => handleTabChange("tiered-percent")}
                className={`flex-1 py-2 px-4 rounded-xl text-sm transition-colors ${
                  activeTab === "tiered-percent"
                    ? "bg-white text-primary font-bold shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tiered %
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PricingStep;
