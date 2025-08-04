import { BudgetHistoryItem } from "@type/budget";

interface StatusBadgeProps {
  item: BudgetHistoryItem;
}

const StatusBadge = ({ item }: StatusBadgeProps) => {
  if (!item.hasBudget) {
    return (
      <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-gray-100 text-black border border-gray-200">
        예산 미설정
      </span>
    );
  }

  if (item.remaining < 0) {
    return (
      <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-red-100 text-error">
        예산 초과
      </span>
    );
  }

  return (
    <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
      예산 내 지출
    </span>
  );
};

export default StatusBadge;
