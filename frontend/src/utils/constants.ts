export const BASE_URL = import.meta.env.PROD
  ? "https://breezy-carpets-wash.loca.lt"
  : "http://localhost:5000/api";

export const USER_URL = "/users";

export const APP_NAME = "Food Rescue";
export const APP_VERSION = "1.0.0";

export const STORAGE_KEYS = {
  USER_INFO: "userInfo",
  THEME: "theme",
  LANGUAGE: "language",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  USERS: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    DELETE_ACCOUNT: "/users/account",
  },
  RESTAURANTS: {
    LIST: "/restaurants",
    CREATE: "/restaurants",
    UPDATE: "/restaurants",
    DELETE: "/restaurants",
  },
  FOOD: {
    LIST: "/food",
    CREATE: "/food",
    UPDATE: "/food",
    DELETE: "/food",
    CLAIM: "/food/claim",
  },
  ORDERS: {
    LIST: "/orders",
    CREATE: "/orders",
    UPDATE: "/orders",
    CANCEL: "/orders/cancel",
  },
} as const;
