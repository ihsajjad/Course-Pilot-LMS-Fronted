import React from "react";

const VideoSkeleton = () => {
  return (
    <div className="col-span-1 lg:col-span-2 animate-pulse space-y-4">
      {/* Video Skeleton */}
      <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted" />

      {/* Navigation Buttons Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="h-10 w-28 rounded-md bg-muted" />
        <div className="h-10 w-28 rounded-md bg-muted" />
      </div>
    </div>
  );
};

export default VideoSkeleton;
