// export enum ApiRouteEnum {
//   AUTH = "/auth",
// }

// export enum AuthRoute {
//   SIGN_IN = "/signin",
//   SIGN_UP = "/signup",
//   SIGN_OUT = "/signout",
// }

export const ApiRoute = {
  users: {
    BASE: "/users",
    ME: "/users/me",
  },
  auth: {
    BASE: "/auth",
    SIGN_IN: "/auth/signin",
    SIGN_UP: "/auth/signup",
    SIGN_OUT: "/auth/signout",
  },
  budget: {
    BASE: "/budget",
    GET_STATUS: "/budget/status",
    UPDATE: "/budget",
    GET_HISTORY: "/budget/history",
  },
  expenses: {
    BASE: "/expenses",
    GET_CATEGORY_STATUS: "/expenses/stats/category",
    GET_MONTHLY_STATUS: "/expenses/stats/monthly",
    GET_STREAK: "/expenses/stats/streak",
  },
} as const;

export const ApiMethod = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  put: "PUT",
  delete: "DELETE",
} as const;
