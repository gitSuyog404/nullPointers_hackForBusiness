import { apiSlice } from "./apiSlice";
import { BASE_URL, USER_URL } from "../../utils/constants";
import type { User, RoleType } from "./authSlice";

export { Roles } from "./authSlice";
export type { RoleType } from "./authSlice";

export type Roles = RoleType;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CustomerSignUpRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface RestaurantSignUpRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  registrationNumber: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
}
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: `${BASE_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    userLogout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserProfile: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    customerSignUp: builder.mutation<AuthResponse, CustomerSignUpRequest>({
      query: (data) => ({
        url: `${BASE_URL}/register/customer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    restaurantSignUp: builder.mutation<AuthResponse, RestaurantSignUpRequest>({
      query: (data) => ({
        url: `${BASE_URL}/register/restaurant`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: string }>({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: `${USER_URL}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useUserLogoutMutation,
  useUpdateUserProfileMutation,
  useCustomerSignUpMutation,
  useRestaurantSignUpMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = usersApiSlice;
