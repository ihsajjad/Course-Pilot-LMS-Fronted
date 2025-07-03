"use client";

import { LectureType } from "@/lib/types";
import { Edit, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUpload } from "./file-upload";
import { useUploadPDFMutation } from "@/lib/redux/api";
import { errorToast, successToast } from "@/lib/utils";

interface ManageResourcesProps {
  resources: string[];
  setLecture: Dispatch<SetStateAction<LectureType>>;
  setGlobalError: Dispatch<SetStateAction<string>>;
}

const ManageResources = ({
  resources,
  setLecture,
  setGlobalError,
}: ManageResourcesProps) => {
  const [uploadPDF, { isLoading: isUploadingFile }] = useUploadPDFMutation();

  // remove resourc form the resources array
  const handleRemoveResource = (url: string) => {
    const reminings = resources.filter((item) => item !== url);
    setLecture((p) => ({ ...p, resources: reminings }));
  };

  // To upload pdf resource
  const handleFileUpload = async (files: File[]) => {
    const formData = new FormData();
    formData.append("pdf", files[0]);

    const res = await uploadPDF(formData);

    if (res.data?.success) {
      successToast(res.data?.message);
      setLecture((prev) => ({
        ...prev,
        resources: [...prev.resources, res.data.url],
      }));
    } else {
      errorToast(res?.data?.message as string);
      setGlobalError(res?.data?.message as string);
    }
  };

  return (
    <div className="my-2">
      <span className="font-semibold">Resources: </span>
      {/* Resources */}
      <div className="space-y-2">
        {resources?.length > 0 ? (
          resources.map((resource, i) => (
            <div
              key={resource}
              className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-md relative break-words"
            >
              <p className="text-xs -mt-1">{resource}</p>

              <div className="absolute right-2 top-0 flex items-center justify-end gap-2 h-full">
                <button
                  onClick={() => handleRemoveResource(resource)}
                  className="h-5 w-5 flex items-center justify-center bg-destructive text-neutral-200 rounded-full cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm italic h-full w-full flex items-center justify-center text-neutral-600">
            No resources added yet!
          </div>
        )}
      </div>

      <FileUpload
        onChange={handleFileUpload}
        isUploadingFile={isUploadingFile}
      />
    </div>
  );
};

export default ManageResources;
