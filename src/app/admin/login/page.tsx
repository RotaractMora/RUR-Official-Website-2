'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/auth-provider';
import { useRouter } from 'next/navigation';
import { AdminDashboardLayout } from '../admin-dashboard-layout';

const AdminLoginPage: React.FC = () => {
    const { googleSignIn, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/admin/dashboard');   
        }
    }
    , [user]);

    return (
        <AdminDashboardLayout>

        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Admin Login</h1>
            <p className="mb-4 text-black dark:text-gray-300">Please log in using your Google account to access the admin panel.</p>
            <button onClick={() =>{googleSignIn(); console.log("clicked");}} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500">
            Login with Google
            </button>
        </div>
        
        </AdminDashboardLayout>
    );
};

export default AdminLoginPage;