"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"
import { onAuthStateChanged, signOut } from "firebase/auth"

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [mealsPosted, setMealsPosted] = useState<any[]>([])
  const [mealsRequested, setMealsRequested] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth")
      } else {
        setUser(currentUser)

        // Fetch user profile data (username, points, email)
        const userRef = doc(db, "users", currentUser.uid)
        const userSnap = await getDoc(userRef)
        setUserData(userSnap.data())

        // Fetch meals posted
        const postedQuery = query(collection(db, "meals"), where("userId", "==", currentUser.uid))
        const postedSnap = await getDocs(postedQuery)
        setMealsPosted(postedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))

        // Fetch meals requested
        const requestQuery = query(collection(db, "requests"), where("requestedBy", "==", currentUser.uid))
        const requestSnap = await getDocs(requestQuery)
        setMealsRequested(requestSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))

        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/")
  }

  if (loading) return <p className="text-center mt-20">Loading your account...</p>

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">My Account</h2>

        {userData && (
          <div className="space-y-2 text-center">
            <p><strong>Username:</strong> {userData.username || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Points:</strong> {userData.points || 0}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Log Out
        </button>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Meals You've Posted</h3>
          {mealsPosted.length > 0 ? (
            <ul className="list-disc ml-6 space-y-1">
              {mealsPosted.map((meal) => (
                <li key={meal.id}>{meal.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No meals posted yet.</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Meals You've Requested</h3>
          {mealsRequested.length > 0 ? (
            <ul className="list-disc ml-6 space-y-1">
              {mealsRequested.map((req) => (
                <li key={req.id}>Meal ID: {req.mealId}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No meals requested yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
