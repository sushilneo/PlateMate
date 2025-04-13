"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { getGeminiReply } from "@/lib/gemini"

export default function ChatPage() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      }
      setLoading(false)
    })

    const messagesRef = collection(db, "chats", chatId as string, "messages")
    const q = query(messagesRef, orderBy("timestamp"))

    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setMessages(msgs)
    })

    return () => {
      unsubscribeAuth()
      unsubscribeMessages()
    }
  }, [chatId])

  const handleSend = async () => {
    if (!input.trim() || !user) return

    await addDoc(collection(db, "chats", chatId as string, "messages"), {
      senderId: user.uid,
      message: input,
      timestamp: serverTimestamp(),
    })

    setInput("")

    const aiReply = await getGeminiReply([input])
    await addDoc(collection(db, "chats", chatId as string, "messages"), {
      senderId: "gemini",
      message: aiReply,
      timestamp: serverTimestamp(),
      isFromAI: true,
    })
  }

  if (loading) return <p className="text-center mt-20">Loading chat...</p>

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-4 space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-700">Meal Chat</h2>

        <div className="h-80 overflow-y-auto border rounded-lg p-4 space-y-2 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-xs ${
                msg.senderId === user?.uid ? "bg-orange-200 ml-auto" : msg.isFromAI ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border border-gray-300 p-2 rounded-lg"
          />
          <button
            onClick={handleSend}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}