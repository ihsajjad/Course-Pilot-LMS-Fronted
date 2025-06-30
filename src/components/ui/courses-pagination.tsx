import { CourseQueryType } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./button";

const CoursesPagination = ({
  page,
  pages,
  setQuery,
}: {
  page: number;
  pages: number;
  setQuery: Dispatch<SetStateAction<CourseQueryType>>;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-2 my-4">
        {Array(pages || 0)
          .fill(undefined)
          .map((_, i) => {
            const value = i + 1;
            return (
              <Button
                key={value}
                size={"sm"}
                disabled={page === value}
                onClick={() =>
                  setQuery((p) => ({
                    ...p,
                    page: value,
                  }))
                }
                className={`h-8 w-8 text-lg flex-center font-bold rounded`}
              >
                {value}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default CoursesPagination;
