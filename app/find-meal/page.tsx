"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FindMealPage() {
  const [zip, setZip] = useState("");
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!zip) return;
    setLoading(true);
    setMeals([]);
    setError("");

    try {
      const q = query(collection(db, "meals"), where("zip", "==", zip));
      const querySnapshot = await getDocs(q);
      const results: any[] = [];
      querySnapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
      setMeals(results);
      if (results.length === 0) setError("No meals found for this ZIP code.");
    } catch (err) {
      setError("Failed to fetch meals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Find Meals by ZIP Code</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter ZIP Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="flex-grow p-3 border rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Searching...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {meals.map((meal) => (
          <div key={meal.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">{meal.title}</h3>
            <p>{meal.description}</p>
            <p className="text-sm text-gray-600">ZIP: {meal.zip} | Freshness: {meal.freshness}</p>
            {meal.imageUrl && (
              <img
                src={meal.imageUrl}
                alt="Meal Image"
                className="mt-2 rounded-lg max-h-64 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
