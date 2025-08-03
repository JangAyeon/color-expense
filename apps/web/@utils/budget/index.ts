export const BUDGET_CONFIG = {
  MAX_BLOCKS: 100,
  DIVIDER: 1000,
} as const;

export const calculateBlocks = (budgetAmount: string) => {
  const amount = parseInt(budgetAmount, 10);
  const totalBlocks = Math.floor(amount / BUDGET_CONFIG.DIVIDER);
  const actualBlocks = Math.min(totalBlocks, BUDGET_CONFIG.MAX_BLOCKS);
  const restBlocks = totalBlocks - BUDGET_CONFIG.MAX_BLOCKS;
  const isOverflow = amount > BUDGET_CONFIG.MAX_BLOCKS * BUDGET_CONFIG.DIVIDER;

  return {
    actualBlocks,
    restBlocks,
    isOverflow,
    totalBlocks,
  };
};

export const getMonthName = (month: number) => {
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return monthNames[month - 1];
};

export function getExpenseStateWithBudget(spent: number, budget: number) {
  if (budget === 0) {
    return {
      usageRate: 0,
      usageRateDisplay: 0,
      isOverBudget: false,
      isNearLimit: false,
      emotion: "neutral",
      status: "미설정",
      statusColor: "text-yellow-500",
      barColor: "#9CA3AF",
    };
  }

  const usageRate = (spent / budget) * 100;
  const usageRateDisplay = usageRate > 100 ? 100 : usageRate;
  const isOverBudget = spent > budget;
  const isNearLimit = usageRate > 80 && usageRate <= 100;

  let emotion = "happy";
  let status = "여유";
  let statusColor = "text-green-500";
  let barColor = "#8DDBA4"; // blockie-green

  if (isOverBudget) {
    emotion = "sad";
    status = "초과";
    statusColor = "text-red-500";
    barColor = "#F47D7D"; // blockie-red
  } else if (isNearLimit) {
    emotion = "neutral";
    status = "주의";
    statusColor = "text-yellow-500";
    barColor = "#FBBF24"; // warning color
  }

  return {
    usageRate,
    usageRateDisplay,
    isOverBudget,
    isNearLimit,
    emotion,
    status,
    statusColor,
    barColor,
  };
}
export const isCurrentOrFutureMonth = (
  year: number,
  month: number
): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (year > currentYear) return true;
  if (year === currentYear && month >= currentMonth) return true;
  return false;
};
export const getUsageColor = (usagePercentage: number): string => {
  if (usagePercentage > 100) return "bg-error";
  if (usagePercentage > 90) return "bg-warning";
  return "bg-success";
};

export const getUsageTextColor = (usagePercentage: number): string => {
  return usagePercentage > 100 ? "text-error" : "text-neutral-black";
};

export const getBarOptionsAnimation = (labelCount: number) => ({
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `최근 설정된 ${labelCount}개월 예산 비교`,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
});
