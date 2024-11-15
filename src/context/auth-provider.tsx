'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/services/firebaseConfig';
import {  GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User} from 'firebase/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<{ user: User | null, googleSignIn: ()=>void, logOut: ()=>void, redirectToLogin: ()=>void }>({ user: null , googleSignIn: ()=>{} , logOut: ()=>{}, redirectToLogin: ()=>{} });

export const AuthProvider = ({children}:{children:any}) => {

const protectedRoutes = ['/admin'];
const router = useRouter();
const [user, setUser] = useState<User|null>(null);

const googleSignIn = async () => {
    console.log('signing in');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    .then((result) => {
        setUser(result.user);
    })
    .catch((error) => {
        console.log('error signing in',error);
    });
}

const logOut = async () =>{
    await signOut(auth);
}

const redirectToLogin = () => {
    const foundProtectedRoutes = protectedRoutes.filter((route)=> window.location.pathname.search(route) >= 0);
    if(foundProtectedRoutes.length > 0){
        router.push('/admin/login');
    }
};

useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authuser) => {
            if (authuser) {
                setUser(authuser);
            } else {
                setUser(null); 
                if(user == null){
                    redirectToLogin();
                }
            }
        });
           
        console.log('auth state changed',user);
        return () => unsubscribe();
    }, [user] );




return (
    <AuthContext.Provider value={{ user , googleSignIn , logOut, redirectToLogin }}>
        {children}
    </AuthContext.Provider>
);

}

export const useAuth = () => {
    return useContext(AuthContext);
};

