import { useBudgetStatus } from "@hook/api/budget/useBudget";
import {
  useMonthlyExpenses,
  useExpensesCategory,
} from "@hook/api/expense/useExpense";

export const useCube = ({
  year,
  month,
  day,
}: {
  year: string;
  month: string;
  day: string;
}) => {
  const budgetQuery = useBudgetStatus({ year, month });
  const expenseCategoryQuery = useExpensesCategory({ year, month });
  //   const budgetHistoryQuery = useBudgetHistory(6);
  const expensesQuery = useMonthlyExpenses({
    year,
    month,
    day,
  });

  const isLoading =
    budgetQuery.isLoading ||
    expenseCategoryQuery.isLoading ||
    expensesQuery.isLoading;
  const hasError =
    budgetQuery.isError ||
    expenseCategoryQuery.isError ||
    expensesQuery.isError;
  // budgetHistoryQuery.isError ||
  // recentExpensesQuery.isError;
  const isSuccess =
    budgetQuery.isSuccess ||
    expenseCategoryQuery.isSuccess ||
    expensesQuery.isSuccess;
  // expensesQuery.isSuccess ||
  // recentExpensesQuery.isSuccess;
  console.log({
    budgetQuery: budgetQuery.data,
    expenseCategory: expenseCategoryQuery.data,
    expensesQuery: expensesQuery.data,
  });
  return {
    // 개별 쿼리 상태
    budgetQuery: budgetQuery,
    expenseCategoryQuery: expenseCategoryQuery,
    expensesQuery,

    // 통합 상태
    isLoading,
    hasError,
    isSuccess,

    // 에러 정보
    errors: {
      profile: budgetQuery.error,
      expenseCategory: expenseCategoryQuery.error,
      expensesQuery: expensesQuery.error,
    },
  };
};
