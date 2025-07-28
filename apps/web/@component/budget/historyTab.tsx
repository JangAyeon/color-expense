import { BarOptionsAnimation } from "@constant/budget";
import { getMonthName } from "@utils/budget";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import Card from "./card";
import useBudgetTab from "@hook/business/budget/useBudgetTab";
import { BudgetHistoryItem } from "@type/budget";

import { useBudgetHistory } from "@hook/api/budget/useBudgetHistory";

const HistoryTab = () => {
  const { direction } = useBudgetTab();
  const { data } = useBudgetHistory(4);
  console.log(data?.history);

  const budgetedMonths = data?.history.filter((item) => item.hasBudget);

  const barData = {
    labels: budgetedMonths?.map((item) => `${item.year}년 ${item.month}월`),
    datasets: [
      {
        label: "예산",
        data: budgetedMonths?.map((item) => item.budget),
        backgroundColor: "#8DDBA4",
        borderRadius: 6,
      },
      {
        label: "지출",
        data: budgetedMonths?.map((item) => item.spent),
        backgroundColor: "#F47D7D",
        borderRadius: 6,
      },
    ],
  };
  // 해당 월이 현재 또는 미래인지 확인하는 함수
  const isCurrentOrFutureMonth = (year: number, month: number) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 0-based이므로 +1
    if (year > currentYear) return true;
    if (year === currentYear && month >= currentMonth) return true;
    return false;
  };

  const getStatusBadge = (item: BudgetHistoryItem) => {
    if (!item.hasBudget) {
      return (
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
          예산 미설정
        </span>
      );
    }

    if (item.remaining < 0) {
      return (
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">
          예산 초과
        </span>
      );
    }

    return (
      <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
        예산 내 지출
      </span>
    );
  };

  if (!data?.history) return <></>;

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
          <h2 className="text-xl font-semibold">월별 예산 내역</h2>
          <div className="text-sm text-gray-500">
            총 {data.totalMonths}개월 중 {data.monthsWithBudget}개월 예산 설정
          </div>
        </div>

        {budgetedMonths && budgetedMonths.length > 0 ? (
          <div className="h-80 mb-6">
            <Bar data={barData} options={BarOptionsAnimation} />
          </div>
        ) : (
          <div className="h-80 mb-6 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p>예산이 설정된 달이 없습니다</p>
            </div>
          </div>
        )}

        {/* 통계 요약 */}
        {data.monthsWithBudget > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-500">평균 월 예산</p>
              <p className="font-semibold">
                {data.averageMonthlyBudget.toLocaleString()}원
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">평균 월 지출</p>
              <p className="font-semibold">
                {data.averageMonthlySpending.toLocaleString()}원
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">예산 준수율</p>
              <p className="font-semibold">{data.budgetComplianceRate}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">예산 설정 달</p>
              <p className="font-semibold">
                {data.monthsWithBudget}/{data.totalMonths}개월
              </p>
            </div>
          </div>
        )}

        {/* 월별 상세 내역 */}
        <div className="space-y-4">
          {data.history.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.month}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg p-4 transition-shadow hover:shadow-md ${
                item.hasBudget
                  ? "bg-gray-50"
                  : "bg-gray-25 border border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-lg">
                  {item.year}년 {getMonthName(item.month)}
                </h3>
                {getStatusBadge(item)}
              </div>

              {item.hasBudget ? (
                <>
                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">예산</p>
                      <p className="font-medium text-base">
                        {item.budget.toLocaleString()}원
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">지출</p>
                      <p className="font-medium text-base">
                        {item.spent.toLocaleString()}원
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">잔액</p>
                      <p
                        className={`font-medium text-base ${item.remaining < 0 ? "text-red-500" : "text-green-600"}`}
                      >
                        {item.remaining.toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  {/* 프로그레스 바 */}
                  <div className="mt-3">
                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          (item.usagePercentage ?? 0) > 100
                            ? "bg-red-500"
                            : (item.usagePercentage ?? 0) > 90
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{
                          width: `${Math.min(item.usagePercentage || 0, 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500">사용률</span>
                      <span
                        className={`font-medium ${
                          (item.usagePercentage ?? 0) > 100
                            ? "text-red-500"
                            : "text-gray-700"
                        }`}
                      >
                        {item.usagePercentage?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-8 text-gray-400">
                  <div className="text-center">
                    <svg
                      className="w-8 h-8 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm">
                      이 달은 예산이 설정되지 않았습니다
                    </p>
                    {isCurrentOrFutureMonth(item.year, item.month) && (
                      <button className="mt-2 text-xs text-blue-500 hover:text-blue-700 underline">
                        예산 설정하기
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {data.history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>과거 예산 내역이 없습니다</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default HistoryTab;
