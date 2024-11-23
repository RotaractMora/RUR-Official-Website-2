'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/services/firebaseConfig';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { app } from '@/services/firebaseConfig';

const AuthContext = createContext<{ user: User | null, googleSignIn: () => void, logOut: () => void, redirectToLogin: () => void }>({ user: null, googleSignIn: () => { }, logOut: () => { }, redirectToLogin: () => { } });

export const AuthProvider = ({ children }: { children: any }) => {
  const protectedRoutes = ['/admin'];
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore(app);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const redirectToLogin = () => {
    const foundProtectedRoutes = protectedRoutes.filter((route) => window.location.pathname.includes(route));
    if (foundProtectedRoutes.length > 0) {
      router.push('/admin/login');
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
            router.push('/admin/login');
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
    <AuthContext.Provider value={{ user, googleSignIn, logOut, redirectToLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
