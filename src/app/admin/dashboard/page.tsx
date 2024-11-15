'use client';

import React, { useEffect } from 'react';
import { AdminDashboardLayout } from '@/app/admin/admin-dashboard-layout';
import { useAuth } from '@/context/auth-provider';
import { useRouter } from 'next/navigation';

const AdminDashboard: React.FC = () => {
    
    const { user } = useAuth();

        // useEffect(() => {
        // if(!user) {
        //     // setTimeout(()=>{redirectToLogin(); console.log("redirected to login")},5000);
        //   }
        // }, [user]);


    
    return (
        <AdminDashboardLayout>
            <div className="min-h-screen bg-custom-color-700 dark:bg-custom-dark-color-700 flex flex-col">
                <header className="bg-custom-color-800 dark:bg-custom-dark-color-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    </div>
                </header>
                <main className="flex-grow">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="bg-custom-color-800 dark:bg-custom-dark-color-800 p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-bold mb-2">Operation 1</h2>
                                        <p className="text-gray-700">Description of operation 1.</p>
                                    </div>
                                    <div className="bg-custom-color-800 dark:bg-custom-dark-color-800 p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-bold mb-2">Operation 2</h2>
                                        <p className="text-gray-700">Description of operation 2.</p>
                                    </div>
                                    <div className="bg-custom-color-800 dark:bg-custom-dark-color-800 p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-bold mb-2">Operation 3</h2>
                                        <p className="text-gray-700">Description of operation 3.</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AdminDashboardLayout>
    );
};

export default AdminDashboard;