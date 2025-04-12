import emailjs from "emailjs-com"

export const sendMealRequestEmail = async (toEmail: string, mealTitle: string, requesterEmail: string) => {
  const templateParams = {
    to_email: toEmail,
    meal_title: mealTitle,
    requester_email: requesterEmail,
  }

  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    return result
  } catch (error) {
    console.error("EmailJS Error:", error)
    throw error
  }
}
