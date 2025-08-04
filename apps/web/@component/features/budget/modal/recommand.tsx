import { BUDGET_MULTIPLIERS } from "@constant/budget";
import { Button } from "@repo/ui";
import { BudgetSummary } from "@type/budget";
import { motion } from "framer-motion";
import { FC, useCallback } from "react";

interface BudgetRecommendSectionProps {
  budgetStatus: BudgetSummary;
  onSelectAmount: (amount: number) => void;
}

interface RecommendedBudget {
  label: string;
  amount: number;
  isHighlighted?: boolean;
}

const BudgetRecommendSection: FC<BudgetRecommendSectionProps> = ({
  budgetStatus,
  onSelectAmount,
}) => {
  const getRecommendedBudget = useCallback(
    (multiplier: number) => {
      if (!budgetStatus?.spent) return 0;
      return Math.ceil((budgetStatus.spent * multiplier) / 10000) * 10000;
    },
    [budgetStatus?.spent]
  );

  const recommendedBudgets: RecommendedBudget[] = [
    {
      label: "안정적",
      amount: getRecommendedBudget(BUDGET_MULTIPLIERS.CONSERVATIVE),
    },
    {
      label: "추천",
      amount: getRecommendedBudget(BUDGET_MULTIPLIERS.RECOMMENDED),
      isHighlighted: true,
    },
    {
      label: "도전적",
      amount: getRecommendedBudget(BUDGET_MULTIPLIERS.AGGRESSIVE),
    },
  ].filter((budget) => budget.amount > 0);

  return (
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
        {recommendedBudgets.map((budget) => (
          <div key={budget.label} className="flex items-center justify-between">
            <span className="text-body-2 text-neutral-dark-gray">
              {budget.label}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectAmount(budget.amount)}
              className={`text-xs ${budget.isHighlighted ? "bg-blue-100" : ""}`}
            >
              {budget.amount.toLocaleString()}원
            </Button>
          </div>
        ))}
      </div>

      <p className="text-xs text-blue-600 mt-3">
        💡 현재 지출 패턴을 기반으로 한 추천 예산입니다
      </p>
    </motion.div>
  );
};

export default BudgetRecommendSection;
