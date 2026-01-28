// Integration Template: analyzeEnergy with Stone Filtering
// File: lib/ai-rules.ts or lib/get-bracelet-recommendation.ts

import { getZodiacByDate, getElementDisplay, ALLOWED_STONES, getRandomAffirmation } from "./zodiac-data"

interface UserAnswers {
  birthDate: string // "YYYY-MM-DD"
  zodiacSign: string // cumHoangDao
  gender: string // gioiTinh
  element: string // phanTu
  emotionalState: string[] // trangThaiTinhThan (array)
  lifeGoal: string[] // suMenh (array)
  energyVibe: string // vibeNangLuong
  style: string // phongCach
  colorPreference: string[] // mauKhongMuon (avoid colors)
  wristSize: number // coTayCm
  budget: number // nganSach
}

// Color mapping for filtering (Vietnamese color names)
const COLOR_FILTER_MAP: Record<string, string[]> = {
  "vàng": ["citrine", "moonstone", "sunstone"],
  "nóng": ["citrine", "sunstone", "garnet"],
  "tím": ["amethyst", "fluorite"],
  "hồng": ["rose-quartz"],
  "xanh": ["aquamarine", "labradorite"],
  "xanh lá": ["peridot"],
  "đen": [], // No black stones in list
  "trang": ["clear-quartz"],
}

/**
 * Filter available stones based on user's color preferences (to avoid)
 * @param forbiddenColors - Array of color preferences user wants to avoid
 * @returns Filtered list of stones
 */
function filterStonesByColor(forbiddenColors: string[]): typeof ALLOWED_STONES {
  if (!forbiddenColors || forbiddenColors.length === 0) {
    return ALLOWED_STONES
  }

  const forbiddenStoneIds = new Set<string>()

  // Collect all stone IDs to avoid
  forbiddenColors.forEach((color) => {
    const lowerColor = color.toLowerCase().trim()
    const stonesToAvoid = COLOR_FILTER_MAP[lowerColor] || []
    stonesToAvoid.forEach((id) => forbiddenStoneIds.add(id))
  })

  // Return only allowed stones
  return ALLOWED_STONES.filter((stone) => !forbiddenStoneIds.has(stone.id))
}

/**
 * Analyze user energy and recommend bracelet composition
 * @param userAnswers - User's form answers
 * @returns Zodiac info, selected stones, and reading card
 */
