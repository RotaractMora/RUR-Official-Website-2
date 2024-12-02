'use client';

import React, { useState } from 'react';
import { AdminDashboardLayout } from '@/app/admin/admin-dashboard-layout';
import { addReachUs } from '@/services/reachus.service';

const AddReachDataForm: React.FC = () => {
  const [newReachData, setNewReachData] = useState<{
    contact: string;
    email: string;
    name: string;
    post: string;
    photo: File | null;
  }>({
    contact: '',
    email: '',
    name: '',
    post: '',
    photo: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReachData({ ...newReachData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReachData({ ...newReachData, photo: e.target.files?.[0] || null });
  };

  const handleAddData = async () => {
    try {
      await addReachUs({
        ...newReachData,
        photo: newReachData.photo ? newReachData.photo.name : '',
      });
      setNewReachData({
        contact: '',
        email: '',
        name: '',
        post: '',
        photo: null,
      });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="bg-custom-color-800 dark:bg-custom-dark-color-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Add New Reach Data</h2>
      <input
        name="contact"
        value={newReachData.contact}
        onChange={handleInputChange}
        className="bg-custom-color-700 dark:bg-custom-dark-color-700 text-white p-2 rounded-lg mb-2 w-full"
        placeholder="Contact"
      />
      <input
        name="email"
        value={newReachData.email}
        onChange={handleInputChange}
        className="bg-custom-color-700 dark:bg-custom-dark-color-700 text-white p-2 rounded-lg mb-2 w-full"
        placeholder="Email"
      />
      <input
        name="name"
        value={newReachData.name}
        onChange={handleInputChange}
        className="bg-custom-color-700 dark:bg-custom-dark-color-700 text-white p-2 rounded-lg mb-2 w-full"
        placeholder="Name"
      />
      <input
        name="post"
        value={newReachData.post}
        onChange={handleInputChange}
        className="bg-custom-color-700 dark:bg-custom-dark-color-700 text-white p-2 rounded-lg mb-2 w-full"
        placeholder="Post"
      />
      <input
        type="file"
        onChange={handlePhotoChange}
        className="bg-custom-color-700 dark:bg-custom-dark-color-700 text-white p-2 rounded-lg mb-2 w-full"
      />
      <button
        onClick={handleAddData}
        className="bg-custom-color-700 dark:bg-custom-dark-color-700 text-white p-2 rounded-lg w-full hover:bg-custom-color-600 dark:hover:bg-custom-dark-color-600"
      >
        Add Data
      </button>
    </div>
  );
};
const AdminDashboard: React.FC = () => {
    

    
    return (
        <AdminDashboardLayout>
            <div className="min-h-screen bg-custom-color-700 dark:bg-custom-dark-color-400 flex flex-col text-white">
                <header className="bg-custom-color-800 dark:bg-custom-dark-color-400 ">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900 ">Admin Dashboard</h1>
                    </div>
                </header>
                <main className="flex-grow">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-custom-color-800 dark:bg-custom-dark-color-800 p-6 rounded-lg">
                                        <h2 className="text-xl font-bold mb-2">Operation 1</h2>
                                        <p className="text-gray-700 dark:text-white">Description of operation 1.</p>
                                    </div>
                                    <div className="bg-custom-color-800 dark:bg-custom-dark-color-800 p-6 rounded-lg">
                                        <h2 className="text-xl font-bold mb-2">Operation 2</h2>
                                        <p className="text-gray-700 dark:text-white">Description of operation 2.</p>
                                    </div>
                                    <div className="bg-custom-color-800 dark:bg-custom-dark-color-800 p-6 rounded-lg">
                                        <h2 className="text-xl font-bold mb-2">Operation 3</h2>
                                        <p className="text-gray-700 dark:text-white">Description of operation 3.</p>
                                    </div>

                                    <AddReachDataForm />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AdminDashboardLayout>
    );
};

export default AdminDashboard;