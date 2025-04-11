"use client"

import { motion } from "framer-motion"
import { Camera, MapPin, Users } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    icon: Camera,
    title: "Snap a photo",
    description: "Take a quick picture of your leftover food that's still good to eat.",
  },
  {
    icon: MapPin,
    title: "Add details and location",
    description: "Describe the food and add your location so nearby neighbors can find it.",
  },
  {
    icon: Users,
    title: "Someone nearby requests it",
    description: "A neighbor will request your food and arrange a pickup time.",
  },
]

export default function StepsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-beige">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sharing food with PlateMate is simple, quick, and rewarding. Here's how to get started.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                  <step.icon size={32} className="text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
