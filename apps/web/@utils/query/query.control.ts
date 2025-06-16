import { AuthUser } from "@repo/types";
import { fetchMe, updateMe } from "./user";
import { signOut } from "./auth";

export enum QUERY_KEYS {
  USER = "USER",
  ME = "ME",
  DETAIL = "DETAIL",
  AUTH = "AUTH",
}

export const queryKeys = {
  auth: {
    base: [QUERY_KEYS.AUTH] as const,
  },
  user: {
    base: [QUERY_KEYS.USER, QUERY_KEYS.ME] as const,
    detail: (id: string) => [...queryKeys.user.base, "detail", id] as const, // 안 쓰는 거
  },
};
export const queryFns = {
  user: {
    getMe: fetchMe as () => Promise<AuthUser>,
    updateMe: updateMe as (
      data: Pick<AuthUser, "name" | "email" | "phone">
    ) => Promise<AuthUser>,
  },
  auth: {
    signOut: signOut as () => Promise<void>,
  },
};
