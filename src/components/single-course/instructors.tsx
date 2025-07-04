import React from "react";
import { Badge } from "../ui/badge";
import { Globe, Mail, Star, Users } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const Instructors = () => {
  const instructor = {
    name: "Alex Johnson",
    role: "Senior Frontend Engineer",
    bio: "With over 10 years of experience in React development, Alex has worked with top tech companies and contributed to major open-source projects. Passionate about teaching and sharing knowledge with the developer community.",
    students: 18500,
    courses: 12,
    rating: 4.95,
  };

  return (
    <section className="bg-background rounded-2xl border border-border p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-8">Meet Your Instructor</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-muted border border-border rounded-xl aspect-square max-w-[280px] mx-auto">
            <Image
              src={"/instructor.png"}
              alt="Instructor"
              width={200}
              height={200}
              className="w-full h-full "
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{instructor.students.toLocaleString()}+ students</span>
            </Badge>
            <Badge className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{instructor.rating} rating</span>
            </Badge>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="border-b border-border pb-6">
            <h3 className="text-xl font-bold">{instructor.name}</h3>
            <p className="text-muted-foreground">{instructor.role}</p>
            <p className="mt-4">{instructor.bio}</p>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-4">Connect with the instructor</h4>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Send Message
              </Button>
              <Button variant="outline" className="gap-2">
                <Globe className="w-4 h-4" />
                Visit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
