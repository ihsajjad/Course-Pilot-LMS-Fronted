"use client";

import CourseCard from "@/components/ui/course-card";
import CourseQueries from "@/components/ui/course-queries";
import CoursesPagination from "@/components/ui/courses-pagination";
import { useGetCoursesQuery } from "@/lib/redux/api";
import { CourseQueryType } from "@/lib/types";
import { useState } from "react";

const CoursesPage = () => {
  const [query, setQuery] = useState<CourseQueryType>({
    text: "",
    sortByPrice: "price LtoH",
    page: 1,
  });
  const { data } = useGetCoursesQuery(query);

  return (
    <div className="min-h-screen p-4 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)] relative">
      <div className="border-b border-foreground/30 pb-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-muted-foreground text-center">
          All Courses
        </h1>
      </div>

      {/* Course Query */}
      <CourseQueries query={query} setQuery={setQuery} />

      {/* Course card container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {/* pagination */}
      <CoursesPagination
        page={query.page}
        pages={data?.pagination.pages || 1}
        setQuery={setQuery}
      />
    </div>
  );
};

export default CoursesPage;
