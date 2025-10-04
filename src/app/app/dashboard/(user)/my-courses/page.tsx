"use client";

import CourseCardSkeleton from "@/components/skeletons/course-card-skeleton";
import CourseCard from "@/components/ui/course-card";
import { useGetMyCoursesQuery } from "@/lib/redux/api";
import Link from "next/link";

const MyCoursesPage = () => {
  const { data: courses, isLoading } = useGetMyCoursesQuery();

  return (
    <div className="min-h-screen p-4 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)] relative">
      <div className="border-b border-foreground/30 pb-2 mb-5">
        <h1 className="text-2xl md:text-3xl font-semibold text-muted-foreground text-center">
          My Courses
        </h1>
      </div>

      {/* Course card container */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : courses && courses?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-neutral-500 dark:text-neutral-400 h-[60vh] flex flex-col items-center justify-center italic">
          You haven&apos;t been enrolled any course yet. <br />
          <Link href="/courses" className="text-primary not-italic underline">Enroll Courses</Link>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
