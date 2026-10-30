import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import { auth } from "../../firebase/config";

export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        return {
            success: true,
            user,
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
        };
    }
};
// LOGIN
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return {
            success: true,
            user: userCredential.user,
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
        };
    }
};

// REGISTER
export async function registerUser(name, email, password) {
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(result.user, {
            displayName: name.trim(),
        });

        return {
            success: true,
            user: result.user,
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
        };
    }
};

// LOGOUT
export const logoutUser = async () => {
    try {
        await signOut(auth);

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
        };
    }
};