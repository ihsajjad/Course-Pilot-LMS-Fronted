"use client";

import { useGetCourseProgressQuery } from "@/lib/redux/api";
import { ModuleType } from "@/lib/types";
import { filterModuleOrLecture } from "@/lib/utils";
import { CheckCircle2, Lock, PlayCircle, Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import CourseProgress from "./course-progress";
import { Input } from "./input";
import LectureResources from "./lecture-resources";

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
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetCourseProgressQuery(courseId);

  const completedLectures = data?.completedLectures || [];

  // claclulating course progress
  const totalLectures =
    modules.reduce((acc, module) => acc + module.lectures.length, 0) || 1;
  const completedLength = completedLectures.length;

  const progressPercentage = (completedLength / totalLectures) * 100;

  // Playing video link
  const videoUrl = modules[mod]?.lectures[lec]?.videoUrl || "";

  const filteredModules = filterModuleOrLecture(modules, searchTerm);

  return (
    <div className="col-span-1 border rounded-xl p-3 h-fit sticky top-14">
      <CourseProgress progressPercentage={progressPercentage} />
      <h4 className="text-lg font-medium text-neutral-600 dark:text-neutral-300 mt-2">
        Course Content
      </h4>

      {/* Search area */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>
        <Input
          type="text"
          placeholder="Search by module or lecture title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="pl-10"
        />
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4 mt-3"
        defaultValue={filteredModules[0]?._id}
      >
        {filteredModules &&
          filteredModules.map((module, i) => (
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
                    const isPlaying = videoUrl === lecture.videoUrl;
                    return (
                      <div
                        key={lecture._id}
                        className={`group p-1 md:p-2 md:px-3 text-sm md:text-base rounded-md hover:bg-muted transition-colors border  hover:border-border relativ ${isPlaying ? "border-border bg-muted": "border-transparent"}`}
                      >
                        <button
                          onClick={() => setCurrVideo({ mod: i, lec: idx })}
                          disabled={isLocked}
                          className={`flex gap-1 justify-start w-full e ${
                            isLocked ? "cursor-default" : "cursor-pointer"
                          }`}
                        >
                          {isPlaying ? (
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
                        {/* Lecture resrouces */}
                        {lecture?.resources?.length > 0 && (
                          <LectureResources resources={lecture.resources} />
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
