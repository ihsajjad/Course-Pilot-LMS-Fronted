"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CourseContent from "@/components/ui/course-content";
import { Input } from "@/components/ui/input";
import AddUpdateModuleModal from "@/components/ui/modals/add-update-module-modal";
import { useGetCourseByIdQuery } from "@/lib/redux/api";
import { ModuleType } from "@/lib/types";
import { Plus } from "lucide-react";
import { use, useState } from "react";

const modules: ModuleType[] = [
  {
    _id: "mod-1",
    title: "Introduction to Web Development",
    lectures: [
      {
        _id: "lec-1-1",
        title: "HTML Fundamentals",
        videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg",
      },
      {
        _id: "lec-1-2",
        title: "CSS Basics",
        videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
      },
      {
        _id: "lec-1-3",
        title: "Responsive Design",
        videoUrl: "https://www.youtube.com/embed/srvUrASNj0s",
      },
    ],
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
  },
  {
    _id: "mod-2",
    title: "JavaScript Mastery",
    lectures: [
      {
        _id: "lec-2-1",
        title: "JavaScript Fundamentals",
        videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      },
      {
        _id: "lec-2-2",
        title: "DOM Manipulation",
        videoUrl: "https://www.youtube.com/embed/0ik6X4DJKCc",
      },
    ],
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
  },
  {
    _id: "mod-3",
    title: "Backend Development",
    lectures: [
      {
        _id: "lec-3-1",
        title: "Node.js Crash Course",
        videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
      },
      {
        _id: "lec-3-2",
        title: "Database Integration",
        videoUrl: "https://www.youtube.com/embed/ufdHsFClAk0",
      },
    ],
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
  },
];

const EditModule = ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id } = use(params);
  const { data: course, isLoading } = useGetCourseByIdQuery(_id);

  const [openModuleModal, setOpenModuleModal] = useState(false);

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
        <CourseContent
          modules={modules}
          setOpenModuleModal={() => setOpenModuleModal(true)}
        />
      </div>

      <AddUpdateModuleModal
        openModal={openModuleModal}
        handleCloseModal={() => setOpenModuleModal(false)}
      />
    </div>
  );
};

export default EditModule;
