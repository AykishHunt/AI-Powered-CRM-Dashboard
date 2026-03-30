import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Footer from "../components/Footer"
import CTA from "../components/CTA"
import Testimonials from "../components/Tertimonials"
import { Team } from "../components/Team"

export default function Home() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return (
     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 divide-y divide-gray-100 dark:divide-gray-800">
      <Navbar dark={dark} setDark={setDark} />
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        <Hero />
        <Features />
         <Team/>
        <Testimonials />
        <CTA />
        <Footer />
        </div>
      </div>
   
  )}