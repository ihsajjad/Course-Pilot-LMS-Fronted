"use client";

import { useAppSelector } from "@/lib/redux";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loading from "../ui/loading";
import { LoaderCircle } from "lucide-react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAppSelector((state) => state.authSlice);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user?.email) {
      router.push("/sign-in"); // Redirect to login page
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (user?.email) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 text-center">
      <LoaderCircle className="w-12 h-12 animate-spin text-neutral-500" />{" "}
      <p className="text-sm text-muted-foreground">
        You are being redirected to the login page...
      </p>
    </div>
  );
};

export default PrivateRoute;
