import React from "react";
import { Moon, Sun,Menu, X } from "lucide-react";
import { Link, useLocation  } from "react-router-dom";
import { useState } from "react"

export default function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#0a0d14]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.06]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
      <Link to="/" className="flex items-center gap-2.5 group">   <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white font-bold text-xs">C</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
            CRMind <span className="text-blue-500 font-normal text-xs ml-0.5">AI</span>
          </span> </Link>

      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={() => setDark(!dark)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-all" >
          {dark ? <Sun size={20} /> : <Moon size={20} />}</button>

        <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />

        <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-500 transition-colors dark:text-gray-400  dark:hover:text-white"> Login</Link>

        <Link
          to="/signup"
          className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 text-sm rounded-lg shadow-md hover:scale-105 transition-all font-semibold hover:from-blue-500 hover:to-violet-500   shadow-blue-500/20  active:scale-95">
          Sign Up
        </Link>
         <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
         {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-white/[0.06] bg-white/95 dark:bg-[#0a0d14]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 dark:text-gray-300 py-1">Login</Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 rounded-lg text-center"
          >
            Get Started
          </Link>
        </div>
      )}
      </div>
    </div>
  </nav>
  )
}