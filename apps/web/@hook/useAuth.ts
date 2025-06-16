// hooks/useLogout.ts
"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../@utils/query/auth";
import { queryFns, queryKeys } from "../@utils/query/query.control";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: handleLogout,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: queryFns.auth.signOut,
    onSuccess: () => {
      // 캐시 제거
      queryClient.removeQueries({ queryKey: queryKeys.auth.base });

      // 홈으로 이동
      router.replace("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패", error);
    },
  });

  return { handleLogout, isPending, isError, error };
};
