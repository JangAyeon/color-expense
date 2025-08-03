import { getUsageColor, getUsageTextColor } from "@utils/budget";

interface BudgetProgressBarProps {
  usagePercentage: number;
}

const BudgetProgressBar = ({ usagePercentage }: BudgetProgressBarProps) => {
  return (
    <div className="mt-3">
      <div className="bg-neutral-light-gray h-3 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getUsageColor(usagePercentage)}`}
          style={{
            width: `${Math.min(usagePercentage, 100)}%`,
          }}
        />
      </div>
      <div className="flex justify-between text-caption mt-1">
        <span className="text-neutral-black">사용률</span>
        <span className={`font-medium ${getUsageTextColor(usagePercentage)}`}>
          {usagePercentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
