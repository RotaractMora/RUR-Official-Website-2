"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../../../services/firebaseConfig";
import { LoginForm } from "@/components/login-form";
import { toast } from "sonner";

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
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900">
      <LoginForm
        onClickLogin={emailPwSignIn}
        onClickForgotPassword={() => {
          router.push("/admin/forgot-password");
        }}
      />
    </div>
  );
};

export default AdminLoginPage;
