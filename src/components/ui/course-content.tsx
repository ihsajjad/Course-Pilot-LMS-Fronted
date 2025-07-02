import { LectureType, ModuleType } from "@/lib/types";
import { Edit, Plus, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Button } from "./button";
import { Input } from "./input";

interface CourseContentProps {
  modules: ModuleType[];
  handleOpenModuleModal: (module: ModuleType | null) => void;
  handleOpenLecModal: (lecture: LectureType | null) => void;
}

const CourseContent = ({
  modules,
  handleOpenModuleModal,
  handleOpenLecModal,
}: CourseContentProps) => {
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
                    className="group p-1 md:p-2 md:px-3 text-sm md:text-base rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border cursor-pointer relative"
                  >
                    <span className="font-medium text-neutral-600 dark:text-neutral-300">{`📘 Lecture ${
                      idx + 1
                    }:`}</span>{" "}
                    {lecture.title}
                    {/* buttons */}
                    <div className="absolute right-2 top-0 hidden group-hover:flex items-center justify-end gap-2 h-full">
                      <button
                        onClick={() => handleOpenLecModal(lecture)}
                        className="h-5 w-5 flex items-center justify-center bg-orange-500 text-neutral-200 rounded-full cursor-pointer"
                      >
                        <Edit size={12} />
                      </button>
                      <button
                        // onClick={() => handleRemoveResource(resource)}
                        className="h-5 w-5 flex items-center justify-center bg-destructive text-neutral-200 rounded-full cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="italic text-muted">No lectures added yet.</div>
              )}

              <div className="flex items-center justify-between gap-2">
                <Button
                  onClick={() => handleOpenLecModal(null)}
                  className="gap-2 flex-1"
                  variant="secondary"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Lecture
                </Button>
                <Button
                  onClick={() => handleOpenModuleModal(module)}
                  className="gap-2 flex-1"
                  variant="secondary"
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                  Update Module
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        <Button
          variant="default"
          size="sm"
          onClick={() => handleOpenModuleModal(null)}
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
