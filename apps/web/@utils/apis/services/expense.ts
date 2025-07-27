import {
  ExpenseCategorySummary,
  ExpenseItemListResponse,
  StreakInfoResponse,
} from "@type/expense";

import { YearMonthDayProps, YearMonthProps } from "@type/date";
import { apiClient } from "@utils/apis/api.client";

export const expenseService = {
  // 내 현황 조회
  getCategoryStatus: ({ month, year }: YearMonthProps) =>
    apiClient.get<ExpenseCategorySummary>("/expenses/stats/category", {
      year,
      month,
    }),
  getMonthlyStatus: ({ month, year, day }: YearMonthDayProps) =>
    apiClient.get<ExpenseItemListResponse>("/expenses/stats/monthly", {
      year,
      month,
      day,
    }),
  getStreak: () => apiClient.get<StreakInfoResponse>("/expenses/stats/streak"),
};
