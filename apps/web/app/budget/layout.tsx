// app/budget/layout.tsx
import { cookies } from "next/headers";
import React, { ReactNode } from "react";
import { fetchUserProfile } from "../../@utils/apis/user";
import { queryKeys } from "../../@utils/query/query.control";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchBudgetStatus } from "../../@utils/apis/budget";
export default async function BudgetLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { year?: string; month?: string };
}) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;

  const today = new Date();
  const year = parseInt(searchParams?.year ?? today.getFullYear().toString());
  const month = parseInt(
    searchParams?.month ?? (today.getMonth() + 1).toString()
  );

  if (!access_token) {
    return <div>No access token</div>;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["budget", year, month],
    queryFn: () => fetchBudgetStatus(year, month, access_token),
  });

  const dehydratedState = dehydrate(queryClient);

  console.log(queryClient.getQueryState(["budget", year, month]));
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
