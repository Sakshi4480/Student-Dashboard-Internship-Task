
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyDLUxpUYxW2xufdxAqgXjNps3EZBDUOhi4",
        authDomain: "react-student-dashboard-6aa9c.firebaseapp.com",
        projectId: "react-student-dashboard-6aa9c",
        storageBucket: "react-student-dashboard-6aa9c.firebasestorage.app",
        messagingSenderId: "213080343529",
        appId: "1:213080343529:web:d1e0995e462d00bf08c178",
        measurementId: "G-Q7QZ5HQX55"
      };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
