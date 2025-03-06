import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase"; // Ensure db and auth are exported from firebase.js
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const ImcHistoric = () => {
  const [imcHistory, setImcHistory] = useState([]); // State to store IMC history
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [user, setUser] = useState(null); // Track the current user

  useEffect(() => {
    // Subscribe to authentication changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if authenticated
        fetchImcHistory(currentUser); // Fetch IMC history for the user
      } else {
        setUser(null); // Clear the user if not authenticated
        setError("Please log in to view your IMC history.");
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to fetch IMC history
  const fetchImcHistory = async (user) => {
    try {
      setLoading(true);
      setError(null);

      // Query the Firestore 'imc' collection for the current user's data
      const imcCollectionRef = collection(db, "imc");
      const q = query(
        imcCollectionRef,
        where("userId", "==", user.uid), // Filter by userId
        orderBy("createdAt", "desc")    // Order by creation date (newest first)
      );

      const querySnapshot = await getDocs(q); // Execute the query
      const historyData = [];

      // Extract data from the query snapshot
      querySnapshot.forEach((doc) => {
        historyData.push({
          id: doc.id,
          ...doc.data(), // Spread the document data into the object
        });
      });

      setImcHistory(historyData); // Update state with the fetched data
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching IMC history:", error);

      if (error.code === "failed-precondition") {
        // Handle missing index error
        setError(
          "An index is required for this query. Please follow the link in the console to create it."
        );
      } else {
        setError("Failed to load IMC history.");
      }

      setLoading(false); // Stop loading
    }
  };

  return (
    <div >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900 animate-fade-in">
        IMC History
      </h1>
      {loading && <p className="text-center text-gray-700">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display IMC history */}
      {user && imcHistory.length > 0 ? (
        <div className="overflow-x-auto animate-slide-up">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 border border-gray-300">#</th>
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">BMI (IMC)</th>
                <th className="p-3 border border-gray-300">Weight (kg)</th>
                <th className="p-3 border border-gray-300">Height (cm)</th>
              </tr>
            </thead>
            <tbody>
              {imcHistory.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="p-3 border border-gray-300 text-center">{index + 1}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    {new Date(item.createdAt?.toDate()).toLocaleDateString()}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">{item.bmi}</td>
                  <td className="p-3 border border-gray-300 text-center">{item.weight} kg</td>
                  <td className="p-3 border border-gray-300 text-center">{item.height} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error && user ? (
        <p className="text-center text-gray-700">No IMC history available.</p>
      ) : null}
    </div>
  );
};

export default ImcHistoric;