export function analyzeEnergy(userAnswers: UserAnswers) {
  // Parse birth date
  const [year, month, day] = userAnswers.birthDate.split("-").map(Number)
  const zodiac = getZodiacByDate(day, month)
  const elementDisplay = getElementDisplay(zodiac.element)

  // Filter stones by color preference
  const availableStones = filterStonesByColor(userAnswers.colorPreference)

  // Initialize stone selection
  const selectedStones: Array<{
    stone: (typeof ALLOWED_STONES)[0]
    role: "main" | "healing" | "boost" | "theme"
    reason: string
  }> = []

  // MAIN STONE: Based on life goal
  let mainStone = null
  if (userAnswers.lifeGoal?.includes("wealth") || userAnswers.lifeGoal?.includes("tài lộc")) {
    // Prefer Citrine for wealth
    mainStone =
      availableStones.find((s) => s.id === "citrine") || availableStones.find((s) => s.vibes.includes("tích cực"))
  } else if (userAnswers.lifeGoal?.includes("love") || userAnswers.lifeGoal?.includes("tình yêu")) {
    // Prefer Rose Quartz for love
    mainStone =
      availableStones.find((s) => s.id === "rose-quartz") || availableStones.find((s) => s.vibes.includes("tình yêu"))
  } else if (userAnswers.lifeGoal?.includes("health") || userAnswers.lifeGoal?.includes("sức khỏe")) {
    // Prefer Clear Quartz for health/balance
    mainStone =
      availableStones.find((s) => s.id === "clear-quartz") || availableStones.find((s) => s.vibes.includes("thanh lọc"))
  } else if (userAnswers.lifeGoal?.includes("growth") || userAnswers.lifeGoal?.includes("phát triển")) {
    // Prefer Amethyst for growth/wisdom
    mainStone =
      availableStones.find((s) => s.id === "amethyst") || availableStones.find((s) => s.vibes.includes("nhẹ nhàng"))
  } else {
    // Default: Zodiac birthstone or first available
    mainStone = availableStones[Math.floor(Math.random() * availableStones.length)]
  }

  if (mainStone) {
    selectedStones.push({
      stone: mainStone,
      role: "main",
      reason: `Đá chính cho mục tiêu sống của bạn (${userAnswers.lifeGoal?.join(", ") || "cân bằng"})`,
    })
  }

  // HEALING STONE: Based on emotional state
  let healingStone = null
  if (userAnswers.emotionalState?.includes("stress") || userAnswers.emotionalState?.includes("căng thẳng")) {
    healingStone =
      availableStones.find((s) => s.id === "amethyst") || availableStones.find((s) => s.vibes.includes("bình an"))
  } else if (userAnswers.emotionalState?.includes("anxious") || userAnswers.emotionalState?.includes("lo lắng")) {
    healingStone =
      availableStones.find((s) => s.id === "fluorite") || availableStones.find((s) => s.vibes.includes("bảo vệ"))
  } else if (userAnswers.emotionalState?.includes("sad") || userAnswers.emotionalState?.includes("buồn")) {
    healingStone =
      availableStones.find((s) => s.id === "rose-quartz") || availableStones.find((s) => s.vibes.includes("tình yêu"))
  } else if (userAnswers.emotionalState?.includes("tired") || userAnswers.emotionalState?.includes("mệt mỏi")) {
    healingStone =
      availableStones.find((s) => s.id === "citrine") || availableStones.find((s) => s.vibes.includes("tích cực"))
  } else {
    // Default healing: Choose one that's different from main stone
    healingStone = availableStones.find((s) => s.id !== mainStone?.id) || availableStones[1]
  }

  if (healingStone && healingStone.id !== mainStone?.id) {
    selectedStones.push({
      stone: healingStone,
      role: "healing",
      reason: `Đá chữa lành cho tâm trạng (${userAnswers.emotionalState?.join(", ") || "cân bằng"})`,
    })
  }

  // BOOST STONE: Based on energy vibe
  let boostStone = null
  if (userAnswers.energyVibe.includes("calm") || userAnswers.energyVibe.includes("bình tĩnh")) {
    boostStone =
      availableStones.find((s) => s.id === "aquamarine") ||
      availableStones.find((s) => s.vibes.includes("bình tĩnh"))
  } else if (userAnswers.energyVibe.includes("strong") || userAnswers.energyVibe.includes("mạnh mẽ")) {
    boostStone =
      availableStones.find((s) => s.id === "garnet") || availableStones.find((s) => s.vibes.includes("mạnh mẽ"))
  } else if (userAnswers.energyVibe.includes("light") || userAnswers.energyVibe.includes("nhẹ nhàng")) {
    boostStone =
      availableStones.find((s) => s.id === "moonstone") || availableStones.find((s) => s.vibes.includes("nhẹ nhàng"))
  } else {
    // Default: Pick different from main + healing
    boostStone = availableStones.find((s) => s.id !== mainStone?.id && s.id !== healingStone?.id) || availableStones[2]
  }

  if (boostStone && boostStone.id !== mainStone?.id && boostStone.id !== healingStone?.id) {
    selectedStones.push({
      stone: boostStone,
      role: "boost",
      reason: `Đá tăng cường năng lượng ${userAnswers.energyVibe}`,
    })
  }

  // THEME STONE: Based on style preference
  let themeStone = null
  if (userAnswers.style.includes("elegant") || userAnswers.style.includes("thanh lịch")) {
    themeStone =
      availableStones.find((s) => s.id === "labradorite") ||
      availableStones.find((s) => s.vibes.includes("bí ẩn"))
  } else if (userAnswers.style.includes("vibrant") || userAnswers.style.includes("sôi động")) {
    themeStone =
      availableStones.find((s) => s.id === "sunstone") || availableStones.find((s) => s.vibes.includes("vui vẻ"))
  } else if (userAnswers.style.includes("minimalist") || userAnswers.style.includes("tối giản")) {
    themeStone = availableStones.find((s) => s.id === "clear-quartz") || availableStones.find((s) => s.color === "#FFFFFF")
  } else {
    // Default theme: Peridot for harmony
    themeStone = availableStones.find((s) => s.id === "peridot") || availableStones[3]
  }

  if (themeStone && ![mainStone?.id, healingStone?.id, boostStone?.id].includes(themeStone.id)) {
    selectedStones.push({
      stone: themeStone,
      role: "theme",
      reason: `Đá chủ đề theo phong cách ${userAnswers.style}`,
    })
  }

  // Calculate bracelet composition
  const mainToHealing = 2 // Ratio of main to supporting stones
  const estimatedBeads = Math.ceil((userAnswers.wristSize * 10) / 8) // Rough estimate: 8mm beads
  const mainStoneCount = Math.max(2, Math.ceil(estimatedBeads / (mainToHealing + selectedStones.length - 1)))

  // Build affirmation
  const affirmation = getRandomAffirmation(userAnswers.emotionalState?.[0] || "default")

  // Return recommendation object
  return {
    zodiacInfo: {
      name: zodiac.name,
      element: elementDisplay, // Display "Mệnh Tương Sinh: ..." instead of raw element
      birthstone: zodiac.birthstone,
    },
    selectedStones: selectedStones.map((s) => ({
      tenDa: s.stone.name,
      mauSac: s.stone.color,
      yNghia: s.stone.meaning,
      vaiTro: s.role,
      lyDo: s.reason,
    })),
    vongTayDeXuat: {
      tenVong: `Vòng Tay ${zodiac.name} - ${userAnswers.style}`,
      vibe: userAnswers.energyVibe,
      phongCach: userAnswers.style,
      coTayCm: userAnswers.wristSize,
      nganSach: userAnswers.budget,
      kichThuocHatMm: 8, // Standard 8mm beads
      soHatDuKien: `${estimatedBeads} hạt`,
      bangDa: selectedStones.map((s) => ({
        vaiTro: s.role,
        tenDa: s.stone.name,
        mauSac: s.stone.color,
        yNghia: s.stone.meaning,
      })),
      charmGoiY: [
        {
          tenCharm: `Charm ${zodiac.name}`,
          yNghia: `Biểu tượng của cung hoàng đạo ${zodiac.name}`,
        },
      ],
      layoutDeXuat: `${mainStone?.name} (${mainStoneCount} hạt) làm trung tâm, xen kẽ với ${healingStone?.name} và ${boostStone?.name}`,
      mauChuDao: selectedStones.slice(0, 3).map((s) => s.stone.color),
      negativeFiltersApplied: userAnswers.colorPreference || [],
      lyDoChon: selectedStones.map((s) => s.reason),
    },
    readingCard: {
      tieuDe: `Lời nhắn từ ${zodiac.name}`,
      thongDiepChinh: `Hành trình của bạn gắn liền với sự ${userAnswers.energyVibe}`,
      giaiThichNgan: [
        `Cung ${zodiac.name} (mệnh ${zodiac.element}) mang đặc điểm của sức sáng tạo và sự biến đổi.`,
        elementDisplay,
        `Những viên đá trong vòng tay này sẽ giúp bạn khai thác tối đa tiềm năng và bảo vệ năng lượng của mình.`,
      ],
      affirmation: {
        text: affirmation,
        autoGenerated: true,
      },
    },
  }
}

/**
 * Example Usage:
 *
 * const userAnswers: UserAnswers = {
 *   birthDate: "1998-05-15",
 *   zodiacSign: "kim-nguu",
 *   gender: "nữ",
 *   element: "thổ",
 *   emotionalState: ["căng thẳng", "lo lắng"],
 *   lifeGoal: ["tình yêu", "bình yên"],
 *   energyVibe: "nhẹ nhàng",
 *   style: "thanh lịch",
 *   colorPreference: ["vàng", "nóng"], // Avoid warm colors
 *   wristSize: 16,
 *   budget: 800000,
 * }
 *
 * const recommendation = analyzeEnergy(userAnswers)
 * console.log(recommendation)
 */
