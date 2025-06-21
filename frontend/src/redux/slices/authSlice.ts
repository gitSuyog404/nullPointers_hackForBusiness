import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  isRestaurant: boolean;
  address?: string;
  registrationNumber?: string;
}

export interface AuthState {
  userInfo: User | null;
}

const getUserFromStorage = (): User | null => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing user info from localStorage:", error);
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
      try {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error saving user info to localStorage:", error);
      }
    },
    logout: (state) => {
      state.userInfo = null;
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        console.error("Error removing user info from localStorage:", error);
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
