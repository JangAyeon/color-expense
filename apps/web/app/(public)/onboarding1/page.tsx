"use client";
import { BlockieFace, Button, Input } from "@repo/ui";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

// 색상 시스템
const colors = {
  yellow: "#F4DF7D",
  green: "#8DDBA4",
  blue: "#7DC0F4",
  purple: "#C89DF4",
  pink: "#F48DAE",
  red: "#F47D7D",
  redLight: "#F49B9B",
  black: "#1F2937",
  darkGray: "#4B5563",
  mediumGray: "#9CA3AF",
  lightGray: "#E5E7EB",
  offWhite: "#F9FAFB",
  white: "#FFFFFF",
};

type Emotion = "happy" | "neutral" | "sad";
interface ContentProgressProps {
  steps: string[];
  currentStep: number;
}
interface BlockieSlide {
  title: string;
  description: string;
  color: string;
  emotion: Emotion;
}
interface ContentContainerProps {
  currentStep: number;
  formData: FormData;
  handleNext: () => void;
  handleBack: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBudgetChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formatCurrency: (value: string) => string;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

interface ButtonContainerProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  canGoBack: boolean;
  handleNext: () => void;
  handleBack: () => void;
}

const BlockieSlides: BlockieSlide[] = [
  {
    title: "매일 쌓아가는 블록 타워",
    description: "1만원 = 1블록, 당신의 소비를 직관적으로 확인하세요",
    color: colors.yellow,
    emotion: "happy",
  },
  {
    title: "소비 패턴을 한눈에",
    description: "카테고리별 색상으로 소비 패턴을 시각적으로 분석해요",
    color: colors.blue,
    emotion: "neutral",
  },
  {
    title: "재미있게 예산 관리",
    description: "목표를 달성하며 성취감을 느끼세요",
    color: colors.green,
    emotion: "happy",
  },
  {
    title: "안녕하세요! 👋",
    description: "블로키가 당신을 더 잘 알 수 있도록 도와주세요",
    color: colors.green,
    emotion: "happy",
  },
  {
    title: "한 달 예산을 정해보세요",
    description: "블록으로 쌓아가는 나만의 타워! 🏗️",
    color: colors.green,
    emotion: "happy",
  },
];

interface FormData {
  name: string;
  phone: string;
  monthlyBudget: string;
}

export default function CurrentDemo() {
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

  const steps = ["intro1", "intro2", "intro3", "info", "budget"];

  const handleNext = () => {
    const newCurrentStep = currentStep + 1;
    setCurrentStep(newCurrentStep);

    if (newCurrentStep === steps.length) {
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
        <ContentProgress steps={steps} currentStep={currentStep} />
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

const ContentProgress = ({ steps, currentStep }: ContentProgressProps) => {
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full py-4">
      {/* 프로그레스 바 */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: colors.green,
          }}
        ></div>
      </div>

      {/* 단계 라벨 */}
      <div className="flex justify-between text-xs mt-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className="font-medium"
            style={{
              color:
                index === currentStep
                  ? colors.black
                  : index < currentStep
                    ? colors.mediumGray
                    : colors.lightGray,
            }}
          >
            {labelFromStep(step)}
          </span>
        ))}
      </div>
    </div>
  );
};

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  currentStep,
  canGoBack,
  handleBack,
  handleNext,
  setCurrentStep,
}) => {
  return (
    <>
      <div className="w-full space-x-6 flex flex-row items-end justify-between ">
        {canGoBack && (
          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={false}
            onClick={handleBack}
            className="h-14 text-button"
          >
            ← 이전
          </Button>
        )}

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={false}
          onClick={handleNext}
          className="h-14 text-button"
        >
          다음 →
        </Button>
      </div>
    </>
  );
};

// 단계 키를 읽을 수 있는 라벨로 변환하는 유틸 함수
const labelFromStep = (step: string) => {
  switch (step) {
    case "intro1":
    case "intro2":
    case "intro3":
      return "소개";
    case "info":
      return "정보";
    case "budget":
      return "예산";
    default:
      return "";
  }
};

