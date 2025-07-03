"use client";

import { ReactNode, useEffect, useState } from "react";
// import spinAnimation from '@/assets/loading.json';

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux";
import { useCurrentUserQuery } from "@/lib/redux/api";
import { setUser } from "@/lib/redux/features/authSlice";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(
    !navigator.onLine
  );

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUserQuery();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    let unsubscribe = () => {};

    if (isOnline && user) {
      dispatch(setUser({ user, isLoading }));
    }

    return () => {
      if (isOnline) {
        unsubscribe();
      }
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch, router, isOnline, user]);

  if (isLoading) return "Loading...";

  if (showOfflineMessage) {
    return (
      <div className="h-screen w-screen flex-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 text-xl font-bold">
            You are offline. Please check your internet connection.
          </p>
        </div>
      </div>
    );
  }

  return <div className="min-h-[calc(100vh-53px)]">{children}</div>;
};

export default AuthProvider;
