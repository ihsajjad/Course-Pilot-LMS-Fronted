"use client";
import CourseContentSkeleton from "@/components/skeletons/course-content-skeleton";
import VideoSkeleton from "@/components/skeletons/video-skeleton";
import CourseContent from "@/components/ui/course-content";
import VideoIframe from "@/components/ui/video-iframe";
import { useGetCourseContentByIdQuery } from "@/lib/redux/api";
import { ModuleType } from "@/lib/types";
import { use, useEffect, useState } from "react";

const SingleCourse = ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id } = use(params);
  const { data: course, isLoading } = useGetCourseContentByIdQuery(_id);

  const [currVideo, setCurrVideo] = useState<{ mod: number; lec: number }>({
    mod: 0,
    lec: 0,
  });

  // setting initial video after loading data
  useEffect(() => {
    if (course?.modules[0]?.lectures[0]?.videoUrl) {
      setCurrVideo({ mod: 0, lec: 0 });
    }
  }, [course]);

  return (
    <div className="min-h-screen p-4 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)] relative">
      {/* Page title */}
      <div className="">
        <h3 className="text-xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
          {course?.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <VideoSkeleton />
        ) : (
          <VideoIframe
            currVideo={currVideo}
            modules={course?.modules as ModuleType[]}
            setCurrVideo={setCurrVideo}
            courseId={course?._id || ""}
            isAdmin
          />
        )}

        {/* Course Content Area */}
        {isLoading ? (
          <CourseContentSkeleton />
        ) : (
          <CourseContent
            modules={course?.modules as ModuleType[]}
            setCurrVideo={setCurrVideo}
            courseId={course?._id || ""}
            mod={currVideo.mod}
            lec={currVideo.lec}
          />
        )}
      </div>
    </div>
  );
};

export default SingleCourse;
