import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className={darkMode ? 'dark-theme' : 'light-theme'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
