export interface ExpenseData {
  year: number;
  month: number;
  budget: number;
}

export type ExpenseRecord = {
  id: string;
  amount: number;
  category: string;
  expenseDate: string; // ISO 8601 date string
  createdAt: string; // ISO 8601 date string
};

export type ExpensesStatsResponse = {
  total: number;
  expenses: ExpenseRecord[];
};

export async function fetchExpenseStatus(
  year: string,
  month: string,
  day: string,
  type: "daily" | "monthly" | "weekly",
  access_token: string
): Promise<ExpensesStatsResponse | null> {
  const baseUrl = access_token
    ? process.env.NEXT_API_BASE_URL || "http://localhost:3030"
    : "/api";
  const date = `${year}-${month}-${day.toString().padStart(2, "0")}`;

  console.log(
    "fetchExpenseStatus",
    `${baseUrl}/expenses/status/${type}?date=${date}`
  );
  const res = await fetch(`${baseUrl}/expenses/stats/${type}?date=${date}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}
