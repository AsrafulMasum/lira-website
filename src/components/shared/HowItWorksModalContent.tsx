"use client";

import { useState } from "react";
import { Trophy, DollarSign, Target } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const steps = [
  {
    icon: Trophy,
    title: "Pick a contest",
    description: "Browse active contests and find one you want to play.",
    subtext: "Each contest has its own question, prize, and closing time.",
  },
  {
    icon: Target,
    title: "Make your prediction",
    description: "Enter a single value, a range, or a custom number.",
    subtext:
      "Some values may already be taken, we'll show you what's still available.",
  },
  {
    icon: DollarSign,
    title: "Win the prize",
    description:
      "If your prediction is correct and your position wins, you receive the prize.",
    subtext: "For non-unique contests, prizes are split among all winners.",
  },
];

const HowItWorksModalContent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === steps.length - 1) {
      setCurrentStep(0);
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <DialogContent className="sm:max-w-md bg-[#FAFFFC]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          Learn how Lira works!
        </DialogTitle>
      </DialogHeader>

      <div className="mt-6">
        {/* Content Card */}
        <div className="bg-bg rounded-2xl p-6 mb-8">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-foreground">
            {currentStepData.title}
          </h3>

          {/* Description */}
          <p className="text-base text-foreground mb-3">
            {currentStepData.description}
          </p>

          {/* Subtext */}
          <p className="text-sm text-muted-foreground">
            {currentStepData.subtext}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                index === currentStep
                  ? "bg-foreground"
                  : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        {isLastStep ? (
          <DialogClose asChild>
            <Button
              onClick={() => setCurrentStep(0)}
              className="w-full bg-bg hover:bg-bg/80 text-foreground font-semibold text-base h-12 rounded-xl cursor-pointer"
            >
              Thanks!
            </Button>
          </DialogClose>
        ) : (
          <Button
            onClick={handleNext}
            className="w-full bg-bg hover:bg-bg/80 text-foreground font-semibold text-base h-12 rounded-xl cursor-pointer"
          >
            Next
          </Button>
        )}
      </div>
    </DialogContent>
  );
};

export default HowItWorksModalContent;
