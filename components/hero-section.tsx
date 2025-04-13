"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Tilt from "react-parallax-tilt"
import { useInView } from "framer-motion"

import { useRouter } from "next/navigation"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function HeroSection() {
  const [animationData, setAnimationData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch("/food-animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
  }, [])

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-beige to-white overflow-hidden">
      <div className="container-custom relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              One Meal Saved <br />
              <span className="text-primary">One Meal Served.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
              PlateMate connects people with leftover food to neighbors who need it. Reduce waste, build community—one plate at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
              <motion.button
                onClick={() => router.push("/find-meal")}
                className="text-white bg-orange-500 hover:bg-black px-6 py-3 rounded-lg font-semibold transition-colors duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Food
              </motion.button>

              <button
                onClick={() => router.push("/post-meal")}
                className="text-orange-500 underline hover:text-orange-600 font-medium text-lg"
              >
                Post Your Meal
              </button>
            </div>
          </motion.div>

          {/* Right Animation Block */}
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[500px] w-full"
            >
              {animationData && (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="w-full h-full max-w-md mx-auto"
                />
              )}
            </motion.div>
          </Tilt>
        </div>
      </div>
    </section>
  )
}
