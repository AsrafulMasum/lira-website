"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Step = "details" | "predictions" | "pricing" | "timing";

interface TimelineStep {
  id: Step;
  label: string;
}

interface ContestTimelineProps {
  steps: TimelineStep[];
  currentStep: Step;
  completedSteps: Step[];
  onStepClick: (step: Step) => void;
}

const ContestTimeline: React.FC<ContestTimelineProps> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const getStepStatus = (stepId: Step) => {
    if (completedSteps.includes(stepId)) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  return (
    <div className="flex items-center justify-center space-x-8 max-w-4xl mx-auto">
      {steps.map((step, index) => {
        const stepStatus = getStepStatus(step.id);
        const isClickable = stepStatus === 'completed' || stepStatus === 'current';

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                  {
                    "bg-green-600 text-white": stepStatus === 'completed',
                    "bg-green-600 text-white ring-4 ring-green-200": stepStatus === 'current',
                    "bg-gray-200 text-gray-500": stepStatus === 'upcoming',
                    "cursor-pointer hover:bg-green-700": isClickable && stepStatus !== 'current',
                    "cursor-not-allowed": !isClickable,
                  }
                )}
              >
                {stepStatus === 'completed' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </button>

              {/* Step Label */}
              <span
                className={cn(
                  "mt-2 text-sm font-medium",
                  {
                    "text-green-600": stepStatus === 'completed' || stepStatus === 'current',
                    "text-gray-500": stepStatus === 'upcoming',
                  }
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="h-px w-16 bg-gray-300 mx-4" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContestTimeline;
