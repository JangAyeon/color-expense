"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "../@utils/query/auth";
import { queryKeys } from "../@utils/query/query.keys";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await signOut();

    // 사용자 정보 캐시 제거
    queryClient.removeQueries({ queryKey: queryKeys.auth.base });

    // 홈으로 이동
    router.replace("/");
  };

  return { handleLogout };
};
