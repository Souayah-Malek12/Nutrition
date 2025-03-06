import React, { useState } from "react";
import { auth, db } from "../config/firebase"; // Ensure db and auth are exported from firebase.js
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle sign-in
  const signIn = async () => {
    try {
      // If the user exists, log them in
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      setEmail(""); // Reset email
      setPassword(""); // Reset password
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Authentication</h2>

        {/* Form for input */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={signIn}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={logout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};