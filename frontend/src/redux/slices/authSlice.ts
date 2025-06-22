import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const Roles = {
  CUSTOMER: "CUSTOMER",
  RESTAURANT: "RESTAURANT",
  RIDER: "RIDER",
  ADMIN: "ADMIN",
} as const;

export type RoleType = (typeof Roles)[keyof typeof Roles];

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  isRestaurant: boolean;
  address?: string;
  registrationNumber?: string;
}

export interface AuthState {
  userInfo: User | null;
}

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

const getCookie = (name: string): string | null => {
  try {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};

const deleteCookie = (name: string) => {
  try {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
};

const getUserFromStorage = (): User | null => {
  try {
    // Try localStorage first
    let userInfo = localStorage.getItem("userInfo");

    // If not in localStorage, try cookies
    if (!userInfo) {
      userInfo = getCookie("userInfo");
    }

    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing user info from storage:", error);
    return null;
  }
};

const initialState: AuthState = {
  userInfo: getUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      const userDataString = JSON.stringify(action.payload);

      try {
        // Store in localStorage
        localStorage.setItem("userInfo", userDataString);
        console.log("User data saved to localStorage");
      } catch (error) {
        console.error("Error saving user info to localStorage:", error);
      }

      try {
        // Store in cookies (expires in 7 days)
        setCookie("userInfo", userDataString, 7);
        console.log("User data saved to cookies");
      } catch (error) {
        console.error("Error saving user info to cookies:", error);
      }
    },
    logout: (state) => {
      state.userInfo = null;

      try {
        // Remove from localStorage
        localStorage.removeItem("userInfo");
        console.log("User data removed from localStorage");
      } catch (error) {
        console.error("Error removing user info from localStorage:", error);
      }

      try {
        // Remove from cookies
        deleteCookie("userInfo");
        console.log("User data removed from cookies");
      } catch (error) {
        console.error("Error removing user info from cookies:", error);
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
        try {
          localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        } catch (error) {
          console.error("Error updating user info in localStorage:", error);
        }
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
