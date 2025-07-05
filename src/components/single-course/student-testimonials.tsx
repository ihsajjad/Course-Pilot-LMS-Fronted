import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";

const StudentTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Thompson",
      role: "Frontend Developer",
      comment:
        "This course completely transformed how I approach React development. The patterns taught are exactly what senior engineers use at FAANG companies.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Full Stack Engineer",
      comment:
        "The real-world examples and best practices helped me refactor our entire codebase. Worth every penny!",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "UI Engineer",
      comment:
        "As someone with intermediate React knowledge, this course took my skills to the next level. Highly recommended!",
      rating: 4,
    },
  ];

  return (
    <section className="bg-background rounded-2xl border border-border p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Student Testimonials</h2>
          <p className="text-muted-foreground mt-2">
            What our students say about this course
          </p>
        </div>
        <Button variant="outline">See All Reviews</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-border">
            <CardContent className="p-6">
              <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="italic mb-6">{testimonial.comment}</p>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.role}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StudentTestimonials;
