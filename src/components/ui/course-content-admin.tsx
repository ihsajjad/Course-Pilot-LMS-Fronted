"use client";

import {
  useDeleteLectureMutation,
  useDeleteModuleMutation,
} from "@/lib/redux/api";
import { LectureType, ModuleType } from "@/lib/types";
import { errorToast, filterModuleOrLecture, successToast } from "@/lib/utils";
import { Edit, LoaderCircle, Plus, Search, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Button } from "./button";
import { Input } from "./input";

interface CourseContentProps {
  modules: ModuleType[];
  handleOpenModuleModal: (module: ModuleType | null) => void;
  handleOpenLecModal: (lectureModalData: {
    prevLecture: LectureType | null;
    moduleId: string;
  }) => void;
  courseId: string;
  setCurrVideo: Dispatch<SetStateAction<{ mod: number; lec: number }>>;
}

const CourseContentAdmin = ({
  modules,
  handleOpenModuleModal,
  handleOpenLecModal,
  courseId,
  setCurrVideo,
}: CourseContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [deleteModule, { isLoading: isDeletingModule }] =
    useDeleteModuleMutation();
  const [deleteLecture, { isLoading: isDeletingLecture }] =
    useDeleteLectureMutation();

  // To delete module based on id
  const handleDeleteModule = async (courseId: string, moduleId: string) => {
    setDeletingId(moduleId);
    const res = await deleteModule({ courseId, moduleId });
    if (res.data?.success) {
      successToast(res.data?.message);
    } else {
      errorToast(res?.data?.message as string);
    }
  };

  // To delete lecture based on id
  const handleDeleteLecture = async (
    courseId: string,
    moduleId: string,
    lectureId: string
  ) => {
    setDeletingId(lectureId);
    const res = await deleteLecture({ courseId, moduleId, lectureId });
    if (res.data?.success) {
      successToast(res.data?.message);
    } else {
      errorToast(res?.data?.message as string);
    }
  };

  const filteredModules = filterModuleOrLecture(modules, searchTerm);

  return (
    <div className="col-span-1 border rounded-xl p-3 h-fit sticky top-14">
      <h4 className="text-lg font-medium text-neutral-600 dark:text-neutral-300">
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
                {/* Delete module button */}
                <span
                  onClick={() => handleDeleteModule(courseId, module._id)}
                  className="bg-red-400 hover:bg-red-500 h-7 w-7 flex items-center justify-center rounded-full text-white cursor-pointer absolute top-2.5 right-12"
                >
                  {deletingId === module._id ? (
                    <LoaderCircle className="w-5 h-5 animate-spin " />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </span>
              </AccordionTrigger>

              <AccordionContent className="px-2 md:px-4 py-4 bg-background rounded-b-xl flex flex-col gap-1 text-sm text-muted-foreground">
                {module.lectures.length > 0 ? (
                  module.lectures.map((lecture, idx) => (
                    <div
                      key={lecture._id}
                      onClick={() => setCurrVideo({ mod: i, lec: idx })}
                      className="group p-1 md:p-2 md:px-3 text-sm md:text-base rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border cursor-pointer relative"
                    >
                      <span className="font-medium text-neutral-600 dark:text-neutral-300">{`📘 Lecture ${
                        idx + 1
                      }:`}</span>{" "}
                      {lecture.title}
                      {/* buttons */}
                      <div className="absolute right-2 top-0 hidden group-hover:flex items-center justify-end gap-2 h-full">
                        <button
                          onClick={() =>
                            handleOpenLecModal({
                              prevLecture: lecture,
                              moduleId: module._id,
                            })
                          }
                          className="h-6 w-6 flex items-center justify-center bg-orange-500 text-neutral-200 rounded-full cursor-pointer"
                        >
                          <Edit size={12} />
                        </button>

                        {/* Delete lecture button */}
                        <span
                          onClick={() =>
                            handleDeleteLecture(
                              courseId,
                              module._id,
                              lecture?._id
                            )
                          }
                          className="bg-red-400 hover:bg-red-500 h-6 w-6 flex items-center justify-center rounded-full text-white cursor-pointer"
                        >
                          {deletingId === lecture._id ? (
                            <LoaderCircle
                              className="w-5 h-5 animate-spin "
                              size={15}
                            />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="italic text-neutral-600 my-1 text-center">
                    No lectures added yet.
                  </div>
                )}

                <div className="flex items-center justify-between gap-2">
                  <Button
                    onClick={() =>
                      handleOpenLecModal({
                        prevLecture: null,
                        moduleId: module._id,
                      })
                    }
                    className="gap-2 flex-1"
                    variant="default"
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Lecture
                  </Button>
                  <Button
                    onClick={() => handleOpenModuleModal(module)}
                    className="gap-2 flex-1"
                    variant="default"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                    Update Module
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}

        <Button
          variant="default"
          size="sm"
          onClick={() => handleOpenModuleModal(null)}
          className="gap-2 w-full"
        >
          <Plus className="w-4 h-4" />
          Add Module
        </Button>
      </Accordion>
    </div>
  );
};

export default CourseContentAdmin;
