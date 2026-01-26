"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { AIReading, UserAnswers } from "@/lib/ai-rules"
import type { BraceletRecommendation } from "@/lib/get-bracelet-recommendation"

export default function AIResultPage() {
  const [reading, setReading] = useState<AIReading | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null)
  const [recommendation, setRecommendation] = useState<BraceletRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedReading = sessionStorage.getItem("aiReading")
    const savedAnswers = sessionStorage.getItem("userAnswers")
    const savedRecommendation = sessionStorage.getItem("braceletRecommendation")

    if (savedReading && savedAnswers) {
      setReading(JSON.parse(savedReading))
      setUserAnswers(JSON.parse(savedAnswers))
    }

    if (savedRecommendation) {
      setRecommendation(JSON.parse(savedRecommendation))
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

      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        {/* Welcome Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-serif text-healing-brown mb-4">Xin chào, {userAnswers.name}</h1>
          <p className="text-xl text-foreground-secondary">Đây là kết quả phân tích năng lượng riêng của bạn</p>
        </section>

        {/* Zodiac & Identity Info */}
        <section className="healing-card p-8 mb-12 bg-gradient-to-br from-accent-cream to-white">
          <h2 className="text-2xl font-serif text-healing-brown mb-6">Thông Tin Định Danh Năng Lượng</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-r border-border pr-6">
              <p className="text-foreground-secondary text-sm font-semibold mb-2">Chòm Sao</p>
              <p className="text-healing-brown font-serif text-lg">{reading.zodiacInfo.name}</p>
            </div>
            <div className="border-r border-border pr-6">
              <p className="text-foreground-secondary text-sm font-semibold mb-2">Mệnh Khuyết (Ngũ Hành)</p>
              <p className="text-healing-brown font-serif text-lg">{reading.zodiacInfo.element}</p>
            </div>
            <div>
              <p className="text-foreground-secondary text-sm font-semibold mb-2">Đá Hộ Mệnh</p>
              <p className="text-healing-brown font-serif text-lg">{reading.zodiacInfo.birthstone}</p>
            </div>
          </div>
        </section>

        {/* Emotional & Goal Analysis */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="healing-card p-8 bg-gradient-to-br from-accent-cream/50 to-white">
            <h3 className="text-xl font-serif text-healing-brown mb-4">Phân Tích Cảm Xúc</h3>
            <p className="text-foreground leading-relaxed">{reading.emotionalAnalysis}</p>
          </div>
          <div className="healing-card p-8 bg-gradient-to-br from-accent-pink/30 to-white">
            <h3 className="text-xl font-serif text-healing-brown mb-4">Mục Tiêu Cuộc Sống</h3>
            <p className="text-foreground leading-relaxed">{reading.lifeGoalMessage}</p>
          </div>
        </section>

        {/* Energy Description */}
        <section className="healing-card p-8 md:p-12 mb-12 bg-gradient-to-br from-accent-cream to-white border-l-4 border-energy-gold">
          <h2 className="text-2xl font-serif text-healing-brown mb-6">Kết Quả Phân Tích Năng Lượng</h2>
          <p className="text-lg text-foreground leading-relaxed italic">{reading.energyDescription}</p>
        </section>

        {/* Bracelet Recommendation Section (if available) */}
        {recommendation && (
          <>
            {/* Summary Points */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif text-healing-brown mb-6 text-center">Tóm Tắt Chẩn Đoán Năng Lượng</h2>
              <div className="space-y-4">
                {recommendation.result.tomTatChanDung.map((point, idx) => (
                  <div key={idx} className="healing-card p-6 bg-accent-cream/50">
                    <p className="text-foreground leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bracelet Details */}
            <section className="mb-12">
              <h2 className="text-3xl font-serif text-healing-brown mb-10 text-center">Chi Tiết Chiếc Vòng Được Đề Xuất</h2>
              
              <div className="healing-card p-8 md:p-12 mb-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Bracelet Info */}
                  <div>
                    <h3 className="text-2xl font-serif text-healing-brown mb-4">{recommendation.result.vongTayDeXuat.tenVong}</h3>
                    <div className="space-y-4 mb-6">
                      <div className="p-4 bg-accent-cream rounded-lg">
                        <p className="text-foreground-secondary text-sm font-semibold mb-1">Vibe Năng Lượng</p>
                        <p className="text-healing-brown font-medium">{recommendation.result.vongTayDeXuat.vibe}</p>
                      </div>
                      <div className="p-4 bg-accent-cream rounded-lg">
                        <p className="text-foreground-secondary text-sm font-semibold mb-1">Phong Cách</p>
                        <p className="text-healing-brown font-medium">{recommendation.result.vongTayDeXuat.phongCach}</p>
                      </div>
                      <div className="p-4 bg-accent-cream rounded-lg">
                        <p className="text-foreground-secondary text-sm font-semibold mb-1">Kích Thước & Ngân Sách</p>
                        <p className="text-healing-brown font-medium">
                          {recommendation.result.vongTayDeXuat.coTayCm}cm | {recommendation.result.vongTayDeXuat.nganSach.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      <div className="p-4 bg-accent-cream rounded-lg">
                        <p className="text-foreground-secondary text-sm font-semibold mb-1">Số Hạt Dự Kiến</p>
                        <p className="text-healing-brown font-medium">{recommendation.result.vongTayDeXuat.soHatDuKien} h��t ({recommendation.result.vongTayDeXuat.kichThuocHatMm}mm)</p>
                      </div>
                    </div>
                  </div>

                  {/* Color Preview */}
                  <div>
                    <p className="text-foreground-secondary text-sm font-semibold mb-4 uppercase">Gam Màu Chủ Đạo</p>
                    <div className="flex gap-3 mb-6">
                      {recommendation.result.vongTayDeXuat.mauChuDao.map((color, idx) => (
                        <div key={idx} className="flex-1">
                          <div
                            className="w-full h-20 rounded-lg shadow-md border-2 border-border"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                      ))}
                    </div>

                    <p className="text-foreground-secondary text-sm font-semibold mb-4 uppercase">Bố Cục Đề Xuất</p>
                    <p className="text-foreground leading-relaxed text-sm italic">{recommendation.result.vongTayDeXuat.layoutDeXuat}</p>
                  </div>
                </div>

                {/* Stone Details */}
                <div className="border-t border-border pt-8">
                  <p className="text-healing-brown font-serif text-lg mb-6">Bộ Đá Chính</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recommendation.result.vongTayDeXuat.bangDa.map((da, idx) => (
                      <div key={idx} className="p-4 bg-accent-cream/50 rounded-lg border-l-4" style={{ borderColor: da.mauSac }}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: da.mauSac }} />
                          <div className="flex-1">
                            <p className="font-medium text-healing-brown">{da.tenDa}</p>
                            <p className="text-xs text-foreground-secondary uppercase mb-1">{da.vaiTro === "main" ? "Chính" : da.vaiTro === "healing" ? "Chữa Lành" : da.vaiTro === "boost" ? "Tăng Cường" : "Chủ Đề"}</p>
                            <p className="text-sm text-foreground">{da.yNghia}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Charm Suggestions */}
                {recommendation.result.vongTayDeXuat.charmGoiY.length > 0 && (
                  <div className="border-t border-border pt-8 mt-8">
                    <p className="text-healing-brown font-serif text-lg mb-4">Charm Được Đề Xuất</p>
                    <div className="space-y-2">
                      {recommendation.result.vongTayDeXuat.charmGoiY.map((charm, idx) => (
                        <p key={idx} className="text-foreground">
                          <span className="font-medium">{charm.tenCharm}:</span> {charm.yNghia}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Negative Filters Applied */}
                {recommendation.result.vongTayDeXuat.negativeFiltersApplied.length > 0 && (
                  <div className="border-t border-border pt-8 mt-8">
                    <p className="text-healing-brown font-serif text-sm uppercase mb-3">Lựa Chọn Được Áp Dụng</p>
                    <ul className="space-y-1">
                      {recommendation.result.vongTayDeXuat.negativeFiltersApplied.map((filter, idx) => (
                        <li key={idx} className="text-foreground text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-energy-gold" />
                          {filter}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reasons for Selection */}
                <div className="border-t border-border pt-8 mt-8">
                  <p className="text-healing-brown font-serif text-lg mb-4">Lý Do Chọn</p>
                  <ul className="space-y-3">
                    {recommendation.result.vongTayDeXuat.lyDoChon.map((reason, idx) => (
                      <li key={idx} className="text-foreground text-sm leading-relaxed flex gap-3">
                        <span className="text-energy-gold flex-shrink-0">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Reading Card - The Emotional Moment */}
        <section className="healing-card p-8 md:p-12 mb-12 bg-gradient-to-br from-energy-gold/10 via-accent-pink/10 to-accent-cream border-2 border-energy-gold">
          <div className="text-center">
            <p className="text-energy-gold font-serif text-sm uppercase tracking-widest mb-4">
              {recommendation ? "Thẻ Năng Lượng Chiếc Vòng" : "Thẻ Năng Lượng"}
            </p>
            {recommendation ? (
              <>
                <h3 className="text-2xl font-serif text-healing-brown mb-6">{recommendation.result.readingCard.thongDiepChinh}</h3>
                <div className="my-8 py-6 border-y-2 border-energy-gold/30">
                  <p className="text-foreground-secondary text-sm mb-3 uppercase font-semibold">Câu Khẳng Định</p>
                  <p className="text-2xl font-serif text-healing-brown italic">"{recommendation.result.readingCard.affirmation.text}"</p>
                  {recommendation.result.readingCard.affirmation.autoGenerated && (
                    <p className="text-xs text-foreground-secondary mt-3">(Được tạo tự động dựa trên dữ liệu của bạn)</p>
                  )}
                </div>
                <div className="space-y-3">
                  {recommendation.result.readingCard.giaiThichNgan.map((giaiThich, idx) => (
                    <p key={idx} className="text-foreground leading-relaxed text-sm">{giaiThich}</p>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-serif text-healing-brown mb-6">{reading?.readingCard.mainMessage}</h3>
                <div className="my-8 py-6 border-y-2 border-energy-gold/30">
                  <p className="text-foreground-secondary text-sm mb-3 uppercase font-semibold">Câu Khẳng Định Của Bạn</p>
                  <p className="text-3xl font-serif text-healing-brown italic">"{reading?.readingCard.affirmationText}"</p>
                </div>
                <p className="text-foreground leading-relaxed text-sm mt-6">{reading?.readingCard.energyGuidance}</p>
              </>
            )}
          </div>
        </section>

        {/* Recommended Product */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-healing-brown mb-10 text-center">Chiếc Vòng Được Đề Xuất Cho Bạn</h2>

          <div className="healing-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 mb-8">
              {/* Product Image */}
              <div className="bg-gradient-to-br from-accent-cream via-accent-pink to-accent-cream rounded-xl h-80 md:h-96 flex items-center justify-center overflow-hidden shadow-lg">
                <div className="text-center">
                  <div className="text-8xl mb-4">
                    {reading.recommendedProduct.energyType === "Năng lượng Tích cực" && "☀️"}
                    {reading.recommendedProduct.energyType === "Năng lượng Tĩnh Lặng" && "🌙"}
                    {reading.recommendedProduct.energyType === "Năng lượng Thịnh V��ợng" && "💎"}
                    {reading.recommendedProduct.energyType === "Năng lượng Chữa Lành" && "💕"}
                  </div>
                  <p className="text-foreground-secondary font-serif">{reading.recommendedProduct.name}</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-serif text-healing-brown mb-2">{reading.recommendedProduct.name}</h3>
                  <p className="text-energy-gold font-medium mb-4">{reading.recommendedProduct.meaning}</p>
                  <p className="text-foreground mb-6 leading-relaxed">{reading.recommendedProduct.description}</p>

                  <div className="mb-8">
                    <p className="text-foreground-secondary text-sm font-semibold mb-4 uppercase tracking-wide">
                      Những Viên Đá Chính:
                    </p>
                    <ul className="space-y-2">
                      {reading.stoneExplanations.map((explanation, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-energy-gold flex-shrink-0 mt-2" />
                          <span className="text-foreground text-sm">{explanation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-accent-cream/50 rounded-lg">
                    <p className="text-foreground-secondary text-xs font-semibold mb-2 uppercase">Cách Chăm Sóc:</p>
                    <p className="text-foreground text-sm">{reading.recommendedProduct.care}</p>
                  </div>
                </div>

                <div className="mt-8">
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
