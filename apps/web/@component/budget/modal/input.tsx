import { FC, Dispatch, SetStateAction } from "react";

interface BudgetInputSectionProps {
  budgetStatus: any;
  budgetAmount: string;
  setBudgetAmount: Dispatch<SetStateAction<string>>;
  isSubmitting: boolean;
  hasSpentAmount: boolean;
}

const BudgetInputSection: FC<BudgetInputSectionProps> = ({
  budgetStatus,
  budgetAmount,
  setBudgetAmount,
  isSubmitting,
  hasSpentAmount,
}) => {
  return (
    <>
      {/* 현재 지출 정보 */}
      {hasSpentAmount && (
        <div className="p-3 bg-gray-50 rounded-lg mb-4">
          <p className="text-body-2 text-neutral-black">
            현재 지출 금액:{" "}
            <span className="font-medium text-error">
              {budgetStatus?.spent.toLocaleString() ?? 0}원
            </span>
          </p>
        </div>
      )}

      {/* 예산 입력 */}
      <div className="mb-4">
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
      </div>
    </>
  );
};

export default BudgetInputSection;
