import { Bounce, toast } from "react-toastify";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ModuleType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const successToast = (msg: string) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export const errorToast = (msg: string) => {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

// filter module or lecture
export const filterModuleOrLecture = (
  modules: ModuleType[],
  searchTerm: string
) => {
  return modules
    .map((module) => {
      const filteredLectures = module.lectures.filter((lec) =>
        lec.title.toLowerCase().includes(searchTerm)
      );

      if (
        module.title.toLowerCase().includes(searchTerm) ||
        filteredLectures.length > 0
      ) {
        return { ...module, lectures: filteredLectures };
      }

      return null;
    })
    .filter(Boolean) as ModuleType[];
};
