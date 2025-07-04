{
  /* <div className="min-h-screen p-4 pb-20 gap-16 sm:p-10 lg:p-20 font-[family-name:var(--font-geist-sans)]"> */
}
import Categories from "@/components/home/categories";
import CTA from "@/components/home/cta";
// app/page.tsx
import FeaturedCourses from "@/components/home/featured-courses";
import { MainHero } from "@/components/home/main-hero";
import { Button } from "@/components/ui/button";
import {
  Award,
  BarChart,
  BookOpen,
  PlayCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Home() {
  // Categories data
  const categories = [
    {
      name: "Web Development",
      icon: <BarChart className="w-5 h-5" />,
      courses: 142,
    },
    {
      name: "Mobile Development",
      icon: <PlayCircle className="w-5 h-5" />,
      courses: 89,
    },
    {
      name: "UI/UX Design",
      icon: <BookOpen className="w-5 h-5" />,
      courses: 76,
    },
    { name: "Data Science", icon: <Award className="w-5 h-5" />, courses: 103 },
    { name: "DevOps", icon: <ShieldCheck className="w-5 h-5" />, courses: 68 },
    { name: "Business", icon: <Users className="w-5 h-5" />, courses: 94 },
  ];

  // Stats data
  const stats = [
    { value: "10,000+", label: "Active Students" },
    { value: "250+", label: "Expert Instructors" },
    { value: "500+", label: "Courses Available" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/50 to-muted/20 font-[family-name:var(--font-geist-sans)]">
      <MainHero categories={categories} stats={stats} />

      {/* Featured Courses */}
      <FeaturedCourses />

      {/* Categories Section */}
      <Categories categories={categories} />

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
