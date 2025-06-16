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
