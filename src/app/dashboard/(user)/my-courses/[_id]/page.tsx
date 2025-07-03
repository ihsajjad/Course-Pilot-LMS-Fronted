"use client";
import { useGetCourseByIdQuery } from "@/lib/redux/api";
import { use } from "react";

const SingleCourse = ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id } = use(params);
  const { data: course, isLoading } = useGetCourseByIdQuery(_id);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="min-h-screen p-4 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)] relative">
      {/* Page title */}
      <div className="">
        <h3 className="text-xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
          {course?.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Course Content Area */}
        <div className="col-span-1 border rounded-xl p-3 h-fit sticky top-14"></div>
      </div>
    </div>
  );
};

export default SingleCourse;
