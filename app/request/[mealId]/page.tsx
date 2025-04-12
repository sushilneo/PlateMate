"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export default function RequestMealPage() {
  const { mealId } = useParams()
  const router = useRouter()

  const [meal, setMeal] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)

  // Check auth status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth")
      } else {
        setUser(currentUser)
      }
    })
    return () => unsubscribe()
  }, [])

  // Fetch meal by ID
  useEffect(() => {
    async function fetchMeal() {
      if (!mealId) return
      const docRef = doc(db, "meals", mealId as string)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setMeal(docSnap.data())
      } else {
        alert("Meal not found.")
        router.push("/")
      }
      setLoading(false)
    }

    fetchMeal()
  }, [mealId])

  const handleRequest = async () => {
    if (!user || !meal) return
    setRequesting(true)

    try {
      // 🔔 Here, you can later trigger an email or SMS to meal.userId
      console.log(`User ${user.email} requested meal ${meal.title}`)
      alert("Request sent to the meal provider! 🙌")

      // Optionally redirect or update request status in DB
      router.push("/")
    } catch (error) {
      alert("Failed to request meal.")
    } finally {
      setRequesting(false)
    }
  }

  if (loading) return <p className="text-center mt-20">Loading meal...</p>

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{meal.title}</h1>
        {meal.imageUrl && (
          <img
            src={meal.imageUrl}
            alt={meal.title}
            className="w-full max-h-96 object-cover rounded-xl border"
          />
        )}
        <p><strong>Description:</strong> {meal.description}</p>
        <p><strong>Location:</strong> {meal.location}</p>
        <p><strong>ZIP Code:</strong> {meal.zip}</p>
        <p><strong>Freshness:</strong> {meal.freshness}</p>

        <button
          onClick={handleRequest}
          disabled={requesting}
          className="mt-4 bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600"
        >
          {requesting ? "Requesting..." : "Request Meal"}
        </button>
      </div>
    </div>
  )
}
