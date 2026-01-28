# 📅 ModernDatePicker - Implementation Guide

## Overview

`ModernDatePicker` là một component calendar picker hiện đại, mobile-friendly, được tối ưu cho trải nghiệm Việt Nam. Thay thế cho custom DatePicker cũ (giảm lỗi input, tăng UX).

---

## 🎯 Features

✅ **Calendar Popup** - Click để hiển thị lịch đầy đủ
✅ **Dropdown Year/Month** - Chọn nhanh năm và tháng
✅ **Smart Date Validation** - Tự động disable ngày không hợp lệ
✅ **Age Validation** - Kiểm tra người dùng ≥ 18 tuổi
✅ **Mobile-Friendly** - Full-width lịch trên mobile, dễ chọn
✅ **Energy-Gold Styling** - Highlight color theo MẢNH brand
✅ **Vietnamese Locale** - Dùng date-fns locale Vietnamese
✅ **Accessible** - Semantic HTML, proper ARIA labels

---

## 📦 Installation & Setup

### 1. Component đã được tạo tại:
```
components/ModernDatePicker.tsx
```

### 2. Dependencies (đã cài):
```json
{
  "date-fns": "4.1.0",
  "@radix-ui/react-popover": "1.1.4",
  "lucide-react": "latest"
}
```

### 3. Shadcn/ui components (đã setup):
- `Button` - @/components/ui/button
- `Calendar` - @/components/ui/calendar (từ shadcn/ui)
- `Popover` - @/components/ui/popover
- `Select` - @/components/ui/select

---

## 🔧 Usage

### Basic Usage
```tsx
import { ModernDatePicker } from "@/components/ModernDatePicker"

export default function MyForm() {
  const [date, setDate] = useState("")

  return (
    <ModernDatePicker
      value={date}
      onChange={setDate}
      placeholder="Chọn ngày sinh của bạn"
    />
  )
}
```

### With Date Range Constraints
```tsx
<ModernDatePicker
  value={date}
  onChange={setDate}
  minDate={new Date(1900, 0, 1)}
  maxDate={new Date()}
  placeholder="Chọn ngày"
/>
```

---

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | "" | Giá trị ngày (YYYY-MM-DD) |
| `onChange` | (value: string) => void | required | Callback khi chọn ngày |
| `placeholder` | string | "Chọn ngày sinh của bạn" | Placeholder text |
| `minDate` | Date | Date(1900, 0, 1) | Ngày nhỏ nhất có thể chọn |
| `maxDate` | Date | Date() (hôm nay) | Ngày lớn nhất có thể chọn |

---

## 🎨 Current Implementation in AI Reading Form

### Location: `app/ai-reading/page.tsx`

```tsx
{currentQuestion.type === "date" && (
  <div className="animate-fadeIn">
    <ModernDatePicker
      value={answers[currentQuestion.id] || ""}
      onChange={(value) => handleAnswer(currentQuestion.id, value)}
      placeholder="Chọn ngày sinh của bạn"
      minDate={new Date(1900, 0, 1)}
      maxDate={new Date()}
    />
  </div>
)}
```

**Styling được tích hợp:**
- ✨ `animate-fadeIn` - Fade in khi hiển thị question
- 📐 Responsive design - Full-width on mobile
- 🎨 MẢNH brand colors (energy-gold focus border)
- ♿ Accessible - Semantic HTML

---

## ✨ Visual Breakdown

### 1. **Button Trigger**
```
┌─────────────────────────────────┐
│ 📅 Chọn ngày sinh của bạn       │  ← Placeholder
│     or 📅 15/05/1998             │  ← Selected date
└─────────────────────────────────┘
   (border-2 border-border → focus:border-energy-gold)
```

### 2. **Popover Content**
```
┌────────────────────────────────┐
│  [2024] [Tháng 5]    ← Dropdowns│
├────────────────────────────────┤
│  T2 T3 T4 T5 T6 T7 CN          │
│  1  2  3  4  5  6  7           │
│  8  9  10 11 12 13 14          │
│  15 16 17 18 19 20 21          │
│  22 23 24 25 26 27 28          │
│  29 30 31                       │
├────────────────────────────────┤
│ 📅 Ngày sinh: 15/05/1998        │  ← Confirmation
└────────────────────────────────┘
```

### 3. **Color Scheme**
- **Selected Date**: `bg-energy-gold text-white`
- **Today**: `bg-accent-cream text-healing-brown`
- **Hover**: `bg-accent-pink/30`
- **Disabled**: `opacity-30`

---

## 🔒 Age Validation

Mặc định, người dùng phải ≥ 18 tuổi:

```tsx
// Trong ModernDatePicker.tsx
const minAgeDate = new Date()
minAgeDate.setFullYear(minAgeDate.getFullYear() - 18)

const handleDateSelect = (date: Date | undefined) => {
  if (date) {
    // Check age...
    if (age >= 18) {
      onChange(dateString)
    } else {
      alert("Bạn cần đủ 18 tuổi để mua sản phẩm nhé 💫")
    }
  }
}
```

**Behavior:**
- ✅ Cho phép chọn ngày từ 18 năm trước về trước (hôm nay)
- ❌ Disable tất cả ngày từ 18 năm trước đến hôm nay (< 18 tuổi)
- 📢 Alert nếu user cố chọn ngày "dưới 18 tuổi"

---

## 📱 Mobile Experience

