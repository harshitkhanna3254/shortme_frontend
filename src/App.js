import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import AccountInfo from "./pages/AccountInfo"; 
import NavBar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/subscriptions" element={<SubscriptionPage />} />
            <Route path="/my-account" element={<AccountInfo />} /> 
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
