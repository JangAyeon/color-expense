import { SupabaseSignUpRequest, SupabaseSignInRequest } from "@repo/types";
import { ApiRoute, AuthRoute } from "../../@constant/api.route";

export const signIn = async (data: SupabaseSignInRequest) => {
  const res = await fetch(`/api${ApiRoute.AUTH}${AuthRoute.SIGN_IN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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

export const signUp = async (data: SupabaseSignUpRequest) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("회원가입 실패");
  }
};
