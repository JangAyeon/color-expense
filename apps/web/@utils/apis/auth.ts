import {
  AuthUser,
  SupabaseSignInResponse,
  SupabaseSignUpResponse,
} from "@repo/types";
import { ApiRoute, AuthRoute } from "../../@constant/api.route";

interface SupabaseSignInRequest {
  email: AuthUser["email"];
  password: string;
}

interface SupabaseSignUpRequest {
  email: AuthUser["email"];
  password: string;
}

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

export const fetchSignIn = async (
  data: SupabaseSignInRequest
): Promise<SupabaseSignInResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiRoute.AUTH}${AuthRoute.SIGN_IN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("로그인 실패");
  return res.json();
};

export const fetchSignUp = async (
  data: SupabaseSignUpRequest
): Promise<SupabaseSignUpResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiRoute.AUTH}${AuthRoute.SIGN_UP}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("회원가입 실패");
  return res.json();
};
