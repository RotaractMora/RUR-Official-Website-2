'use client';

import { useAuth } from "@/context/auth-provider";
import { useEffect } from "react";
import { AdminDashboardLayout } from "../admin-dashboard-layout";

export default function LogoutPage() {

    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);

  return (
    <AdminDashboardLayout>

        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Admin Logout</h1>
        <p className="mb-4 text-black dark:text-gray-300">waiting for logout...</p>
        </div>
    
    </AdminDashboardLayout>
  );
}