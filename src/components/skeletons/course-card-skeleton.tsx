import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="rounded-2xl border bg-card shadow-md overflow-hidden flex flex-col animate-pulse">
      <div className="relative h-40 md:h-48 w-full bg-muted" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="h-4 w-3/4 bg-muted rounded mb-2" />
        <div className="h-3 w-full bg-muted rounded mb-1" />
        <div className="h-3 w-5/6 bg-muted rounded mb-4" />
        <div className="mt-auto flex items-center justify-between">
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-8 w-24 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
