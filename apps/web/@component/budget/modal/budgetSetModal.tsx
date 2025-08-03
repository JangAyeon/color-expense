import { useBudgetStatus } from "@hook/api/budget/useBudget";

import { motion } from "framer-motion";
import { FC, useState } from "react";
import BudgetModalHeader from "./header";
import BudgetInputSection from "./input";
import BudgetRecommendSection from "./recommand";
import BudgetModalActions from "./actions";

interface BudgetSetModalProps {
  year: number;
  month: number;
  onSave: (amount: number) => Promise<void>;
  onClose: () => void;
}

const BudgetSetModal: FC<BudgetSetModalProps> = ({
  year,
  month,
  onSave,
  onClose,
}) => {
  const [budgetAmount, setBudgetAmount] = useState("");
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: budgetStatus } = useBudgetStatus({
    year: year.toString(),
    month: month.toString().padStart(2, "0"),
  });

  // 추천 예산 계산
  // const getRecommendedBudget = useCallback(
  //   (multiplier: number) => {
  //     if (!budgetStatus?.spent) return 0;
  //     return Math.ceil((budgetStatus.spent * multiplier) / 10000) * 10000;
  //   },
  //   [budgetStatus?.spent]
  // );

  // const recommendedBudgets = {
  //   base: getRecommendedBudget(BUDGET_MULTIPLIERS.RECOMMENDED),
  //   conservative: getRecommendedBudget(BUDGET_MULTIPLIERS.CONSERVATIVE),
  //   aggressive: getRecommendedBudget(BUDGET_MULTIPLIERS.AGGRESSIVE),
  // };

  // 예산 저장 핸들러
  const handleSave = async () => {
    const amount = Number(budgetAmount);
    if (!amount || amount <= 0) return;

    setIsSubmitting(true);
    try {
      await onSave(amount);
    } catch (error) {
      console.error("예산 저장 중 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 추천 예산 선택 핸들러
  // const handleSelectRecommended = (amount: number) => {
  //   setBudgetAmount(amount.toString());
  // };

  // 입력값 검증
  const isValidAmount = Boolean(budgetAmount && Number(budgetAmount) > 0);
  const hasSpentAmount = Boolean(budgetStatus?.spent && budgetStatus.spent > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <BudgetModalHeader
          year={year}
          month={month}
          hasSpentAmount={hasSpentAmount}
          showAdvisor={showAdvisor}
          onToggleAdvisor={() => setShowAdvisor(!showAdvisor)}
        />
        {/* <div className="flex items-center justify-between mb-4">
          <h2 className="text-title-2 font-semibold">
            {year}년 {month}월 예산 설정
          </h2>
          {hasSpentAmount && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvisor(!showAdvisor)}
            >
              💡 추천
            </Button>
          )}
        </div> */}

        {/* 현재 지출 정보 */}
        {/* {hasSpentAmount && (
          <div className="p-3 bg-gray-50 rounded-lg mb-4">
            <p className="text-body-2 text-neutral-black">
              현재 지출 금액:{" "}
              <span className="font-medium text-error">
                {budgetStatus?.spent.toLocaleString() ?? 0}원
              </span>
            </p>
          </div>
        )} */}

        {/* 예산 입력 */}
        {/* <div className="mb-4">
          <label className="block text-body-2 font-medium text-neutral-black mb-2">
            예산 금액
          </label>
          <div className="relative">
            <input
              type="text"
              className="appearance-none w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
              placeholder="금액을 입력하세요"
              value={budgetAmount}
              onChange={(e) =>
                setBudgetAmount(e.target.value.replace(/[^0-9]/g, ""))
              }
              disabled={isSubmitting}
              autoFocus
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-neutral-medium-gray">원</span>
            </div>
          </div>
        </div> */}
        <BudgetInputSection
          budgetStatus={budgetStatus}
          budgetAmount={budgetAmount}
          setBudgetAmount={setBudgetAmount}
          isSubmitting={isSubmitting}
          hasSpentAmount={hasSpentAmount}
        />
        {/* 예산 추천 */}
        {/* {showAdvisor && hasSpentAmount && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 rounded-lg p-4 mb-4"
          >
            <h3 className="text-body-2 font-medium text-blue-700 mb-3">
              📊 추천 예산 금액
            </h3>

            <div className="space-y-2">
              {recommendedBudgets.base > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-body-2 text-neutral-dark-gray">
                    안정적
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleSelectRecommended(recommendedBudgets.conservative)
                    }
                    className="text-xs"
                  >
                    {recommendedBudgets.conservative.toLocaleString()}원
                  </Button>
                </div>
              )}

              {recommendedBudgets.base > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-body-2 text-neutral-dark-gray">
                    추천
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleSelectRecommended(recommendedBudgets.base)
                    }
                    className="text-xs bg-blue-100"
                  >
                    {recommendedBudgets.base.toLocaleString()}원
                  </Button>
                </div>
              )}

              {recommendedBudgets.aggressive > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-body-2 text-neutral-dark-gray">
                    도전적
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleSelectRecommended(recommendedBudgets.aggressive)
                    }
                    className="text-xs"
                  >
                    {recommendedBudgets.aggressive.toLocaleString()}원
                  </Button>
                </div>
              )}
            </div>

            <p className="text-xs text-blue-600 mt-3">
              💡 현재 지출 패턴을 기반으로 한 추천 예산입니다
            </p>
          </motion.div>
        )} */}
        {showAdvisor && hasSpentAmount && (
          <BudgetRecommendSection
            budgetStatus={budgetStatus}
            onSelectAmount={(amount) => setBudgetAmount(amount.toString())}
          />
        )}

        {/* 액션 버튼 */}
        {/* <div className="flex gap-2 justify-end mt-6">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isValidAmount || isSubmitting}
          >
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </div> */}
        <BudgetModalActions
          isValidAmount={isValidAmount}
          isSubmitting={isSubmitting}
          onSave={handleSave}
          onClose={onClose}
        />
      </motion.div>
    </motion.div>
  );
};

export default BudgetSetModal;
