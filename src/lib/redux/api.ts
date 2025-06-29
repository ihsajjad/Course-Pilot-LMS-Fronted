import { SignUpFormType } from "@/components/ui/sign-up-form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/index";
import { SignInFormType } from "@/components/ui/sign-in-form";

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
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiResponse, FormData>({
      query: (formData) => ({
        url: "/api/user/register",
        method: "POST",
        body: formData,
      }),
    }),

    signIn: builder.mutation<ApiResponse, SignInFormType>({
      query: (loginData) => ({
        url: "/api/user/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = api;
