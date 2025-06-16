// hooks/useAuth.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { AuthUser } from "@repo/types";
import { fetchMe } from "../@utils/query/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../@utils/query/user";
import { queryFns, queryKeys } from "../@utils/query/query.control";

export const useGetMyInfo = () => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<AuthUser>({
    queryKey: queryKeys.user.base,
    queryFn: queryFns.user.getMe,
    retry: false, // 로그인 실패 시 재시도 없음
  });

  return { user, isLoading, isError, refetch };
};

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: queryFns.user.updateMe,
    onSuccess: (updatedUser) => {
      // 'auth/me' 쿼리 캐시 갱신
      queryClient.setQueryData(queryKeys.user.base, updatedUser);
    },
  });
};
