import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration - REAL CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAjI1BmS9_9WmGpGi44suTPEZybZKJumNk",
  authDomain: "fitsheet-project.firebaseapp.com", // NEED TO UPDATE
  projectId: "fitsheet-project", // NEED TO UPDATE  
  storageBucket: "fitsheet-project.appspot.com", // NEED TO UPDATE
  messagingSenderId: "123456789", // NEED TO UPDATE
  appId: "1:123456789:web:abcdef123456" // NEED TO UPDATE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

// Instructions for getting real Firebase config:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project named "Fitsheet"
// 3. Go to Project Settings → General → Your apps
// 4. Click "Add app" → Web app
// 5. Copy the config object and replace the one above