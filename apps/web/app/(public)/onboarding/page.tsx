"use client";

import { useState } from "react";
import ContentProgress from "@component/onboarding/contentProgress";
import ContentSection from "@component/onboarding/contentSection";

export default function OnboardingPage() {
  // const [currentStep, setCurrentStep] = useState<number>(0);
  // const {
  //   currentStep,
  //   setCurrentStep,
  //   goToNext,
  //   goToPrevious,
  //   goToStep,
  //   canGoBack,
  //   canGoNext,
  // } = useOnboardingNavigation();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white px-4 py-6">
      <div className="flex flex-col justify-between w-full h-full">
        <ContentProgress />
        <ContentSection />
      </div>
    </div>
  );
}
