"use client";

import { ModuleType } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Input } from "./input";
import { useGetCourseProgressQuery } from "@/lib/redux/api";

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
  const { data, isLoading } = useGetCourseProgressQuery(courseId);

  const completedLectures = data?.completedLectures || [];
  console.log(completedLectures);

  const videoUrl = modules[mod]?.lectures[lec]?.videoUrl || "";
  return (
    <div className="col-span-1 border rounded-xl p-3 h-fit sticky top-14">
      <h4 className="text-lg font-medium text-neutral-600 dark:text-neutral-300">
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
                    const isCompleted = !!completedLectures.includes(
                      lecture._id
                    );
                    console.log("isCompleted :", isCompleted);
                    return (
                      <div
                        key={lecture._id}
                        onClick={() => setCurrVideo({ mod: i, lec: idx })}
                        className="group p-1 md:p-2 md:px-3 text-sm md:text-base rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border cursor-pointer relative"
                      >
                        {videoUrl === lecture.videoUrl ? (
                          <>
                            <span className="font-medium text-neutral-600 dark:text-neutral-300">{`P Lecture ${
                              idx + 1
                            }:`}</span>{" "}
                            {lecture.title}
                          </>
                        ) : isCompleted ? (
                          <>
                            <span className="font-medium text-neutral-600 dark:text-neutral-300">{`📘 Lecture ${
                              idx + 1
                            }:`}</span>{" "}
                            {lecture.title}
                          </>
                        ) : (
                          <>
                            <span className="font-medium text-neutral-600 dark:text-neutral-300">{`L Lecture ${
                              idx + 1
                            }:`}</span>{" "}
                            {lecture.title}
                          </>
                        )}
                      </div>
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
