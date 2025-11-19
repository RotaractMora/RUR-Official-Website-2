"use client";

import { useEffect } from "react";
// import { AdminDashboardLayout } from "@/app/admin/admin-dashboard-layout";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AdminDashboardLayout = dynamic(
  () =>
    import("@/app/admin/admin-dashboard-layout").then(
      (mod) => mod.AdminDashboardLayout
    ),
  { ssr: false }
);

export default function RedirectToDashboard() {
  console.log("Redirecting page");

  const router = useRouter();
  useEffect(() => {
    router.push("/admin/dashboard");
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
          Redirecting to dashboard
        </h1>
        <p className="mb-4 text-black dark:text-gray-300">please wait...</p>
      </div>
    </AdminDashboardLayout>
  );
}
