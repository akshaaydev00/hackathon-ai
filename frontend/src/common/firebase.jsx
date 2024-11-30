import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBiyetyoSsl-UlQOOD2hr_R-YWTu6Cy6Ko",
  authDomain: "react-js-website-blog.firebaseapp.com",
  projectId: "react-js-website-blog",
  storageBucket: "react-js-website-blog.appspot.com",
  messagingSenderId: "1022064923853",
  appId: "1:1022064923853:web:597710160cda2c046e4584"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Google authentication provider
const provider = new GoogleAuthProvider();
const auth = getAuth();

// Function to handle Google authentication
export const authWithGoogle = async () => {
  try {
    // Sign in with Google popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // Access the authenticated user
    return user; // Return the user object
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null; // Return null if an error occurs
  }
};
