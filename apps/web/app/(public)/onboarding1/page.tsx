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
import { useUserProfile, useUpdateUserProfile } from "@hook/useAuth";
import { useSearchParams, useRouter } from "next/navigation";
import { useUpsertBudget } from "@hook/useBudget";
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
  const { data, isLoading, isError } = useUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();
  const searchParams = useSearchParams();
  const router = useRouter();
  // year, month 가져오기 (없으면 기본값은 오늘 기준)
  const today = new Date();
  const year = parseInt(
    searchParams.get("year") ?? today.getFullYear().toString()
  );
  const month = parseInt(
    searchParams.get("month") ?? (today.getMonth() + 1).toString()
  );
  const budgetMutation = useUpsertBudget(year, month);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSave = () => {
  //   console.log();
  //   const value = Number(formBudget);
  //   if (formBudget === undefined || isNaN(value)) {
  //     alert("올바른 예산 금액을 입력하세요.");
  //     return;
  //   } else if (value < MIN_BUDGET) {
  //     alert("최소한 만원 이상을 입력하세요.");
  //   }
  //   budgetMutation.mutate(value);
  // };
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

  const handleNext = async () => {
    const newCurrentStep = currentStep + 1;
    console.log(data, formData);

    if (newCurrentStep === OnboardingSlides.length) {
      if (!data?.email) return;
      const { phone, name, monthlyBudget } = formData;
      const userInfoForm = { phone, name, email: data!.email };

      try {
        const res = await Promise.all([
          updateProfile(userInfoForm),
          budgetMutation.mutate(Number(monthlyBudget)),
        ]);
        console.log(res);
      } catch (err) {
        console.error("업데이트 중 에러", err);
      }
      alert(
        `환영합니다! Blockie와 함께 시작해보세요 🎉 ${{ ...formData, email: data?.email }}`
      );
      router.push("/mypage");
    } else {
      setCurrentStep(newCurrentStep);
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
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white px-4 py-6">
      <div className="flex flex-col justify-between w-full h-full">
        <ContentProgress /*steps={progressSteps} */ currentStep={currentStep} />
        <ContentContainer
          currentStep={currentStep}
          formData={formData}
          // handleNext={handleNext}
          // handleBack={handleBack}
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
