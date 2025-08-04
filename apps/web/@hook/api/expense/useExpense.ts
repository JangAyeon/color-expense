import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { YearMonthProps } from "@type/date";
import { expenseService } from "@utils/apis/services/expense";
import { userService } from "@utils/apis/services/user";
import { queryKeys } from "@utils/query/query.key";

export const useRecentExpenses = (limit?: number) => {
  return useQuery({
    queryKey: queryKeys.user.recentExpenses(),
    queryFn: () => userService.getRecentExpenses(),
    select: (response) => {
      // 최신순 정렬 후 limit 개수만 반환
      const expenses = response;

      return limit
        ? expenses
            .sort(
              (a, b) =>
                new Date(b.expenseDate).getTime() -
                new Date(a.expenseDate).getTime()
            )
            .slice(0, limit)
        : expenses.sort(
            (a, b) =>
              new Date(b.expenseDate).getTime() -
              new Date(a.expenseDate).getTime()
          );
    },
    staleTime: 2 * 60 * 1000, // 2분
  });
};

export const useMonthlyExpenses = ({
  year,
  month,
  day,
}: {
  year: string;
  month: string;
  day: string;
}) => {
  return useQuery({
    queryKey: queryKeys.expense.monthly({ year, month, day }),
    queryFn: () => expenseService.getMonthlyStatus({ year, month, day }),
    select: (response) => {
      // 최신순 정렬 후 limit 개수만 반환
      const expenses = response;
      const sortedExpenses = expenses.expenses.sort(
        (a, b) =>
          new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()
      );

      return { total: expenses.total, expenses: sortedExpenses };
    },
    staleTime: 2 * 60 * 1000, // 2분
  });
};

export const useExpensesCategory = ({ year, month }: YearMonthProps) => {
  return useQuery({
    queryKey: queryKeys.expense.category({
      year,
      month: month.padStart(2, "0"),
    }),
    queryFn: () => expenseService.getCategoryStatus({ year, month }),
    select: (response) => response,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useExpensesStreak = () => {
  return useQuery({
    queryKey: queryKeys.expense.streak(),
    queryFn: () => expenseService.getStreak(),
    select: (response) => response,
    staleTime: 5 * 60 * 1000, // 5분
  });
};
