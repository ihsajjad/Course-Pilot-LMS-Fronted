"use client";

import { useGetCourseProgressQuery } from "@/lib/redux/api";
import { ModuleType } from "@/lib/types";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import CourseProgress from "./course-progress";
import { Input } from "./input";

interface CourseContentProps {
  modules: ModuleType[];
  setCurrVideo: Dispatch<SetStateAction<{ mod: number; lec: number }>>;
  courseId: string;
  mod: number;
  lec: number;
}

const CourseContent = ({
  modules,
  setCurrVideo,
  mod,
  lec,
  courseId,
}: CourseContentProps) => {
  const { data } = useGetCourseProgressQuery(courseId);

  const completedLectures = data?.completedLectures || [];

  // claclulating course progress
  const totalLectures =
    modules.reduce((acc, module) => acc + module.lectures.length, 0) || 1;
  const completedLength = completedLectures.length || 1;

  const progressPercentage = (completedLength / totalLectures) * 100;

  // Playing video link
  const videoUrl = modules[mod]?.lectures[lec]?.videoUrl || "";
  return (
    <div className="col-span-1 border rounded-xl p-3 h-fit sticky top-14">
      <CourseProgress progressPercentage={progressPercentage} />
      <h4 className="text-lg font-medium text-neutral-600 dark:text-neutral-300 mt-2">
        Course Content
      </h4>

      <Input
        type="text"
        placeholder="Search by title or description"
        className=""
      />

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4 mt-3"
        defaultValue={modules[0]?._id}
      >
        {modules &&
          modules.map((module, i) => (
            <AccordionItem
              key={module._id}
              value={module._id}
              className="rounded-xl border border-border shadow-sm transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-4 py-3 bg-muted hover:bg-muted/60 relative">
                {`Module ${i + 1}: ${module.title}`}{" "}
              </AccordionTrigger>

              <AccordionContent className="px-2 md:px-4 py-4 bg-background rounded-b-xl flex flex-col gap-1 text-sm text-muted-foreground">
                {module.lectures.length > 0 ? (
                  module.lectures.map((lecture, idx) => {
                    // cheking is the lecture completed before
                    const isLocked = !completedLectures.includes(lecture._id);

                    return (
                      <button
                        key={lecture._id}
                        onClick={() => setCurrVideo({ mod: i, lec: idx })}
                        disabled={isLocked}
                        className={`flex gap-1 justify-start w-full group p-1 md:p-2 md:px-3 text-sm md:text-base rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border relative ${
                          isLocked ? "cursor-default" : "cursor-pointer"
                        }`}
                      >
                        {videoUrl === lecture.videoUrl ? (
                          <span className="w-fit h-fit flex items-center gap-1 font-medium text-primary whitespace-nowrap">
                            <PlayCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{`Lecture ${idx + 1}:`}</span>
                          </span>
                        ) : isLocked ? (
                          <span className="w-fit h-fit flex items-center gap-1 font-medium text-muted-foreground whitespace-nowrap">
                            <Lock className="w-4 h-4 flex-shrink-0" />
                            <span>{`Lecture ${idx + 1}:`}</span>
                          </span>
                        ) : (
                          <span className="w-fit h-fit flex items-center gap-1 font-medium text-green-500 whitespace-nowrap">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            <span>{`Lecture ${idx + 1}:`}</span>
                          </span>
                        )}
                        <p className="grow text-left">{lecture.title}</p>
                      </button>
                    );
                  })
                ) : (
                  <div className="italic text-neutral-600 my-1 text-center">
                    No lectures added yet.
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default CourseContent;
