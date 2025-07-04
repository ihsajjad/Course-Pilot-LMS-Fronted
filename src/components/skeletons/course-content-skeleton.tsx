import React from "react";

const CourseContentSkeleton = () => {
  return (
    <div className="col-span-1 border rounded-xl p-3 h-fit sticky top-14 animate-pulse space-y-4">
      {/* Title */}
      <div className="h-5 w-32 bg-muted rounded" />

      {/* Search Bar Skeleton */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <div className="w-5 h-5 bg-muted rounded-full" />
        </div>
        <div className="w-full h-10 pl-10 bg-muted rounded-md" />
      </div>

      {/* Accordion Skeleton Items */}
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border shadow-sm p-4 space-y-2"
        >
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="space-y-1 mt-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 w-full bg-muted rounded" />
            ))}
          </div>
          <div className="flex items-center gap-2 pt-3">
            <div className="h-8 w-1/2 bg-muted rounded" />
            <div className="h-8 w-1/2 bg-muted rounded" />
          </div>
        </div>
      ))}

      {/* Add Module Button Skeleton */}
      <div className="h-9 w-full bg-muted rounded" />
    </div>
  );
};

export default CourseContentSkeleton;
