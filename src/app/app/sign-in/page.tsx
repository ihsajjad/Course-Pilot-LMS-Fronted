import { SignInForm } from "@/components/ui/sign-in-form";
import React from "react";

export default async function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-foreground px-4 py-16 relative bg-transparent overflow-x-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="w-full flex flex-col items-center space-y-8 bg-transparent">
        <div className="relative">
          <div className="absolute top-20 -left-12 h-28 w-28 rounded-full bg-primary -z-[1] blur-3xl"></div>
          <div className="absolute bottom-20 -right-12 h-28 w-28 rounded-full bg-primary -z-[1] blur-3xl"></div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
