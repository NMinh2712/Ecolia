"use client"

import * as React from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"

interface ModernDatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

export function ModernDatePicker({
  value,
  onChange,
  placeholder = "Chọn ngày sinh của bạn",
  minDate = new Date(1900, 0, 1),
  maxDate = new Date(),
}: ModernDatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<number>(new Date().getMonth())
  const [year, setYear] = React.useState<number>(new Date().getFullYear())

  // Người dùng phải từ 18 tuổi trở lên
  const minAgeDate = new Date()
  minAgeDate.setFullYear(minAgeDate.getFullYear() - 18)

  const selectedDate = value ? new Date(value + "T00:00:00") : undefined

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Check age validation
      const age = new Date().getFullYear() - date.getFullYear()
      const monthDiff = new Date().getMonth() - date.getMonth()
      const dayDiff = new Date().getDate() - date.getDate()

      if (age > 18 || (age === 18 && monthDiff > 0) || (age === 18 && monthDiff === 0 && dayDiff >= 0)) {
        // Valid age
        const dateString = format(date, "yyyy-MM-dd")
        onChange(dateString)
        setOpen(false)
      } else {
        // Show hint for underage users
        alert("Bạn cần đủ 18 tuổi để mua sản phẩm nhé 💫")
      }
    }
  }

  const years = Array.from({ length: 127 }, (_, i) => 2026 - i)
  const months = [
    { value: "0", label: "Tháng 1" },
    { value: "1", label: "Tháng 2" },
    { value: "2", label: "Tháng 3" },
    { value: "3", label: "Tháng 4" },
    { value: "4", label: "Tháng 5" },
    { value: "5", label: "Tháng 6" },
    { value: "6", label: "Tháng 7" },
    { value: "7", label: "Tháng 8" },
    { value: "8", label: "Tháng 9" },
    { value: "9", label: "Tháng 10" },
    { value: "10", label: "Tháng 11" },
    { value: "11", label: "Tháng 12" },
  ]

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal px-6 py-5 rounded-2xl border-2 border-border bg-white text-lg hover:border-energy-gold hover:bg-accent-cream transition-all cursor-pointer h-auto"
          >
            <CalendarIcon className="mr-3 h-5 w-5 text-healing-brown flex-shrink-0" />
            <span className={selectedDate ? "text-foreground font-medium" : "text-foreground-secondary"}>
              {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: vi }) : placeholder}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4 bg-white rounded-2xl shadow-2xl border-2 border-accent-cream" align="start">
          {/* Year and Month Dropdowns */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Select value={year.toString()} onValueChange={(val) => setYear(parseInt(val))}>
              <SelectTrigger className="border-2 border-border rounded-lg focus:border-energy-gold">
                <SelectValue placeholder="Năm" />
              </SelectTrigger>
              <SelectContent className="max-h-48">
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={month.toString()} onValueChange={(val) => setMonth(parseInt(val))}>
              <SelectTrigger className="border-2 border-border rounded-lg focus:border-energy-gold">
                <SelectValue placeholder="Tháng" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Calendar */}
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={new Date(year, month)}
            onMonthChange={(date) => {
              setMonth(date.getMonth())
              setYear(date.getFullYear())
            }}
            disabled={(date) => date > minAgeDate || date < minDate}
            fromDate={minDate}
            toDate={minAgeDate}
            classNames={{
              months: "space-y-4",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-semibold text-healing-brown",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 hover:opacity-70",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-healing-brown rounded-md w-9 font-medium text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-sm p-0 relative [&:has([aria-selected])]:bg-accent-cream rounded-md w-9 h-9 text-center",
              day: "h-9 w-9 p-0 font-normal hover:bg-accent-pink/30 rounded-md transition-colors",
              day_selected:
                "bg-energy-gold text-white hover:bg-energy-gold focus:bg-energy-gold hover:text-white focus:text-white",
              day_today: "bg-accent-cream text-healing-brown font-bold",
              day_outside: "text-foreground-secondary opacity-50",
              day_disabled: "text-foreground-secondary opacity-30",
              day_range_middle:
                "aria-selected:bg-accent-cream aria-selected:text-healing-brown rounded-none",
              day_hidden: "invisible",
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Helper Text */}
      <p className="text-sm text-foreground-secondary text-center">
        Chúng tôi dùng thông tin này để tính mệnh Ngũ Hành & chòm sao chính xác ✨
      </p>

      {/* Age Validation Message */}
      {selectedDate && (
        <p className="text-xs text-healing-brown text-center bg-accent-cream/50 p-2 rounded">
          📅 Ngày sinh: {format(selectedDate, "dd/MM/yyyy", { locale: vi })}
        </p>
      )}
    </div>
  )
}
