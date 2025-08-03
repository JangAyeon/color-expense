interface BudgetStatsSummaryProps {
  data: {
    monthsWithBudget: number;
    averageMonthlyBudget: number;
    averageMonthlySpending: number;
    budgetComplianceRate: number;
    totalMonths: number;
  };
}

const BudgetStatsBoard = ({ data }: BudgetStatsSummaryProps) => {
  // if (data.monthsWithBudget === 0) return null;

  return (
    data.monthsWithBudget && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-body-2 text-neutral-black">평균 월 예산</p>
          <p className="font-semibold">
            {data.averageMonthlyBudget.toLocaleString()}원
          </p>
        </div>
        <div className="text-center">
          <p className="text-body-2 text-neutral-black">평균 월 지출</p>
          <p className="font-semibold">
            {data.averageMonthlySpending.toLocaleString()}원
          </p>
        </div>
        <div className="text-center">
          <p className="text-body-2 text-neutral-black">예산 준수율</p>
          <p className="font-semibold">{data.budgetComplianceRate}%</p>
        </div>
        <div className="text-center">
          <p className="text-body-2 text-neutral-black">예산 설정 달</p>
          <p className="font-semibold">
            {data.monthsWithBudget}/{data.totalMonths}개월
          </p>
        </div>
      </div>
    )
  );
};

export default BudgetStatsBoard;
