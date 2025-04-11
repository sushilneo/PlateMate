"use client"

import { motion } from "framer-motion"
import Lottie from "lottie-react"
import foodAnimation from "../public/food-animation.json" // Make sure the path is correct

export default function HeroSection() {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-beige to-white overflow-hidden">
      <div className="container-custom relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
              One Meal Saved <br />
              <span className="text-primary">One Meal Served.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              PlateMate connects people with leftover food to neighbors who need it. Reduce waste, build community, one
              plate at a time.
            </p>
            <motion.button className="btn-primary text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Get Started
            </motion.button>
          </motion.div>

          {/* Right Side: Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px]"
          >
            <Lottie
              animationData={foodAnimation}
              loop={true}
              className="w-full h-full max-w-md mx-auto"
            />

            {/* Decorative Top Left */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Decorative food item"
                className="object-contain w-full h-full"
              />
            </motion.div>

            {/* Decorative Bottom Right */}
            <motion.div
              className="absolute -bottom-5 -right-5 w-16 h-16"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="Decorative food item"
                className="object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
