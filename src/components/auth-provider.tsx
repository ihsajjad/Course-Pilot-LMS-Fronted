"use client";

import { ReactNode, useState } from "react";
import Loading from "./ui/loading";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useGetCurrentUser(setIsLoading);

  if (isLoading) {
    // Render a consistent shell during SSR & before hydration
    return <Loading />;
  }

  if (isLoading) return <Loading />;

  return <div className="min-h-[calc(100vh-53px)]">{children}</div>;
};

export default AuthProvider;
