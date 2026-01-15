"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"

const processingSteps = [
  "Đang tổng hợp dữ liệu cảm xúc của bạn…",
  "Đang phân tích phong cách cá nhân…",
  "Đang tìm kiếm năng lượng phù hợp…",
  "Đang ghép mảnh hoàn hảo…",
]

export default function AIProcessingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let stepIndex = 0
    const interval = setInterval(() => {
      stepIndex += 1
      setCurrentStep(stepIndex)

      if (stepIndex >= processingSteps.length) {
        clearInterval(interval)
        setTimeout(() => {
          router.push("/ai-result")
        }, 1000)
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [router])

  return (
    <main className="gradient-background min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center">
              <div className="relative w-24 h-24">
                {/* Outer rotating circle */}
                <div
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-energy-gold border-r-energy-gold"
                  style={{
                    animation: "spin 2s linear infinite",
                  }}
                />

                {/* Middle circle */}
                <div
                  className="absolute inset-2 rounded-full border-4 border-transparent border-b-healing-brown"
                  style={{
                    animation: "spin 1s linear infinite reverse",
                  }}
                />

                {/* Inner element */}
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent-cream to-accent-pink flex items-center justify-center animate-pulse">
                  <span className="text-3xl">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Message */}
          <div className="mb-8 h-20 flex items-center justify-center">
            <div className="text-center">
              {currentStep < processingSteps.length ? (
                <p className="text-2xl font-serif text-healing-brown animate-fadeIn">{processingSteps[currentStep]}</p>
              ) : (
                <p className="text-2xl font-serif text-healing-brown">Xong rồi! Đang tải kết quả...</p>
              )}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {processingSteps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx < currentStep ? "bg-energy-gold w-4" : "bg-stone-gray"
                }`}
              />
            ))}
          </div>

          {/* Subtitle */}
          <p className="text-foreground-secondary mt-8 text-sm">Mảnh ghép của bạn đang được hình thành…</p>
        </div>
      </div>
    </main>
  )
}
