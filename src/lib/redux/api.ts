import { SignInFormType } from "@/components/ui/sign-in-form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CourseQueryType,
  CourseType,
  CreateLectureBodyType,
  CreateModuleBodyType,
  CurrentUser,
  GetCoursesType,
  UpdateLectureBodyType,
  UpdateModuleBodyType,
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
  tagTypes: ["CurrentUser", "Courses", "Course"],
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

    getCourseContentById: builder.query<CourseType, string>({
      query: (_id) => `/courses/content/${_id}`,
      providesTags: ["Course"],
    }),

    deleteCourseById: builder.mutation<ApiResponse, string>({
      query: (courseId) => ({ url: `/courses/${courseId}`, method: "DELETE" }),
      invalidatesTags: ["Courses"],
    }),

    createModule: builder.mutation<ApiResponse, CreateModuleBodyType>({
      query: (moduleData) => ({
        url: "/courses/module",
        method: "POST",
        body: moduleData,
      }),
      invalidatesTags: ["Course"],
    }),

    updateModule: builder.mutation<ApiResponse, UpdateModuleBodyType>({
      query: (moduleData) => ({
        url: "/courses/module",
        method: "PUT",
        body: moduleData,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteModule: builder.mutation<
      ApiResponse,
      { courseId: string; moduleId: string }
    >({
      query: ({ courseId, moduleId }) => ({
        url: `/courses/module/${courseId}/${moduleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // Lecture apis
    createLecture: builder.mutation<ApiResponse, CreateLectureBodyType>({
      query: (lectureData) => ({
        url: "/courses/lecture",
        method: "POST",
        body: lectureData,
      }),
      invalidatesTags: ["Course"],
    }),

    updateLecture: builder.mutation<ApiResponse, UpdateLectureBodyType>({
      query: (lectureData) => ({
        url: "/courses/lecture",
        method: "PUT",
        body: lectureData,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteLecture: builder.mutation<
      ApiResponse,
      { courseId: string; moduleId: string; lectureId: string }
    >({
      query: ({ courseId, moduleId, lectureId }) => ({
        url: `/courses/lecture/${courseId}/${moduleId}/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    uploadPDF: builder.mutation<ApiResponse & { url: string }, FormData>({
      query: (formData) => ({
        url: "/courses/upload-rsource",
        method: "POST",
        body: formData,
      }),
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
  useDeleteCourseByIdMutation,
  useUpdateCourseMutation,
  useGetCourseContentByIdQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useCreateLectureMutation,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
  useUploadPDFMutation,
} = api;
