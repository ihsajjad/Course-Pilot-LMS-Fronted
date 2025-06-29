"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-6 w-6 items-center justify-center rounded-full bg-foreground-50 transition-colors duration-300"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
};

export default ModeToggle;
