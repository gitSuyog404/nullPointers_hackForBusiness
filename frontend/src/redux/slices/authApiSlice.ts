import { apiSlice } from "./apiSlice";
import { API_ENDPOINTS } from "../../utils/constants";
import type { User } from "./authSlice";

// Define types for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  isRestaurant: boolean;
  address?: string;
  registrationNumber?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
}

// Auth API endpoints
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Register mutation
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Logout mutation
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // Get user profile query
    getUserProfile: builder.query<User, void>({
      query: () => ({
        url: API_ENDPOINTS.USERS.PROFILE,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update user profile mutation
    updateUserProfile: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: API_ENDPOINTS.USERS.UPDATE_PROFILE,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Forgot password mutation
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),

    // Reset password mutation
    resetPassword: builder.mutation<
      { message: string },
      { token: string; password: string }
    >({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
