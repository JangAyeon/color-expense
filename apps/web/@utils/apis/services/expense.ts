import {
  ExpenseCategorySummary,
  ExpenseItemListResponse,
  StreakInfoResponse,
} from "@type/expense";

import { YearMonthDayProps, YearMonthProps } from "@type/date";
import { apiClient } from "@utils/apis/api.client";
import { ApiRoute } from "@constant/api.route";

export const expenseService = {
  // /expenses/stats/category
  getCategoryStatus: ({ month, year }: YearMonthProps) =>
    apiClient.get<ExpenseCategorySummary>(
      `${ApiRoute.expenses.GET_CATEGORY_STATUS}`,
      {
        year,
        month,
      }
    ),
  getMonthlyStatus: ({ month, year, day }: YearMonthDayProps) =>
    apiClient.get<ExpenseItemListResponse>(
      `${ApiRoute.expenses.GET_MONTHLY_STATUS}`,
      {
        year,
        month,
        day,
      }
    ),
  getStreak: () =>
    apiClient.get<StreakInfoResponse>(`${ApiRoute.expenses.GET_STREAK}`),
};
