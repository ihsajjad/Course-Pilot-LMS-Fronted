"use client";

import { LectureType } from "@/lib/types";
import { Edit, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUpload } from "./file-upload";

interface ManageResourcesProps {
  resources: string[];
  setLecture: Dispatch<SetStateAction<LectureType>>;
}

const ManageResources = ({ resources, setLecture }: ManageResourcesProps) => {
  const [globalError, setGlobalError] = useState<string>("");

  // remove resourc form the resources array
  const handleRemoveResource = (url: string) => {
    const reminings = resources.filter((item) => item !== url);
    setLecture((p) => ({ ...p, resources: reminings }));
  };

  const handleFileUpload = (files: File[]) => {
    console.log(files);
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
              className="px-3 py-1.5 bg-neutral-100 rounded-md relative"
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

      <FileUpload onChange={handleFileUpload} />
    </div>
  );
};

export default ManageResources;
