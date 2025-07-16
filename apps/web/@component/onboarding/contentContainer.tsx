import { OnboardingSlides } from "@constant/onboarding";
import { BlockieFace, Input } from "@repo/ui";
import { ContentContainerProps } from "@type/onboarding";

const ContentContainer = ({
  currentStep,
  formData,
  //   handleNext,
  //   handleBack,
  handleChange,
  handlePhoneChange,
  handleBudgetChange,
  formatCurrency,
  setCurrentStep,
}: ContentContainerProps) => {
  const canGoBack = currentStep > 0;
  const currentSlideData = OnboardingSlides[currentStep];
  const MAX_BLOCKS = 100;
  const DIVIDER = 1000;
  const actualBlocks = Math.min(
    Math.floor(parseInt(formData.monthlyBudget, 10) / DIVIDER),
    MAX_BLOCKS
  );
  const restBlocks = Number(formData.monthlyBudget) / DIVIDER - MAX_BLOCKS;
  const isOverflow = Number(formData.monthlyBudget) > MAX_BLOCKS * DIVIDER;
  if (!currentSlideData) {
    return <div>currentSlideData not found</div>;
  }

  return (
    <section className="w-full flex flex-col items-center text-center flex-1 justify-start gap-10 py-8">
      <div className="flex flex-col justify-center items-center gap-3">
        {/* 아이콘 영역 - 항상 고정 위치 */}
        <div className="flex flex-col justify-center items-center gap-8">
          <BlockieFace size={120} emotion={currentSlideData.emotion} />
          {/* 텍스트 */}
          <div className="px-4 flex flex-col gap-2">
            <h1
              className="text-2xl sm:text-3xl font-bold  text-neutral-black"
              // style={{ color: colors.black }}
            >
              {currentSlideData.title}
            </h1>
            <p
              className={`text-base sm:text-lg text-neutral-dark-gray`}
              /*style={{ color: colors.darkGray }}*/
            >
              {currentSlideData.description}
            </p>
          </div>
        </div>

        {/* 인디케이터 영역 - 항상 고정 위치 */}
        <div className="flex space-x-2 ">
          {OnboardingSlides.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300
    ${index === currentStep ? "w-6" : "w-2"}
    ${index === currentStep ? item.backgroundColor : "bg-neutral-light-gray"}`}
            />
          ))}
        </div>
      </div>

      {/* 동적 콘텐츠 영역 - 고정 높이로 레이아웃 안정화 */}
      <div className="w-full flex-1 ">
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
                helperText="안전한 서비스 이용을 위해 필요해요"
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-left w-full mx-auto">
            <div className="space-y-4">
              <div>
                {/* <label
                  htmlFor="monthlyBudget"
                  className="block text-sm font-medium mb-1 text-black"
                  //   style={{ color: colors.black }}
                >
                  월간 예산
                </label> */}
                <div className="relative">
                  <div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-medium-gray"
                    // style={{ color: colors.mediumGray }}
                  >
                    ₩
                  </div>

                  <Input
                    label="월간 예산"
                    className="text-right"
                    type="text"
                    id="monthlyBudget"
                    name="monthlyBudget"
                    value={formatCurrency(formData.monthlyBudget)}
                    onChange={handleBudgetChange}
                    size="lg"
                    placeholder="500,000"
                    helperText="한 달 동안 사용할 예산을 입력해주세요."
                    required
                  />
                  {/* <input
                    type="text"
                    id="monthlyBudget"
                    name="monthlyBudget"
                    required
                    value={formatCurrency(formData.monthlyBudget)}
                    onChange={handleBudgetChange}
                    className="w-full h-12 pl-8 pr-4 rounded-lg border transition-all outline-none text-right font-medium bg-white border-medium-light-gray"
                    // style={{
                    //   borderColor: colors.lightGray,
                    //   backgroundColor: colors.white,
                    // }}
                  /> */}
                </div>
                {/*<p
                  className="text-xs mt-1 text-neutral-dark-gray" 
                >
                  한 달 동안 사용할 예산을 입력해주세요.
                </p>*/}
              </div>

              <div
                className="flex flex-col gap-2 p-4 rounded-xl   bg-neutral-off-white"
                // style={{ backgroundColor: colors.offWhite }}
              >
                <div
                  className="text-sm font-medium mb-3 text-neutral-black"
                  // style={{ color: colors.black }}
                >
                  {Math.floor(parseInt(formData.monthlyBudget, 10) / DIVIDER)}
                  개의 블록이 쌓일 수 있어요!
                </div>

                {parseInt(formData.monthlyBudget, 10) > 0 && (
                  <div className="flex flex-wrap items-start justify-center space-x-1 max-h-96 overflow-y-scroll bg-neutral-off-white">
                    {Array.from({
                      length: actualBlocks,
                    }).map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-sm mb-1 bg-blockie-pink"
                        // style={{ backgroundColor: colors.yellow }}
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                )}
                {isOverflow && (
                  <div
                    className="text-sm ml-2 text-neutral-dark-gray"
                    // style={{ color: colors.darkGray }}
                  >
                    +{restBlocks}
                    개의 블록이 더 있어요
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentContainer;
