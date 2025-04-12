"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"

interface Meal {
  id: string
  title: string
  description: string
  location: string
  freshness: string
  imageUrl: string
}

export default function FeaturedMeals() {
  const [meals, setMeals] = useState<Meal[]>([])

  useEffect(() => {
    const fetchMeals = async () => {
      const snapshot = await getDocs(collection(db, "meals"))
      const mealList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Meal[]
      setMeals(mealList)
    }

    fetchMeals()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Meals</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src={meal.imageUrl}
                alt={meal.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{meal.title}</h3>
              <p className="text-gray-600">{meal.description}</p>
              <p className="text-sm text-gray-500 mt-2">📍 {meal.location}</p>
              <p className="text-sm text-gray-500">⏳ {meal.freshness}</p>

              <Link
                href={`/request/${meal.id}`}
                className="inline-block mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Request Meal
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
