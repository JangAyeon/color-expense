import { SupabaseSignUpResponse } from "@repo/types";
import { ApiRoute, AuthRoute } from "../../@constant/api.route";

export const signIn = async (payload: { email: string; password: string }) => {
  const res = await fetch(`/api${ApiRoute.AUTH}${AuthRoute.SIGN_IN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include", // [‼️] 쿠키 포함 필수!
  });

  if (!res.ok) throw new Error("로그인 실패");
  return res.json();
};

export const signOut = async () => {
  await fetch("/api/auth/signout", {
    method: "POST",
    credentials: "include", // 혹시 쿠키 기반이면 포함
  });
};
