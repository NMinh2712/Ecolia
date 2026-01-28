"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface SimpleDatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SimpleDatePicker({
  value,
  onChange,
  placeholder = "Chọn ngày sinh (DD/MM/YYYY)",
}: SimpleDatePickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  // Parse value when component mounts
  if (value && !day && !month && !year) {
    const parts = value.split("-")
    if (parts.length === 3) {
      setYear(parts[0])
      setMonth(parts[1])
      setDay(parts[2])
    }
  }

  // Generate options
  const years = Array.from({ length: 100 }, (_, i) => 2026 - i)
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"))
  
  const getDaysInMonth = (m: string, y: string) => {
    if (!m || !y) return []
    const daysInMonth = new Date(parseInt(y), parseInt(m), 0).getDate()
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, "0"))
  }

  const days = month && year ? getDaysInMonth(month, year) : []

  const handleDayChange = (newDay: string) => {
    setDay(newDay)
    if (newDay && month && year) {
      updateDate(newDay, month, year)
    }
  }

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth)
    // Reset day if new month has fewer days
    if (day) {
      const daysInNewMonth = getDaysInMonth(newMonth, year)
      if (parseInt(day) > daysInNewMonth.length) {
        setDay("")
      } else if (newMonth && year) {
        updateDate(day, newMonth, year)
      }
    }
  }

  const handleYearChange = (newYear: string) => {
    setYear(newYear)
    if (day && month && newYear) {
      updateDate(day, month, newYear)
    }
  }

  const updateDate = (d: string, m: string, y: string) => {
    if (d && m && y) {
      const dateString = `${y}-${m}-${d}`
      onChange(dateString)

      // Age validation
      const birthDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d))
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      const dayDiff = today.getDate() - birthDate.getDate()

      if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && dayDiff < 0)) {
        alert("Bạn cần đủ 18 tuổi để mua sản phẩm 💫")
        onChange("")
        setDay("")
        setMonth("")
        setYear("")
      }
    }
  }

  const displayValue = value
    ? `${day}/${month}/${year}`
    : placeholder

  return (
    <div className="relative w-full animate-fadeIn">
      {/* Main Button */}
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-full px-6 py-4 text-left rounded-2xl border-2 border-border bg-white text-lg font-medium text-foreground hover:border-energy-gold hover:bg-accent-cream transition-all duration-300 flex items-center justify-between group"
      >
        <span className={value ? "text-foreground font-semibold" : "text-foreground-secondary"}>
          {displayValue}
        </span>
        <ChevronDown className="w-5 h-5 text-healing-brown group-hover:text-energy-gold transition-colors" />
      </button>

      {/* Picker Dropdown */}
      {showPicker && (
        <div className="absolute top-full left-0 right-0 mt-2 p-6 bg-white rounded-2xl border-2 border-accent-cream shadow-xl z-50 animate-slideInUp">
          {/* Helper Text */}
          <p className="text-xs text-foreground-secondary mb-4 text-center">
            Chọn ngày sinh của bạn
          </p>

          {/* Three Dropdowns */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Day */}
            <div>
              <label className="block text-xs font-semibold text-healing-brown mb-2">Ngày</label>
              <select
                value={day}
                onChange={(e) => handleDayChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border-2 border-border rounded-lg focus:border-energy-gold focus:outline-none bg-accent-cream cursor-pointer"
              >
                <option value="">DD</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <label className="block text-xs font-semibold text-healing-brown mb-2">Tháng</label>
              <select
                value={month}
                onChange={(e) => handleMonthChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border-2 border-border rounded-lg focus:border-energy-gold focus:outline-none bg-accent-cream cursor-pointer"
              >
                <option value="">MM</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    Tháng {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-semibold text-healing-brown mb-2">Năm</label>
              <select
                value={year}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border-2 border-border rounded-lg focus:border-energy-gold focus:outline-none bg-accent-cream cursor-pointer"
              >
                <option value="">YYYY</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowPicker(false)}
            className="w-full px-4 py-2 rounded-lg bg-energy-gold text-white font-medium hover:opacity-90 transition-opacity text-sm"
          >
            Xác nhận
          </button>

          {/* Confirmation Display */}
          {day && month && year && (
            <p className="text-xs text-healing-brown text-center mt-3 p-2 bg-accent-cream rounded">
              📅 {day}/{month}/{year}
            </p>
          )}
        </div>
      )}

      {/* Helper Text */}
      <p className="text-xs text-foreground-secondary text-center mt-2">
        ✨ Chúng tôi dùng mệnh của bạn để tìm vòng tay hoàn hảo
      </p>
    </div>
  )
}
