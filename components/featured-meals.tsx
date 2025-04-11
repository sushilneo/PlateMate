"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { useInView } from "framer-motion"

const meals = [
  {
    id: 1,
    name: "Homemade Pasta",
    image: "/placeholder.svg?height=300&width=400",
    summary: "Delicious pasta with tomato sauce, enough for 2 people",
    expiry: "Today, 8PM",
  },
  {
    id: 2,
    name: "Vegetable Curry",
    image: "/placeholder.svg?height=300&width=400",
    summary: "Mild vegetable curry with rice, vegan friendly",
    expiry: "Tomorrow, 12PM",
  },
  {
    id: 3,
    name: "Birthday Cake",
    image: "/placeholder.svg?height=300&width=400",
    summary: "Half chocolate cake, still fresh from yesterday's party",
    expiry: "Today, 10PM",
  },
  {
    id: 4,
    name: "Homemade Soup",
    image: "/placeholder.svg?height=300&width=400",
    summary: "Chicken noodle soup, perfect for cold weather",
    expiry: "Tomorrow, 2PM",
  },
]

export default function FeaturedMeals() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="browse-meals" className="py-16 md:py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Featured Meals</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out these delicious meals currently available in your area.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function MealCard({ meal }: { meal: (typeof meals)[0] }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48">
        <Image src={meal.image || "/placeholder.svg"} alt={meal.name} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{meal.name}</h3>
        <p className="text-gray-600 mb-3">{meal.summary}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-orange-600">Expires: {meal.expiry}</span>
          <motion.button
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-semibold transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert(`Request sent for: ${meal.name}`)}
          >
            Request
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
