"use client";

import CourseCardSkeleton from "@/components/skeletons/course-card-skeleton";
import AddUpdateCourseModal from "@/components/ui/add-update-course-modal";
import { Button } from "@/components/ui/button";
import CourseCardAdmin from "@/components/ui/course-card-admin";
import CourseQueries from "@/components/ui/course-queries";
import CoursesPagination from "@/components/ui/courses-pagination";
import { useGetCoursesQuery } from "@/lib/redux/api";
import { CourseQueryType, CourseType } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";

const AllCourses = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [query, setQuery] = useState<CourseQueryType>({
    text: "",
    sortByPrice: "price LtoH",
    page: 1,
  });
  const [courseToUpdate, setCourseToUpdate] = useState<CourseType | null>(null);
  const { data, isLoading } = useGetCoursesQuery(query);

  // opening add course modal
  const handleCloseModal = () => {
    setCourseToUpdate(null);
    setOpenModal(false);
  };

  // closing modal
  const handleOpenModal = () => {
    setCourseToUpdate(null);
    setOpenModal(true);
  };

  // open modal with course dat to update
  const handleOpenUpdateModal = (course: CourseType) => {
    setCourseToUpdate(course);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen p-4 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)] relative">
      <div className="flex items-center justify-between border-b border-foreground/30 pb-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
          📚 Manage All Courses
        </h1>
        <Button
          onClick={handleOpenModal}
          className="gap-2"
          variant="default"
          size="sm"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      {/* Course Query */}
      <CourseQueries query={query} setQuery={setQuery} />

      {/* Course card container */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : data?.courses ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.courses.map((course) => (
            <CourseCardAdmin
              key={course._id}
              course={course}
              updateModal={handleOpenUpdateModal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-neutral-500 dark:text-neutral-400 h-[60vh] flex items-center justify-center italic">
          No course available
        </div>
      )}

      {/* Course card container */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.courses.map((course) => (
          <CourseCardAdmin
            key={course._id}
            course={course}
            updateModal={handleOpenUpdateModal}
          />
        ))}
      </div> */}

      {/* pagination */}
      <CoursesPagination
        page={query.page}
        pages={data?.pagination.pages || 1}
        setQuery={setQuery}
      />

      {/* Add or Update Course Modal */}
      <AddUpdateCourseModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        course={courseToUpdate as CourseType}
      />
    </div>
  );
};

export default AllCourses;
