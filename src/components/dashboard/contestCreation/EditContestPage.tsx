"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import DetailsStep from "./steps/DetailsStep";
import TimingStep from "./steps/TimingStep";
import ContestTimeline from "./ContestTimeline";
import PredictionsStep from "./steps/PredictionsStep";
import PricingStep from "./steps/PricingStep";
import {
  useGetContestByIdQuery,
  useUpdateContestMutation,
} from "@/redux/apiSlices/contestSlice";
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
  rule: string;
}

const steps: { id: Step; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "predictions", label: "Predictions" },
  { id: "pricing", label: "Pricing" },
  { id: "timing", label: "Timing" },
];

// Helper to normalize placePercentages object to array [p1, p2, ...]
const normalizePlacePercentages = (obj: Record<string, number> | undefined) => {
  if (!obj || typeof obj !== "object") return [100];
  const entries = Object.entries(obj)
    .map(([key, value]) => ({ key: Number(key), value }))
    .filter((e) => !Number.isNaN(e.key))
    .sort((a, b) => a.key - b.key)
    .map((e) => e.value);
  return entries.length ? entries : [100];
};

const mapPredictionTypeToModel = (
  predictionType: string | undefined
): PricingModel => {
  switch (predictionType) {
    case "tier":
      return "tiered";
    case "percentage":
      return "tiered-percent";
    case "priceOnly":
    default:
      return "flat";
  }
};

