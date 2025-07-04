import Curriculam from "@/components/single-course/curriculam";
import FAQ from "@/components/single-course/faq";
import Instructors from "@/components/single-course/instructors";
import SingleCourseCTA from "@/components/single-course/single-course-cta";
import StudentTestimonials from "@/components/single-course/student-testimonials";
import CourseFeatures from "@/components/ui/course-features";
import SingleCourseHero from "@/components/ui/single-course-hero";
import { fetchCoursePageById } from "@/lib/server-api";
import { notFound } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;

  const course = await fetchCoursePageById(_id);
  if (!course) return notFound();

  return (
    <div className="min-h-screen p-4 sm:px-10 lg:px-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-background/50 to-muted/20">
      <div className="pb-4 pt-0 md:pt-4 space-y-16">
        {/* Course Card */}
        <SingleCourseHero course={course} />

        {/* Instructor Section */}
        <Instructors />

        {/* Curriculum Section */}
        <Curriculam />

        {/* Testimonials Section */}
        <StudentTestimonials />

        {/* Course Features */}
        <CourseFeatures />

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <SingleCourseCTA price={course.price} title={course.title} />
      </div>
    </div>
  );
}
