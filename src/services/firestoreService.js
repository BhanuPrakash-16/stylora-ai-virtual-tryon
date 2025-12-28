// src/services/firestoreService.js
import {
    doc,
    setDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const createUserProfile = async (userId, data) => {
    const ref = doc(db, "users", userId);
    await setDoc(
        ref,
        {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        },
        { merge: true }
    );
};

export const getUserProfile = async (userId) => {
    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) return { data: snap.data() };
    return { data: null };
};

export const updateUserProfile = async (userId, data) => {
    const ref = doc(db, "users", userId);
    await setDoc(
        ref,
        {
            ...data,
            updatedAt: serverTimestamp(),
        },
        { merge: true }
    );
};

export const saveTryOnResult = async (userId, result) => {
    const ref = doc(collection(db, "tryOns"));
    await setDoc(ref, {
        userId,
        ...result,
        createdAt: serverTimestamp(),
    });
};

export const getTryOnHistory = async (userId) => {
    const q = query(collection(db, "tryOns"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteTryOn = async (tryOnId) => {
    await deleteDoc(doc(db, "tryOns", tryOnId));
};
