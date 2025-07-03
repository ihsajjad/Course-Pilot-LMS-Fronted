"use client";
import {
  useCreateLectureMutation,
  useUpdateLectureMutation,
} from "@/lib/redux/api";
import {
  CreateLectureBodyType,
  LectureType,
  UpdateLectureBodyType,
} from "@/lib/types";
import { errorToast, successToast } from "@/lib/utils";
import { Edit, LoaderCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BottomGradient from "../bottom-gradient";
import { Button } from "../button";
import { Input } from "../input";
import InputError from "../input-error";
import { Label } from "../label";
import LabelInputContainer from "../label-input-container";
import ManageResources from "../manage-resources";

interface Props {
  openModal: boolean;
  lectureModalData: {
    prevLecture: LectureType | null;
    moduleId: string;
  };
  handleCloseModal: () => void;
  courseId: string;
}

export interface LectureFormType {
  title: string;
  videoUrl: string;
}

const defaultValue: LectureType = {
  _id: "",
  title: "",
  videoUrl: "",
  resources: [],
};

const AddUpdateLecturesModal = ({
  openModal,
  lectureModalData: { prevLecture, moduleId },
  handleCloseModal,
  courseId,
}: Props) => {
  const [globalError, setGlobalError] = useState<string>("");
  const [lecture, setLecture] = useState<LectureType>(defaultValue);

  const [createLecture, { isLoading: isCreating }] = useCreateLectureMutation();
  const [updateLecture, { isLoading: isUpdating }] = useUpdateLectureMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LectureFormType>();

  // resetting existing lecture data to update
  useEffect(() => {
    if (prevLecture) {
      setLecture(prevLecture);
    } else {
      setLecture(defaultValue);
      reset();
    }
  }, [prevLecture?._id]);

  const onSubmit = handleSubmit((data: LectureFormType) => {
    setLecture((p) => ({ ...p, ...data }));
  });

  // to edit individual lecture
  const handleEditLecture = (lec: { title: string; videoUrl: string }) => {
    setLecture((p) => ({ ...p, title: "", videoUrl: "" }));
    reset(lec);
  };

  // To save to the DB
  const handleSaveLectures = async () => {
    const { resources, title, videoUrl } = lecture;

    const lectureId = prevLecture?._id;
    const createData: CreateLectureBodyType = {
      courseId,
      moduleId,
      title,
      videoUrl,
      resources,
    };

    let res;
    if (lectureId) {
      const updateData: UpdateLectureBodyType = {
        ...createData,
        lectureId,
      };
      res = await updateLecture(updateData); // to update exesting course
    } else {
      res = await createLecture(createData); // to create new course
    }

    if (res.data?.success) {
      successToast(res.data?.message);
      handleCloseModal();
      setLecture(defaultValue);
    } else {
      errorToast(res?.data?.message as string);
      setGlobalError(res?.data?.message as string);
    }
  };

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

        <div className="max-h-[90vh] overflow-y-scroll">
          {/* Modal Header */}
          <div className="p-3 border-b border-zinc-300">
            <h3 className="text-xl font-semibold text-center">
              {prevLecture?._id ? "Update " : "Add "} Lecture
            </h3>
          </div>

          {/* Modal body */}
          <div className="p-3">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded-md relative">
              <h4 className="font-semibold">Title: {lecture.title}</h4>
              <p className="text-xs -mt-1">Video URL: {lecture.videoUrl}</p>

              {lecture.title && (
                <div className="absolute right-2 top-0 flex items-center justify-end gap-2 h-full">
                  <button
                    onClick={() =>
                      handleEditLecture({
                        title: lecture.title,
                        videoUrl: lecture.videoUrl,
                      })
                    }
                    className="h-5 w-5 flex items-center justify-center bg-orange-500 text-neutral-200 rounded-full cursor-pointer"
                  >
                    <Edit size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* rendering the lecture form conditionally */}
            {!lecture.title && !lecture.videoUrl && (
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
                  variant={"default"}
                  size={"sm"}
                >
                  Add Lecture
                </Button>
              </form>
            )}

            <ManageResources
              resources={lecture.resources}
              setLecture={setLecture}
              setGlobalError={setGlobalError}
            />

            <Button
              onClick={handleSaveLectures}
              type="submit"
              className="group/btn mt-2 relative h-10 w-full rounded-md bg-primary font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              disabled={isCreating || isUpdating || !lecture.title}
            >
              {(isCreating || isUpdating) && (
                <LoaderCircle className="w-6 h-6 animate-spin " />
              )}
              {isCreating || isUpdating
                ? "Loading..."
                : prevLecture?._id
                ? "Update Lecture"
                : "Add Lecture"}
              <BottomGradient />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateLecturesModal;
