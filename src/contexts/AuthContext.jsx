// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import { auth, googleProvider } from "../config/firebase";
import {
    createUserProfile,
    getUserProfile,
} from "../services/firestoreService";

const AuthContext = createContext(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);

                const { data } = await getUserProfile(firebaseUser.uid);

                if (!data) {
                    await createUserProfile(firebaseUser.uid, {
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName || "",
                        photoURL: firebaseUser.photoURL || "",
                    });

                    const { data: newProfile } = await getUserProfile(firebaseUser.uid);
                    setUserProfile(newProfile);
                } else {
                    setUserProfile(data);
                }
            } else {
                setUser(null);
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsub();
    }, []);

    /** ✅ Email login */
    const login = async ({ email, password }) => {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res.user;
    };

    /** ✅ Email register */
    const register = async ({ email, password, name }) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(res.user.uid, {
            email,
            displayName: name,
        });
        return res.user;
    };

    /** ✅ Google Sign-In (NO argument error) */
    const signInWithGoogle = async () => {
        const res = await signInWithPopup(auth, googleProvider);

        const { data } = await getUserProfile(res.user.uid);
        if (!data) {
            await createUserProfile(res.user.uid, {
                email: res.user.email,
                displayName: res.user.displayName || "User",
                photoURL: res.user.photoURL || "",
            });
        }

        return res.user;
    };

    /** ✅ Logout */
    const logout = async () => {
        await signOut(auth);
    };

    /** ✅ Reset Password */
    const resetPassword = async (email) => {
        const { sendPasswordResetEmail } = await import("firebase/auth");
        await sendPasswordResetEmail(auth, email);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                userProfile,
                loading,
                isAuthenticated: !!user,
                login,
                register,
                signInWithGoogle,
                logout,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
