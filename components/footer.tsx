"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-display font-bold text-primary mb-4 block">
              PlateMate
            </Link>
            <p className="text-gray-400 mb-4">
              Connecting neighbors through food sharing, reducing waste, and building community.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#post-food">Post Food</FooterLink>
              <FooterLink href="#browse-meals">Browse Meals</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Built with <Heart size={16} className="mx-1 text-primary" /> for the community
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <motion.a
      href="#"
      className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={18} />
    </motion.a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-primary transition-colors duration-300">
        {children}
      </Link>
    </li>
  )
}
