"use client"

import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"

interface DatePickerProps {
  value: string // Format: "YYYY-MM-DD"
  onChange: (value: string) => void
  placeholder?: string
}

export function DatePicker({ value, onChange, placeholder = "Chọn ngày sinh" }: DatePickerProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  
  // Separate state for selections to avoid circular dependencies
  const [selectedDay, setSelectedDay] = useState<number | "">("")
  const [selectedMonth, setSelectedMonth] = useState<number | "">("")
  const [selectedYear, setSelectedYear] = useState<number | "">("")
  
  // Parse current value
  const currentDate = value ? new Date(value) : null
  
  const displayDay = selectedDay || (currentDate ? currentDate.getDate() : "")
  const displayMonth = selectedMonth || (currentDate ? currentDate.getMonth() + 1 : "")
  const displayYear = selectedYear || (currentDate ? currentDate.getFullYear() : "")

  // Generate year options (from current year - 100 to current year)
  const currentYearNum = new Date().getFullYear()
  const years = useMemo(() => {
    const arr = []
    for (let i = currentYearNum; i >= currentYearNum - 100; i--) {
      arr.push(i)
    }
    return arr
  }, [currentYearNum])

  const months = [
    { value: 1, label: "Tháng 1" },
    { value: 2, label: "Tháng 2" },
    { value: 3, label: "Tháng 3" },
    { value: 4, label: "Tháng 4" },
    { value: 5, label: "Tháng 5" },
    { value: 6, label: "Tháng 6" },
    { value: 7, label: "Tháng 7" },
    { value: 8, label: "Tháng 8" },
    { value: 9, label: "Tháng 9" },
    { value: 10, label: "Tháng 10" },
    { value: 11, label: "Tháng 11" },
    { value: 12, label: "Tháng 12" },
  ]

  // Generate day options based on selected month and year
  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const days = useMemo(() => {
    const monthValue = typeof displayMonth === "number" ? displayMonth : 0
    const yearValue = typeof displayYear === "number" ? displayYear : 0
    
    if (!monthValue || !yearValue) return []
    const maxDays = daysInMonth(monthValue, yearValue)
    const arr = []
    for (let i = 1; i <= maxDays; i++) {
      arr.push(i)
    }
    return arr
  }, [displayMonth, displayYear])

  const handleDayChange = (day: number) => {
    setSelectedDay(day)
  }

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month)
    // Reset day if it exceeds days in new month
    const dayValue = typeof displayDay === "number" ? displayDay : 0
    const yearValue = typeof displayYear === "number" ? displayYear : 0
    if (dayValue > daysInMonth(month, yearValue)) {
      setSelectedDay("")
    }
  }

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
    // Reset day if it exceeds days in new month
    const monthValue = typeof displayMonth === "number" ? displayMonth : 0
    const dayValue = typeof displayDay === "number" ? displayDay : 0
    if (monthValue && dayValue > daysInMonth(monthValue, year)) {
      setSelectedDay("")
    }
  }

  const handleConfirm = () => {
    if (displayDay && displayMonth && displayYear) {
      const dateStr = `${displayYear}-${String(displayMonth).padStart(2, "0")}-${String(displayDay).padStart(2, "0")}`
      onChange(dateStr)
      setShowDropdown(false)
      // Reset state after confirming
      setSelectedDay("")
      setSelectedMonth("")
      setSelectedYear("")
    }
  }

  const finalDay = currentDate ? currentDate.getDate() : ""
  const finalMonth = currentDate ? currentDate.getMonth() + 1 : ""
  const finalYear = currentDate ? currentDate.getFullYear() : ""

  const displayValue = 
    finalDay && finalMonth && finalYear
      ? `${String(finalDay).padStart(2, "0")}/${String(finalMonth).padStart(2, "0")}/${finalYear}`
      : placeholder

  return (
    <div className="relative">
      {/* Display Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full px-6 py-4 rounded-lg border-2 border-border bg-white text-lg focus:outline-none focus:border-energy-gold transition-colors flex items-center justify-between"
      >
        <span className={finalDay ? "text-foreground" : "text-foreground-secondary"}>
          {displayValue}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-energy-gold transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-border rounded-lg shadow-lg z-50 p-4">
          <div className="grid grid-cols-3 gap-3">
            {/* Day Dropdown */}
            <div>
              <label className="block text-sm text-foreground-secondary font-medium mb-2">Ngày</label>
              <select
                value={displayDay || ""}
                onChange={(e) => handleDayChange(parseInt(e.target.value) || (e.target.value === "" ? "" : 1) as unknown as number)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:border-energy-gold transition-colors"
              >
                <option value="">Chọn</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {String(day).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Dropdown */}
            <div>
              <label className="block text-sm text-foreground-secondary font-medium mb-2">Tháng</label>
              <select
                value={displayMonth || ""}
                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:border-energy-gold transition-colors"
              >
                <option value="">Chọn</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Dropdown */}
            <div>
              <label className="block text-sm text-foreground-secondary font-medium mb-2">Năm</label>
              <select
                value={displayYear || ""}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:border-energy-gold transition-colors"
              >
                <option value="">Chọn</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleConfirm}
            disabled={!displayDay || !displayMonth || !displayYear}
            className="w-full mt-4 px-4 py-2 rounded-lg bg-energy-gold text-white font-medium hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xác nhận
          </button>
        </div>
      )}
    </div>
  )
}
