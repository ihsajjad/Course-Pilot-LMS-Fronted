"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import InputError from "./input-error";

interface SignInType {
  email: string;
  password: string;
}

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>();

  const onSubmit = handleSubmit((data: SignInType) => {
    console.log("Form submitted", data);
  });

  return (
    <div className="max-w-md rounded-xl border border-border bg-card/80 backdrop-blur-md p-6 shadow-md">
      <h2 className="text-2xl font-bold text-foreground-400">
        Sign in to your account
      </h2>
      <p className="mt-2 max-w-sm text-sm text-foreground-600">
        Access your courses and continue your learning journey on{" "}
        <span className="text-primary font-medium">Course Pilot</span>.
      </p>

      <form className="my-6" onSubmit={onSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="taylorswift@gmail.com"
            type="email"
            {...register("email", { required: "Invalid email!" })}
            isError={!!errors.email}
          />
          {errors.email && <InputError msg={errors.email.message as string} />}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password", { required: "Invalid password" })}
            isError={!!errors.password}
          />
          {errors.password && (
            <InputError msg={errors.password.message as string} />
          )}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-3">
          Don't have any account?{" "}
          <a
            href="/sign-up"
            className="text-primary font-medium hover:underline underline-offset-4 transition"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
