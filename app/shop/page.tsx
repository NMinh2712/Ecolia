"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { products } from "@/lib/products"

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "positive", label: "Năng lượng Tích cực", type: "Năng lượng Tích cực" },
  { id: "calm", label: "Bình an", type: "Năng lượng Tĩnh Lặng" },
  { id: "prosperity", label: "Thịnh vượng", type: "Năng lượng Thịnh Vượng" },
  { id: "healing", label: "Chữa lành", type: "Năng lượng Chữa Lành" },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.energyType === categories.find((c) => c.id === activeCategory)?.type)

  return (
    <main className="gradient-background min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-healing-brown mb-4">Bộ Sưu Tập MẢNH</h1>
        <p className="text-foreground-secondary max-w-2xl mx-auto">
          Khám phá những chiếc vòng tay được tạo ra để đồng hành cùng cảm xúc và hành trình của bạn.
        </p>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-energy-gold text-white"
                  : "bg-accent-cream text-healing-brown hover:bg-accent-pink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="healing-card overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
                {/* Product Image Placeholder */}
                <div className="bg-gradient-to-br from-accent-cream to-accent-pink h-64 flex items-center justify-center">
                  <div className="text-6xl">
                    {product.energyType === "Năng lượng Tích cực" && "☀️"}
                    {product.energyType === "Năng lượng Tĩnh Lặng" && "🌙"}
                    {product.energyType === "Năng lượng Thịnh Vượng" && "💎"}
                    {product.energyType === "Năng lượng Chữa Lành" && "💕"}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl text-healing-brown mb-2">{product.name}</h3>
                  <p className="text-sm text-foreground-secondary mb-4 flex-1">{product.meaning}</p>

                  {/* Stones */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.stones.map((stone) => (
                      <span key={stone.name} className="text-xs px-2 py-1 bg-accent-cream text-healing-brown rounded">
                        {stone.name}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-energy-gold text-lg">{product.price.toLocaleString("vi-VN")}đ</p>
                    <span className="text-healing-brown font-medium text-sm">Xem chi tiết →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
