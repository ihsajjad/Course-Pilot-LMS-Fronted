import { ModuleType } from "@/lib/types";
import { Plus } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./accordion";
import { Button } from "./button";
import { Input } from "./input";

const CourseContent = ({
  modules,
  setOpenModuleModal,
}: {
  modules: ModuleType[];
  setOpenModuleModal: () => void;
}) => {
  return (
    <div className="col-span-1 border rounded-xl p-3">
      <h4 className="text-lg font-medium text-neutral-600 dark:text-neutral-300">
        Course Content
      </h4>
      <Input
        type="text"
        placeholder="Search by title or description"
        className=""
      />

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4 mt-3"
        defaultValue={modules[0]?._id}
      >
        {modules.map((module, i) => (
          <AccordionItem
            key={module._id}
            value={module._id}
            className="rounded-xl border border-border shadow-sm transition-all hover:shadow-md"
          >
            <AccordionTrigger className="px-4 py-3 bg-muted hover:bg-muted/60 ">
              {`Module ${i + 1}: ${module.title}`}
            </AccordionTrigger>

            <AccordionContent className="px-2 md:px-4 py-4 bg-background rounded-b-xl flex flex-col gap-1 text-sm text-muted-foreground">
              {module.lectures.length > 0 ? (
                module.lectures.map((lecture, idx) => (
                  <div
                    key={lecture._id}
                    className="p-1 md:p-2 md:px-3 text-sm md:text-base rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border cursor-pointer"
                  >
                    <span className="font-medium text-neutral-600 dark:text-neutral-300">{`📘 Lecture ${
                      idx + 1
                    }:`}</span>{" "}
                    {lecture.title}
                  </div>
                ))
              ) : (
                <div className="italic text-muted">No lectures added yet.</div>
              )}

              <Button className="gap-2 w-full" variant="secondary" size="sm">
                <Plus className="w-4 h-4" />
                Add Lecture
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}

        <Button
          variant="default"
          size="sm"
          onClick={setOpenModuleModal}
          className="gap-2 w-full"
        >
          <Plus className="w-4 h-4" />
          Add Module
        </Button>
      </Accordion>
    </div>
  );
};

export default CourseContent;
