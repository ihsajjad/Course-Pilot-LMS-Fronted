"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { useEnrollCourseMutation } from "@/lib/redux/api";
import { errorToast, successToast } from "@/lib/utils";
import { ArrowRight, LoaderCircle, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { setUser } from "@/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";

const EnrollBtn = ({ courseId }: { courseId: string }) => {
    const { user } = useAppSelector((state) => state.authSlice);
    
    const router = useRouter();
  const dispatch = useAppDispatch();

  const [enrollNow, { isLoading }] = useEnrollCourseMutation();
  let isEnrolled = false;

  if (user?.email) {
    isEnrolled = !!user.enrolledCourseIds?.includes(courseId);
  }

  const handleEnroll = async () => {
    const res = await enrollNow(courseId);

    if (res.data?.success) {
      dispatch(setUser({ user: res.data.user, isLoading: false }));
      successToast(res.data?.message);
    } else {
      errorToast(res?.data?.message as string);
    }
    };
    
    // redirecting enrolled user to the course content page to consume
    const handleContinue = ()=> router.push(`/dashboard/my-courses/${courseId}`)

  return (
    <Button
      disabled={isLoading || user.role === "Admin"}
      onClick={ isEnrolled ? handleContinue : handleEnroll}
      className="px-8 py-4 text-base font-bold gap-2"
    >
      {isEnrolled ? (
        <>
          Continue
          <ArrowRight className="w-5 h-5" />
        </>
      ) : isLoading ? (
        <>
          <LoaderCircle className="w-6 h-6 animate-spin " /> Loading...
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Enroll Now
        </>
      )}
    </Button>
  );
};

export default EnrollBtn;
