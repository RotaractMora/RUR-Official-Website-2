"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/services/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { app } from "@/services/firebaseConfig";

const AuthContext = createContext<{
  user: User | null;
  googleSignIn: () => void;
  logOut: () => Promise<any>;
  redirectToLogin: () => void;
  emailPwSignIn: (email: string, password: string) => void;
}>({
  user: null,
  googleSignIn: () => {},
  logOut: async () => {},
  redirectToLogin: () => {},
  emailPwSignIn: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const protectedRoutes = ["/admin"];
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore(app);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const emailPwSignIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      console.log("Signed in with email and password:", result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const redirectToLogin = () => {
    const foundProtectedRoutes = protectedRoutes.filter((route) =>
      window.location.pathname.includes(route)
    );
    if (foundProtectedRoutes.length > 0) {
      //router.push("/admin/login");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role !== "admin") {
            alert("Access denied. You do not have admin privileges.");
            router.push("/admin/login");
            await logOut();
            return;
          }
        }
        setUser(authUser);
      } else {
        setUser(null);
        redirectToLogin();
      }
    });

    return () => unsubscribe();
  }, [db, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        redirectToLogin,
        emailPwSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
