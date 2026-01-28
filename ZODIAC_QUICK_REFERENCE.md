# Quick Reference: Zodiac & Stone System

## 🎯 Key Exports from zodiac-data.ts

### Constants
```typescript
export const ZODIAC_SIGNS          // 12 zodiac entries
export const ALLOWED_STONES        // 12 stone entries
export const ELEMENT_DISPLAY       // Element → "Mệnh Tương Sinh" mapping
export const ELEMENT_COLORS        // Element → UI color mapping
```

### Functions
```typescript
export function getZodiacByDate(day: number, month: number)
  // Returns zodiac sign for given date
  // Usage: getZodiacByDate(15, 5) → Kim Ngưu

export function getElementDisplay(element: string): string
  // Returns Vietnamese display for element
  // Usage: getElementDisplay("Hỏa") → "Mệnh Tương Sinh: Thổ..."

export function getStoneById(id: string)
  // Returns stone object by ID
  // Usage: getStoneById("citrine") → Stone object

export function getRandomAffirmation(emotionalState: string): string
  // Returns random affirmation for emotional state
  // Usage: getRandomAffirmation("căng thẳng") → Affirmation text
```

---

## 🔮 12 Zodiac Signs Quick Lookup

| Cung | Dates | Element | Birthstone | Tương Sinh |
|------|-------|---------|-----------|-----------|
| Bạch Dương | 3/21-4/19 | Hỏa | Citrine | Thổ |
| Kim Ngưu | 4/20-5/20 | Thổ | Rose Quartz | Kim |
| Song Tử | 5/21-6/20 | Khí | Citrine | Thủy |
| Cự Giải | 6/21-7/22 | Nước | Moonstone | Mộc |
| Sư Tử | 7/23-8/22 | Hỏa | Sunstone | Thổ |
| Xử Nữ | 8/23-9/22 | Thổ | Peridot | Kim |
| Thiên Bình | 9/23-10/22 | Khí | Clear Quartz | Thủy |
| Bọ Cạp | 10/23-11/21 | Nước | Amethyst | Mộc |
| Nhân Mã | 11/22-12/21 | Hỏa | Citrine | Thổ |
| Ma Kết | 12/22-1/19 | Thổ | Garnet | Kim |
| Bảo Bình | 1/20-2/18 | Khí | Amethyst | Thủy |
| Song Ngư | 2/19-3/20 | Nước | Aquamarine | Mộc |

---

## 💎 12 Allowed Stones Quick Lookup

| ID | Name (VN) | Color | Vibes | Best For |
|----|----|-------|-------|----------|
| citrine | Thạch Anh Vàng | #FFD700 | mạnh mẽ, tích cực | Tài lộc, thành công |
| clear-quartz | Thạch Anh Trắng | #FFFFFF | nhẹ nhàng, thanh lọc | Cân bằng, sáng suốt |
| amethyst | Thạch Anh Tím | #9966CC | nhẹ nhàng, bình an | Giảm stress, trực giác |
| fluorite | Fluorite | #8B7DBC | tập trung, bảo vệ | Tập trung, bảo vệ |
| moonstone | Đá Mặt Trăng | #F0E68C | nhẹ nhàng, nữ tính | Cảm xúc, trực giác |
| sunstone | Đá Mặt Trời | #FF8C00 | mạnh mẽ, vui vẻ | Tự tin, sinh lực |
| labradorite | Đá Labradorite | #A8DADC | bí ẩn, biến đổi | Thức tỉnh, bảo vệ |
| peridot | Peridot | #9ACD32 | chữa lành, thịnh vượng | Chữa lành, yên bình |
| aquamarine | Aquamarine | #7FFFD4 | bình tĩnh, giao tiếp | Bình tĩnh, giao tiếp |
| rose-quartz | Thạch Anh Hồng | #FFB6C1 | nhẹ nhàng, tình yêu | Tình yêu, tự yêu |
| garnet | Ngọc Hồng Lựu | #C71585 | mạnh mẽ, đam mê | Sức sống, quyết tâm |
| tiger-eye | Mắt Hổ | #C29B6F | mạnh mẽ, bảo vệ | Tự tin, bảo vệ |

---

## 🎭 Emotional State Keys for Affirmations

```
"can-thang"    # Căng thẳng (Stress)
"mong-lung"    # Mông lung (Confused)
"bat-an"       # Bất an (Anxious)
"nong-nay"     # Nóng nảy (Irritable)
"te-nhat"      # Tế nhị (Sensitive)
"vui-ve"       # Vui vẻ (Happy)
"lo-lang"      # Lo lắng (Worried)
"met-moi"      # Mệt mỏi (Tired)
"day-cam-xuc"  # Đầy cảm xúc (Emotional)
"dot-phat"     # Đột phát (Passionate)
"default"      # Default fallback
```

---

## 🌊 Elements & Tương Sinh

### Fire (Hỏa) → Earth (Thổ)
- Fire feeds Earth, creating stability

### Earth (Thổ) → Metal (Kim)
- Earth contains Metal, durability

### Air/Wind (Khí) → Water (Thủy)
- Air interacts with Water, flexibility

### Water (Nước) → Wood (Mộc)
- Water nourishes Wood, growth

---

## 📐 Color Preference Filtering

