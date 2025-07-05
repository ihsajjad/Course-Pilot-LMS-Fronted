import Link from "next/link";

const LectureResources = ({ resources }: { resources: string[] }) => {
  return (
    <div className="mt-4 border border-border rounded-md p-2 bg-muted/50">
      <details className="group">
        <summary className="cursor-pointer flex items-center justify-between text-xs font-medium text-foreground">
          <span>📁 Resources ({resources.length})</span>
          <span className="transition-transform group-open:rotate-180">▼</span>
        </summary>

        <div className="mt-2 space-y-2 pl-4">
          {resources.map((res, i) => (
            <Link
              key={i}
              href={res}
              target="_blank"
              className="block text-xs text-primary underline hover:text-primary/80 transition-colors"
            >
              📄 Resource {i + 1}
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
};

export default LectureResources;
