"use client";

import { useDeleteCourseByIdMutation } from "@/lib/redux/api";
import { CourseType } from "@/lib/types";
import { errorToast, successToast } from "@/lib/utils";
import { LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

const CourseCardAdmin = ({
  course,
  updateModal,
}: {
  course: CourseType;
  updateModal: (course: CourseType) => void;
}) => {
  const [deleteCourse, { isLoading: isDeleting }] =
    useDeleteCourseByIdMutation();

  const handleDeleteCourse = async (id: string) => {
    const res = await deleteCourse(id);
    if (res.data?.success) {
      successToast(res.data?.message);
    } else {
      errorToast(res?.data?.message as string);
    }
  };

  return (
    <div
      key={course._id}
      className="rounded-2xl border bg-card shadow-md overflow-hidden flex flex-col"
    >
      <div className="relative h-40 md:h-48 w-full">
        <Image
          src={course.thumbnail}
          alt={course.title}
          height={100}
          width={200}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-1 line-clamp-1">
          {course.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-medium text-primary">৳ {course.price}</span>

          <div className="flex gap-2">
            <button
              onClick={() => handleDeleteCourse(course._id)}
              className="bg-red-500 w-7 h-7 rounded-md flex items-center justify-center text-white"
            >
              {isDeleting ? (
                <LoaderCircle className="w-5 h-5 animate-spin " />
              ) : (
                <Trash2 size={20} />
              )}
            </button>
            <Link
              href={`/dashboard/edit-module/${course._id}`}
              className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-2 rounded-md flex items-center justify-center"
            >
              Edit Modules
            </Link>
            <Button size="sm" onClick={() => updateModal(course)}>
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardAdmin;
