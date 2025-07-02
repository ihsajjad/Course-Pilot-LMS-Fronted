"use client";

import { CourseType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { LoaderCircle, Trash, Trash2 } from "lucide-react";
import { useDeleteCourseByIdMutation } from "@/lib/redux/api";
import { errorToast, successToast } from "@/lib/utils";

const CourseCard = ({
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
          fill
          className="object-cover"
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
            <Button
              onClick={() => handleDeleteCourse(course._id)}
              variant={"destructive"}
              size={"sm"}
            >
              {isDeleting ? (
                <LoaderCircle className="w-6 h-6 animate-spin " />
              ) : (
                <Trash2 />
              )}
            </Button>
            <Link
              href={`/dashboard/edit-module/${course._id}`}
              className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-2 rounded-md flex items-center justify-center"
            >
              View Details
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

export default CourseCard;
