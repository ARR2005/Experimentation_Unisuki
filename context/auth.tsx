import { auth } from "@/FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

export const Auth = createContext<any | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      setIsAuthenticated(true);
      return userCredential.user;
    } catch (error: any) {
      const errorMessage =
        error.code === "auth/user-not-found"
          ? "User not found"
          : error.code === "auth/wrong-password"
            ? "Incorrect password"
            : error.code === "auth/invalid-email"
              ? "Invalid email address"
              : error.message || "Login failed";
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      throw new Error(error.message || "Logout failed");
    }
  };

  const register = async (
    email: string,
    password: string,
    username?: string,
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      setIsAuthenticated(true);
      return userCredential.user;
    } catch (error: any) {
      const errorMessage =
        error.code === "auth/email-already-in-use"
          ? "Email already in use"
          : error.code === "auth/weak-password"
            ? "Password should be at least 6 characters"
            : error.code === "auth/invalid-email"
              ? "Invalid email address"
              : error.message || "Registration failed";
      throw new Error(errorMessage);
    }
  };

  return (
    <Auth.Provider
      value={{ user, isAuthenticated, login, logout, register, loading }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(Auth);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return value;
};
