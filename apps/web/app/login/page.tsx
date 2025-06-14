"use client";
import { useMutation } from "@tanstack/react-query";

export const signIn = async (payload: { email: string; password: string }) => {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include", // [‼️] 쿠키 포함 필수!
  });

  if (!res.ok) throw new Error("로그인 실패");
  return res.json();
};

export default function LoginPage() {
  const { mutate } = useMutation({ mutationFn: signIn });

  return (
    <button
      onClick={() =>
        mutate({ email: "test1@example.com", password: "testDEV1234!" })
      }
    >
      로그인
    </button>
  );
}
