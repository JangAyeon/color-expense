"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "../@utils/query/auth";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await signOut();

    // 사용자 정보 캐시 제거
    queryClient.removeQueries({ queryKey: ["auth", "me"] });

    // 홈으로 이동
    router.replace("/");
  };

  return { handleLogout };
};
