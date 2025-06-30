import { CourseQueryType } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";

const CourseQueries = ({
  query,
  setQuery,
}: {
  query: CourseQueryType;
  setQuery: Dispatch<SetStateAction<CourseQueryType>>;
}) => {
  return (
    <div className="my-4 flex flex-col-reverse md:flex-row items-center justify-between gap-2 text-sm md:text-base text-zinc-600 dark:text-zinc-300 ">
      <input
        type="text"
        value={query.text}
        placeholder="Search by title or description"
        onChange={(e) => setQuery((p) => ({ ...p, text: e.target.value }))}
        className="py-1 px-3 rounded-md border border-zinc-300 dark:border-zinc-600 outline-none w-full md:w-fit"
      />
      <label
        htmlFor="sortByPrice"
        className="flex items-center border border-zinc-300 dark:border-zinc-600 rounded-md px-2 py-1 w-full md:w-fit"
      >
        <span className="">Sort by:</span>
        <select
          name=""
          id="sortByPrice"
          value={query.sortByPrice}
          onChange={(e) =>
            setQuery((p) => ({
              ...p,
              sortByPrice: e.target.value as "price HtoL" | "price LtoH",
            }))
          }
          className="bg-card outline-none"
        >
          <option value="price LtoH">Price Low to High</option>
          <option value="price HtoL">Price High to Low</option>
        </select>
      </label>
    </div>
  );
};

export default CourseQueries;
