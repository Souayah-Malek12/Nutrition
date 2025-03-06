import React, { useState } from "react";
import axios from "axios";

const FoodSearchPage = () => {
  const [query, setQuery] = useState(""); // Requête de recherche
  const [results, setResults] = useState([]); // Résultats de la recherche
  const [loading, setLoading] = useState(false); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Clé API CalorieNinjas (remplacez-la par votre propre clé)
  const API_KEY = "pYgEFhd9EQJM6N+ttK9v3A==zSDffquz4y1Po0Vg"; // Remplacez YOUR_API_KEY avec votre clé API réelle

  // Fonction pour effectuer la recherche initiale
  const handleSearch = async (e,) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Veuillez entrer un aliment à rechercher.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Effectuer une requête à l'API CalorieNinjas pour obtenir les informations nutritionnelles
      const response = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });

      if (response.data && response.data.items && response.data.items.length > 0) {
        const foodItems = response.data.items.map((item) => ({
          name: item.name || "Nom non disponible",
          calories: item.calories || "Données non disponibles",
          protein: item.protein_g || "Données non disponibles",
          carbohydrates: item.carbohydrates_total_g || "Données non disponibles",
          fat: item.fat_total_g || "Données non disponibles",
        }));

        setResults(foodItems);
      } else {
        throw new Error("Aucun résultat trouvé.");
      }
    } catch (err) {
      console.error("Error fetching nutrition data:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || "Une erreur s'est produite lors de la recherche.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center -50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full animate-fade-in">
        {/* Titre */}
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Recherche d'Aliments</h2>

        {/* Formulaire de recherche */}
        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            placeholder="Rechercher un aliment..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
          >
            Rechercher
          </button>
        </form>

        {/* Affichage des erreurs */}
        {error && <p className="text-red-500 text-center mt-4">Erreur : {error}</p>}

        {/* Indicateur de chargement */}
        {loading && <p className="text-center text-gray-700 mt-4">Chargement...</p>}

        {/* Affichage des résultats */}
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Résultats de la Recherche :</h3>
            <ul className="space-y-4">
              {results.map((food, index) => (
                <li
                  key={index}
                  className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
                >
                  <h4 className="text-lg font-medium text-blue-900">{food.name || "Nom non disponible"}</h4>
                  <p className="text-gray-700">
                    <strong>Calories :</strong> {food.calories} kcal
                  </p>
                  <p className="text-gray-700">
                    <strong>Protéines :</strong> {food.protein} g
                  </p>
                  <p className="text-gray-700">
                    <strong>Glucides :</strong> {food.carbohydrates} g
                  </p>
                  <p className="text-gray-700">
                    <strong>Graisses :</strong> {food.fat} g
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Message si aucun résultat n'est trouvé */}
        {results.length === 0 && !loading && !error && (
          <p className="text-center text-gray-700 mt-4">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default FoodSearchPage;