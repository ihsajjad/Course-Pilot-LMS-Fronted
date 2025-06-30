"use client";

import AddCourseModal from "@/components/ui/add-course-modal";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/ui/course-card";
import { useGetCoursesQuery } from "@/lib/redux/api";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const AllCourses = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data } = useGetCoursesQuery({ text: "", sortByPrice: "price LtoH" });

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  return (
    <div className="min-h-screen p-4 pb-20 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)] relative">
      <div className="flex items-center justify-between border-b border-foreground/30 pb-2 mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {data?.courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {/* Add Course Modal */}
      <AddCourseModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default AllCourses;