const EditContestPage = () => {
  const router = useRouter();
  const params = useParams();
  const contestId = useMemo(() => {
    const raw = params?.id;
    if (!raw) return "";
    if (Array.isArray(raw)) return raw[0] ?? "";
    return String(raw);
  }, [params]);

  const {
    data: contestResponse,
    isLoading,
    isError,
  } = useGetContestByIdQuery(contestId, {
    skip: !contestId,
  });
  const [updateContest, { isLoading: isUpdating }] = useUpdateContestMutation();

  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const [isClient, setIsClient] = useState(false);

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
    rule: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prefill mapping from backend response
  useEffect(() => {
    const res =
      contestResponse?.data || contestResponse?.result || contestResponse;
    if (!res) return;

    try {
      // Details
      const prize = res?.prize || {};
      const details = {
        category: String(res?.categoryId || ""),
        name: String(res?.name || ""),
        description: String(res?.description || ""),
        statesAllowed: Array.isArray(res?.state) ? res.state : [],
        prizeTitle: String(prize?.title || ""),
        prizeType: String(prize?.type || "Cash"),
        prizePool: Number(prize?.prizePool) || 0,
      };

      // Predictions
      const predictions = res?.predictions || {};
      const predictionData = {
        minValue: String(predictions?.minPrediction ?? ""),
        maxValue: String(predictions?.maxPrediction ?? ""),
        increment: String(predictions?.increment ?? ""),
        unit: String(predictions?.unit ?? "Percentage %"),
        entriesPerPrediction: Number(
          predictions?.numberOfEntriesPerPrediction ?? 1
        ),
        placePercentages: normalizePlacePercentages(
          predictions?.placePercentages as Record<string, number> | undefined
        ),
      };

      // Pricing
      const pricing = res?.pricing || {};
      const pricingModel = mapPredictionTypeToModel(pricing?.predictionType);
      const tiers: Tier[] = Array.isArray(pricing?.tiers)
        ? pricing.tiers.map((t: any, idx: number) => {
            const id = `tier-${idx + 1}`;
            const pricePerPrediction = String(t?.pricePerPrediction ?? "");
            if (pricingModel === "tiered") {
              return {
                id,
                minValue: String(t?.min ?? ""),
                maxValue: String(t?.max ?? ""),
                pricePerPrediction,
              };
            }
            if (pricingModel === "tiered-percent") {
              return {
                id,
                fromPercent: String(t?.min ?? ""),
                toPercent: String(t?.max ?? ""),
                pricePerPrediction,
              };
            }
            return {
              id,
              pricePerPrediction,
            };
          })
        : [
            {
              id: "tier-1",
              minValue: "",
              maxValue: "",
              fromPercent: "",
              toPercent: "",
              pricePerPrediction: "",
            },
          ];

      const pricingData = {
        pricingModel,
        flatPrice: String(pricing?.flatPrice ?? ""),
        tiers,
      };

      // Timing
      const endTimeISO = res?.endTime ? new Date(res.endTime) : null;
      const endOffsetISO = res?.endOffsetTime
        ? new Date(res.endOffsetTime)
        : null;
      const predictionEventDate = endTimeISO
        ? endTimeISO.toISOString().split("T")[0]
        : "";
      const predictionEventTime = endTimeISO
        ? endTimeISO.toTimeString().slice(0, 5)
        : "";

      let endOffset = "";
      if (endTimeISO && endOffsetISO) {
        const diffMs = endTimeISO.getTime() - endOffsetISO.getTime();
        const hours = Math.round(diffMs / (60 * 60 * 1000));
        if (hours >= 1 && hours <= 24) {
          endOffset = `${hours}hours`;
        } else {
          endOffset = "1hour";
        }
      }

      const timingData = {
        predictionEventDate,
        predictionEventTime,
        endOffset,
        endOffsetTime: res?.endOffsetTime || "",
      };

      setContestData((prev) => ({
        ...prev,
        ...details,
        ...predictionData,
        ...pricingData,
        ...timingData,
      }));
    } catch (e) {
      // If mapping fails, keep defaults
      console.error("Failed to prefill contest data", e);
    }
  }, [contestResponse]);

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

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

  // Transform contestData to API format for update
  const transformContestData = () => {
    // Convert placePercentages array to object {1: p1, 2: p2, ...}
    const placePercentages: Record<number, number> = {};
    contestData.placePercentages.forEach((percentage, idx) => {
      placePercentages[idx + 1] = percentage;
    });

    // Determine predictionType from pricingModel
    let predictionType = "";
    if (contestData.pricingModel === "flat") predictionType = "priceOnly";
    else if (contestData.pricingModel === "tiered") predictionType = "tier";
    else if (contestData.pricingModel === "tiered-percent")
      predictionType = "percentage";

    // Map tiers for API
    const tiers = contestData.tiers.map((tier, index) => {
      const isPercentage = contestData.pricingModel === "tiered-percent";
      const min = isPercentage
        ? Number(tier.fromPercent) || 0
        : Number(tier.minValue) || 0;
      const max = isPercentage
        ? Number(tier.toPercent) || 0
        : Number(tier.maxValue) || 0;
      return {
        name: `Tier ${index + 1}`,
        min,
        max,
        pricePerPrediction: Number(tier.pricePerPrediction) || 0,
        isActive: true,
      };
    });

    // Combine event date and time to ISO UTC string
    const eventDateTime = `${contestData.predictionEventDate}T${contestData.predictionEventTime}:00.000Z`;
    const endOffsetTime = contestData.endOffsetTime || eventDateTime;

    return {
      name: contestData.name.trim(),
      category: "Category Name", // Backend fills actual category name
      categoryId: contestData.category,
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
        unit: contestData.unit,
        numberOfEntriesPerPrediction: contestData.entriesPerPrediction,
        placePercentages,
        generatedPredictions: [],
      },
      pricing: {
        predictionType,
        flatPrice: Number(contestData.flatPrice) || 0,
        tiers,
      },
      endTime: eventDateTime,
      endOffsetTime,
    };
  };

  const handleNext = async () => {
    if (!isCurrentStepValid()) return;

    if (isLastStep) {
      try {
        // Build FormData with image and JSON data
        const formData = new FormData();
        if (contestData.prizeImage) {
          formData.append("image", contestData.prizeImage);
        }
        const apiData = transformContestData();
        formData.append("data", JSON.stringify(apiData));

        const res = await updateContest({
          contestId,
          formData,
        }).unwrap();

        if (res?.success) {
          toast.success(res?.message || "Contest updated successfully!");
        } else {
          toast.success("Contest updated successfully!");
        }
        router.push("/dashboard");
      } catch (error) {
        console.error("Error updating contest:", error);
        toast.error("Failed to update contest. Please try again.");
      }
      return;
    }

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    const nextStep = steps[currentStepIndex + 1];
    setCurrentStep(nextStep.id);
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
            Exit
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
            disabled={!isCurrentStepValid() || isUpdating}
            className={`text-white ${
              isCurrentStepValid() && !isUpdating
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLastStep ? (isUpdating ? "Updating..." : "Finish") : "Next"}
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
            if (completedSteps.includes(stepId) || stepId === currentStep) {
              setCurrentStep(stepId);
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 bg-white rounded-3xl mt-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-red-600">
            Failed to load contest. You can still edit fields.
          </div>
        ) : (
          renderCurrentStep()
        )}
      </div>
    </div>
  );
};

export default EditContestPage;
