"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface UserData {
  id: string
  name: string
  points: number
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<UserData[]>([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const q = query(collection(db, "users"), orderBy("points", "desc"), limit(10))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }))
      setUsers(data)
    }

    fetchLeaderboard()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">🏆 Monthly Leaderboard</h1>

        <ul className="space-y-4">
          {users.map((user, index) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-4 bg-orange-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">#{index + 1}</span>
                <span className="font-medium text-gray-800">{user.name || "Anonymous User"}</span>
              </div>
              <span className="text-lg font-semibold text-orange-500">{user.points} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
