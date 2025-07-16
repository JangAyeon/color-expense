import { Button } from "@repo/ui";
import { ButtonContainerProps } from "@type/onboarding";

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

export default ButtonContainer;
