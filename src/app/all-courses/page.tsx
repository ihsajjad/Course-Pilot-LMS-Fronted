"use client";

import AddCourseModal from "@/components/ui/add-course-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const AllCourses = () => {
  const [openModal, setOpenModal] = useState<boolean>(true);

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

      {/* Add Course Modal */}
      <AddCourseModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default AllCourses;
