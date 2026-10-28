import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";


import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

// Convert Student ID into the Firebase account email format.
// Student accounts must be provisioned with this same email format.
const studentIdToEmail = (studentId) => {
  const normalizedId = studentId.trim().toLowerCase();

  return `${normalizedId}@students.apwa-lms.com`;
};

export const loginUser = async (
  studentId,
  password,
  rememberMe = true
) => {
  try {
    if (!studentId?.trim() || !password) {
      return {
        success: false,
        message: "Please enter your Student ID and password.",
      };
    }

    // Remember me = persistent session.
    await setPersistence(
      auth,
      rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence
    );

    const email = studentIdToEmail(studentId);

    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      success: true,
      user: credential.user,
    };
  } catch (error) {
    console.error("Student login error:", error.code);

    const messages = {
      "auth/invalid-credential":
        "Invalid Student ID or password.",
      "auth/user-not-found":
        "Invalid Student ID or password.",
      "auth/wrong-password":
        "Invalid Student ID or password.",
      "auth/too-many-requests":
        "Too many attempts. Please try again later.",
      "auth/invalid-api-key":
        "Firebase API key is invalid. Check your .env configuration.",
      "auth/network-request-failed":
        "Network error. Please check your internet connection.",
    };

    return {
      success: false,
      message:
        messages[error.code] ||
        "Unable to log in. Please try again.",
      error: error.code,
    };
  }
};

export const getUserProfile = async (uid) => {
  try {
    const profileRef = doc(db, "users", uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      return {
        success: false,
        message: "Student profile not found.",
      };
    }

    return {
      success: true,
      profile: profileSnap.data(),
    };
  } catch (error) {
    console.error("Profile error:", error.code);

    return {
      success: false,
      message: "Unable to load your student profile.",
      error: error.code,
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.code,
    };
  }
};