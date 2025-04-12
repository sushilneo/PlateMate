"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useRouter } from "next/navigation"

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const router = useRouter()

  return (
    <section id="post-food" className="py-16 md:py-24 bg-primary text-black">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">One meal saved = one meal served</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of neighbors who are reducing food waste while building stronger communities. Your leftovers
            could be someone's perfect meal.
          </p>
          <motion.button
            onClick={() => router.push("/post-meal")}
            className="btn bg-white text-primary hover:bg-orange-500 hover:text-white text-lg font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Post a Meal Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
