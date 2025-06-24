import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUmo2QeiedoGO6InQfPXLO8JdDtWlbT2Y",
  authDomain: "project1994-56327.firebaseapp.com",
  projectId: "project1994-56327",
  storageBucket: "project1994-56327.firebasestorage.app",
  messagingSenderId: "296265529024",
  appId: "1:296265529024:web:2d5bb27a5f4cfd787f5f25",
  measurementId: "G-7YX1CFZRG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;