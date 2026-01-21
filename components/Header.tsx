"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-serif font-bold text-healing-brown hover:text-energy-gold transition-colors"
        >
          MẢNH
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
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

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border md:hidden">
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