### Vietnamese Color Names
```
"vàng"    → [citrine, moonstone, sunstone]
"nóng"    → [citrine, sunstone, tiger-eye, garnet]
"tím"     → [amethyst, fluorite]
"hồng"    → [rose-quartz]
"xanh"    → [aquamarine, labradorite]
"xanh lá" → [peridot]
"đen"     → [] (no black stones)
"trắng"   → [clear-quartz]
```

---

## 🔧 Common Integration Patterns

### Pattern 1: Get User's Zodiac
```typescript
const [year, month, day] = userBirthDate.split("-").map(Number)
const zodiac = getZodiacByDate(day, month)
const elementDisplay = getElementDisplay(zodiac.element)
```

### Pattern 2: Select Healing Stone by Emotional State
```typescript
const emotionalState = userAnswers.emotionalState[0]
let healingStone

if (emotionalState.includes("stress")) {
  healingStone = ALLOWED_STONES.find(s => s.id === "amethyst")
} else if (emotionalState.includes("anxious")) {
  healingStone = ALLOWED_STONES.find(s => s.id === "fluorite")
}
// ... more conditions
```

### Pattern 3: Filter Out Forbidden Colors
```typescript
const forbiddenColors = userAnswers.colorPreference
const availableStones = ALLOWED_STONES.filter(stone => {
  return !forbiddenColors.some(color => {
    const stonesToAvoid = COLOR_FILTER_MAP[color] || []
    return stonesToAvoid.includes(stone.id)
  })
})
```

### Pattern 4: Generate Affirmation
```typescript
const emotionalState = userAnswers.emotionalState[0] || "default"
const affirmation = getRandomAffirmation(emotionalState)
```

---

## ✨ Display Examples

### Element Display (NOT Raw Element)
```
❌ WRONG: "Phần tử: Hỏa"
✅ RIGHT: "Mệnh Tương Sinh: Thổ (tăng cường ổn định & bền vững)"
```

### Stone Display
```
✅ "Thạch Anh Vàng (Citrine)"
✅ "Đá Mặt Trăng (Moonstone)"
✅ "Mắt Hổ (Tiger Eye)"
```

### Zodiac Display
```
✅ "Bạch Dương"
✅ "Kim Ngưu"
✅ "Song Ngư"
```

---

## 🐛 Common Issues & Solutions

### Issue: getRandomAffirmation returns undefined
**Solution**: Check emotional state key is lowercase and uses hyphens
```typescript
// ❌ WRONG
getRandomAffirmation("Căng Thẳng")

// ✅ CORRECT
getRandomAffirmation("căng-thẳng") // or "can-thang"
```

### Issue: Stone not found by ID
**Solution**: Check ID is lowercase with hyphens
```typescript
// ❌ WRONG
getStoneById("Rose Quartz")
getStoneById("rose_quartz")

// ✅ CORRECT
getStoneById("rose-quartz")
```

### Issue: Wrong zodiac returned for Dec 25
**Solution**: Use correct month number (12, not 0)
```typescript
// ❌ WRONG
getZodiacByDate(25, 0)  // January = 1, not 0

// ✅ CORRECT
getZodiacByDate(25, 12) // December = 12
```

---

## 📊 Migration Checklist

If updating from old system:

- [ ] Update all stone IDs to match new system
- [ ] Replace element raw names with `getElementDisplay()`
- [ ] Update affirmation keys to new lowercase-hyphenated format
- [ ] Test zodiac date calculation for Dec-Jan boundary
- [ ] Add color preference filtering to stone selection
- [ ] Update result page to show "Mệnh Tương Sinh" instead of raw element
- [ ] Verify no TypeScript errors in build

---

## 🎁 Complete Example Usage

```typescript
import { 
  getZodiacByDate, 
  getElementDisplay, 
  getStoneById,
  getRandomAffirmation,
  ALLOWED_STONES 
} from "@/lib/zodiac-data"

// User answers
const userBirthDate = "1998-05-15"
const emotionalState = "căng thẳng"
const colorPreference = ["vàng"]
const lifeGoal = "tài lộc"

// Parse date
const [year, month, day] = userBirthDate.split("-").map(Number)

// Get zodiac
const zodiac = getZodiacByDate(day, month)
// → Kim Ngưu (Thổ element)

// Get element display
const elementDisplay = getElementDisplay(zodiac.element)
// → "Mệnh Tương Sinh: Kim (tăng cường bền vững & thực tế)"

// Filter stones by color
const availableStones = ALLOWED_STONES.filter(s => {
  return !colorPreference.includes("vàng") || 
    !["citrine", "moonstone", "sunstone"].includes(s.id)
})

// Select main stone (for wealth goal)
const mainStone = availableStones.find(s => s.id === "citrine")
  || availableStones.find(s => s.vibes.includes("tích cực"))

// Get affirmation
const affirmation = getRandomAffirmation(emotionalState)
// → "Tôi buông bỏ căng thẳng và lắng nghe cơ thể mình."

// Display results
console.log(`${zodiac.name} (${elementDisplay})`)
console.log(`Main Stone: ${mainStone.name}`)
console.log(`Affirmation: "${affirmation}"`)
```

---

**Version**: 1.0 (2026-01-28)  
**Status**: ✅ Production Ready
