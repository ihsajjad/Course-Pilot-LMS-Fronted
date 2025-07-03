import React from "react";
import { Card, CardContent } from "./card";
import { BookOpen, Clock, Star } from "lucide-react";

const CourseFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <Card className="bg-background/80 backdrop-blur-sm hover:border-primary/30 transition-colors">
        <CardContent className="p-6">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">
            Comprehensive Curriculum
          </h3>
          <p className="text-muted-foreground text-sm">
            8 modules covering everything from basics to advanced patterns with
            real-world projects.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-background/80 backdrop-blur-sm hover:border-primary/30 transition-colors">
        <CardContent className="p-6">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Lifetime Access</h3>
          <p className="text-muted-foreground text-sm">
            Learn at your own pace with unlimited access to all course materials
            and future updates.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-background/80 backdrop-blur-sm hover:border-primary/30 transition-colors">
        <CardContent className="p-6">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-primary fill-primary/20" />
          </div>
          <h3 className="font-semibold text-lg mb-2">
            Certificate of Completion
          </h3>
          <p className="text-muted-foreground text-sm">
            Earn a professional certificate to showcase your new skills to
            employers and your network.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseFeatures;
