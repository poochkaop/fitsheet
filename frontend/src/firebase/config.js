import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration - TO BE REPLACED WITH ACTUAL CONFIG
const firebaseConfig = {
  // This is a placeholder config - replace with your actual Firebase config
  apiKey: "demo-api-key",
  authDomain: "fitsheet-demo.firebaseapp.com",
  projectId: "fitsheet-demo",
  storageBucket: "fitsheet-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
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