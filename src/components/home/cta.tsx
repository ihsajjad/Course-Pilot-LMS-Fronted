import React from "react";
import { Button } from "../ui/button";

const CTA = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-2 rounded-full mb-6">
          <span className="text-primary font-medium">Start Learning Today</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Transform Your Career with Our Courses
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Join thousands of students who have accelerated their careers through
          our comprehensive learning programs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="px-8 py-6 text-base font-bold gap-2 bg-gradient-to-r from-primary to-secondary">
            Browse All Courses
          </Button>
          <Button
            variant="outline"
            className="px-8 py-6 text-base font-bold gap-2"
          >
            Become an Instructor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
