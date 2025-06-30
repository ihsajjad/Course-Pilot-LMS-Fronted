"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AllCourses = () => {
  return (
    <div className="min-h-screen p-4 pb-20 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-between border-b border-foreground/30 pb-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
          📚 Manage All Courses
        </h1>
        <Button className="gap-2" variant="default" size="sm">
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </div>
    </div>
  );
};

export default AllCourses;
