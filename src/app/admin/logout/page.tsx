"use client";

import { useAuth } from "@/context/auth-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const { logOut } = useAuth();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await logOut();
      router.push("/admin/login");
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
        Admin Logout
      </h1>
      <p className="mb-4 text-black dark:text-gray-300">
        waiting for logout...
      </p>
    </div>
  );
}
