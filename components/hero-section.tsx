"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

import ZipModal from "./ZipModal"
import PostFoodModal from "./PostFoodModal"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false) // ZIP code modal
  const [showPostModal, setShowPostModal] = useState(false) // Post meal modal
  const [animationData, setAnimationData] = useState(null)

  // Load animation
  useEffect(() => {
    fetch("/food-animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
  }, [])

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-beige to-white overflow-hidden">
      <div className="container-custom relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Left Side */}
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

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <motion.button
                className="bg-orange-500 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
              >
                Find Food
              </motion.button>

              <button
                onClick={() => setShowPostModal(true)}
                className="text-orange-500 underline hover:text-orange-600 font-medium"
              >
                Post Your Meal
              </button>
            </div>
          </motion.div>

          {/* Right Side - Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px]"
          >
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                className="w-full h-full max-w-md mx-auto"
              />
            )}

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Decorative"
                className="object-contain w-full h-full"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -right-5 w-16 h-16"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="Decorative"
                className="object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <ZipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(zip: string) => {
          setIsModalOpen(false)
          alert(`Finding meals near ZIP: ${zip}`)
        }}
      />

      <PostFoodModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onSubmit={(foodData: any) => {
          console.log("Posted meal:", foodData)
          alert("Thanks! Your food has been listed.")
        }}
      />
    </section>
  )
}
