"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 10)
  })

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        hasScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.div className="text-2xl md:text-3xl font-display font-bold text-primary" whileHover={{ scale: 1.05 }}>
            PlateMate
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#post-food">Post Food</NavLink>
          <NavLink href="/browse-meals">Browse Meals</NavLink>
          <motion.button className="text-white bg-orange-500 hover:bg-black px-6 py-3 rounded-lg font-semibold transition-colors duration-300 text-lg"
 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Get Started
          </motion.button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-white absolute top-full left-0 w-full shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            <MobileNavLink href="#how-it-works" onClick={() => setIsOpen(false)}>
              How It Works
            </MobileNavLink>
            <MobileNavLink href="#post-food" onClick={() => setIsOpen(false)}>
              Post Food
            </MobileNavLink>
            <MobileNavLink href="/browse-meals" onClick={() => setIsOpen(false)}>
              Browse Meals
            </MobileNavLink>
            <Link href="#get-started" className="btn-primary text-center" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group">
      <span className="text-gray-800 font-medium hover:text-primary transition-colors duration-300">{children}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-gray-800 font-medium hover:text-primary transition-colors duration-300 block py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
