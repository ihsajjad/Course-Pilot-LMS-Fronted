import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
        <p className="text-2xl text-neutral-500 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
