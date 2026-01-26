"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ZODIAC_SIGNS, getZodiacByDate, getRandomAffirmation } from "@/lib/zodiac-data"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface FormData {
  ngaySinh: string
  cumHoangDao: string
  gioiTinh: string
  phanTu: string
  trangThaiTinhThan: string
  raoCan: string
  suMenh: string
  vibeNangLuong: string
  phongCach: string
  mauKhongMuon: string
  coTayCm: number
  nganSach: number
  affirmation: string
}

const QUESTIONS = [
  {
    id: 1,
    title: "Thông Tin Cá Nhân",
    description: "Hãy bắt đầu với thông tin cơ bản của bạn",
  },
  {
    id: 2,
    title: "Phần Tử Thiên Nhiên",
    description: "Nếu ví mình là yếu tố thiên nhiên, bạn gần gũi nhất?",
  },
  {
    id: 3,
    title: "Trạng Thái Tinh Thần",
    description: "Trạng thái tinh thần 2 tuần gần đây?",
  },
  {
    id: 4,
    title: "Rào Cản Lớn Nhất",
    description: "Rào cản lớn nhất mà bạn đang gặp phải?",
  },
  {
    id: 5,
    title: "Sứ Mệnh Chiếc Vòng",
    description: "Chiếc vòng này sẽ hỗ trợ bạn trong lĩnh vực nào?",
  },
  {
    id: 6,
    title: "Vibe Năng Lượng",
    description: "Bạn muốn năng lượng tác động như thế nào?",
  },
  {
    id: 7,
    title: "Phong Cách Thời Trang",
    description: "Phong cách thời trang của bạn?",
  },
  {
    id: 8,
    title: "Màu Sắc",
    description: "Có màu nào mà bạn KHÔNG muốn xuất hiện?",
  },
  {
    id: 9,
    title: "Kích Thước & Ngân Sách",
    description: "Cổ tay bạn bao nhiêu cm? Ngân sách dự kiến?",
  },
  {
    id: 10,
    title: "Câu Khẳng Định",
    description: "Viết một câu khẳng định riêng của bạn (không bắt buộc)",
  },
]

