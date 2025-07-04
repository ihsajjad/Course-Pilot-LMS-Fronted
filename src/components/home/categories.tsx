import React, { ReactNode } from "react";

interface Props {
  categories: {
    name: string;
    icon: ReactNode;
    courses: number;
  }[];
}

const Categories = ({ categories }: Props) => {
  return (
    <div className="py-16 bg-gradient-to-b from-muted/10 to-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Categories
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover courses across all major fields of study and professional
            development
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow hover:border-primary/30 group"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                {category.icon}
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.courses} courses
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
