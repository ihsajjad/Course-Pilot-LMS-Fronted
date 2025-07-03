"use client";
import CourseContent from "@/components/ui/course-content";
import AddUpdateModuleModal from "@/components/ui/modals/add-update-module-modal";
import UpdateLecturesModal from "@/components/ui/modals/update-lectures-modal";
import VideoIframe from "@/components/ui/video-iframe";
import { useGetCourseByIdQuery } from "@/lib/redux/api";
import { CourseType, LectureType, ModuleType } from "@/lib/types";
import { use, useEffect, useState } from "react";

const EditModule = ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id } = use(params);
  const { data: course, isLoading } = useGetCourseByIdQuery(_id);

  const [openModuleModal, setOpenModuleModal] = useState(false);
  const [openUpdateLecModal, setUpdateLecModal] = useState(false);
  const [prevModule, setPrevModule] = useState<ModuleType | null>(null);
  const [lectureModalData, setLectureModalData] = useState<{
    prevLecture: LectureType | null;
    moduleId: string;
  }>({ prevLecture: null, moduleId: "" });
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

  if (isLoading) {
    return "Loading...";
  }

  const handleOpenLecModal = ({
    prevLecture,
    moduleId,
  }: {
    prevLecture: LectureType | null;
    moduleId: string;
  }) => {
    setLectureModalData({ prevLecture, moduleId });
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
        <h3 className="text-xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
          {course?.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <VideoIframe currVideo={currVideo} modules={course?.modules as ModuleType[]} setCurrVideo={setCurrVideo} />

        {/* Course Content Area */}
        <CourseContent
          modules={course?.modules as ModuleType[]}
          handleOpenModuleModal={handleOpenModuleModal}
          handleOpenLecModal={handleOpenLecModal}
          courseId={_id}
          setCurrVideo={setCurrVideo}
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
          setLectureModalData({ prevLecture: null, moduleId: "" });
          setUpdateLecModal(false);
        }}
        lectureModalData={lectureModalData}
        courseId={_id}
      />
    </div>
  );
};

export default EditModule;
