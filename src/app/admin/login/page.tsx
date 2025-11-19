'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/auth-provider';
import { useRouter } from 'next/navigation';
import { AdminDashboardLayout } from '../admin-dashboard-layout';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '../../../services/firebaseConfig';

const AdminLoginPage: React.FC = () => {
  const { googleSignIn, user } = useAuth();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    if (user) {
      // Check if the user has an admin role
      const verifyUserRole = async () => {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role !== 'admin') {
              alert('Access denied. You do not have admin privileges.');
              router.push('/admin/login');
              return;
            }
          } else {
            // Create or update the user document if it doesn't exist
            await setDoc(
              userRef,
              {
                email: user.email,
                displayName: user.displayName,
                lastLogin: new Date().toISOString(),
                role: 'user', // Default role as 'user'
              },
              { merge: true },
            );
          }

          console.log('User document verified/updated');
          router.push('/admin/dashboard');
        } catch (error) {
          console.error('Error verifying user role or updating document:', error);
        }
      };

      verifyUserRole();
    }
  }, [user, db, router]);

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Admin Login</h1>
        <p className="mb-4 text-black dark:text-gray-300">
          Please log in using your Google account to access the admin panel.
        </p>
        <button
          onClick={googleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
        >
          Login with Google
        </button>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminLoginPage;
