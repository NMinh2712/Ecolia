"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { products } from "@/lib/products"
import { values } from "@/lib/values"

const Updated = "Updated home page to focus on brand storytelling and product showcase instead of AI reading"
const home = "Home"
const page = "Page"
const to = "to"
const on = "on"
const brand = "Brand"
const storytelling = "Storytelling"
const and = "and"
const product = "Product"
const showcase = "Showcase"
const instead = "instead"
const of = "of"
const AI = "AI"
const reading = "Reading"

export default function Home() {
  return (
    <main className="gradient-background">
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-healing-brown mb-6">MẢNH</h1>
          <p className="text-2xl md:text-3xl text-foreground mb-4">Mảnh ghép của riêng bạn</p>
          <p className="text-lg text-foreground-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            Trang sức mang theo cảm xúc. Mỗi chiếc vòng tay là một mảnh ghép được chọn lọc, tạo ra chỉ để đồng hành cùng
            bạn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/ai-intro" className="cta-button-gold">
              Khám Phá Với AI
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full font-medium text-healing-brown bg-accent-cream hover:bg-accent-pink transition-colors"
            >
              Xem Bộ Sưu Tập
            </Link>
          </div>

          {/* Decorative blur circles */}
          <div className="blur-circle w-96 h-96 bg-energy-gold -top-48 -right-48" />
          <div className="blur-circle w-96 h-96 bg-healing-brown -bottom-48 -left-48" />
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-16 text-healing-brown">Giá Trị Thương Hiệu</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="healing-card p-8 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-serif text-xl mb-3 text-healing-brown">{value.title}</h3>
              <p className="text-foreground-secondary">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-16 text-healing-brown">Bộ Sưu Tập Tiêu Biểu</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="healing-card overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
                <div className="bg-gradient-to-br from-accent-cream to-accent-pink h-48 flex items-center justify-center text-4xl">
                  {product.energyType === "Năng lượng Tích cực" && "☀️"}
                  {product.energyType === "Năng lượng Tĩnh Lặng" && "🌙"}
                  {product.energyType === "Năng lượng Thịnh Vượng" && "💎"}
                  {product.energyType === "Năng lượng Chữa Lành" && "💕"}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg text-healing-brown mb-2">{product.name}</h3>
                  <p className="text-sm text-foreground-secondary mb-4 flex-1">{product.meaning}</p>
                  <p className="font-semibold text-energy-gold">{product.price.toLocaleString("vi-VN")}đ</p>
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
      <Chatbot />
    </main>
  )
}
