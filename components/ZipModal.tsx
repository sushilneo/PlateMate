"use client"

import { useState } from "react"

export default function ZipModal({ isOpen, onClose, onSubmit }: any) {
  const [zip, setZip] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-center">Enter Your ZIP Code</h2>
        <input
          type="text"
          className="border w-full px-4 py-2 rounded mb-4"
          placeholder="e.g. 90210"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="text-gray-500 hover:underline">Cancel</button>
          <button
            onClick={() => onSubmit(zip)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Find Food Nearby
          </button>
        </div>
      </div>
    </div>
  )
}
