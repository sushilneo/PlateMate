"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import Link from "next/link"

export default function FeaturedMeals() {
  const [meals, setMeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const q = query(collection(db, "meals"), orderBy("createdAt", "desc"), limit(6))
        const snapshot = await getDocs(q)
        const mealsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setMeals(mealsData)
      } catch (error) {
        console.error("Error fetching meals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading featured meals...</p>
  if (meals.length === 0) return <p className="text-center mt-10">No meals available yet.</p>

  return (
    <section className="py-12 px-4 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-2xl shadow-md space-y-2">
              {meal.imageUrl ? (
                <img
                  src={meal.imageUrl}
                  alt={meal.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-800">{meal.title}</h3>
              <p className="text-gray-600 text-sm">{meal.description}</p>
              <p className="text-gray-500 text-sm">
                <strong>Location:</strong> {meal.location}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>ZIP:</strong> {meal.zip}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Freshness:</strong> {meal.freshness}
              </p>
              <p className="text-sm text-green-700">
                <strong>AI Freshness:</strong>{" "}
                {meal.freshnessStatus || (
                  <span className="text-yellow-600">Evaluating...</span>
                )}
              </p>
              <Link
                href={`/request/${meal.id}`}
                className="block mt-2 text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium"
              >
                Request This Meal
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
