import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import BudgetManager from "../../@component/BudgetManager";

export default async function BudgetPage() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const queryClient = new QueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await queryClient.prefetchQuery({
    queryKey: ["budget", year, month],
    queryFn: () =>
      fetch(`${baseUrl}/api/budget/status?year=${year}&month=${month}`, {
        cache: "no-store",
      }).then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      }),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <BudgetManager initialYear={year} initialMonth={month} />
    </HydrationBoundary>
  );
}
