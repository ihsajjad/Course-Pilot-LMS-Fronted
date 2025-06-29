import { SignInForm } from "@/components/ui/sign-in-form";
import React from "react";

export default async function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-16">
      <div className="w-full flex flex-col items-center space-y-8">
        <SignInForm />
      </div>
    </div>
  );
}
