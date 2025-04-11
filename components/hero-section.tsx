"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-beige to-white overflow-hidden">
      <div className="container-custom relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
              Share a meal. <br />
              <span className="text-primary">Share some kindness.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              PlateMate connects people with leftover food to neighbors who need it. Reduce waste, build community, one
              plate at a time.
            </p>
            <motion.button className="btn-primary text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Get Started
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="People sharing food"
                fill
                className="object-cover rounded-2xl shadow-xl"
                priority
              />
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Decorative food item"
                width={80}
                height={80}
                className="object-contain"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -right-5 w-16 h-16"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Decorative food item"
                width={64}
                height={64}
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
