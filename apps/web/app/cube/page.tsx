"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCube } from "@hook/business/cube/useCube";
import { MyPageLoading } from "@component/features/user";
import MonthlyBudget from "@component/features/cube/monthly.budget";
import InsightExpense from "@component/features/cube/insight.expense";
import BlockExpense from "@component/features/cube/block.monthly.expense";
import ListMonthlyExpense from "@component/features/cube/list.monthly.expense";
import { toYMDWithString } from "@utils/date/YMD";

export default function ExpenseCubePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month")?.padStart(2, "0");
  const day = searchParams.get("day")?.padStart(2, "0");

  const hasDate = year && month && day;
  const {
    budgetQuery: { data: budgetStatus },
    expenseCategoryQuery: { data: expenseCategory },
    expensesQuery: { data: expenses },
    isLoading,
    hasError,
    errors,
    isSuccess,
  } = useCube(
    hasDate ? { year, month, day } : { year: "", month: "", day: "" }
  );

  console.log("expenseCategory", expenseCategory);
  useEffect(() => {
    if (!hasDate) {
      const today = new Date();
      const { year, month, day } = toYMDWithString(today);
      router.replace(`/cube?year=${year}&month=${month}&day=${day}`);
    }
  }, [router, searchParams, hasDate]);
  if (isLoading || hasError || !hasDate) return <MyPageLoading />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {" "}
        <main className="p-6 space-y-6">
          {/* 연속 기록 배지 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500" />
            <div className="flex items-center relative z-10">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-yellow-400 to-orange-400 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl">🔥</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {7}일 연속 기록 중!
                </h3>
                <p className="text-sm text-gray-600">
                  꾸준히 기록하면 특별한 보상이 기다려요
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">다음 보상까지</div>
                <div className="text-sm font-bold text-yellow-600">
                  {7 - (7 % 7)}일
                </div>
              </div>
            </div>
          </div>

          {/* 예산 카드 */}
          <MonthlyBudget budgetStatus={budgetStatus!} />
          {/* 블록 컬렉션 */}
          <BlockExpense
            expensesInfo={expenses?.expenses!}
            categoryInfo={expenseCategory?.categories!}
            totalBlocks={budgetStatus?.spent! / 10000}
            maxBlocks={Math.floor(budgetStatus?.budget! / 10000)}
          />

          {/* 인사이트 카드 */}
          <InsightExpense
            budgetStatus={budgetStatus!}
            expenseCategory={expenseCategory!}
          />

          {/* 최근 지출 목록 */}
          <ListMonthlyExpense expensesInfo={expenses?.expenses!} />
        </main>
      </main>
    </div>
  );
}
