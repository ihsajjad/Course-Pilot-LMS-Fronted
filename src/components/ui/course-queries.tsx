"use client";

import { CourseQueryType } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";
import { Search, ArrowDownUp } from "lucide-react";

const CourseQueries = ({
  query,
  setQuery,
}: {
  query: CourseQueryType;
  setQuery: Dispatch<SetStateAction<CourseQueryType>>;
}) => {
  return (
    <div className="my-3 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full md:w-[400px]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query.text}
          placeholder="Search courses by title or description"
          onChange={(e) => setQuery((p) => ({ ...p, text: e.target.value }))}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center w-full md:w-auto">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3 w-full">
          <ArrowDownUp className="w-5 h-5 text-muted-foreground" />
          <label
            htmlFor="sortByPrice"
            className="text-muted-foreground text-sm"
          >
            Sort by:
          </label>
          <select
            id="sortByPrice"
            value={query.sortByPrice}
            onChange={(e) =>
              setQuery((p) => ({
                ...p,
                sortByPrice: e.target.value as "price HtoL" | "price LtoH",
              }))
            }
            className="bg-card text-foreground font-medium outline-none cursor-pointer"
          >
            <option value="price LtoH">Price: Low to High</option>
            <option value="price HtoL">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseQueries;
