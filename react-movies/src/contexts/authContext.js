import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log('Login Response:', data); // Log response

        if (!response.ok) {
          const errorMessage = data.message || "Login failed";
          throw new Error(errorMessage);
      }

        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
    } catch (error) {
        console.error("Login Error:", error.message);
        setIsAuthenticated(false);
    }
};


  const register = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/users/index.js/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log('Registration Response:', data); // Log response

        if (!response.ok) {
            throw new Error(data.msg || "Registration failed");
        }

        console.log("User registered successfully");
    } catch (error) {
        console.error("Registration Error:", error.message);
    }
};


  const signout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, register, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
