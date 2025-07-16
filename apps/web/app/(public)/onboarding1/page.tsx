"use client";
// import { BlockieFace, Button, Input } from "@repo/ui";
import { useState, ChangeEvent } from "react";
import {
  // ButtonContainerProps,
  // ContentContainerProps,
  // ContentProgressProps,
  FormData,
} from "@type/onboarding";
// import { OnboardingSlides } from "@constant/onboarding";
// import colors from "tailwindcss/colors";
import ContentContainer from "@component/onboarding/contentContainer";
import ContentProgress from "@component/onboarding/contentProgress";
import ButtonContainer from "@component/onboarding/buttonContainer";
import { OnboardingSlides } from "@constant/onboarding";
// 색상 시스템
// const colors = {
//   yellow: "#F4DF7D",
//   green: "#8DDBA4",
//   blue: "#7DC0F4",
//   purple: "#C89DF4",
//   pink: "#F48DAE",
//   red: "#F47D7D",
//   redLight: "#F49B9B",
//   black: "#1F2937",
//   darkGray: "#4B5563",
//   mediumGray: "#9CA3AF",
//   lightGray: "#E5E7EB",
//   offWhite: "#F9FAFB",
//   white: "#FFFFFF",
// };

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    monthlyBudget: "500000",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setFormData((prev) => ({ ...prev, monthlyBudget: rawValue }));
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleNext = () => {
    const newCurrentStep = currentStep + 1;
    setCurrentStep(newCurrentStep);

    if (newCurrentStep === OnboardingSlides.length) {
      console.log("완료:", formData);
      alert("환영합니다! Blockie와 함께 시작해보세요 🎉");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const newCurrentStep = currentStep - 1;
      setCurrentStep(newCurrentStep);
    }
  };

  const canGoBack = currentStep > 0;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
      <div className="flex flex-col justify-between min-w-md h-full">
        <ContentProgress /*steps={progressSteps} */ currentStep={currentStep} />
        <ContentContainer
          currentStep={currentStep}
          formData={formData}
          handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
          handlePhoneChange={handlePhoneChange}
          handleBudgetChange={handleBudgetChange}
          formatCurrency={formatCurrency}
          setCurrentStep={setCurrentStep}
        />
        <ButtonContainer
          canGoBack={canGoBack}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
}
