import React, { useState } from "react";
import { auth, db } from "../config/firebase"; // Ensure db and auth are exported from firebase.js
import { setDoc, doc } from "firebase/firestore"; // Import Firestore functions

const ImgPage = () => {
  const [imc, setImc] = useState(""); // IMC (Body Mass Index)
  const [age, setAge] = useState(""); // Age in years
  const [sexe, setSexe] = useState(""); // Gender (1 for male, 0 for female)
  const [img, setImg] = useState(null); // Calculated IMG
  const [imgMessage, setImgMessage] = useState(""); // IMG interpretation
  const [error, setError] = useState(""); // Error message

  // Function to calculate IMG
  const calculateIMG = (imc, age, sexe) => {
    if (!imc || !age || sexe === "") return null;
    const imgValue =
      1.2 * parseFloat(imc) + 0.23 * parseFloat(age) - 10.8 * (sexe === "male" ? 1 : 0) - 5.4;
    return parseFloat(imgValue.toFixed(2)); // Round to 2 decimal places
  };

  // Function to interpret IMG
  const interpretIMG = (img) => {
    if (img < 10) return "Very low fat mass";
    else if (img >= 10 && img < 20) return "Low fat mass";
    else if (img >= 20 && img < 30) return "Normal fat mass";
    else if (img >= 30 && img < 40) return "High fat mass";
    else return "Very high fat mass";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate inputs
    if (!imc || !age || sexe === "") {
      setError("Please enter all information.");
      return;
    }

    // Calculate IMG
    const imgValue = calculateIMG(imc, age, sexe);

    if (imgValue === null) {
      setError("Invalid input for IMG calculation.");
      return;
    }

    // Interpret IMG
    const imgInterpretation = interpretIMG(imgValue);

    // Update state with calculated IMG and interpretation
    setImg(imgValue);
    setImgMessage(imgInterpretation);
    setError(""); // Clear any previous error messages

    // Save IMG result to Firestore
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "imgCollection", user.uid), {
          userId: user.uid,
          imc: imc,
          age: age,
          sexe: sexe,
          img: imgValue,
          imgMessage: imgInterpretation,
          createdAt: new Date(),
        });

        console.log("IMG saved successfully!");
      } else {
        console.error("No user is logged in");
      }
    } catch (error) {
      console.error("Error saving IMG:", error);
      setError("There was an error saving your IMG result.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">IMG Calculator</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form for input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="imc" className="block text-sm font-medium text-gray-700">
              IMC (Body Mass Index)
            </label>
            <input
              type="number"
              id="imc"
              placeholder="Enter your IMC"
              value={imc}
              onChange={(e) => setImc(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age (years)
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="sexe" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="sexe"
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
          >
            Calculate IMG
          </button>
        </form>

        {/* Display IMG result */}
        {img !== null && (
          <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-md animate-slide-up">
            <h3 className="text-xl font-semibold mb-2 text-green-800">Your IMG Result:</h3>
            <p className="text-lg font-medium text-green-800">IMG: {img}%</p>
            <p className="text-base text-gray-700">Interpretation: {imgMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgPage;