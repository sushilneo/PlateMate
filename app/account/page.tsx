"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [points, setPoints] = useState(0)
  const [rank, setRank] = useState<number | null>(null)
  const [meals, setMeals] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth")
      } else {
        setUser(currentUser)
        const userRef = doc(db, "users", currentUser.uid)
        const userSnap = await getDoc(userRef)
        const currentUserPoints = userSnap.exists() ? userSnap.data().points || 0 : 0
        setPoints(currentUserPoints)

        // Fetch all users to calculate rank
        const allUsersSnap = await getDocs(collection(db, "users"))
        const sorted = allUsersSnap.docs
          .map((doc) => ({ id: doc.id, points: doc.data().points || 0 }))
          .sort((a, b) => b.points - a.points)

        const userRank = sorted.findIndex((u) => u.id === currentUser.uid) + 1
        setRank(userRank)

        // User's posted meals
        const mealsQuery = query(collection(db, "meals"), where("userId", "==", currentUser.uid))
        const mealsSnap = await getDocs(mealsQuery)
        setMeals(mealsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))

        // Meals requested
        const reqQuery = query(collection(db, "requests"), where("requestedBy", "==", currentUser.uid))
        const reqSnap = await getDocs(reqQuery)
        setRequests(reqSnap.docs.map((doc) => doc.data()))
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <p className="text-center mt-20">Loading...</p>

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">My Account</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <p className="text-gray-800"><strong>Email:</strong> {user?.email}</p>
        <p className="text-gray-800"><strong>Points:</strong> {points} 🏆</p>
        {rank && <p className="text-gray-800"><strong>Leaderboard Rank:</strong> #{rank}</p>}

        <div>
          <h3 className="text-lg font-semibold mt-4 mb-2">🍽️ Meals You've Posted</h3>
          {meals.length > 0 ? (
            <ul className="space-y-2">
              {meals.map((meal) => (
                <li key={meal.id} className="border p-3 rounded-lg bg-gray-50">
                  <strong>{meal.title}</strong> – {meal.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven't posted any meals yet.</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mt-4 mb-2">🤝 Meals You've Requested</h3>
          {requests.length > 0 ? (
            <ul className="space-y-2">
              {requests.map((req, index) => (
                <li key={index} className="border p-3 rounded-lg bg-gray-50">
                  <strong>Meal ID:</strong> {req.mealId}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven't requested any meals yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
