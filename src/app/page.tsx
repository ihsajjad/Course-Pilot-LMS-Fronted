{
  /* <div className="min-h-screen p-4 pb-20 gap-16 sm:p-10 lg:p-20 font-[family-name:var(--font-geist-sans)]"> */
}
// app/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  Clock,
  Users,
  BookOpen,
  BarChart,
  PlayCircle,
  Award,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { MainHero } from "@/components/home/main-hero";

export default function Home() {
  // Mock course data
  const courses = [
    {
      id: "1",
      title: "Advanced React Patterns",
      description:
        "Master complex React patterns used by senior engineers at top tech companies.",
      price: 499,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      thumbnail: "/ts-course.jpg",
      rating: 4.8,
      students: 1890,
      duration: "32h",
      category: "Full-Stack",
    },
    {
      id: "3",
      title: "UI/UX Design Masterclass",
      description:
        "Learn professional design principles and tools from industry experts.",
      price: 399,
      thumbnail: "/design-course.jpg",
      rating: 4.7,
      students: 3200,
      duration: "28h",
      category: "Design",
    },
    {
      id: "4",
      title: "Cloud Architecture",
      description:
        "Design and deploy scalable cloud infrastructure on AWS and Azure.",
      price: 549,
      thumbnail: "/cloud-course.jpg",
      rating: 4.9,
      students: 1560,
      duration: "26h",
      category: "DevOps",
    },
  ];

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
    </div>
  );
}
