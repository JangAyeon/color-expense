// hooks/useAuth.ts
"use client";

import { AuthUser } from "@repo/types";

export const fetchMe = async (): Promise<AuthUser> => {
  const res = await fetch(`/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 쿠키로 access-token 전달
  });

  if (res.status === 404) {
    throw new Error("유저를 찾을 수 없습니다");
  }

  if (!res.ok) {
    throw new Error("인증 실패");
  }

  return res.json();
};
// hooks/useAuth.ts 또는 hooks/useUpdateProfile.ts

export const updateMe = async (
  data: Pick<AuthUser, "name" | "email" | "phone">
): Promise<AuthUser> => {
  const res = await fetch(`/api/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // access_token 쿠키로 전달
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("정보 수정 실패");
  }

  return res.json();
};
