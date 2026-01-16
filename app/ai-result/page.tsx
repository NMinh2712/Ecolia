"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { AIReading, UserAnswers } from "@/lib/ai-rules"

export default function AIResultPage() {
  const [reading, setReading] = useState<AIReading | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedReading = sessionStorage.getItem("aiReading")
    const savedAnswers = sessionStorage.getItem("userAnswers")

    if (savedReading && savedAnswers) {
      setReading(JSON.parse(savedReading))
      setUserAnswers(JSON.parse(savedAnswers))
    }

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <main className="gradient-background min-h-screen flex items-center justify-center">
        <Header />
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">✨</div>
          <p className="text-healing-brown font-serif text-xl">Đang tải kết quả...</p>
        </div>
      </main>
    )
  }

  if (!reading || !userAnswers) {
    return (
      <main className="gradient-background min-h-screen">
        <Header />
        <div className="pt-32 pb-20 px-4 text-center max-w-2xl mx-auto">
          <p className="text-foreground-secondary mb-6">Không tìm thấy kết quả. Vui lòng quay lại và thử lại.</p>
          <Link href="/ai-reading" className="cta-button-gold inline-block">
            Bắt đầu lại
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="gradient-background">
      <Header />

      <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
        {/* Welcome Section */}
        <section className="text-center mb-20 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-serif text-healing-brown mb-4">Xin chào, {userAnswers.name}</h1>
          <p className="text-xl text-foreground-secondary">{reading.energyStatus}</p>
        </section>

        {/* Energy Description Card */}
        <section className="healing-card p-8 md:p-12 mb-12 bg-gradient-to-br from-accent-cream to-white">
          <h2 className="text-3xl font-serif text-healing-brown mb-6">Kết Quả Phân Tích Năng Lượng</h2>
          <p className="text-lg text-foreground leading-relaxed italic mb-8">{reading.description}</p>

          <div className="border-t border-border pt-6">
            <p className="text-foreground-secondary font-medium mb-3">Lời khuyên từ AI:</p>
            <p className="text-foreground leading-relaxed">{reading.adviceMessage}</p>
          </div>
        </section>

        {/* Affirmation */}
        <section className="bg-energy-gold/10 border-l-4 border-energy-gold p-8 rounded-lg mb-16">
          <p className="text-healing-brown font-serif font-medium mb-3">Xác nhận của bạn:</p>
          <p className="text-xl italic text-foreground">"{reading.affirmation}"</p>
        </section>

        {/* Recommended Product */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-healing-brown mb-10 text-center">Chiếc Vòng Được Đề Xuất Cho Bạn</h2>

          <div className="healing-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 mb-8">
              {/* Product Image */}
              <div className="bg-gradient-to-br from-accent-cream via-accent-pink to-accent-cream rounded-xl h-80 md:h-96 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-8xl mb-4">
                    {reading.recommendedProduct.energyType === "Năng lượng Tích cực" && "☀️"}
                    {reading.recommendedProduct.energyType === "Năng lượng Tĩnh Lặng" && "🌙"}
                    {reading.recommendedProduct.energyType === "Năng lượng Thịnh Vượng" && "💎"}
                    {reading.recommendedProduct.energyType === "Năng lượng Chữa Lành" && "💕"}
                  </div>
                  <p className="text-foreground-secondary font-serif">{reading.recommendedProduct.name}</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-serif text-healing-brown mb-4">{reading.recommendedProduct.name}</h3>
                  <p className="text-foreground mb-6 leading-relaxed">{reading.recommendedProduct.description}</p>

                  <div className="mb-8">
                    <p className="text-foreground-secondary text-sm font-semibold mb-4 uppercase tracking-wide">
                      Những Viên Đá:
                    </p>
                    <ul className="space-y-3">
                      {reading.stoneExplanations.map((explanation, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full bg-energy-gold flex-shrink-0 mt-2" />
                          <span className="text-foreground">{explanation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8 p-4 bg-accent-cream rounded-lg">
                    <p className="text-foreground-secondary text-sm font-semibold mb-2">Hướng dẫn chăm sóc:</p>
                    <p className="text-foreground text-sm">{reading.recommendedProduct.care}</p>
                  </div>
                </div>

                <div>
                  <p className="text-4xl font-serif text-healing-brown mb-6">
                    {reading.recommendedProduct.price.toLocaleString("vi-VN")}đ
                  </p>

                  <div className="space-y-3">
                    <Link
                      href={`/product/${reading.recommendedProduct.id}`}
                      className="cta-button-gold w-full text-center block"
                    >
                      Xem Chi Tiết Sản Phẩm
                    </Link>

                    <a
                      href="https://forms.gle/example"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full font-medium text-healing-brown bg-accent-cream hover:bg-accent-pink transition-colors text-center block"
                    >
                      Đặt Hàng Ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="text-center">
          <h3 className="text-2xl font-serif text-healing-brown mb-6">Muốn Khám Phá Thêm?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-reading" className="cta-button-gold">
              Tìm Mảnh Ghép Khác
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full font-medium text-healing-brown bg-accent-cream hover:bg-accent-pink transition-colors"
            >
              Xem Tất Cả Sản Phẩm
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
