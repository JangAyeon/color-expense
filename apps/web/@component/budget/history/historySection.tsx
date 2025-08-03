import { motion } from "framer-motion";

import Card from "@component/budget/card";

import { useBudgetHistory } from "@hook/api/budget/useBudget";

import BudgetChart from "./dashBoard/chart";
import BudgetStatsBoard from "./dashBoard/stats.board";
import BudgetHistoryList from "./recordList/history.list";
import { BUDGET_ITEM_COUNT } from "@constant/budget";

const HistorySection = () => {
  const { data } = useBudgetHistory(BUDGET_ITEM_COUNT);

  // const barData = {
  //   labels: budgetedMonths?.map((item) => `${item.year}년 ${item.month}월`),
  //   datasets: [
  //     {
  //       label: "예산",
  //       data: budgetedMonths?.map((item) => item.budget),
  //       backgroundColor: "#8DDBA4", // "bg-blockie-green"
  //       borderRadius: 6,
  //     },
  //     {
  //       label: "지출",
  //       data: budgetedMonths?.map((item) => item.spent),
  //       backgroundColor: "#F47D7D", // "bg-blockie-red"
  //       borderRadius: 6,
  //     },
  //   ],
  // };
  // 해당 월이 현재 또는 미래인지 확인하는 함수
  // const isCurrentOrFutureMonth = (year: number, month: number) => {
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth() + 1; // 0-based이므로 +1
  //   if (year > currentYear) return true;
  //   if (year === currentYear && month >= currentMonth) return true;
  //   return false;
  // };

  // const getStatusBadge = (item: BudgetHistoryItem) => {
  //   if (!item.hasBudget) {
  //     return (
  //       <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-gray-100 text-black border border-gray-200">
  //         예산 미설정
  //       </span>
  //     );
  //   }

  //   if (item.remaining < 0) {
  //     return (
  //       <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-red-100 text-error">
  //         예산 초과
  //       </span>
  //     );
  //   }

  //   return (
  //     <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
  //       예산 내 지출
  //     </span>
  //   );
  // };

  if (!data?.history) return <></>;
  const budgetedMonths = data.history.filter((item) => item.hasBudget);
  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-title-2  font-semibold">월별 예산 내역</h2>
          <div className="text-body-2 text-neutral-black">
            총 {data.totalMonths}개월 중 {data.monthsWithBudget}개월 예산 설정
          </div>
        </div>
        <BudgetChart budgetedMonths={budgetedMonths} />

        {/* 통계 요약 */}
        <BudgetStatsBoard data={data} />

        {/* 월별 상세 내역 */}
        <BudgetHistoryList history={data.history} />
      </Card>
    </motion.div>
  );
};

export default HistorySection;
