"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  increment,
} from "firebase/firestore"
import { sendMealRequestEmail } from "@/lib/sendEmail"

export default function RequestMealPage() {
  const { mealId } = useParams()
  const router = useRouter()
  const [meal, setMeal] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)
  const [error, setError] = useState("")
  const [posterEmail, setPosterEmail] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth")
      } else {
        setUser(currentUser)
        if (!mealId) return

        const mealRef = doc(db, "meals", mealId as string)
        const mealSnap = await getDoc(mealRef)
        if (mealSnap.exists()) {
          const mealData = mealSnap.data()
          setMeal(mealData)

          const userRef = doc(db, "users", mealData.userId)
          const userSnap = await getDoc(userRef)
          if (userSnap.exists()) {
            setPosterEmail(userSnap.data().email || "")
          }
        }
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [mealId, router])

  const handleRequest = async () => {
    if (!user || !mealId || !meal) return
    setRequesting(true)
    setError("")

    try {
      // 1. Add to 'requests' collection
      await addDoc(collection(db, "requests"), {
        mealId,
        requestedBy: user.uid,
        requestedAt: new Date(),
      })

      // 2. Update points
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        points: increment(10),
      })

      // 3. Send email to poster
      if (posterEmail) {
        await sendMealRequestEmail(posterEmail, meal.title, user.email)
      }

      alert("Request sent! The meal poster has been notified and you earned 10 points 🎉")
      router.push("/")
    } catch (err: any) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setRequesting(false)
    }
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>
  if (!meal) return <p className="text-center mt-20">Meal not found</p>

  return (
    <div className="min-h-screen p-6 flex justify-center items-center bg-orange-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">{meal.title}</h2>
        <img src={meal.imageUrl} alt={meal.title} className="w-full rounded-lg" />
        <p><strong>Description:</strong> {meal.description}</p>
        <p><strong>Location:</strong> {meal.location}</p>
        <p><strong>ZIP:</strong> {meal.zip}</p>
        <p><strong>Freshness:</strong> {meal.freshness}</p>
        <p><strong>Posted by:</strong> 
          <a href={`/profile/${meal.userId}`} className="text-orange-600 underline ml-1">View Profile</a>
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleRequest}
          disabled={requesting}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
        >
          {requesting ? "Requesting..." : "Request This Meal"}
        </button>
      </div>
    </div>
  )
}
