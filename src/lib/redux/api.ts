import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/index";

// Union type for either a successful response or a Zod validation error
export type ApiResponse = {
  success: boolean;
  message: string;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the Redux state
      const token = (getState() as RootState).authSlice?.user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export const {} = api;
