"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)

  // Mouse follow effect for blur orb
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f9f5f1 0%, rgba(198, 162, 93, 0.1) 50%, rgba(232, 213, 209, 0.1) 100%)",
      }}
    >
      {/* Animated Gradient Background Elements */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-energy-gold rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-gentle"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-pink rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-gentle" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-healing-brown rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-gentle" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Mouse-Follow Blur Orb */}
      <div
        className="fixed w-96 h-96 bg-gradient-to-r from-energy-gold to-accent-pink rounded-full filter blur-3xl opacity-15 pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: `${mousePos.x - 192}px`,
          top: `${mousePos.y - 192}px`,
          zIndex: 0,
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Logo with Gradient Text */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-serif font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-healing-brown via-energy-gold to-accent-pink bg-clip-text text-transparent animate-fadeIn drop-shadow-lg">
              MẢNH
            </span>
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-energy-gold via-accent-pink to-transparent blur-sm opacity-60" />
          </h1>
        </div>

        {/* Subtitle with Word-by-Word Fade */}
        <div className="mb-6 min-h-20 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-serif text-healing-brown font-light italic">
            <span className="inline-block animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              Mảnh&nbsp;
            </span>
            <span className="inline-block animate-fadeIn" style={{ animationDelay: "0.4s" }}>
              ghép&nbsp;
            </span>
            <span className="inline-block animate-fadeIn" style={{ animationDelay: "0.6s" }}>
              của&nbsp;
            </span>
            <span className="inline-block animate-fadeIn" style={{ animationDelay: "0.8s" }}>
              riêng&nbsp;
            </span>
            <span className="inline-block animate-fadeIn" style={{ animationDelay: "1s" }}>
              bạn
            </span>
          </h2>
        </div>

        {/* Emotional Description */}
        <p className="text-lg md:text-xl italic text-energy-gold/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-slideInUp">
          Mỗi chiếc vòng tay không chỉ là trang sức – mà là một phần linh hồn đang chờ bạn tìm thấy.
        </p>

        {/* Main CTA Buttons */}
        <div className="mb-16 flex flex-col sm:flex-row gap-6 justify-center items-center animate-bounce-in">
          {/* Primary Button - AI Discovery */}
          <div className="relative group">
            <Link href="/ai-intro">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="relative px-10 md:px-14 py-4 md:py-5 rounded-full font-semibold text-white text-lg md:text-xl tracking-wide transition-all duration-300 hover:scale-110 hover:shadow-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #c6a25d 0%, #e8d5d1 100%)",
                }}
              >
                {/* Glow Background */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: "0 0 40px rgba(198, 162, 93, 0.6)",
                  }}
                ></span>

                {/* Button Text */}
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Khám Phá Với AI
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>

            {/* Tooltip on Hover */}
            {showTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-2 bg-healing-brown text-white text-sm rounded-lg whitespace-nowrap animate-fadeIn pointer-events-none font-medium">
                Chỉ 2 phút để khám phá mảnh ghép của bạn ✨
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-healing-brown rotate-45"></div>
              </div>
            )}
          </div>

          {/* Secondary Button - View Collection */}
          <Link href="/shop">
            <button className="px-10 md:px-12 py-4 md:py-5 rounded-full font-semibold text-healing-brown border-2 border-energy-gold hover:bg-gradient-to-r hover:from-energy-gold/10 hover:to-accent-pink/10 transition-all duration-300 text-lg md:text-xl hover:scale-105">
              Xem Bộ Sưu Tập
            </button>
          </Link>
        </div>

        {/* Bracelet Product Showcase */}
        <div className="relative mt-20 mb-12 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          {/* Bracelet Visual - Rotating Gem */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-energy-gold/30 to-accent-pink/30 animate-rotate-glow"></div>

            {/* Inner Glow */}
            <div className="absolute inset-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-float-gentle">
              <div className="text-7xl animate-spin-slow">💎</div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-energy-gold rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent-pink rounded-full"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 bg-healing-brown rounded-full"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-2 bg-accent-cream rounded-full"></div>
          </div>

          {/* Bracelet Description */}
          <p className="text-sm md:text-base text-foreground-secondary text-center max-w-2xl mx-auto leading-relaxed">
            AI sẽ tạo chiếc vòng tay dành riêng cho năng lượng của bạn ✨
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-energy-gold rounded-full flex items-start justify-center p-2 opacity-60">
            <div className="w-1 h-2 bg-energy-gold rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Gradient Overlay (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent-cream to-transparent pointer-events-none" />
    </section>
  )
}
