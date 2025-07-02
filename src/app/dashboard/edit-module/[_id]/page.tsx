"use client";
import CourseContent from "@/components/ui/course-content";
import AddUpdateModuleModal from "@/components/ui/modals/add-update-module-modal";
import UpdateLecturesModal from "@/components/ui/modals/update-lectures-modal";
import { useGetCourseByIdQuery } from "@/lib/redux/api";
import { LectureType, ModuleType } from "@/lib/types";
import { use, useState } from "react";

// Dummy data (same as provided in the question)
// const modules: ModuleType[] = [
//   {
//     _id: "mod-1",
//     title: "Introduction to Web Development",
//     lectures: [
//       {
//         _id: "lec-1-1",
//         title: "HTML Fundamentals",
//         videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg",
//         resources: [
//           "https://example.com/resources/html-cheatsheet.pdf",
//           "https://example.com/resources/html-exercises.zip",
//         ],
//       },
//       {
//         _id: "lec-1-2",
//         title: "CSS Basics",
//         videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
//         resources: ["https://example.com/resources/css-reference.pdf"],
//       },
//       {
//         _id: "lec-1-3",
//         title: "Responsive Design",
//         videoUrl: "https://www.youtube.com/embed/srvUrASNj0s",
//         resources: [],
//       },
//     ],
//   },
//   {
//     _id: "mod-2",
//     title: "JavaScript Mastery",
//     lectures: [
//       {
//         _id: "lec-2-1",
//         title: "JavaScript Fundamentals",
//         videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
//         resources: ["https://example.com/resources/js-handbook.pdf"],
//       },
//       {
//         _id: "lec-2-2",
//         title: "DOM Manipulation",
//         videoUrl: "https://www.youtube.com/embed/0ik6X4DJKCc",
//         resources: [
//           "https://example.com/resources/dom-exercises.pdf",
//           "https://example.com/resources/dom-project-starter.zip",
//         ],
//       },
//     ],
//   },
//   {
//     _id: "mod-3",
//     title: "Backend Development",
//     lectures: [
//       {
//         _id: "lec-3-1",
//         title: "Node.js Crash Course",
//         videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
//         resources: ["https://example.com/resources/node-setup.pdf"],
//       },
//       {
//         _id: "lec-3-2",
//         title: "Database Integration",
//         videoUrl: "https://www.youtube.com/embed/ufdHsFClAk0",
//         resources: [],
//       },
//     ],
//   },
// ];

const EditModule = ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id } = use(params);
  const { data: course, isLoading } = useGetCourseByIdQuery(_id);

  const [openModuleModal, setOpenModuleModal] = useState(false);
  const [openUpdateLecModal, setUpdateLecModal] = useState(false);

  const [prevModule, setPrevModule] = useState<ModuleType | null>(null);
  const [prevLecture, setPrevLecture] = useState<LectureType | null>(null);

  if (isLoading) {
    return "Loading...";
  }

  const handleOpenLecModal = (lecture?: LectureType | null) => {
    setPrevLecture(lecture || null);
    setUpdateLecModal(true);
  };

  const handleOpenModuleModal = (module: ModuleType | null) => {
    setPrevModule(module);
    setOpenModuleModal(true);
  };

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
          modules={course?.modules as ModuleType[]}
          handleOpenModuleModal={handleOpenModuleModal}
          handleOpenLecModal={handleOpenLecModal}
        />
      </div>

      {/* Modal to Create or Update Module */}
      <AddUpdateModuleModal
        openModal={openModuleModal}
        handleCloseModal={() => {
          setPrevModule(null);
          setOpenModuleModal(false);
        }}
        prevModule={prevModule}
        courseId={_id}
      />

      {/* Modal to Create or Update Lecture */}
      <UpdateLecturesModal
        openModal={openUpdateLecModal}
        handleCloseModal={() => {
          setPrevLecture(null);
          setUpdateLecModal(false);
        }}
        prevLecture={prevLecture}
      />
    </div>
  );
};

export default EditModule;
