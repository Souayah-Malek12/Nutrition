import React, { useState } from "react";
import { auth, db } from "../config/firebase"; // Ensure db and auth are exported from firebase.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const Registre = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [sexe, setSexe] = useState("");

  // Function to handle sign-up
  const signUp = async () => {
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Get the user's UID
      const user = userCredential.user;

      if (!user) {
        throw new Error("User creation failed.");
      }

      // Add user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        nom,
        prenom,
        email,
        password,
        uid: user.uid,
      });

      console.log("User registered successfully!", userCredential);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Register</h2>

        {/* Form for input */}
        <form className="space-y-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

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

          <div>
            <label htmlFor="poids" className="block text-sm font-medium text-gray-700">
              Poids (kg)
            </label>
            <input
              type="number"
              id="poids"
              placeholder="Poids (kg)"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="taille" className="block text-sm font-medium text-gray-700">
              Taille (cm)
            </label>
            <input
              type="number"
              id="taille"
              placeholder="Taille (cm)"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="sexe" className="block text-sm font-medium text-gray-700">
              Sexe
            </label>
            <select
              id="sexe"
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Sélectionnez votre sexe</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
          </div>

          <button
            type="button"
            onClick={signUp}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};