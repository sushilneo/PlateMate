"use client"

import { useState } from "react"

export default function PostFoodModal({ isOpen, onClose, onSubmit }: any) {
  const [foodName, setFoodName] = useState("")
  const [description, setDescription] = useState("")
  const [expiry, setExpiry] = useState("")
  const [zip, setZip] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    const foodData = {
      name: foodName,
      description,
      expiry,
      zip,
    }

    // For now, just show an alert (can be replaced with real logic)
    alert(`Meal posted!\n\n${JSON.stringify(foodData, null, 2)}`)
    onSubmit(foodData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-center">Post a Meal</h2>

        <input
          type="text"
          placeholder="Food name"
          className="border w-full px-4 py-2 rounded mb-3"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <textarea
          placeholder="Short description"
          className="border w-full px-4 py-2 rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Expiry time (e.g. Today 6PM)"
          className="border w-full px-4 py-2 rounded mb-3"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />

        <input
          type="text"
          placeholder="Your ZIP code"
          className="border w-full px-4 py-2 rounded mb-4"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />

        <div className="flex justify-between">
          <button onClick={onClose} className="text-gray-500 hover:underline">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Post Food
          </button>
        </div>
      </div>
    </div>
  )
}