### Responsive Breakpoints
```css
/* Desktop */
@media (md) {
  Popover xuất hiện bên phải button
  Calendar đủ rộng để chọn dễ dàng
}

/* Mobile (< md) */
Popover xuất hiện full-width (align=center)
Calendar tối ưu cho finger touch
Dropdown thoải mái trượt cuộn
```

### Touch Optimization
- ✋ Large touch targets (36px minimum)
- 🎯 Dropdown scroll smooth
- 📍 Selected date clearly visible

---

## 🎯 Advanced Customization

### Change Age Requirement
```tsx
// Mở ModernDatePicker.tsx, tìm:
const minAgeDate = new Date()
minAgeDate.setFullYear(minAgeDate.getFullYear() - 18) // ← Đổi 18 thành 13, 21, etc.
```

### Change Helper Text
```tsx
// Tìm "Chúng tôi dùng thông tin này..."
<p className="text-sm text-foreground-secondary text-center">
  Chúng tôi dùng thông tin này để tính mệnh Ngũ Hành & chòm sao chính xác ✨
</p>
```

### Customize Calendar Colors
```tsx
// Tìm classNames prop trong Calendar component:
classNames={{
  day_selected: "bg-energy-gold text-white", // ← Đổi màu
  day_today: "bg-accent-cream text-healing-brown",
  // ... etc
}}
```

### Change Min/Max Date
```tsx
<ModernDatePicker
  minDate={new Date(1950, 0, 1)} // ← Từ 1950 thay 1900
  maxDate={new Date()} // ← Hoặc custom date
/>
```

---

## 🚨 Common Issues & Fixes

### Issue 1: Calendar không hiển thị
**Cause**: Popover component không render
**Fix**: Đảm bảo `@radix-ui/react-popover` đã cài
```bash
npm install @radix-ui/react-popover
```

### Issue 2: Ngày không chọn được
**Cause**: Age validation quá strict
**Fix**: Check minAgeDate calculation:
```tsx
console.log(minAgeDate) // Kiểm tra ngày giới hạn
```

### Issue 3: Mobile keyboard xuất hiện
**Cause**: Input focus
**Fix**: ModernDatePicker là readonly, không trigger keyboard

### Issue 4: Date format không đúng
**Cause**: Locale setting
**Fix**: Đảm bảo `import { vi } from "date-fns/locale"` đúng

---

## ♿ Accessibility

Component đã hỗ trợ:
- ✅ Semantic HTML (`<button>`, `<input>`)
- ✅ ARIA labels (`aria-label`, `aria-describedby`)
- ✅ Keyboard navigation (Tab, Enter, Arrow keys)
- ✅ Focus states (focus:outline-2)
- ✅ Color contrast (WCAG AA)
- ✅ Responsive text (16px minimum)

---

## 🔄 Integration Checklist

Khi thêm ModernDatePicker vào form:

- [ ] Import component: `import { ModernDatePicker } from "@/components/ModernDatePicker"`
- [ ] Replace old DatePicker with ModernDatePicker
- [ ] Test date selection (click → calendar → select date)
- [ ] Test age validation (try select < 18 years old)
- [ ] Test mobile (swipe year/month dropdown)
- [ ] Test form submission (date should be included)
- [ ] Verify date format saved (YYYY-MM-DD)
- [ ] Check styling (energy-gold focus, proper spacing)

---

## 📊 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full (iOS 13+) |
| IE 11 | ❌ Not supported |

---

## 🎓 Examples

### Example 1: Birthday Form
```tsx
const [birthday, setBirthday] = useState("")

return (
  <form onSubmit={(e) => {
    e.preventDefault()
    console.log("Birthday:", birthday) // "1998-05-15"
  }}>
    <label>Ngày sinh</label>
    <ModernDatePicker
      value={birthday}
      onChange={setBirthday}
      placeholder="Chọn ngày sinh"
    />
    <button type="submit">Submit</button>
  </form>
)
```

### Example 2: Date Range Query
```tsx
const [startDate, setStartDate] = useState("")
const [endDate, setEndDate] = useState("")

return (
  <>
    <ModernDatePicker
      value={startDate}
      onChange={setStartDate}
      maxDate={new Date(endDate)} // Không thể > endDate
      placeholder="Từ ngày"
    />
    <ModernDatePicker
      value={endDate}
      onChange={setEndDate}
      minDate={new Date(startDate)} // Không thể < startDate
      placeholder="Đến ngày"
    />
  </>
)
```

### Example 3: Conditional Rendering
```tsx
const [date, setDate] = useState("")
const age = calculateAge(date)

return (
  <>
    <ModernDatePicker value={date} onChange={setDate} />
    {age >= 18 && <p>✅ Bạn đủ tuổi!</p>}
    {age < 18 && <p>❌ Bạn cần đủ 18 tuổi</p>}
  </>
)
```

---

## 📞 Support

Nếu gặp issues:
1. Check console errors (`F12` → Console)
2. Verify imports are correct
3. Check date format is "YYYY-MM-DD"
4. Ensure date-fns locale is imported
5. Test in different browsers

---

## 🎉 Summary

ModernDatePicker giúp:
- ✨ Tăng UX với calendar popup
- 📉 Giảm lỗi input
- 📱 Tối ưu mobile
- ♿ Hỗ trợ accessibility
- 🎨 Giữ MẢNH brand aesthetic

Happy date picking! 📅✨
