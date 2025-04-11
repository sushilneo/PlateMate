import type React from "react"
import "./globals.css"
import { Nunito, Fredoka } from "next/font/google"
import type { Metadata } from "next"

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
})

export const metadata: Metadata = {
  title: "PlateMate | Share Food, Share Kindness",
  description: "PlateMate connects people with leftover food to neighbors who need it.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className="font-sans bg-beige-light">{children}</body>
    </html>
  )
}


import './globals.css'