import { CourseType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { Button } from "./button";

const CourseCard = ({ course }: { course: CourseType }) => {
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
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Edit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
