// src/context/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const contextLogin = (userData, token) => {
    if (userData.hasOwnProperty("token")) {
      delete userData.token;
    }
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const contextLogout = () => {
    console.log("removing token from the local storage");
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token != null;
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, contextLogin, contextLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
