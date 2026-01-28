"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { SimpleDatePicker } from "@/components/SimpleDatePicker"
import { analyzeEnergy, type UserAnswers } from "@/lib/ai-rules"
import {
  emotionalNeeds,
  barriers,
  lifeGoals,
  energyVibes,
  fashionStyles,
  colorPreferences,
} from "@/lib/zodiac-elements"

const sections = [
  {
    title: "Phần 1: Định Danh & Năng Lượng Gốc",
    subtitle: "Hãy cho chúng tôi biết về bạn",
    questions: [
      {
        id: "birthDate",
        question: "Ngày sinh của bạn là?",
        type: "date",
        required: true,
      },
      {
        id: "gender",
        question: "Giới tính của bạn?",
        type: "radio",
        options: [
          { label: "Nam", value: "male" },
          { label: "Nữ", value: "female" },
          { label: "Khác", value: "other" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Phần 2: Bắt Mạch Cảm Xúc",
    subtitle: "Hãy chia sẻ trạng thái tinh thần hiện tại",
    questions: [
      {
        id: "emotionalState",
        question: "Từ khóa nào mô tả chính xác nhất trạng thái tinh thần của bạn trong 2 tuần gần đây?",
        type: "radio",
        options: Object.values(emotionalNeeds).map((e) => ({ label: e.label, value: e.value })),
        required: true,
      },
      {
        id: "barrier",
        question: "Điều gì đang là rào cản lớn nhất ngăn bạn đạt được mục tiêu hiện tại?",
        type: "radio",
        options: Object.values(barriers).map((b) => ({ label: b.label, value: b.value })),
        required: true,
      },
    ],
  },
  {
    title: "Phần 3: Thiết Lập Mục Tiêu",
    subtitle: "Chiếc vòng tay này sẽ hỗ trợ bạn như thế nào?",
    questions: [
      {
        id: "lifeGoal",
        question: "Bạn muốn nó hỗ trợ khía cạnh nào nhất?",
        type: "radio",
        options: Object.values(lifeGoals).map((g) => ({ label: g.label, value: g.value })),
        required: true,
      },
      {
        id: "energyVibe",
        question: "Bạn muốn năng lượng của chiếc vòng tác động đến bạn như thế nào?",
        type: "radio",
        options: Object.values(energyVibes).map((v) => ({ label: v.label, value: v.value })),
        required: true,
      },
    ],
  },
  {
    title: "Phần 4: Thẩm Mỹ & Cá Nhân Hóa",
    subtitle: "Hãy cá nhân hóa chiếc vòng tay của bạn",
    questions: [
      {
        id: "fashionStyle",
        question: "Phong cách thời trang thường ngày của bạn là gì?",
        type: "radio",
        options: Object.values(fashionStyles).map((s) => ({ label: s.label, value: s.value })),
        required: true,
      },
      {
        id: "colorPreference",
        question: "Có gam màu nào mà bạn tuyệt đối KHÔNG muốn xuất hiện trên chiếc vòng?",
        type: "radio",
        options: Object.values(colorPreferences).map((c) => ({ label: c.label, value: c.value })),
        required: true,
      },
      {
        id: "wristSize",
        question: "Kích thước cổ tay của bạn? (cm)",
        type: "number",
        placeholder: "VD: 16cm",
        required: true,
      },
      {
        id: "budget",
        question: "Ngân sách dự kiến?",
        type: "radio",
        options: [
          { label: "99,000 VND", value: "99000" },
          { label: "159,000 VND", value: "159000" },
        ],
        required: true,
      },
      {
        id: "affirmation",
        question: "Hãy viết một câu khẳng định (Affirmation) hoặc mong ước ngắn gọn (Không bắt buộc)",
        type: "textarea",
        placeholder: "VD: Tôi bình an, Tôi giàu có, Mọi việc hanh thông...",
        required: false,
      },
    ],
  },
]

export default function AIReading() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")

  const currentSec = sections[currentSection]
  const currentQuestion = currentSec.questions[currentQuestionIdx]
  const isAnswered = currentQuestion.required ? answers[currentQuestion.id] : true
  const totalQuestions = sections.reduce((acc, sec) => acc + sec.questions.length, 0)
  const completedQuestions = Object.keys(answers).length + (name ? 1 : 0)
  const progress = (completedQuestions / (totalQuestions + 1)) * 100

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestionIdx < currentSec.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentQuestionIdx(0)
    } else if (!name) {
      // Ask for name before submitting
      alert("Vui lòng nhập tên của bạn")
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1)
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setCurrentQuestionIdx(sections[currentSection - 1].questions.length - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)

    setTimeout(() => {
      const userAnswers: UserAnswers = {
        birthDate: answers.birthDate || "2000-01-01",
        zodiacSign: "",
        gender: answers.gender || "other",
        emotionalState: answers.emotionalState || "happy",
        barrier: answers.barrier || "procrastination",
        lifeGoal: answers.lifeGoal || "health",
        energyVibe: answers.energyVibe || "gentle",
        fashionStyle: answers.fashionStyle || "minimalist",
        colorPreference: answers.colorPreference || "any",
        wristSize: answers.wristSize || "16",
        budget: answers.budget || "159000",
        affirmation: answers.affirmation || "",
        name: name || "Bạn",
      }

      const reading = analyzeEnergy(userAnswers)

      sessionStorage.setItem("aiReading", JSON.stringify(reading))
      sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers))
      
      // Store recommendation data for next page
      sessionStorage.setItem(
        "formData",
        JSON.stringify({
          ngaySinh: answers.birthDate,
          gioiTinh: answers.gender,
          trangThaiTinhThan: answers.emotionalState,
          raoCan: answers.barrier,
          suMenh: answers.lifeGoal,
          vibe: answers.energyVibe,
          phongCach: answers.fashionStyle,
          mauKhongMuon: answers.colorPreference,
          coTayCm: parseInt(answers.wristSize || "16"),
          nganSach: parseInt(answers.budget || "149000"),
          affirmation: answers.affirmation,
          name: name,
        })
      )

      router.push("/ai-processing")
    }, 1000)
  }

  const isLastQuestion = currentQuestionIdx === currentSec.questions.length - 1 && currentSection === sections.length - 1

  return (
    <main className="gradient-background min-h-screen">
      <Header />

      <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-4">
            <p className="text-foreground-secondary text-sm font-medium">
              Bước {completedQuestions + 1} / {totalQuestions + 1}
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

        {/* Section Info */}
        <div className="mb-12 text-center animate-fadeIn">
          <p className="text-sm text-energy-gold font-medium mb-2 uppercase tracking-wide animate-slideInDown">
            {currentSec.title}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-healing-brown text-glow-intense">
            {currentSec.subtitle}
          </h2>
        </div>

        {/* Question Container */}
        <div className="mb-16 animate-fadeIn">
          <h3 className="text-xl md:text-2xl font-serif text-healing-brown mb-8 text-center animate-slideInUp">
            {currentQuestion.question}
          </h3>

          {/* Text Input */}
          {currentQuestion.type === "text" && (
            <input
              type="text"
              placeholder={(currentQuestion as any).placeholder || ""}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-border bg-white text-lg focus:outline-none focus:border-energy-gold transition-colors"
              autoFocus
            />
          )}

          {/* Number Input */}
          {currentQuestion.type === "number" && (
            <input
              type="number"
              placeholder={(currentQuestion as any).placeholder || ""}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-border bg-white text-lg focus:outline-none focus:border-energy-gold transition-colors"
              autoFocus
            />
          )}

          {/* Textarea */}
          {currentQuestion.type === "textarea" && (
            <textarea
              placeholder={(currentQuestion as any).placeholder || ""}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-border bg-white text-lg focus:outline-none focus:border-energy-gold transition-colors min-h-24 resize-none"
              autoFocus
            />
          )}

          {/* Date Input */}
          {currentQuestion.type === "date" && (
            <SimpleDatePicker
              value={answers[currentQuestion.id] || ""}
              onChange={(value) => handleAnswer(currentQuestion.id, value)}
              placeholder="Chọn ngày sinh của bạn"
            />
          )}

          {/* Radio Options */}
          {currentQuestion.type === "radio" && (
            <div className="space-y-3 stagger-container">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 font-medium text-left hover:translate-x-1 ${
                    answers[currentQuestion.id] === option.value
                      ? "border-energy-gold bg-accent-cream text-healing-brown shadow-md animate-glow-pulse"
                      : "border-border bg-white text-foreground hover:border-energy-gold hover:bg-accent-cream hover:shadow-md"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Name Input if Last Question */}
        {isLastQuestion && (
          <div className="mb-16 p-6 bg-accent-cream rounded-lg border-2 border-accent-pink animate-bounce-in">
            <label className="block text-healing-brown font-medium mb-3">Bạn tên gì?</label>
            <input
              type="text"
              placeholder="Nhập tên của bạn..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-border bg-white text-lg focus:outline-none focus:border-energy-gold focus:shadow-lg transition-all"
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentSection === 0 && currentQuestionIdx === 0}
            className="px-6 py-3 rounded-full font-medium text-healing-brown bg-accent-cream hover:bg-accent-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Quay lại
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered || isLoading || (isLastQuestion && !name)}
            className="px-8 py-3 rounded-full font-medium text-white bg-healing-brown hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Đang xử lý...
              </>
            ) : isLastQuestion ? (
              "Khám Phá Kết Quả"
            ) : (
              "Tiếp Tục"
            )}
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
