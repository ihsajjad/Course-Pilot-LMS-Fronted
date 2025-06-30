"use client";
import { LoaderCircle, X } from "lucide-react";
import LabelInputContainer from "./label-input-container";
import { Label } from "./label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "./input";
import InputError from "./input-error";
import { Button } from "./button";
import BottomGradient from "./bottom-gradient";
import { Textarea } from "./textarea";
import { useCreateCourseMutation } from "@/lib/redux/api";
import { errorToast, successToast } from "@/lib/utils";

interface AddCourseModal {
  openModal: boolean;
  handleCloseModal: () => void;
}

export interface CourseFormType {
  title: string;
  description: string;
  price: number;
  thumbnail: FileList;
}

const AddCourseModal = ({ openModal, handleCloseModal }: AddCourseModal) => {
  const [globalError, setGlobalError] = useState<string>("");
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormType>();

  const onSubmit = handleSubmit(async (data: CourseFormType) => {
    setGlobalError("");

    // converting data into form data to send to the server because it has a file
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("thumbnail", data.thumbnail[0]);

    const res = await createCourse(formData);
    if (res.data?.success) {
      successToast(res.data?.message);
      handleCloseModal();
    } else {
      errorToast(res?.data?.message as string);
      setGlobalError(res?.data?.message as string);
    }
  });

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
          onClick={handleCloseModal}
          className="h-6 w-6 flex items-center justify-center bg-destructive text-neutral-200 absolute -top-2 -right-2 rounded-full cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="p-3 border-b border-zinc-300">
          <h3 className="text-xl font-semibold text-center">Add New Course</h3>
        </div>

        {/* Modal body */}
        <div className="p-3">
          <form className="my-1" onSubmit={onSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="Web Development ..."
                type="text"
                {...register("title", { required: "Invalid title!" })}
                isError={!!errors.title}
              />
              {errors.title && (
                <InputError msg={errors.title.message as string} />
              )}
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="600"
                type="number"
                {...register("price", {
                  validate: (val) => {
                    if (val < 0) {
                      return "Price must be gather than 0";
                    }
                  },
                })}
                isError={!!errors.price}
              />
              {errors.price && (
                <InputError msg={errors.price.message as string} />
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="description">Course description</Label>
              <Textarea
                id="description"
                placeholder="Web Development ..."
                type="text"
                {...register("description", {
                  required: "Invalid description!",
                })}
                className="h-20"
                isError={!!errors.description}
              />
              {errors.description && (
                <InputError msg={errors.description.message as string} />
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input
                id="thumbnail"
                accept="image/*"
                type="file"
                {...register("thumbnail", {
                  validate: (files: FileList) => {
                    if (!files[0]) {
                      return "Thumbnail is required!";
                    } else if (files[0]?.size > 1024 * 1024) {
                      return "Maximum file size 1 MB";
                    }
                  },
                })}
                isError={!!errors.thumbnail}
              />
              {errors.thumbnail && (
                <InputError msg={errors.thumbnail.message as string} />
              )}
            </LabelInputContainer>
            {globalError && (
              <p className="text-destructive text-sm mb-2 text-center font-semibold">
                {globalError}
              </p>
            )}

            <Button
              className="group/btn relative h-10 w-full rounded-md bg-primary font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
              color={"primary"}
              disabled={isLoading}
            >
              {isLoading && <LoaderCircle className="w-6 h-6 animate-spin " />}
              {isLoading ? "Loading..." : "Add Course"}
              <BottomGradient />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
