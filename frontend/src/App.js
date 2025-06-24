import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { useMobile } from "./hooks/useMobile";
import { notificationService } from "./services/notifications";

// Import components
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import AdminLogin from "./components/auth/AdminLogin";
import ProfileSetup from "./components/ProfileSetup";
import PaymentPage from "./components/PaymentPage";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import WorkoutPlan from "./components/WorkoutPlan";
import DietPlan from "./components/DietPlan";
import Progress from "./components/Progress";

function App() {
  const { isNative, platform } = useMobile();

  useEffect(() => {
    // Initialize mobile services
    if (isNative) {
      console.log(`Fitsheet running on ${platform}`);
      notificationService.initialize();
    }
  }, [isNative, platform]);

  return (
    <div className={`App ${isNative ? 'native-app' : 'web-app'}`}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/workout" element={<WorkoutPlan />} />
            <Route path="/diet" element={<DietPlan />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;