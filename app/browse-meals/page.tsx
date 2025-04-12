"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export default function BrowseMealsPage() {
  const [meals, setMeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [zipFilter, setZipFilter] = useState("")

  const fetchMeals = async (zip = "") => {
    setLoading(true)
    let q = collection(db, "meals")

    if (zip) {
      q = query(q, where("zip", "==", zip))
    }

    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setMeals(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault()
    fetchMeals(zipFilter)
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">All Available Meals</h2>

      <form onSubmit={handleFilter} className="max-w-md mx-auto mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter ZIP Code"
          value={zipFilter}
          onChange={(e) => setZipFilter(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          Filter
        </button>
      </form>

      {loading ? (
        <p className="text-center mt-20">Loading meals...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-xl shadow space-y-3">
              <img src={meal.imageUrl} alt={meal.title} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold">{meal.title}</h3>
              <p className="text-gray-600 text-sm">{meal.description}</p>
              <p className="text-sm"><strong>Location:</strong> {meal.location}</p>
              <p className="text-sm"><strong>Freshness:</strong> {meal.freshness}</p>
              <Link
                href={`/request/${meal.id}`}
                className="block text-center mt-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              >
                Request Meal
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
