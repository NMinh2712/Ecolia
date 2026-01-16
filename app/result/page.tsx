"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { AIReading, UserAnswers } from "@/lib/ai-rules"

export default function ResultPage() {
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
          <p className="text-healing-brown font-serif text-xl">AI đang ghép mảnh năng lượng của bạn...</p>
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
          <Link href="/ai-reading" className="cta-button-gold">
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
        {/* Welcome Message */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-serif text-healing-brown mb-4">Chào {userAnswers.name}</h1>
          <p className="text-lg text-foreground-secondary">{reading.energyStatus}</p>
        </div>

        {/* Energy Description Card */}
        <div className="healing-card p-8 mb-12 bg-gradient-to-br from-accent-cream to-white">
          <div className="mb-6">
            <h2 className="text-2xl font-serif text-healing-brown mb-4">Kết quả phân tích năng lượng</h2>
            <p className="text-lg text-foreground leading-relaxed italic">{reading.description}</p>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-foreground-secondary mb-4 font-medium">Lời khuyên từ AI:</p>
            <p className="text-foreground leading-relaxed">{reading.adviceMessage}</p>
          </div>
        </div>

        {/* Affirmation */}
        <div className="bg-energy-gold/10 border-l-4 border-energy-gold p-6 rounded-lg mb-12">
          <p className="text-healing-brown font-medium mb-2">Xác nhận của bạn:</p>
          <p className="text-lg italic text-foreground">"{reading.affirmation}"</p>
        </div>

        {/* Recommended Product */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif text-healing-brown mb-8 text-center">Chiếc vòng tay được đề xuất</h2>

          <div className="healing-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Product Image Placeholder */}
              <div className="bg-accent-pink rounded-lg h-64 md:h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">💎</div>
                  <p className="text-foreground-secondary">{reading.recommendedProduct.name}</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-serif text-healing-brown mb-4">{reading.recommendedProduct.name}</h3>
                  <p className="text-foreground mb-6">{reading.recommendedProduct.description}</p>

                  <div className="mb-6">
                    <p className="text-foreground-secondary text-sm font-medium mb-3">Những viên đá:</p>
                    {reading.stoneExplanations.map((explanation, idx) => (
                      <p key={idx} className="text-foreground-secondary text-sm mb-2">
                        • {explanation}
                      </p>
                    ))}
                  </div>

                  <p className="text-foreground-secondary text-sm mb-6">{reading.recommendedProduct.care}</p>
                </div>

                <div>
                  <p className="text-3xl font-serif text-healing-brown mb-6">
                    {reading.recommendedProduct.price.toLocaleString("vi-VN")}đ
                  </p>

                  <Link
                    href={`/product/${reading.recommendedProduct.id}`}
                    className="cta-button-gold w-full text-center block mb-3"
                  >
                    Xem chi tiết
                  </Link>

                  <a
                    href="https://forms.gle/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full font-medium text-healing-brown bg-accent-cream hover:bg-accent-pink transition-colors text-center block"
                  >
                    Đặt hàng qua Google Form
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-foreground-secondary mb-6">Muốn khám phá các chiếc vòng khác?</p>
          <Link href="/ai-reading" className="cta-button text-sm">
            Tìm mảnh ghép khác
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
