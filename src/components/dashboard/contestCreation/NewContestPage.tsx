"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import DetailsStep from "./steps/DetailsStep";
import TimingStep from "./steps/TimingStep";
import ContestTimeline from "./ContestTimeline";
import PredictionsStep from "./steps/PredictionsStep";
import PricingStep from "./steps/PricingStep";

type Step = "details" | "predictions" | "pricing" | "timing";

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
  // Details step
  category: string;
  name: string;
  description: string;
  statesAllowed: string[];
  prizeTitle: string;
  prizeType: string;
  prizeImage?: File;

  // Predictions step
  minValue: string;
  maxValue: string;
  increment: string;
  unit: string;
  entriesPerPrediction: number;
  placePercentages: number[];

  // Pricing step
  pricingModel: PricingModel;
  flatPrice: string;
  tiers: Tier[];

  // Timing step
  predictionEventDate: string;
  predictionEventTime: string;
  endOffset: string;
}

const steps: { id: Step; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "predictions", label: "Predictions" },
  { id: "pricing", label: "Pricing" },
  { id: "timing", label: "Timing" },
];

const NewContestPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const [contestData, setContestData] = useState<ContestData>({
    category: "",
    name: "",
    description: "",
    statesAllowed: [],
    prizeTitle: "",
    prizeType: "Cash",
    minValue: "",
    maxValue: "",
    increment: "",
    unit: "Percentage %",
    entriesPerPrediction: 1,
    placePercentages: [100],
    pricingModel: "flat",
    flatPrice: "",
    tiers: [{
      id: "tier-1",
      minValue: "",
      maxValue: "",
      fromPercent: "",
      toPercent: "",
      pricePerPrediction: ""
    }],
    predictionEventDate: "",
    predictionEventTime: "",
    endOffset: "",
  });

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Form validation functions
  const validateDetailsStep = () => {
    return (
      contestData.category &&
      contestData.name &&
      contestData.description &&
      contestData.statesAllowed.length > 0 &&
      contestData.prizeTitle
    );
  };

  const validatePredictionsStep = () => {
    return (
      contestData.minValue && contestData.maxValue && contestData.increment
    );
  };

  const validatePricingStep = () => {
    if (contestData.pricingModel === "flat") {
      return contestData.flatPrice !== "";
    } else {
      return contestData.tiers.some(tier => tier.pricePerPrediction !== "");
    }
  };

  const validateTimingStep = () => {
    return (
      contestData.predictionEventDate &&
      contestData.predictionEventTime &&
      contestData.endOffset
    );
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case "details":
        return validateDetailsStep();
      case "predictions":
        return validatePredictionsStep();
      case "pricing":
        return validatePricingStep();
      case "timing":
        return validateTimingStep();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isCurrentStepValid()) {
      // Log current contest data to console
      console.log('New Contest Data:', {
        currentStep,
        contestData,
        completedSteps: [...completedSteps, currentStep],
        isLastStep
      });

      if (isLastStep) {
        // Final step - contest creation complete
        console.log('Contest Creation Complete!', contestData);
        // Here you would typically submit the contest data
        return;
      }

      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }

      const nextStep = steps[currentStepIndex + 1];
      setCurrentStep(nextStep.id);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      const prevStep = steps[currentStepIndex - 1];
      setCurrentStep(prevStep.id);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  const handleSaveAndExit = () => {
    // Save draft logic here
    router.push("/dashboard");
  };

  const updateContestData = (data: Partial<ContestData>) => {
    setContestData((prev) => ({ ...prev, ...data }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "details":
        return <DetailsStep data={contestData} onUpdate={updateContestData} />;
      case "predictions":
        return (
          <PredictionsStep data={contestData} onUpdate={updateContestData} />
        );
   case "pricing":
        return <PricingStep data={contestData} onUpdate={updateContestData} />;
      case "timing":
        return <TimingStep data={contestData} onUpdate={updateContestData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleSaveAndExit}
            className="text-gray-600 border-gray-300"
          >
            Save & Exit
          </Button>

          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="text-gray-600 border-gray-300"
            >
              Back
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className={`text-white ${
              isCurrentStepValid()
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-4 border-b">
        <ContestTimeline
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={(stepId) => {
            // Only allow clicking on completed steps or current step
            if (completedSteps.includes(stepId) || stepId === currentStep) {
              setCurrentStep(stepId);
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 bg-white rounded-3xl mt-10">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default NewContestPage;
