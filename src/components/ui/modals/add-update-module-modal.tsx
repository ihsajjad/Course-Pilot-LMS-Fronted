"use client";

import { ModuleType } from "@/lib/types";
import { LoaderCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BottomGradient from "../bottom-gradient";
import { Button } from "../button";
import { Input } from "../input";
import InputError from "../input-error";
import { Label } from "../label";
import LabelInputContainer from "../label-input-container";
import {
  useCreateModuleMutation,
  useUpdateModuleMutation,
} from "@/lib/redux/api";
import { errorToast, successToast } from "@/lib/utils";

interface AddUpdateModuleModalType {
  openModal: boolean;
  prevModule?: ModuleType | null;
  handleCloseModal: () => void;
  courseId: string;
}

interface ModuleFormType {
  title: string;
}

const AddUpdateModuleModal = ({
  openModal,
  prevModule,
  handleCloseModal,
  courseId,
}: AddUpdateModuleModalType) => {
  const [globalError, setGlobalError] = useState<string>("");

  const [createMoule, { isLoading: isCreating }] = useCreateModuleMutation(); // to create module
  const [updateModule, { isLoading: isUpdating }] = useUpdateModuleMutation(); // to update module

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModuleFormType>();

  // reseting previous module data to update
  useEffect(() => {
    if (prevModule?._id) {
      reset(prevModule);
    } else reset({ title: "" });
  }, [prevModule, reset]);

  const onSubmit = handleSubmit(async (data: ModuleFormType) => {
    const moduleId = prevModule?._id;

    let res;
    // if moduleId exists : updating the data
    if (moduleId) {
      res = await updateModule({ ...data, courseId, moduleId });
    } else {
      // If moduleId doesn't exist : creating new module
      res = await createMoule({ ...data, courseId });
    }

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
          onClick={() => handleCloseModal()}
          className="h-6 w-6 flex items-center justify-center bg-destructive text-neutral-200 absolute -top-2 -right-2 rounded-full cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="max-h-[90vh]">
          {/* Modal Header */}
          <div className="p-3 border-b border-zinc-300">
            <h3 className="text-xl font-semibold text-center">
              {prevModule?._id ? "Update " : "Add New "} Module
            </h3>
          </div>

          {/* Modal body */}
          <div className="p-3">
            <form className="my-1" onSubmit={onSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="title">Module Title</Label>
                <Input
                  id="title"
                  placeholder="Introduction to Web Development"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  isError={!!errors.title}
                />
                {errors.title && (
                  <InputError msg={errors.title.message as string} />
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
                disabled={isCreating || isUpdating}
              >
                {(isCreating || isUpdating) && (
                  <LoaderCircle className="w-6 h-6 animate-spin " />
                )}
                {isCreating || isUpdating
                  ? "Loading..."
                  : prevModule?._id
                  ? "Update Module"
                  : "Add Module"}
                <BottomGradient />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateModuleModal;
