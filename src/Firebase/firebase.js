// Import the necessary functions from the Firebase SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore database
import { getAuth } from "firebase/auth"; // Authentication
import { getStorage } from "firebase/storage"; // Storage (for file uploads)

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk0FrcV_QrFLCf5ZbDa4r51hgl7fvTz10",
  authDomain: "cvmaker-465dc.firebaseapp.com",
  projectId: "cvmaker-465dc",
  storageBucket: "cvmaker-465dc.appspot.com",
  messagingSenderId: "885119914865",
  appId: "1:885119914865:web:1b598771047709d3e61cd0",
  measurementId: "G-EZ8QD16ZVV",
};

// Initialize Firebase (only if not initialized yet)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app); // Optional, only if you need Analytics

// Initialize Firebase services
const db = getFirestore(app); // Firestore for database
const storage = getStorage(app); // Storage for file uploads
export const auth = getAuth(app); // Authentication
// Export Firebase services to use in other files
export { app, analytics, db, storage };
