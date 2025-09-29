import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPwrUTVR330NL6yk1THbn-vNpPdtbxjK0",
  authDomain: "my-shifts-noy.firebaseapp.com",
  projectId: "my-shifts-noy",
  storageBucket: "my-shifts-noy.firebasestorage.app",
  messagingSenderId: "282632107629",
  appId: "1:282632107629:web:5efbeeadb9317c5fd8b164",
  measurementId: "G-DCHDPCHZ99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);