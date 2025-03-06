import React, { useState } from "react";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase"; // Ensure db and auth are exported from firebase.js
import { useNavigate } from "react-router-dom";

const ImcPage = () => {
  const navigate = useNavigate();
  const [poids, setPoids] = useState(""); // Weight in kg
  const [taille, setTaille] = useState(""); // Height in cm
  const [imc, setImc] = useState(null); // Calculated BMI
  const [imcMessage, setImcMessage] = useState(""); // BMI interpretation

  // Function to interpret BMI
  const interpretBMI = (bmi) => {
    if (bmi < 18.5)
      return "You are underweight. Consider a balanced diet.";
    else if (bmi >= 18.5 && bmi < 24.9)
      return "Normal weight. Keep maintaining your lifestyle!";
    else if (bmi >= 24.9 && bmi < 29.9)
      return "You are overweight. Consider healthy eating and exercise.";
    else
      return "Obesity. Seek medical advice for a healthier lifestyle.";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!poids || !taille) {
      alert("Veuillez entrer à la fois le poids et la taille.");
      return;
    }

    // Convert height to meters
    const heightInMeters = taille / 100;

    // Get the logged-in user
    const user = auth.currentUser;
    if (!user) {
      navigate('/login')
      console.error("User not logged in!");
      return;
    }

    // Calculate IMC (BMI)
    const bmi = poids / (heightInMeters * heightInMeters);
    setImc(bmi.toFixed(2));
    setImcMessage(interpretBMI(bmi));

    // Save IMC to Firestore
    try {
      await addDoc(collection(db, "imc"), {
        userId: user.uid, // Store user ID
        userRef: doc(db, "users", user.uid), // Store reference
        bmi: bmi.toFixed(2), // Keep 2 decimal places
        weight: poids,
        height: taille,
        createdAt: new Date(),
      });

      console.log("IMC saved successfully!");
    } catch (error) {
      console.error("Error saving IMC:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Calculateur d'IMC</h2>

        {/* Form for input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="poids" className="block text-sm font-medium text-gray-700">
              Poids (kg)
            </label>
            <input
              type="number"
              id="poids"
              placeholder="Entrez votre poids"
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
              placeholder="Entrez votre taille"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
          >
            Calculer IMC
          </button>
        </form>

        {/* Display BMI result */}
        {imc !== null && (
          <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-md animate-slide-up">
            <h3 className="text-xl font-semibold mb-2 text-green-800">Votre Résultat IMC :</h3>
            <p className="text-lg font-medium text-green-800">IMC : {imc}</p>
            <p className="text-base text-gray-700">{imcMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImcPage;