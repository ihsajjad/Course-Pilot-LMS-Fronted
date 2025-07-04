import { Clock } from "lucide-react";
import { Button } from "../ui/button";

const Curriculam = () => {
  // Mock data for new sections
  const curriculum = [
    { id: 1, title: "Introduction to React Patterns", duration: "2h 15m" },
    { id: 2, title: "Component Composition Techniques", duration: "3h 30m" },
    { id: 3, title: "State Management Strategies", duration: "4h 10m" },
    { id: 4, title: "Performance Optimization", duration: "3h 45m" },
    { id: 5, title: "Advanced Hooks Patterns", duration: "3h 20m" },
    { id: 6, title: "Testing and Debugging", duration: "2h 50m" },
  ];

  return (
    <section className="bg-background rounded-2xl border border-border p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Course Curriculum</h2>
          <p className="text-muted-foreground mt-2">
            {curriculum.length} modules •{" "}
            {curriculum.reduce(
              (total, mod) => total + parseInt(mod.duration),
              0
            )}{" "}
            hours of content
          </p>
        </div>
        <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary text-white">
          Enroll to Access All Content
        </Button>
      </div>

      <div className="space-y-4">
        {curriculum.map((module) => (
          <div
            key={module.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30"
          >
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-lg w-10 h-10 flex items-center justify-center">
                <span className="font-bold">{module.id}</span>
              </div>
              <h3 className="font-medium">{module.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{module.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Curriculam;
