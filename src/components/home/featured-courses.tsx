"use client";

import { ArrowRight, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";

const FeaturedCourses = () => {
  // Mock course data
  const courses = [
    {
      id: "1",
      title: "Advanced React Patterns",
      description:
        "Master complex React patterns used by senior engineers at top tech companies.",
      price: 499,
      thumbnail: "/react.png",
      rating: 4.9,
      students: 2450,
      duration: "24h",
      category: "Web Development",
    },
    {
      id: "2",
      title: "Full Stack TypeScript",
      description:
        "Build complete applications with TypeScript, React, Node.js and MongoDB.",
      price: 599,
      thumbnail: "/typescript.png",
      rating: 4.8,
      students: 1890,
      duration: "32h",
      category: "Full-Stack",
    },
    {
      id: "3",
      title: "UI/UX Masterclass",
      description:
        "Learn professional design principles and tools from industry experts.",
      price: 399,
      thumbnail: "/uiux.png",
      rating: 4.7,
      students: 3200,
      duration: "28h",
      category: "Design",
    },
    {
      id: "4",
      title: "Cloud Architecture",
      description:
        "Design and deploy scalable production cloud infrastructure on AWS and Azure.",
      price: 549,
      thumbnail: "/cloud-networking.png",
      rating: 4.9,
      students: 1560,
      duration: "26h",
      category: "DevOps",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Courses
            </h2>
            <p className="text-muted-foreground mt-2">
              Handpicked by our expert instructors
            </p>
          </div>
          <Link href={"/courses"}>
            <Button variant="outline" className="gap-2">
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="h-full"
            >
              <Card
                key={course.id}
                className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-border/50 pt-0 gap-2"
              >
                <div className="relative">
                  <div className="h-56 bg-gradient-to-r from-primary/20 to-secondary/20">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      width={120}
                      height={100}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 backdrop-blur-sm"
                    >
                      {course.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="">
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="grow">
                  <p className="text-muted-foreground text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{course.rating}</span>
                      <span className="text-muted-foreground ml-1">
                        ({course.students})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-muted-foreground mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                  <div className="font-bold text-lg">৳ {course.price}</div>
                  <Link href={"/courses"}>
                    <Button
                      variant="default"
                      className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-neutral-200"
                    >
                      Enroll Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
// "use client"

// import { ArrowRight, Clock, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { motion } from "framer-motion";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.5 },
//   }),
// };

// const FeaturedCourses = () => {

//   return (
//     <div className="py-24 px-4 sm:px-6 lg:px-12 bg-muted/50">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-end mb-14">
//           <div>
//             <h2 className="text-4xl font-extrabold tracking-tight text-primary">
//               Featured Courses
//             </h2>
//             <p className="text-muted-foreground mt-3 text-lg">
//               Handpicked by our expert instructors
//             </p>
//           </div>
//           <Link href="/courses">
//             <Button variant="default" className="gap-2 shadow-md">
//               View All Courses
//               <ArrowRight className="w-4 h-4" />
//             </Button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {courses.map((course, i) => (
//             <motion.div
//               key={course.id}
//               variants={fadeInUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               custom={i}
//             >
//               <Card className="overflow-hidden group border border-border/40 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-2xl">
//                 <div className="relative">
//                   <div className="aspect-video bg-muted">
//                     <Image
//                       src={course.thumbnail}
//                       alt={course.title}
//                       width={500}
//                       height={280}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="absolute top-4 right-4">
//                     <Badge
//                       variant="secondary"
//                       className="bg-background/90 backdrop-blur-md"
//                     >
//                       {course.category}
//                     </Badge>
//                   </div>
//                 </div>

//                 <CardHeader className="pb-2 px-5 pt-5">
//                   <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
//                     {course.title}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent className="px-5">
//                   <p className="text-muted-foreground text-sm mb-4">
//                     {course.description}
//                   </p>

//                   <div className="flex justify-between text-sm">
//                     <div className="flex items-center">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
//                       <span>{course.rating}</span>
//                       <span className="text-muted-foreground ml-1">
//                         ({course.students})
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 text-muted-foreground mr-1" />
//                       <span>{course.duration}</span>
//                     </div>
//                   </div>
//                 </CardContent>

//                 <CardFooter className="flex justify-between items-center px-5 pb-5 pt-3">
//                   <div className="font-bold text-lg text-primary">
//                     ৳ {course.price}
//                   </div>
//                   <Link href="/courses">
//                     <Button variant="secondary" className="hover:scale-105 transition-transform">
//                       Enroll
//                     </Button>
//                   </Link>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedCourses;
