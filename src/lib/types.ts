export type LectureProgressType = {
  lectureId: string;
  isCompleted: boolean;
};

export type CourseProgressType = {
  courseId: string;
  completedLectures: LectureProgressType[]; // per lecture tracking
};

export type EnrolledCourseType = {
  courseId: string;
  enrolledAt: Date; // ISO date string
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string; // hashed
  profile: string; // Cloudinary URL or optional fallback
  role: "Admin" | "User";
  enrolledCourses: EnrolledCourseType[];
  progress: CourseProgressType;
  createdAt: string;
  updatedAt: string;
};

export type CurrentUser = {
  _id: string;
  name: string;
  email: string;
  profile: string;
  role: "Admin" | "User";
  enrolledCourses: EnrolledCourseType[];
};

// types/lecture.ts

export type LectureType = {
  _id: string;
  title: string;
  videoUrl: string;
  resources: string[];
};

export type ModuleType = {
  _id: string;
  title: string; // e.g. "Module 1: Introduction"
  lectures: LectureType[];
};

export type CourseType = {
  _id: string;
  title: string; // Course title
  description: string; // Full course description
  price: number; // e.g. 499.00
  thumbnail: string; // Cloudinary image URL
  modules: ModuleType[];
};

export type GetCoursesType = {
  courses: CourseType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type CourseQueryType = {
  text: string;
  sortByPrice: "price HtoL" | "price LtoH";
  page: number;
};

export type CreateModuleBodyType = { courseId: string; title: string };

export type UpdateModuleBodyType = {
  courseId: string;
  title: string;
  moduleId: string;
};

export type CreateLectureBodyType = {
  courseId: string;
  moduleId: string;
  title: string;
  videoUrl: string;
  resources: string[];
};

export type UpdateLectureBodyType = CreateLectureBodyType & {
  lectureId: string;
};
