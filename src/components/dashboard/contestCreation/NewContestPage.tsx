"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import DetailsStep from "./steps/DetailsStep";
import TimingStep from "./steps/TimingStep";
import ContestTimeline from "./ContestTimeline";
import PredictionsStep from "./steps/PredictionsStep";
import PricingStep from "./steps/PricingStep";
import { useCreateContestMutation } from "@/redux/apiSlices/contestSlice";
import { toast } from "sonner";

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
  prizePool: number;
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
  endOffsetTime?: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [createContest, { isLoading }] = useCreateContestMutation();
  const [contestData, setContestData] = useState<ContestData>({
    category: "",
    name: "",
    description: "",
    statesAllowed: [],
    prizeTitle: "",
    prizeType: "Cash",
    prizePool: 0,
    minValue: "",
    maxValue: "",
    increment: "",
    unit: "Percentage %",
    entriesPerPrediction: 1,
    placePercentages: [100],
    pricingModel: "flat",
    flatPrice: "",
    tiers: [
      {
        id: "tier-1",
        minValue: "",
        maxValue: "",
        fromPercent: "",
        toPercent: "",
        pricePerPrediction: "",
      },
    ],
    predictionEventDate: "",
    predictionEventTime: "",
    endOffset: "",
    endOffsetTime: "",
  });
  
  // Force client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

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
      return contestData.tiers.some((tier) => tier.pricePerPrediction !== "");
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

  // Transform contest data to API format
  const transformContestData = () => {
    // Create place percentages object from array
    const placePercentages = {};
    contestData.placePercentages.forEach((percentage, index) => {
      (placePercentages as Record<number, number>)[index + 1] = percentage;
    });

    // Determine pricing type
    let predictionType = "";
    if (contestData.pricingModel === "flat") {
      predictionType = "priceOnly";
    } else if (contestData.pricingModel === "tiered") {
      predictionType = "tier";
    } else if (contestData.pricingModel === "tiered-percent") {
      predictionType = "percentage";
    }

    // Format tiers data
    const tiers = contestData.tiers.map((tier, index) => ({
      name: `Tier ${index + 1}`,
      min: Number(tier.minValue) || 0,
      max: Number(tier.maxValue) || 0,
      pricePerPrediction: Number(tier.pricePerPrediction) || 0,
      isActive: true,
    }));

    // Combine event date and time in UTC format
    const eventDateTime = `${contestData.predictionEventDate}T${contestData.predictionEventTime}:00.000Z`;

    // Use the calculated endOffsetTime from TimingStep
    const endOffsetTime = contestData.endOffsetTime || eventDateTime;

    // Get category name from the category ID
    // In a real implementation, you would fetch this from your categories data
    // For now, we'll use a placeholder that will be replaced by the backend
    return {
      name: contestData.name.trim(),
      category: "Category Name", // The API requires a category name
      categoryId: contestData.category, // The category field already contains the categoryId from the DetailsStep
      description: contestData.description.trim(),
      state: contestData.statesAllowed,
      prize: {
        title: contestData.prizeTitle,
        type: contestData.prizeType,
        prizePool: Number(contestData.prizePool) || 0,
      },
      predictions: {
        minPrediction: Number(contestData.minValue) || 0,
        maxPrediction: Number(contestData.maxValue) || 0,
        increment: Number(contestData.increment) || 0,
        unit: contestData.unit, // Extract just the unit name without any ID
        numberOfEntriesPerPrediction: contestData.entriesPerPrediction,
        placePercentages,
        generatedPredictions: [],
      },
      pricing: {
        predictionType,
        flatPrice: Number(contestData.flatPrice) || 0,
        tiers,
      },
      startTime: new Date().toISOString(), // Current time as start time
      endTime: eventDateTime,
      endOffsetTime,
    };
  };

  const handleNext = async () => {
    if (isCurrentStepValid()) {
      // Log current contest data to console
      console.log("New Contest Data:", {
        currentStep,
        contestData,
        completedSteps: [...completedSteps, currentStep],
        isLastStep,
      });

      if (isLastStep) {
        try {
          setIsSubmitting(true);

          // Create FormData object
          const formData = new FormData();

          // Add image if available
          if (contestData.prizeImage) {
            formData.append("image", contestData.prizeImage);
          }

          // Transform and add JSON data
          const apiData = transformContestData();
          formData.append("data", JSON.stringify(apiData));

          // Submit the contest data
          const res = await createContest(formData).unwrap();

          if (res.success) {
            toast.success(res.message || "Contest created successfully!");
            router.push("/dashboard");
          } else {
            toast.error(
              res.message || "Failed to create contest. Please try again."
            );
          }
        } catch (error) {
          console.error("Error creating contest:", error);
          toast.error("Failed to create contest. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
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

  // If not client-side yet, show minimal loading state
  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            disabled={!isCurrentStepValid() || isSubmitting || isLoading}
            className={`text-white ${
              isCurrentStepValid() && !isSubmitting && !isLoading
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting || (isLastStep && isLoading) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLastStep ? "Creating..." : "Processing..."}
              </>
            ) : isLastStep ? (
              "Finish"
            ) : (
              "Next"
            )}
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
