import { CourseType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

const CourseCard = ({ course }: { course: CourseType }) => {
  return (
    <div
      key={course._id}
      className="rounded-2xl border bg-card shadow-md overflow-hidden flex flex-col"
    >
      <div className="relative h-40 md:h-48 w-full">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-1 line-clamp-1">
          {course.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-medium text-primary">৳ {course.price}</span>

          <Link href={`/courses/${course._id}`}>
            <Button variant={"default"}>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
