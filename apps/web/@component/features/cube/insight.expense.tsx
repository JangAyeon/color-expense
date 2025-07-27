import { BlockieFace } from "@repo/ui";
import { BudgetSummary } from "@type/budget";
import { ExpenseCategorySummary } from "@type/expense";
import getUsageEmotion from "@utils/common/getUsageEmotion";
import { formatWithCurrencySymbol } from "@utils/onboarding/formatter";

const InsightExpense = ({
  budgetStatus,
  expenseCategory,
}: {
  budgetStatus: BudgetSummary;
  expenseCategory: ExpenseCategorySummary;
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full -translate-y-10 translate-x-10" />
      <div className="flex items-start relative z-10">
        <div className="flex-1">
          <h3 className="flex flex-row gap-3 font-bold text-lg text-gray-800 mb-3">
            <BlockieFace
              size={30}
              emotion={getUsageEmotion({
                spent: budgetStatus!.spent,
                budget: budgetStatus!.budget,
              })}
            />
            스마트 인사이트
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">
                가장 많이 지출한 카테고리
              </span>
              <span className="font-semibold text-gray-800">
                {expenseCategory?.categories[0]?.category}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">
                이번 달 평균 일일 지출
              </span>
              <span className="font-semibold text-gray-800">
                {formatWithCurrencySymbol(
                  Math.floor(budgetStatus?.spent! / new Date().getDate())
                )}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">예상 월말 지출</span>
              <span
                className={`font-semibold ${
                  (budgetStatus?.spent! / new Date().getDate()) * 31 >
                  budgetStatus?.budget!
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {formatWithCurrencySymbol(
                  Math.floor((budgetStatus?.spent! / new Date().getDate()) * 31)
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightExpense;
