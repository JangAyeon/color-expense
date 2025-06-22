// lib/api/budget.ts
export interface BudgetData {
  year: number;
  month: number;
  budget: number;
  hasBudget: boolean;
}

export async function fetchBudgetStatus(
  year: number,
  month: number
): Promise<BudgetData | null> {
  const res = await fetch(`/api/budget/status?year=${year}&month=${month}`);
  if (!res.ok) return null;
  return res.json();
}

export async function upsertBudget(budget: Omit<BudgetData, "hasBudget">) {
  const res = await fetch(`/api/budget`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      year: budget.year,
      month: budget.month,
      amount: budget.budget, // TODO: BE에서 속성명을 amount에서 budget으로 변경
    }),
  });
  if (!res.ok) throw new Error("Failed to save budget");
  return res.json();
}
