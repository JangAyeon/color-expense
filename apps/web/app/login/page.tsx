"use client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../@utils/query/auth";

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
