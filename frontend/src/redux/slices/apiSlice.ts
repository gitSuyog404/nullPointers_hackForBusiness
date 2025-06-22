import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../utils/constants";
import type { RootState } from "../store";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const state = getState() as RootState;
      const token = state.auth.userInfo?.id;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // Check if the request body is FormData
      const args = endpoint as any;
      const isFormData = args?.body instanceof FormData;

      // Don't set content-type for FormData requests - let browser set multipart/form-data
      if (!isFormData) {
        headers.set("content-type", "application/json");
      }

      return headers;
    },
  });

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Restaurant", "Food", "Order", "FoodItem"],
  endpoints: () => ({}),
});
