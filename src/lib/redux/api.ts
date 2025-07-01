import { SignInFormType } from "@/components/ui/sign-in-form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CourseQueryType,
  CourseType,
  CurrentUser,
  GetCoursesType,
} from "../types";

// Union type for either a successful response or a Zod validation error
export type ApiResponse = {
  success: boolean;
  message: string;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    credentials: "include",
  }),
  reducerPath: "api",
  tagTypes: ["CurrentUser", "Courses"],
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiResponse & { data: CurrentUser }, FormData>({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
    }),

    signIn: builder.mutation<
      ApiResponse & { data: CurrentUser },
      SignInFormType
    >({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),

    currentUser: builder.query<CurrentUser, void>({
      query: () => "/auth/current",
      providesTags: ["CurrentUser"],
    }),

    signOutUser: builder.mutation<ApiResponse, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),

    createCourse: builder.mutation<
      ApiResponse & { data: CourseType },
      FormData
    >({
      query: (formData) => ({
        url: "/courses/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Courses"],
    }),

    updateCourse: builder.mutation<
      ApiResponse & { data: CourseType },
      FormData
    >({
      query: (formData) => ({
        url: "/courses/update",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Courses"],
    }),

    getCourses: builder.query<GetCoursesType, CourseQueryType>({
      query: ({ text, sortByPrice, page }: CourseQueryType) =>
        `/courses?text=${text}&sortByPrice=${sortByPrice}&page=${page}`,
      providesTags: ["Courses"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useCurrentUserQuery,
  useSignOutUserMutation,
  useCreateCourseMutation,
  useGetCoursesQuery,
  useUpdateCourseMutation
} = api;
