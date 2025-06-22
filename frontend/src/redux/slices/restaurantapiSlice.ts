import { apiSlice } from "./apiSlice";

export interface FoodItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  available: boolean;
  image?: string | File;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFoodItemRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  available: boolean;
  image?: File;
}

export interface FoodItemResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  available: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface FoodItemsListResponse {
  status: string;
  data: FoodItemResponse[];
  message?: string;
}

export interface CreateFoodItemResponse {
  status: string;
  data: FoodItemResponse;
  message?: string;
}

export const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFoodItem: builder.mutation<
      CreateFoodItemResponse,
      CreateFoodItemRequest
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("quantity", data.quantity.toString());
        formData.append("available", data.available.toString());

        if (data.image) {
          formData.append("image", data.image);
        }

        return {
          url: "/api/food-items/create",
          method: "POST",
          body: formData,
          credentials: "include",
          prepareHeaders: (headers: any) => {
            headers.delete("content-type");
            return headers;
          },
        };
      },
      invalidatesTags: ["FoodItem"],
    }),

    getFoodItems: builder.query<FoodItemsListResponse, void>({
      query: () => ({
        url: "/api/food-items/list",
        method: "GET",
      }),
      providesTags: ["FoodItem"],
    }),
  }),
});

export const { useCreateFoodItemMutation, useGetFoodItemsQuery } =
  restaurantApiSlice;
