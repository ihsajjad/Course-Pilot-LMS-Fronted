"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetCourseByIdQuery } from "@/lib/redux/api";
import { ChevronDown, Plus } from "lucide-react";
import React, { use } from "react";

const modules = [
  {
    id: "mod-1",
    title: "Introduction to Web Development",
    lectures: [
      {
        id: "lec-1-1",
        title: "HTML Fundamentals",
        videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg",
        resources: [
          {
            name: "HTML Cheat Sheet",
            url: "https://example.com/resources/html-cheatsheet.pdf",
          },
          {
            name: "Exercise Files",
            url: "https://example.com/resources/html-exercises.zip",
          },
        ],
        isLocked: false,
        isCompleted: true,
      },
      {
        id: "lec-1-2",
        title: "CSS Basics",
        videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
        resources: [
          {
            name: "CSS Reference Guide",
            url: "https://example.com/resources/css-reference.pdf",
          },
        ],
        isLocked: false,
        isCompleted: true,
      },
      {
        id: "lec-1-3",
        title: "Responsive Design",
        videoUrl: "https://www.youtube.com/embed/srvUrASNj0s",
        resources: [],
        isLocked: false,
        isCompleted: false,
      },
    ],
  },
  {
    id: "mod-2",
    title: "JavaScript Mastery",
    lectures: [
      {
        id: "lec-2-1",
        title: "JavaScript Fundamentals",
        videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
        resources: [
          {
            name: "JS Syntax Handbook",
            url: "https://example.com/resources/js-handbook.pdf",
          },
        ],
        isLocked: false,
        isCompleted: true,
      },
      {
        id: "lec-2-2",
        title: "DOM Manipulation",
        videoUrl: "https://www.youtube.com/embed/0ik6X4DJKCc",
        resources: [
          {
            name: "DOM Exercises",
            url: "https://example.com/resources/dom-exercises.pdf",
          },
          {
            name: "Project Starter Kit",
            url: "https://example.com/resources/dom-project-starter.zip",
          },
        ],
        isLocked: true,
        isCompleted: false,
      },
    ],
  },
  {
    id: "mod-3",
    title: "Backend Development",
    lectures: [
      {
        id: "lec-3-1",
        title: "Node.js Crash Course",
        videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
        resources: [
          {
            name: "Node.js Setup Guide",
            url: "https://example.com/resources/node-setup.pdf",
          },
        ],
        isLocked: true,
        isCompleted: false,
      },
      {
        id: "lec-3-2",
        title: "Database Integration",
        videoUrl: "https://www.youtube.com/embed/ufdHsFClAk0",
        resources: [],
        isLocked: true,
        isCompleted: false,
      },
    ],
  },
];

const EditModule = ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id } = use(params);
  const { data: course, isLoading } = useGetCourseByIdQuery(_id);

  if (isLoading) {
    return "Loading...";
  }

  console.log(course);
  return (
    <div className="min-h-screen p-4 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)] relative">
      {/* Page title */}
      <div className="">
        <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
          {course?.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-1 lg:col-span-2 border"></div>

        {/* Course Content Area */}
        <div className="col-span-1 border rounded-xl p-3">
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
            defaultValue={modules[0]?.id}
          >
            {modules.map((module, i) => (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="rounded-xl border border-border shadow-sm transition-all hover:shadow-md"
              >
                <AccordionTrigger className="px-4 py-3 bg-muted hover:bg-muted/60 ">
                  {`Module ${i + 1}: ${module.title}`}
                </AccordionTrigger>

                <AccordionContent className="px-2 md:px-4 py-4 bg-background rounded-b-xl flex flex-col gap-1 text-sm text-muted-foreground">
                  {module.lectures.length > 0 ? (
                    module.lectures.map((lecture, idx) => (
                      <div
                        key={lecture.id}
                        className="p-1 md:p-2 md:px-3 text-sm md:text-base rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border cursor-pointer"
                      >
                        <span className="font-medium text-neutral-600 dark:text-neutral-300">{`📘 Lecture ${
                          idx + 1
                        }:`}</span>{" "}
                        {lecture.title}
                      </div>
                    ))
                  ) : (
                    <div className="italic text-muted">
                      No lectures added yet.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}

            <Button className="gap-2 w-full" variant="default" size="sm">
              <Plus className="w-4 h-4" />
              Add Module
            </Button>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default EditModule;
