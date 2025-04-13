"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { db } from "@/lib/firebase"
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore"

export default function UserProfilePage() {
  const { userId } = useParams()
  const [meals, setMeals] = useState<any[]>([])
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return

      try {
        // Get meals by this user
        const q = query(collection(db, "meals"), where("userId", "==", userId))
        const querySnapshot = await getDocs(q)
        const userMeals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setMeals(userMeals)

        // Get user points
        const userRef = doc(db, "users", userId as string)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          setUserInfo(userSnap.data())
        }
      } catch (err) {
        console.error("Error loading profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  if (loading) return <p className="text-center mt-20">Loading profile...</p>

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">User Profile</h2>

        <p className="text-center text-gray-600">
          <strong>Points:</strong> {userInfo?.points || 0}
        </p>
        <p className="text-center text-gray-600">
          <strong>User ID:</strong> {userId}
        </p>

        <hr />

        <h3 className="text-xl font-semibold text-gray-800">Meals Posted:</h3>
        {meals.length === 0 ? (
          <p className="text-gray-500">No meals posted yet.</p>
        ) : (
          <ul className="space-y-4">
            {meals.map((meal) => (
              <li key={meal.id} className="bg-orange-100 rounded-lg p-4">
                <h4 className="font-bold text-lg">{meal.title}</h4>
                <p className="text-sm">{meal.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
