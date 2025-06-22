// app/mypage/layout.tsx
import { cookies } from "next/headers";
import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { queryKeys } from "../../@utils/query/query.control";
import { fetchUserProfile } from "../../@utils/apis/user";
export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;
  console.log(cookieStore.getAll());
  if (!access_token) {
    return <div>No access token</div>;
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.base,
    queryFn: () => fetchUserProfile(access_token),
    staleTime: 1000 * 60 * 5,
  });
  const dehydratedState = dehydrate(queryClient);
  console.log(queryClient.getQueryState(queryKeys.user.base));
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <div>토큰: {access_token}</div>
        {children}
      </HydrationBoundary>
    </>
  );
}
