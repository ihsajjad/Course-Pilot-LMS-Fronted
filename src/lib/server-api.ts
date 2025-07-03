import { CourseType } from "./types";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCoursePageById = async (courseId: string): Promise<CourseType> => {
  const res = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};
