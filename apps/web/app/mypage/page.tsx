import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import UserProfile from "../../@component/UserProfile";
import { queryKeys } from "../../@utils/query/query.control";

export default async function MyPage() {
  const queryClient = new QueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.base,
    queryFn: () =>
      fetch(`${baseUrl}/api/users/me`, {
        cache: "no-store",
      }).then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserProfile />
    </HydrationBoundary>
  );
}
