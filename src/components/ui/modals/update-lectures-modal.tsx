"use client";

import { LectureType } from "@/lib/types";
import { Edit, LoaderCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BottomGradient from "../bottom-gradient";
import { Button } from "../button";
import { Input } from "../input";
import InputError from "../input-error";
import { Label } from "../label";
import LabelInputContainer from "../label-input-container";

interface UpdateLecturesModalProps {
  openModal: boolean;
  prevLectures?: LectureType[];
  handleCloseModal: () => void;
}

interface LectureFormType {
  title: string;
  videoUrl: string;
}

const UpdateLecturesModal = ({
  openModal,
  prevLectures,
  handleCloseModal,
}: UpdateLecturesModalProps) => {
  const [globalError, setGlobalError] = useState<string>("");
  const [lectures, setLectures] = useState<
    { title: string; videoUrl: string }[] | []
  >([]);

  useEffect(() => {
    if (prevLectures) {
      setLectures(prevLectures);
    }
  }, [prevLectures]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LectureFormType>();

  const onSubmit = handleSubmit((data: LectureFormType) => {
    setLectures((p) => [...p, data]);
    reset();
  });

  // remove lecture form the lecture array
  const handleRemove = (url: string) => {
    const reminings = lectures.filter((item) => item.videoUrl !== url);
    setLectures(reminings);
  };

  // to edit individual lecture
  const handleEdit = (lec: { title: string; videoUrl: string }) => {
    handleRemove(lec.videoUrl);
    reset(lec);
  };

  // To save to the DB
  const handleSaveLectures = async () => {
    console.log(lectures);
  }

  const isLoading = false;

  return (
    <div
      className={`inset-0 p-3 ${
        openModal
          ? "fixed bg-foreground/20 z-[100] backdrop-blur-sm flex items-center justify-center "
          : "hidden"
      }`}
    >
      <div className="max-w-lg w-full bg-card rounded-lg relative">
        {/* Close modal button */}
        <button
          onClick={() => handleCloseModal()}
          className="h-6 w-6 flex items-center justify-center bg-destructive text-neutral-200 absolute -top-2 -right-2 rounded-full cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="max-h-[90vh]">
          {/* Modal Header */}
          <div className="p-3 border-b border-zinc-300">
            <h3 className="text-xl font-semibold text-center">
              Update Lectures
            </h3>
          </div>

          {/* Modal body */}
          <div className="p-3">
            {/* Lectures */}
            <div className="space-y-2 h-[180px] overflow-y-scroll rounded-md px-2 py-3 shadow-[inset_0_0_10px_2px] shadow-black/20 bg-white">
              {lectures?.length > 0 ? (
                lectures.map((lecture, i) => (
                  <div
                    key={lecture.title + i}
                    className="px-3 py-1.5 bg-neutral-100 rounded-md relative"
                  >
                    <h5 className="text-sm">{`${i + 1}. ${lecture.title}`}</h5>
                    <p className="text-xs -mt-1">{lecture.videoUrl}</p>

                    <div className="absolute right-2 top-0 flex items-center justify-end gap-2 h-full">
                      <button
                        onClick={() => handleEdit(lecture)}
                        className="h-5 w-5 flex items-center justify-center bg-orange-500 text-neutral-200 rounded-full cursor-pointer"
                      >
                        <Edit size={12} />
                      </button>
                      <button
                        onClick={() => handleRemove(lecture.videoUrl)}
                        className="h-5 w-5 flex items-center justify-center bg-destructive text-neutral-200 rounded-full cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm italic h-full w-full flex items-center justify-center text-neutral-600">
                  No lectures added yet!
                </div>
              )}
            </div>

            <form className="mb-1 mt-3" onSubmit={onSubmit}>
              <LabelInputContainer className="mb-2">
                <Label htmlFor="title">Lecture Title</Label>
                <Input
                  id="title"
                  placeholder="Introduction to Web Development"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  isError={!!errors.title}
                  className="h-7"
                />
                {errors.title && (
                  <InputError msg={errors.title.message as string} />
                )}
              </LabelInputContainer>
              <LabelInputContainer className="mb-2">
                <Label htmlFor="videoUrl">Lecture Video URL</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://www.youtube.com/embed/srvUrASNj0s"
                  type="url"
                  {...register("videoUrl", {
                    required: "videoUrl is required",
                  })}
                  isError={!!errors.videoUrl}
                  className="h-7"
                />
                {errors.videoUrl && (
                  <InputError msg={errors.videoUrl.message as string} />
                )}
              </LabelInputContainer>

              {globalError && (
                <p className="text-destructive text-sm mb-2 text-center font-semibold">
                  {globalError}
                </p>
              )}
              <Button
                className="mb-2"
                type="submit"
                variant={"outline"}
                size={"sm"}
              >
                Add Lecture
              </Button>
            </form>
            <Button
              onClick={handleSaveLectures}
              type="submit"
              // color={"primary"}
              className="group/btn relative h-10 w-full rounded-md bg-primary font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                disabled={isLoading}
            >
              {isLoading && <LoaderCircle className="w-6 h-6 animate-spin " />}
              {isLoading ? "Loading..." : "Save Lectures"}
              <BottomGradient />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLecturesModal;