export default function FormPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    ngaySinh: "",
    cumHoangDao: "",
    gioiTinh: "",
    phanTu: "",
    trangThaiTinhThan: "",
    raoCan: "",
    suMenh: "",
    vibeNangLuong: "",
    phongCach: "",
    mauKhongMuon: "",
    coTayCm: 16,
    nganSach: 99000,
    affirmation: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  // Auto-calculate zodiac when date changes
  const handleDateChange = (date: string) => {
    handleInputChange("ngaySinh", date)
    if (date) {
      const [year, month, day] = date.split("-").map(Number)
      const zodiac = getZodiacByDate(day, month)
      handleInputChange("cumHoangDao", zodiac.id)
    }
  }

  const isStepComplete = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.ngaySinh && formData.cumHoangDao && formData.gioiTinh)
      case 2:
        return !!formData.phanTu
      case 3:
        return !!formData.trangThaiTinhThan
      case 4:
        return !!formData.raoCan
      case 5:
        return !!formData.suMenh
      case 6:
        return !!formData.vibeNangLuong
      case 7:
        return !!formData.phongCach
      case 8:
        return !!formData.mauKhongMuon
      case 9:
        return formData.coTayCm > 0 && formData.nganSach > 0
      case 10:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < QUESTIONS.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!isStepComplete()) {
      setError("Vui lòng điền đầy đủ thông tin")
      return
    }

    setIsLoading(true)

    try {
      // Auto-generate affirmation if empty
      const finalAffirmation = formData.affirmation.trim() || getRandomAffirmation(formData.trangThaiTinhThan)

      const payload = {
        ngaySinh: formData.ngaySinh,
        cumHoangDao: formData.cumHoangDao,
        gioiTinh: formData.gioiTinh,
        phanTu: formData.phanTu,
        trangThaiTinhThan: formData.trangThaiTinhThan,
        raoCan: formData.raoCan,
        suMenh: formData.suMenh,
        vibeNangLuong: formData.vibeNangLuong,
        phongCach: formData.phongCach,
        mauKhongMuon: formData.mauKhongMuon,
        coTayCm: formData.coTayCm,
        nganSach: formData.nganSach,
        affirmation: finalAffirmation,
      }

      console.log("[v0] Submitting form data:", payload)

      const response = await fetch("/api/recommend-bracelet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("[v0] Recommendation result:", result)

      // Store in sessionStorage
      sessionStorage.setItem("formData", JSON.stringify(payload))
      sessionStorage.setItem("braceletRecommendation", JSON.stringify(result))

      // Redirect to result page
      router.push("/result")
    } catch (err) {
      console.error("[v0] Error submitting form:", err)
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại")
      setIsLoading(false)
    }
  }

  const progress = (currentStep / QUESTIONS.length) * 100
  const question = QUESTIONS[currentStep - 1]
  const selectedZodiac = ZODIAC_SIGNS.find((z) => z.id === formData.cumHoangDao)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-foreground-secondary">
              Bước {currentStep} / {QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-healing-brown">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-energy-gold transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-healing-brown mb-3">{question.title}</h1>
          <p className="text-foreground-secondary">{question.description}</p>
        </div>

        {/* Error Message */}
        {error && <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm">{error}</div>}

        {/* Question Content */}
        <div className="mb-10 space-y-4">
          {/* Question 1: Date, Zodiac, Gender */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ngày sinh của bạn</label>
                <input
                  type="date"
                  value={formData.ngaySinh}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-energy-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cung hoàng đạo</label>
                <select
                  value={formData.cumHoangDao}
                  onChange={(e) => handleInputChange("cumHoangDao", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-energy-gold"
                >
                  <option value="">-- Chọn cung hoàng đạo --</option>
                  {ZODIAC_SIGNS.map((sign) => (
                    <option key={sign.id} value={sign.id}>
                      {sign.name} ({sign.startDate.day}/{sign.startDate.month} - {sign.endDate.day}/{sign.endDate.month})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Giới tính</label>
                <select
                  value={formData.gioiTinh}
                  onChange={(e) => handleInputChange("gioiTinh", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-energy-gold"
                >
                  <option value="">-- Chọn giới tính --</option>
                  <option value="nam">Nam</option>
                  <option value="nu">Nữ</option>
                  <option value="khac">Khác</option>
                </select>
              </div>
            </div>
          )}

          {/* Question 2: Element */}
          {currentStep === 2 && (
            <div className="space-y-3">
              {[
                { value: "hoa", label: "Ngọn lửa nhiệt huyết (Hỏa)" },
                { value: "thuy", label: "Dòng nước linh hoạt (Thủy)" },
                { value: "moc", label: "Cây cối vững chãi (Mộc)" },
                { value: "tho", label: "Mặt đất kiên định (Thổ)" },
                { value: "kim", label: "Kim loại sắc bén (Kim)" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("phanTu", option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    formData.phanTu === option.value
                      ? "border-energy-gold bg-accent-cream text-healing-brown"
                      : "border-border hover:border-energy-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Question 3: Emotional State */}
          {currentStep === 3 && (
            <div className="space-y-3">
              {[
                { value: "can-thang", label: "Căng thẳng, kiệt sức" },
                { value: "mong-lung", label: "Mông lung, thiếu định hướng" },
                { value: "bat-an", label: "Bất an, khó ngủ" },
                { value: "nong-nay", label: "Nóng nảy, dễ cáu gắt" },
                { value: "te-nhat", label: "Bình ổn, nhưng hơi tẻ nhạt" },
                { value: "vui-ve", label: "Vui vẻ, bình yên" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("trangThaiTinhThan", option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    formData.trangThaiTinhThan === option.value
                      ? "border-energy-gold bg-accent-cream text-healing-brown"
                      : "border-border hover:border-energy-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Question 4: Barrier */}
          {currentStep === 4 && (
            <div className="space-y-3">
              {[
                { value: "tri-hoan", label: "Sự trì hoãn, lười biếng" },
                { value: "thieu-tin", label: "Thiếu sự tự tin, sợ đám đông" },
                { value: "thieu-may", label: "Thiếu may mắn, gặp vận xui" },
                { value: "suc-khoe", label: "Sức khỏe thể chất không tốt" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("raoCan", option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    formData.raoCan === option.value
                      ? "border-energy-gold bg-accent-cream text-healing-brown"
                      : "border-border hover:border-energy-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Question 5: Purpose */}
          {currentStep === 5 && (
            <div className="space-y-3">
              {[
                { value: "tai-loc", label: "Tài lộc & Sự nghiệp" },
                { value: "tinh-duyen", label: "Tình duyên & Mối quan hệ" },
                { value: "tri-tue", label: "Trí tuệ & Học tập" },
                { value: "suc-khoe", label: "Sức khỏe & Bình an" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("suMenh", option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    formData.suMenh === option.value
                      ? "border-energy-gold bg-accent-cream text-healing-brown"
                      : "border-border hover:border-energy-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Question 6: Energy Vibe */}
          {currentStep === 6 && (
            <div className="space-y-3">
              {[
                { value: "manh-me", label: "Mạnh mẽ, quyết liệt" },
                { value: "nhe-nang", label: "Nhẹ nhàng, xoa dịu" },
                { value: "bi-an", label: "Bí ẩn, quyến rũ" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("vibeNangLuong", option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    formData.vibeNangLuong === option.value
                      ? "border-energy-gold bg-accent-cream text-healing-brown"
                      : "border-border hover:border-energy-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Question 7: Fashion Style */}
          {currentStep === 7 && (
            <div className="space-y-3">
              {[
                { value: "toi-gian", label: "Tối giản" },
                { value: "ca-tinh", label: "Cá tính/Nổi loạn" },
                { value: "vintage", label: "Vintage/Cổ điển" },
                { value: "nhanbenh", label: "Bánh bèo/Nữ tính" },
                { value: "nang-dong", label: "Năng động" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("phongCach", option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    formData.phongCach === option.value
                      ? "border-energy-gold bg-accent-cream text-healing-brown"
                      : "border-border hover:border-energy-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Question 8: Color Preference */}
          {currentStep === 8 && (
            <div className="space-y-3">
              {[
                { value: "tong-toi", label: "Tông tối/Đen" },
                { value: "tong-nong", label: "Tông nóng/Rực (Đỏ/Cam)" },
                { value: "saccsap", label: "Quá sặc sỡ/Nhiều màu" },
                { value: "khong-ken", label: "Không kén chọn" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("mauKhongMuon", option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    formData.mauKhongMuon === option.value
                      ? "border-energy-gold bg-accent-cream text-healing-brown"
                      : "border-border hover:border-energy-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Question 9: Wrist & Budget */}
          {currentStep === 9 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cổ tay (cm): {formData.coTayCm}</label>
                <input
                  type="range"
                  min="14"
                  max="22"
                  value={formData.coTayCm}
                  onChange={(e) => handleInputChange("coTayCm", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ngân sách dự kiến</label>
                <select
                  value={formData.nganSach}
                  onChange={(e) => handleInputChange("nganSach", parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-energy-gold"
                >
                  <option value={99000}>99.000 đ</option>
                  <option value={149000}>149.000 đ</option>
                  <option value={199000}>199.000 đ</option>
                </select>
              </div>
            </div>
          )}

          {/* Question 10: Affirmation */}
          {currentStep === 10 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Câu khẳng định của bạn (không bắt buộc)
              </label>
              <textarea
                value={formData.affirmation}
                onChange={(e) => handleInputChange("affirmation", e.target.value)}
                placeholder="VD: Tôi bình an, Tôi giàu có, Mọi việc hanh thông..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-energy-gold resize-none"
                rows={4}
              />
              <p className="text-xs text-foreground-secondary mt-2">
                Nếu bỏ trống, hệ thống sẽ tạo một câu khẳng định dựa trên kết quả của bạn.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-full border border-border text-foreground hover:bg-accent-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Quay lại
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepComplete() || isLoading}
            className="px-8 py-3 rounded-full bg-healing-brown text-white hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? "Đang xử lý..." : currentStep === QUESTIONS.length ? "Hoàn thành" : "Tiếp tục"}
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
