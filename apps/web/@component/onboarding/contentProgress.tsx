import { OnboardingSlides } from "@constant/onboarding";
import { ContentProgressProps } from "@type/onboarding";
import { ProgressbarStepTitle } from "@utils/onboarding";

const ContentProgress = ({ currentStep }: ContentProgressProps) => {
  const progressPercentage =
    (currentStep / (OnboardingSlides.length - 1)) * 100;

  return (
    <div className="w-full py-4">
      {/* 프로그레스 바 */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 bg-blockie-green"
          style={{
            width: `${progressPercentage}%`,
            // backgroundColor: "bg-blockie-green",
          }}
        ></div>
      </div>

      {/* 단계 라벨 */}
      <div className="flex justify-between text-xs mt-2 ">
        {OnboardingSlides.map((item, index) => (
          <span
            key={index}
            className={`font-medium ${
              index === currentStep
                ? "text-black"
                : index < currentStep
                  ? "text-neutral-medium-gray"
                  : "text-neutral-light-gray"
            }`}
          >
            {ProgressbarStepTitle(item.stepName)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ContentProgress;
