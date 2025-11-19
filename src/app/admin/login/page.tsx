"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { AdminDashboardLayout } from "../admin-dashboard-layout";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../../../services/firebaseConfig";
import { LoginForm } from "@/components/login-form";

const AdminLoginPage: React.FC = () => {
  const { googleSignIn, user, emailPwSignIn } = useAuth();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    if (user) {
      // Check if the user has an admin role
      const verifyUserRole = async () => {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role !== "admin") {
              alert("Access denied. You do not have admin privileges.");
              router.push("/admin/login");
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
                role: "user", // Default role as 'user'
              },
              { merge: true }
            );
          }

          console.log("User document verified/updated");
          router.push("/admin/dashboard");
        } catch (error) {
          console.error(
            "Error verifying user role or updating document:",
            error
          );
        }
      };

      verifyUserRole();
    }
  }, [user, db, router]);

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
          Admin Login
        </h1>
        <LoginForm
          onClickLoginWithGoogle={googleSignIn}
          onClickLogin={async (email, pw) => {
            await emailPwSignIn(email, pw);
          }}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminLoginPage;