const ContentContainer = ({
  currentStep,
  formData,
  handleNext,
  handleBack,
  handleChange,
  handlePhoneChange,
  handleBudgetChange,
  formatCurrency,
  setCurrentStep,
}: ContentContainerProps) => {
  const canGoBack = currentStep > 0;
  const currentSlideData = BlockieSlides[currentStep];
  if (!currentSlideData) {
    return <div>currentSlideData not found</div>;
  }

  return (
    <section className="w-full flex flex-col items-center text-center flex-1 justify-start py-8">
      {/* 아이콘 영역 - 항상 고정 위치 */}
      <div className="flex flex-col gap-2 justify-center items-center mb-8">
        <BlockieFace size={120} emotion={currentSlideData.emotion} />
        {/* 텍스트 */}
        <div className="px-4 mb-8">
          <h1
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: colors.black }}
          >
            {currentSlideData.title}
          </h1>
          <p
            className="text-base sm:text-lg"
            style={{ color: colors.darkGray }}
          >
            {currentSlideData.description}
          </p>
        </div>
      </div>

      {/* 인디케이터 영역 - 항상 고정 위치 */}
      <div className="flex space-x-2 mb-8">
        {BlockieSlides.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentStep(index);
            }}
            className="h-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor:
                index === currentStep ? item.color : colors.lightGray,
              width: index === currentStep ? "24px" : "8px",
            }}
          />
        ))}
      </div>

      {/* 동적 콘텐츠 영역 - 고정 높이로 레이아웃 안정화 */}
      <div className="w-full flex-1 max-h-96 overflow-y-auto">
        {currentStep === 3 && (
          <div className="text-left w-full mx-auto">
            <div className="space-y-4">
              <Input
                label="이름"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력해주세요"
                size="lg"
                required
              />

              <Input
                label="전화번호"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="010-0000-0000"
                maxLength={13}
                size="lg"
                required
              />
              <p className="text-xs mt-1" style={{ color: colors.mediumGray }}>
                안전한 서비스 이용을 위해 필요해요
              </p>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-left w-full mx-auto">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="monthlyBudget"
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.black }}
                >
                  월간 예산
                </label>
                <div className="relative">
                  <div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    style={{ color: colors.mediumGray }}
                  >
                    ₩
                  </div>
                  <input
                    type="text"
                    id="monthlyBudget"
                    name="monthlyBudget"
                    required
                    value={formatCurrency(formData.monthlyBudget)}
                    onChange={handleBudgetChange}
                    className="w-full h-12 pl-8 pr-4 rounded-lg border transition-all outline-none text-right font-medium"
                    style={{
                      borderColor: colors.lightGray,
                      backgroundColor: colors.white,
                    }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: colors.darkGray }}>
                  한 달 동안 사용할 예산을 입력해주세요.
                </p>
              </div>

              <div
                className="p-4 rounded-xl mt-6"
                style={{ backgroundColor: colors.offWhite }}
              >
                <p
                  className="text-sm font-medium mb-3"
                  style={{ color: colors.black }}
                >
                  예산 시각화
                </p>
                <div className="flex items-end justify-center h-32">
                  {parseInt(formData.monthlyBudget, 10) > 0 && (
                    <div className="flex items-end space-x-1">
                      {Array.from({
                        length: Math.min(
                          Math.floor(
                            parseInt(formData.monthlyBudget, 10) / 100000
                          ),
                          10
                        ),
                      }).map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-sm mb-1"
                          style={{ backgroundColor: colors.yellow }}
                        ></div>
                      ))}
                      {parseInt(formData.monthlyBudget, 10) > 1000000 && (
                        <div
                          className="text-sm ml-2"
                          style={{ color: colors.darkGray }}
                        >
                          +
                          {Math.floor(
                            (parseInt(formData.monthlyBudget, 10) - 1000000) /
                              100000
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p
                  className="text-center text-sm mt-3"
                  style={{ color: colors.darkGray }}
                >
                  {Math.floor(parseInt(formData.monthlyBudget, 10) / 10000)}개의
                  블록이 쌓일 수 있어요!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
