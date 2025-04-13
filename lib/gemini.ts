// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

export async function estimateFreshness(freshnessInput: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" }) // ✅ Use this for Flash

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `A user wrote "${freshnessInput}" for how fresh a meal is. Based on that, return a short label like: "Very Fresh", "Fresh", "Moderate", or "Not Fresh".`
            }
          ]
        }
      ]
    })

    const response = await result.response
    return response.text()
  } catch (error: any) {
    console.error("[Gemini AI Error]:", error)
    return `AI Estimation Failed, Error: ${error.message || error.toString()}`
  }
}
