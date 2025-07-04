"use client";

import {
  useAddCompletedLectureMutation,
  useGetCourseProgressQuery,
} from "@/lib/redux/api";
import { ModuleType } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./button";

interface Props {
  currVideo: { mod: number; lec: number };
  modules: ModuleType[];
  setCurrVideo: Dispatch<SetStateAction<{ mod: number; lec: number }>>;
  isAdmin?: boolean;
  courseId: string;
}

const VideoIframe = ({
  currVideo,
  modules,
  setCurrVideo,
  isAdmin,
  courseId,
}: Props) => {
  const [addCompletedLecture] = useAddCompletedLectureMutation();
  const { data } = useGetCourseProgressQuery(courseId);

  const completedLectures = data?.completedLectures || [];

  const { mod, lec } = currVideo;

  // current video url : this is playing
  const videoUrl = modules[mod]?.lectures[lec]?.videoUrl || "";

  const prevMod = modules[mod - 1]?.lectures[lec - 1]?.videoUrl; // prevous module's prevous lecture
  const prevLec = modules[mod]?.lectures[lec - 1]?.videoUrl; // same module's prevous lecture
  const nextMod = modules[mod + 1]?.lectures[lec + 1]?.videoUrl; // next module's next lecture
  const nextLec = modules[mod]?.lectures[lec + 1]?.videoUrl; // same module's next lecture

  const prevLink = prevMod || prevLec;
  const nextLink = nextMod || nextLec;

  const handlePrev = () => {
    if (prevMod) {
      setCurrVideo((p) => ({ mod: p.mod - 1, lec: p.lec - 1 }));
    } else if (prevLec) {
      setCurrVideo((p) => ({ mod: p.mod, lec: p.lec - 1 }));
    }
  };

  const handleNext = async () => {
    // storing the completed lecture id only for users
    const lectureId = modules[mod]?.lectures[lec]?._id;
    const included = !!completedLectures?.includes(lectureId);

    if (!isAdmin && !included) {
      const res = await addCompletedLecture({ courseId, lectureId });

      if (!!res.data && nextMod) {
        setCurrVideo((p) => ({ mod: p.mod + 1, lec: p.lec + 1 }));
      } else if (nextLec) {
        setCurrVideo((p) => ({ mod: p.mod, lec: p.lec + 1 }));
      }
    } else {
      // ending admin in the next lecture
      if (nextMod) {
        setCurrVideo((p) => ({ mod: p.mod + 1, lec: p.lec + 1 }));
      } else if (nextLec) {
        setCurrVideo((p) => ({ mod: p.mod, lec: p.lec + 1 }));
      }
    }
  };

  // getting the total lectures to gues the finished or not
  const totalLectures =
    modules.reduce((acc, module) => acc + module.lectures.length, 0) || 1;
  const isFinished = totalLectures === completedLectures.length;

  return (
    <div className="col-span-1 lg:col-span-2">
      {/* Video */}
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        {videoUrl && (
          <iframe
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <Button onClick={handlePrev} disabled={!prevLink} variant={"ghost"}>
          ⬅️ Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={isFinished && !nextLink}
          variant={"default"}
        >
          Next ➡️
        </Button>
      </div>
    </div>
  );
};

export default VideoIframe;
