"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db, storage } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { estimateFreshness } from "@/lib/gemini"

export default function PostMealPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const [meal, setMeal] = useState({
    title: "",
    description: "",
    location: "",
    zipcode: "",
    freshness: "",
    image: null as File | null,
  })

  const addPoints = async (userId: string, points: number) => {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const currentPoints = userSnap.data().points || 0
      await updateDoc(userRef, { points: currentPoints + points })
    } else {
      await setDoc(userRef, { points })
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth")
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMeal((prev) => ({ ...prev, [name]: value }))
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMeal((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setError("")

    try {
      let imageUrl = ""

      if (meal.image) {
        const imageRef = ref(storage, `meals/${Date.now()}-${meal.image.name}`)
        await uploadBytes(imageRef, meal.image)
        imageUrl = await getDownloadURL(imageRef)
      }

      // ⭐ Ask Gemini AI to estimate freshness
      const freshnessStatus = await estimateFreshness(meal.freshness)

      // 🔥 Save to Firestore
      await addDoc(collection(db, "meals"), {
        userId: user.uid,
        title: meal.title,
        description: meal.description,
        location: meal.location,
        zip: meal.zipcode,
        freshness: meal.freshness,
        freshnessStatus: freshnessStatus || "Unknown",
        imageUrl,
        createdAt: serverTimestamp(),
      })

      await addPoints(user.uid, 10)

      alert("Meal posted successfully! 🍽️ You earned 10 points 🎉")
      router.push("/")
    } catch (err: any) {
      console.error("Post Error:", err)
      setError(err.message || "Something went wrong.")
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <p className="text-center mt-20">Checking login status...</p>

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Post a Meal</h2>

        <input
          name="title"
          placeholder="Meal Title"
          value={meal.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={meal.description}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
          rows={3}
        />
        <input
          name="location"
          placeholder="Location"
          value={meal.location}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          name="zipcode"
          placeholder="ZIP Code"
          value={meal.zipcode}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          name="freshness"
          placeholder="Freshness (e.g., 2 hours ago)"
          value={meal.freshness}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full p-3 border rounded-lg"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
        >
          {uploading ? "Posting..." : "Post Meal"}
        </button>
      </form>
    </div>
  )
}
