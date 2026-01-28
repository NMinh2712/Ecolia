"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isAIReading = pathname === "/ai-reading" || pathname === "/ai-processing" || pathname === "/ai-result" || pathname.startsWith("/ai-")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-accent-cream/85 to-white/85 backdrop-blur-lg border-b-2 border-energy-gold/20 shadow-lg transition-all duration-300 hover:shadow-xl" style={isAIReading ? { boxShadow: "0 0 20px rgba(198, 162, 93, 0.15)" } : {}}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-300 group">
          <div className="relative">
            <Image
              src="/logo_exe_xoanen.png"
              alt="MẢNH Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
            />
            {isAIReading && (
              <div className="absolute inset-0 rounded-full bg-energy-gold/20 animate-pulse group-hover:animate-glow-pulse"></div>
            )}
          </div>
          <span className="text-2xl font-serif font-bold text-healing-brown hidden sm:inline group-hover:text-energy-gold transition-colors duration-300">
            MẢNH
          </span>
          {isAIReading && (
            <span className="ml-2 text-xs md:text-sm bg-gradient-to-r from-energy-gold to-accent-pink text-white px-3 py-1 rounded-full font-semibold animate-pulse shadow-lg">
              ✨ AI Reading
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/ai-intro" className="text-foreground hover:text-healing-brown hover:shadow-glow transition-all duration-300 font-medium relative group">
            Trải Nghiệm AI
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-energy-gold to-accent-pink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/shop" className="text-foreground hover:text-healing-brown transition-all duration-300 font-medium relative group">
            Sản Phẩm
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-energy-gold to-accent-pink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/about" className="text-foreground hover:text-healing-brown transition-all duration-300 font-medium relative group">
            Về Chúng Tôi
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-energy-gold to-accent-pink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/team" className="text-foreground hover:text-healing-brown transition-all duration-300 font-medium relative group">
            Nhóm
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-energy-gold to-accent-pink group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border md:hidden animate-slideInDown">
            <div className="flex flex-col gap-4 p-4">
              <Link href="/ai-intro" className="text-foreground hover:text-healing-brown transition-colors font-medium">
                Trải Nghiệm AI
              </Link>
              <Link href="/shop" className="text-foreground hover:text-healing-brown transition-colors font-medium">
                Sản Phẩm
              </Link>
              <Link href="/about" className="text-foreground hover:text-healing-brown transition-colors font-medium">
                Về Chúng Tôi
              </Link>
              <Link href="/team" className="text-foreground hover:text-healing-brown transition-colors font-medium">
                Nhóm
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
