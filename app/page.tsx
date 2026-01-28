"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import { products } from "@/lib/products"
import { values } from "@/lib/values"

export default function Home() {
  return (
    <main className="gradient-background">
      <Header />

      {/* Hero Section - New 2026 Version */}
      <HeroSection />

      {/* Brand Values */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-16 text-healing-brown text-glow animate-fadeIn">
          Giá Trị Thương Hiệu
        </h2>

        <div className="grid md:grid-cols-3 gap-8 stagger-container">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="healing-card p-8 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 animate-stagger-in group"
            >
              <h3 className="font-serif text-xl mb-3 text-healing-brown group-hover:text-energy-gold transition-colors">
                {value.title}
              </h3>
              <p className="text-foreground-secondary">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-16 text-healing-brown text-glow animate-fadeIn">
          Bộ Sưu Tập Tiêu Biểu
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 stagger-container">
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="healing-card overflow-hidden h-full flex flex-col hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer product-card-hover group animate-stagger-in">
                <div className="bg-gradient-to-br from-accent-cream to-accent-pink h-48 flex items-center justify-center text-4xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer group-hover:animate-pulse"></div>
                  <div className="animate-float-gentle group-hover:animate-rotate-glow">
                    {product.energyType === "Năng lượng Tích cực" && "☀️"}
                    {product.energyType === "Năng lượng Tĩnh Lặng" && "🌙"}
                    {product.energyType === "Năng lượng Thịnh Vượng" && "💎"}
                    {product.energyType === "Năng lượng Chữa Lành" && "💕"}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg text-healing-brown mb-2 group-hover:text-energy-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-foreground-secondary mb-4 flex-1">{product.meaning}</p>
                  <p className="font-semibold text-energy-gold group-hover:text-accent-pink transition-colors">{product.price.toLocaleString("vi-VN")}đ</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop" className="cta-button-gold">
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
