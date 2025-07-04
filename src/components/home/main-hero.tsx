"use client";
import { motion } from "framer-motion";
import { Award, Clock, PlayCircle, Star } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  categories: {
    name: string;
    icon: ReactNode;
    courses: number;
  }[];
  stats: { value: string; label: string }[];
}

export function MainHero({ categories, stats }: Props) {
  return (
    <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent"></div>
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Animated Border Elements */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
      <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Main Content */}
      <div className="px-4 py-10 md:py-20">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-foreground md:text-5xl lg:text-6xl"
        >
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Master In-Demand Skills
          </span>
          <span className="block mt-3 text-foreground">
            with Expert-Led Courses
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 mx-auto max-w-xl py-6 text-center text-lg font-normal text-muted-foreground"
        >
          Join thousands of students advancing their careers with our
          comprehensive courses in development, design, and business.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={"/courses"}>
            <Button
              className="w-full sm:w-48 px-6 py-6 font-medium transition-all duration-300 hover:-translate-y-0.5"
              variant="default"
            >
              Explore Courses
            </Button>
          </Link>
          <Button
            className="w-full sm:w-48 px-6 py-6 font-medium transition-all duration-300 hover:-translate-y-0.5"
            variant="outline"
          >
            Contact Support
          </Button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.slice(0, 4).map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="rounded-full gap-2 bg-background/80 backdrop-blur-sm"
              >
                {category.icon}
                {category.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats and Features Grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="grid grid-cols-2 gap-6 bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-2 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Flexible Learning Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="bg-gradient-to-br from-primary/10 to-background rounded-xl p-6 border border-border/50 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Flexible Learning
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    At your own pace
                  </p>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mt-4">
                <PlayCircle className="w-10 h-10 text-primary" />
              </div>
            </motion.div>

            {/* Top Rated Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="bg-gradient-to-br from-secondary/10 to-background rounded-xl p-6 border border-border/50 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Top Rated Courses
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    4.9+ average rating
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </motion.div>

            {/* Certification Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="bg-gradient-to-br from-background to-muted/50 rounded-xl p-6 border border-border/50 shadow-sm sm:col-span-2"
            >
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Get Certified
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Showcase your skills
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
