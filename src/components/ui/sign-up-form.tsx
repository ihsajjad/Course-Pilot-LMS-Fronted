"use client";
import { useSignUpMutation } from "@/lib/redux/api";
import { cn, errorToast, successToast } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "./button";
import InputError from "./input-error";

export interface SignUpFormType {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  profile: FileList;
}

export function SignupForm() {
  const [globalError, setGlobalError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormType>();

  const [signUpUser, { isLoading }] = useSignUpMutation();

  const onSubmit = handleSubmit(async (data: SignUpFormType) => {
    setGlobalError("");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile", data.profile[0]);

    const res = await signUpUser(formData);
    if (res.data?.success) {
      successToast("Registration successfull");
    } else {
      errorToast(res?.data?.message as string);
      setGlobalError(res?.data?.message as string);
    }
  });

  const currentPass = watch("password");

  return (
    <div className="max-w-md rounded-xl border border-border bg-card/80 backdrop-blur-md p-6 shadow-md">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
        Create an Account
      </h2>
      <p className="mt-2 max-w-sm text-sm text-foreground-600">
        Join <span className="text-primary font-medium">Course Pilot</span> and
        start your learning journey today.
      </p>

      <form className="my-8" onSubmit={onSubmit} encType="multipart/form-data">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="firstname">Full Name</Label>
          <Input
            id="firstname"
            placeholder="Tyler Swift"
            type="text"
            {...register("name", { required: "Invalid name" })}
            isError={!!errors.name}
          />
          {errors.name && <InputError msg={errors.name.message as string} />}
        </LabelInputContainer>
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
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
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
          <LabelInputContainer>
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              placeholder="••••••••"
              type="password"
              {...register("confirm_password", {
                validate: (val) => {
                  if (!val) return "Invalid password";
                  else if (val !== currentPass) return "Password doesn't match";
                },
              })}
              isError={!!errors.confirm_password}
            />
            {errors.confirm_password && (
              <InputError msg={errors.confirm_password.message as string} />
            )}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="profile">Profile</Label>
          <Input
            id="profile"
            accept="image/*"
            type="file"
            {...register("profile", {
              validate: (files: FileList) => {
                if (!files[0]) {
                  return "Profile is required!";
                } else if (files[0]?.size > 1024 * 1024) {
                  return "Maximum file size 1 MB";
                }
              },
            })}
            isError={!!errors.profile}
          />
          {errors.profile && (
            <InputError msg={errors.profile.message as string} />
          )}
        </LabelInputContainer>
        {globalError && (
          <p className="text-destructive text-sm mb-2 text-center font-semibold">
            {globalError}
          </p>
        )}

        <Button
          className="group/btn relative h-10 w-full rounded-md bg-primary font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          color={"primary"}
          disabled={isLoading}
        >
          {isLoading && <LoaderCircle className="w-6 h-6 animate-spin " />}
          {isLoading ? "Loading..." : "Sign up →"}
          <BottomGradient />
        </Button>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-3">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-primary font-medium hover:underline underline-offset-4 transition"
          >
            Sign in
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
