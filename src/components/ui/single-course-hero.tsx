import { CourseType } from "@/lib/types";
import {
  BarChart2,
  BookOpen,
  Clock,
  PlayCircle,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import EnrollBtn from "../single-course/enroll-btn";
import { Avatar, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";

const SingleCourseHero = ({ course }: { course: CourseType }) => {
  const instructor = {
    name: "Alex Johnson",
    avatar: "/instructor-avatar.jpg",
  };
  return (
    <Card className="overflow-hidden border border-border/50 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Thumbnail Section */}
        <div className="relative group">
          <div className=" bg-gradient-to-tr from-primary/20 to-secondary/20 w-full h-full flex items-center justify-center rounded-md">
            {/* Thumbnail Image */}
            <Image
              src={course.thumbnail} // Replace with actual dynamic image URL
              alt="Course Thumbnail"
              height={200}
              width={350}
              className="w-full h-full object-cover rounded-md"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

            <div className="absolute z-20 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-gradient-to-r from-primary to-secondary w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-4 cursor-pointer">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Preview this course
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Click to see course content
              </p>
            </div>
          </div>

          {/* Stats at bottom of thumbnail */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm z-30 p-4 flex justify-between">
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-1 text-primary" />
              <span>24 hours</span>
            </div>
            <div className="flex items-center text-sm">
              <BookOpen className="w-4 h-4 mr-1 text-primary" />
              <span>8 modules</span>
            </div>
            <div className="flex items-center text-sm">
              <BarChart2 className="w-4 h-4 mr-1 text-primary" />
              <span>Intermediate</span>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <CardContent className="p-8 flex flex-col h-full">
          <div className="mb-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Web Development
            </Badge>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            {course.title}
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-6 grow">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-muted/30 rounded-lg">
            <Avatar className="w-12 h-12">
              {/* <AvatarImage src={instructor.avatar} /> */}
              <AvatarFallback>{instructor.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Instructor</p>
              <p className="font-semibold">{instructor.name}</p>
            </div>
            <div className="ml-auto flex items-center bg-background px-3 py-1 rounded-full border border-border">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
              <span className="font-semibold">{4.8}</span>
              <span className="text-muted-foreground ml-1">({2488})</span>
            </div>
          </div>

          {/* Pricing & Enroll */}
          <div className="mt-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    ৳ {course.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  One-time payment. Lifetime access.
                </p>
              </div>
              <EnrollBtn courseId={course?._id} />
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                <span>Access to community</span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default SingleCourseHero;
