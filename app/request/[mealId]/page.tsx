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
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore"

export default function RequestMealPage() {
  const { mealId } = useParams()
  const router = useRouter()
  const [meal, setMeal] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)
  const [chatId, setChatId] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth")
      } else {
        setUser(currentUser)
        const mealRef = doc(db, "meals", mealId as string)
        const mealSnap = await getDoc(mealRef)
        if (mealSnap.exists()) {
          setMeal(mealSnap.data())
        }
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [mealId])

  const handleRequest = async () => {
    if (!user || !mealId || !meal) return
    setRequesting(true)
    setError("")

    try {
      // 1. Save meal request
      await addDoc(collection(db, "requests"), {
        mealId,
        requestedBy: user.uid,
        requestedAt: new Date(),
      })

      // 2. Reward points
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, { points: increment(10) }, { merge: true })

      // 3. Check if a chat already exists between requester & poster
      const chatQuery = query(
        collection(db, "chats"),
        where("participants", "array-contains", user.uid)
      )
      const existingChats = await getDocs(chatQuery)
      let existingChat = null

      existingChats.forEach((doc) => {
        const data = doc.data()
        if (data.participants.includes(meal.userId)) {
          existingChat = { id: doc.id, ...data }
        }
      })

      let newChatId = ""

      if (existingChat) {
        newChatId = existingChat.id
      } else {
        const chatDoc = await addDoc(collection(db, "chats"), {
          participants: [user.uid, meal.userId],
          createdAt: new Date(),
          lastMessage: null,
        })
        newChatId = chatDoc.id
      }

      setChatId(newChatId)
      alert("Request sent! ✅ You've earned 10 points 🙌")
    } catch (err: any) {
      console.error(err)
      setError("Something went wrong.")
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
        {meal.imageUrl && (
          <img src={meal.imageUrl} alt={meal.title} className="w-full rounded-lg" />
        )}
        <p><strong>Description:</strong> {meal.description}</p>
        <p><strong>Location:</strong> {meal.location}</p>
        <p><strong>ZIP:</strong> {meal.zip}</p>
        <p><strong>Freshness:</strong> {meal.freshness}</p>
        <p><strong>Status:</strong> {meal.freshnessStatus}</p>

        <p>
          <strong>Posted by:</strong>{" "}
          <a href={`/profile/${meal.userId}`} className="text-orange-600 underline ml-1">
            View Profile
          </a>
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleRequest}
          disabled={requesting}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
        >
          {requesting ? "Requesting..." : "Request This Meal"}
        </button>

        {chatId && (
          <a
            href={`/chat/${chatId}`}
            className="block text-center text-orange-600 font-medium mt-4 underline"
          >
            Open Chat with Poster →
          </a>
        )}
      </div>
    </div>
  )
}
