import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const ImgHistoric = () => {
  const [IMGHistory, setIMGHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchIMGHistory(currentUser);
      } else {
        setUser(null);
        setError("Please log in to view your IMG history.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchIMGHistory = async (user) => {
    try {
      setLoading(true);
      setError(null);

      const IMGCollectionRef = collection(db, "imgCollection");
      const q = query(
        IMGCollectionRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const historyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setIMGHistory(historyData);
    } catch (error) {
      console.error("Error fetching IMG history:", error);
      setError(
        error.code === "failed-precondition"
          ? "An index is required for this query. Please follow the link in the console to create it."
          : "Failed to load IMG history."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900 animate-fade-in">
        IMG History
      </h1>

      {loading && <p className="text-center text-gray-700">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {user && IMGHistory.length > 0 ? (
        <div className="overflow-x-auto animate-slide-up">
          <table className="w-full border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Age</th>
                <th className="p-3 border">BMI (IMG)</th>
                <th className="p-3 border">Message</th>
             
              </tr>
            </thead>
            <tbody>
              {IMGHistory.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">
                    {item.createdAt?.toDate
                      ? item.createdAt.toDate().toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-3 border text-center">{item.age}</td>

                  <td className="p-3 border text-center">{item.img}</td>
                  <td className="p-3 border text-center">{item.imgMessage} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && user && IMGHistory.length === 0 ? (
        <p className="text-center text-gray-700">No IMG history available.</p>
      ) : null}
    </div>
  );
};

export default ImgHistoric;
