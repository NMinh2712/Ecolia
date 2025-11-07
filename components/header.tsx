"use client"

import { useState } from "react"
import { Globe, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("VI")

  const navigation = [
    { name: "Trang chủ", href: "#home" },
    { name: "Về ECOLIA", href: "#about" },
    { name: "Sản phẩm", href: "#products" },
    { name: "Quy trình", href: "#process" },
    { name: "Đội ngũ", href: "#team" },
    { name: "Liên hệ", href: "#contact" },
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={() => handleNavClick("#home")} className="flex items-center space-x-2">
            <img
              src="/logo_exe.jpg"
              alt="ECOLIA Logo"
              className="w-10 h-10 object-cover rounded-full"
            />
            <span className="font-serif font-bold text-xl text-foreground">ECOLIA</span>
          </button>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="flex items-center space-x-1 text-muted hover:text-foreground transition-colors"
              title="Ngôn ngữ / Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{currentLang} | EN</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button className="flex items-center space-x-1 text-muted">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">VI | EN</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
