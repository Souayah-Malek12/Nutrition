import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [pI, setPi] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch user details from Firestore
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setProfile(userDoc.data());
            if(profile){
            const taille = profile.taille || 0;
  const coef = profile.sexe === "male" ? 4 : 2.5;
  setPi(taille - 100 - (taille - 150) / coef);

  if(pI< profile.poids) {
    setMessage("Adjust your diet by reducing empty calories and increasing physical exercise");
  }else {
    setMessage(' Increase your calorie intake with healthy and nutrient-rich foods.')
  } }
          } else {
            setError("User profile not found.");
          }
        } catch (err) {
          setError("Failed to load user data.",err);
        }
      } else {
        setError("Please log in to view your IMC history.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profile]);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <h1>{error}</h1>;
  if (!profile) return <h1>No profile data found.</h1>;

  // Compute ideal weight
  

  return (
    <div className="max-w-3xl mt-10 mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 className="text-3xl font-semibold text-green-600 text-center">
      Welcome: {profile.nom} {profile.prenom}
    </h1>

    {pI && (
      <h1 className="text-2xl font-medium text-orange-600 text-center my-4">
        Your ideal weight is: {pI.toFixed(2)} kg
      </h1>
    )}

    {message && (
      <h2 className="text-lg font-bold text-red-500 text-center mt-4">
        {message}
      </h2>
    )}
  </div>
  );
};

export default MyProfile;
