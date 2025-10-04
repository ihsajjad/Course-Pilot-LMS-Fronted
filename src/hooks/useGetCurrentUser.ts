"use client";

import { CurrentUser } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useGetCurrentUser(
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  isRefetch?: boolean
) {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/auth/current", {
          credentials: "include", // if cookies/session are required
        });

        if (!res.ok) {
          return setUser(null);
        }

        const data: CurrentUser = await res.json();
        console.log(data);
        setUser(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setIsLoading, isRefetch]);

  return { user };
}
