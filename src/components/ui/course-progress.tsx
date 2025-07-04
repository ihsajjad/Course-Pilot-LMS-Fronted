
const CourseProgress = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">Progress</span>
        <span className="text-muted-foreground">{`${Math.round(
          progressPercentage
        )}%`}</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CourseProgress;
