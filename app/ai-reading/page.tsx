"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { analyzeEnergy, type UserAnswers } from "@/lib/ai-rules"

const questions = [
  {
    id: "emotion",
    question: "Gần đây bạn thường cảm thấy điều gì nhất?",
    options: ["Căng thẳng", "Cô đơn", "Lạc lối", "Cân bằng", "Muốn phát triển"],
    values: ["stress", "lonely", "lost", "balance", "growth"],
  },
  {
    id: "intention",
    question: "Bạn đang mong muốn điều gì nhất trong giai đoạn này?",
    options: ["Bình yên", "Thành công", "Tình yêu", "Chữa lành"],
    values: ["peace", "work", "love", "healing"],
  },
  {
    id: "color",
    question: "Màu sắc nào khiến bạn cảm thấy dễ chịu hôm nay?",
    colorOptions: [
      { label: "Nâu ấm", value: "brown", color: "#8c6a4a" },
      { label: "Vàng rạng rỡ", value: "gold", color: "#c6a25d" },
      { label: "Hồng nhẹ nhàng", value: "pink", color: "#e8d5d1" },
    ],
    type: "color",
  },
  {
    id: "name",
    question: "Tên của bạn là gì?",
    type: "text",
    placeholder: "Nhập tên của bạn...",
  },
  {
    id: "birthDate",
    question: "Ngày sinh của bạn? (Không bắt buộc)",
    type: "date",
  },
]

export default function AIReading() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const userAnswers: UserAnswers = {
        emotion: answers.emotion || "balance",
        color: answers.color || "gold",
        intention: answers.intention || "peace",
        name: answers.name || "Bạn",
        birthDate: answers.birthDate || "",
      }

      const reading = analyzeEnergy(userAnswers)

      // Save to sessionStorage
      sessionStorage.setItem("aiReading", JSON.stringify(reading))
      sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers))

      // Redirect to processing screen
      router.push("/ai-processing")
    }, 1000)
  }

  const currentQuestion = questions[currentStep]
  const isAnswered = answers[currentQuestion.id]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <main className="gradient-background min-h-screen">
      <Header />

      <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-4">
            <p className="text-foreground-secondary text-sm font-medium">
              Bước {currentStep + 1} / {questions.length}
            </p>
            <p className="text-healing-brown text-sm font-semibold">{Math.round(progress)}%</p>
          </div>
          <div className="w-full bg-accent-cream rounded-full h-2">
            <div
              className="bg-energy-gold h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Container */}
        <div className="mb-16">
          <h2 className="text-4xl font-serif text-healing-brown mb-10 text-center">{currentQuestion.question}</h2>

          {/* Text Input */}
          {currentQuestion.type === "text" && (
            <input
              type="text"
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-border bg-white text-lg focus:outline-none focus:border-energy-gold transition-colors"
              autoFocus
            />
          )}

          {/* Date Input */}
          {currentQuestion.type === "date" && (
            <input
              type="date"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-border bg-white text-lg focus:outline-none focus:border-energy-gold transition-colors"
            />
          )}

          {/* Color Picker */}
          {currentQuestion.type === "color" && (
            <div className="grid grid-cols-3 gap-4">
              {currentQuestion.colorOptions?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`relative p-6 rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion.id] === option.value
                      ? "border-energy-gold scale-105"
                      : "border-border hover:border-energy-gold"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full shadow-md" style={{ backgroundColor: option.color }} />
                    <span className="font-medium text-foreground text-sm">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Multiple Choice Options */}
          {currentQuestion.type !== "text" && currentQuestion.type !== "date" && currentQuestion.type !== "color" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(currentQuestion.id, currentQuestion.values![idx])}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 font-medium text-left ${
                    answers[currentQuestion.id] === currentQuestion.values![idx]
                      ? "border-energy-gold bg-accent-cream text-healing-brown shadow-md"
                      : "border-border bg-white text-foreground hover:border-energy-gold hover:bg-accent-cream"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-full font-medium text-healing-brown bg-accent-cream hover:bg-accent-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Quay lại
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered || isLoading}
            className="px-8 py-3 rounded-full font-medium text-white bg-healing-brown hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Đang xử lý...
              </>
            ) : currentStep === questions.length - 1 ? (
              "Hoàn thành"
            ) : (
              "Tiếp tục"
            )}
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
