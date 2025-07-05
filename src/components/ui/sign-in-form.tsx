"use client";
import { useAppDispatch } from "@/lib/redux";
import { useSignInMutation } from "@/lib/redux/api";
import { setUser } from "@/lib/redux/features/authSlice";
import { errorToast, successToast } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import BottomGradient from "./bottom-gradient";
import { Button } from "./button";
import InputError from "./input-error";
import LabelInputContainer from "./label-input-container";
import { useRouter, useSearchParams } from "next/navigation";

export interface SignInFormType {
  email: string;
  password: string;
}

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();
  const [globalError, setGlobalError] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  let callbackUrl = searchParams.get("callbackUrl");

  const dispatch = useAppDispatch();
  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit = handleSubmit(async (data: SignInFormType) => {
    setGlobalError("");
    const res = await signIn(data);
    if (res.data?.success) {
      // setting the corrent user after sign in
      dispatch(setUser({ user: res.data.data, isLoading }));

      // redirecting user
      if (!callbackUrl && res.data.data.role === "Admin")
        callbackUrl = "/dashboard/manage-courses";
      else if (!callbackUrl && res.data.data.role === "User")
        callbackUrl = "/dashboard/my-courses";

      if (callbackUrl) router.push(callbackUrl);

      successToast(res.data?.message);
    } else {
      errorToast(res?.data?.message as string);
      setGlobalError(res?.data?.message as string);
    }
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
            {...register("password", {
              validate: (val) => {
                if (val.length < 6)
                  return "Password must be at least 6 characters";
              },
            })}
            isError={!!errors.password}
          />
          {errors.password && (
            <InputError msg={errors.password.message as string} />
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
          {isLoading ? "Loading..." : "Sign in →"}
          <BottomGradient />
        </Button>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-3">
          Don&apos;t have any account?{" "}
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
