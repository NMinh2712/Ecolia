// SoulGem Zodiac & Elements System - Vietnamese Standard (Optimized)

// 12 chòm sao với element chuẩn ngũ hành
export const ZODIAC_SIGNS = [
  {
    id: "bach-duong",
    name: "Bạch Dương",
    startDate: { month: 3, day: 21 },
    endDate: { month: 4, day: 19 },
    element: "Hỏa",
    birthstone: "Thạch Anh Vàng (Citrine)",
    relatedElement: "Mệnh Tương Sinh: Thổ (tăng cường ổn định)",
  },
  {
    id: "kim-nguu",
    name: "Kim Ngưu",
    startDate: { month: 4, day: 20 },
    endDate: { month: 5, day: 20 },
    element: "Thổ",
    birthstone: "Thạch Anh Hồng (Rose Quartz)",
    relatedElement: "Mệnh Tương Sinh: Kim (tăng cường bền vững)",
  },
  {
    id: "song-tu",
    name: "Song Tử",
    startDate: { month: 5, day: 21 },
    endDate: { month: 6, day: 20 },
    element: "Khí",
    birthstone: "Thạch Anh Vàng (Citrine)",
    relatedElement: "Mệnh Tương Sinh: Thủy (tăng cường linh hoạt)",
  },
  {
    id: "cu-giai",
    name: "Cự Giải",
    startDate: { month: 6, day: 21 },
    endDate: { month: 7, day: 22 },
    element: "Nước",
    birthstone: "Đá Mặt Trăng (Moonstone)",
    relatedElement: "Mệnh Tương Sinh: Mộc (tăng cường cảm xúc sâu sắc)",
  },
  {
    id: "su-tu",
    name: "Sư Tử",
    startDate: { month: 7, day: 23 },
    endDate: { month: 8, day: 22 },
    element: "Hỏa",
    birthstone: "Đá Mặt Trời (Sunstone)",
    relatedElement: "Mệnh Tương Sinh: Thổ (tăng cường lãnh đạo ổn định)",
  },
  {
    id: "xu-nu",
    name: "Xử Nữ",
    startDate: { month: 8, day: 23 },
    endDate: { month: 9, day: 22 },
    element: "Thổ",
    birthstone: "Peridot",
    relatedElement: "Mệnh Tương Sinh: Kim (tăng cường chi tiết & bền vững)",
  },
  {
    id: "thien-binh",
    name: "Thiên Bình",
    startDate: { month: 9, day: 23 },
    endDate: { month: 10, day: 22 },
    element: "Khí",
    birthstone: "Thạch Anh Trắng (Clear Quartz)",
    relatedElement: "Mệnh Tương Sinh: Thủy (tăng cường cân bằng cảm xúc)",
  },
  {
    id: "bo-cap",
    name: "Bọ Cạp",
    startDate: { month: 10, day: 23 },
    endDate: { month: 11, day: 21 },
    element: "Nước",
    birthstone: "Thạch Anh Tím (Amethyst)",
    relatedElement: "Mệnh Tương Sinh: Mộc (tăng cường sâu sắc & biến đổi)",
  },
  {
    id: "nhan-ma",
    name: "Nhân Mã",
    startDate: { month: 11, day: 22 },
    endDate: { month: 12, day: 21 },
    element: "Hỏa",
    birthstone: "Thạch Anh Vàng (Citrine)",
    relatedElement: "Mệnh Tương Sinh: Thổ (tăng cường khám phá ổn định)",
  },
  {
    id: "ma-ket",
    name: "Ma Kết",
    startDate: { month: 12, day: 22 },
    endDate: { month: 1, day: 19 },
    element: "Thổ",
    birthstone: "Ngọc Hồng Lựu (Garnet)",
    relatedElement: "Mệnh Tương Sinh: Kim (tăng cường tham vọng bền vững)",
  },
  {
    id: "bao-binh",
    name: "Bảo Bình",
    startDate: { month: 1, day: 20 },
    endDate: { month: 2, day: 18 },
    element: "Khí",
    birthstone: "Thạch Anh Tím (Amethyst)",
    relatedElement: "Mệnh Tương Sinh: Thủy (tăng cường sáng tạo cảm xúc)",
  },
  {
    id: "song-ngu",
    name: "Song Ngư",
    startDate: { month: 2, day: 19 },
    endDate: { month: 3, day: 20 },
    element: "Nước",
    birthstone: "Aquamarine",
    relatedElement: "Mệnh Tương Sinh: Mộc (tăng cường trực giác sâu sắc)",
  },
]

// Element to "Mệnh Tương Sinh" display mapping (Vietnamese display names)
export const ELEMENT_DISPLAY: Record<string, string> = {
  Hỏa: "Mệnh Tương Sinh: Thổ (tăng cường ổn định & bền vững)",
  Thổ: "Mệnh Tương Sinh: Kim (tăng cường bền vững & thực tế)",
  Khí: "Mệnh Tương Sinh: Thủy (tăng cường linh hoạt & cảm xúc)",
  Nước: "Mệnh Tương Sinh: Mộc (tăng cường sâu sắc & trực giác)",
}

// Element to color mapping (for UI)
export const ELEMENT_COLORS: Record<string, string> = {
  Hỏa: "#FF6B6B", // Red - Fire
  Thổ: "#D4A574", // Brown - Earth
  Khí: "#B19CD9", // Purple - Air
  Nước: "#4ECDC4", // Teal - Water
}

// 11 loại đá duy nhất được phép (optimized)
// ALLOWED_STONES - Chỉ sử dụng đúng 11 loại đá được phép
// 1. Citrine 2. Clear Quartz 3. Amethyst 4. Fluorite 5. Moonstone
// 6. Sunstone 7. Labradorite 8. Peridot 9. Aquamarine 10. Rose Quartz 11. Garnet
export const ALLOWED_STONES = [
  {
    id: "citrine",
    name: "Thạch Anh Vàng (Citrine)",
    color: "#FFD700", // Vàng rực rỡ
    vibes: ["mạnh mẽ", "tích cực", "thịnh vượng"],
    meaning: "Thu hút tài lộc, năng lượng tích cực, thành công, tự tin",
  },
  {
    id: "clear-quartz",
    name: "Thạch Anh Trắng (Clear Quartz)",
    color: "#FFFFFF", // Trắng trong suốt
    vibes: ["nhẹ nhàng", "thanh lọc", "cân bằng"],
    meaning: "Khuếch đại năng lượng, thanh tịnh, làm rõ ý định, cân bằng tổng thể",
  },
  {
    id: "amethyst",
    name: "Thạch Anh Tím (Amethyst)",
    color: "#9966CC", // Tím đậm
    vibes: ["nhẹ nhàng", "bình an", "trực giác"],
    meaning: "Giảm stress, tăng trực giác, bảo vệ tâm trí, mang lại bình yên sâu lắng",
  },
  {
    id: "fluorite",
    name: "Fluorite",
    color: "#8B7DBC", // Tím/xanh nhạt đa sắc
    vibes: ["tập trung", "bảo vệ", "sáng suốt"],
    meaning: "Tăng tập trung, bảo vệ cảm xúc, giúp suy nghĩ rõ ràng, loại bỏ năng lượng tiêu cực",
  },
  {
    id: "moonstone",
    name: "Đá Mặt Trăng (Moonstone)",
    color: "#F0E68C", // Trắng ánh xanh
    vibes: ["nhẹ nhàng", "nữ tính", "cảm xúc"],
    meaning: "Cân bằng cảm xúc, tăng trực giác, nuôi dưỡng nữ tính, hỗ trợ giấc ngủ sâu",
  },
  {
    id: "sunstone",
    name: "Đá Mặt Trời (Sunstone)",
    color: "#FF8C00", // Cam ánh kim
    vibes: ["mạnh mẽ", "vui vẻ", "tự tin"],
    meaning: "Tăng sinh lực, vui vẻ, tự tin, kết nối với năng lượng mặt trời tích cực",
  },
  {
    id: "labradorite",
    name: "Đá Labradorite (Đá Hắc Nguyệt Quang)",
    color: "#A8DADC", // Xám ánh xanh/tím
    vibes: ["bí ẩn", "biến đổi", "bảo vệ"],
    meaning: "Thức tỉnh tiềm năng, bảo vệ aura, hỗ trợ thay đổi tích cực, tăng sáng tạo",
  },
  {
    id: "peridot",
    name: "Peridot",
    color: "#9ACD32", // Xanh lá nhạt
    vibes: ["chữa lành", "thịnh vượng", "tái sinh"],
    meaning: "Chữa lành tim, thu hút thịnh vượng, buông bỏ gánh nặng, tái sinh năng lượng",
  },
  {
    id: "aquamarine",
    name: "Aquamarine",
    color: "#7FFFD4", // Xanh dương nhạt
    vibes: ["bình tĩnh", "giao tiếp", "thanh tịnh"],
    meaning: "Mang lại bình tĩnh, hỗ trợ giao tiếp chân thành, thanh lọc cảm xúc",
  },
  {
    id: "rose-quartz",
    name: "Thạch Anh Hồng (Rose Quartz)",
    color: "#FFB6C1", // Hồng nhạt
    vibes: ["nhẹ nhàng", "tình yêu", "chữa lành"],
    meaning: "Tự yêu bản thân, mở lòng đón tình yêu, chữa lành vết thương tình cảm",
  },
  {
    id: "garnet",
    name: "Ngọc Hồng Lựu (Garnet)",
    color: "#C71585", // Đỏ đậm
    vibes: ["mạnh mẽ", "đam mê", "grounding"],
    meaning: "Tăng sức sống, đam mê, grounding năng lượng, bảo vệ và kích hoạt ý chí",
  },
];

// Function to get element display name (Mệnh Tương Sinh)
export function getElementDisplay(element: string): string {
  return ELEMENT_DISPLAY[element] || "Mệnh Tương Sinh: Cân bằng ngũ hành"
}

// Function to get zodiac by birth date
export function getZodiacByDate(day: number, month: number) {
  const zodiac = ZODIAC_SIGNS.find((sign) => {
    const startDate = sign.startDate
    const endDate = sign.endDate

    if (startDate.month === endDate.month) {
      // Zodiac doesn't cross year boundary
      return month === startDate.month && day >= startDate.day && day <= endDate.day
    } else if (startDate.month < endDate.month) {
      // Zodiac within same year
      if (month === startDate.month) return day >= startDate.day
      if (month === endDate.month) return day <= endDate.day
      if (month > startDate.month && month < endDate.month) return true
      return false
    } else {
      // Zodiac crosses year boundary (e.g., Ma Kết: 12/22 - 1/19)
      if (month === startDate.month) return day >= startDate.day
      if (month === endDate.month) return day <= endDate.day
      if (month > startDate.month || month < endDate.month) return true
      return false
    }
  })

  return zodiac || ZODIAC_SIGNS[0] // Default to Bạch Dương
}

// Function to get stone by ID
export function getStoneById(id: string) {
  return ALLOWED_STONES.find((stone) => stone.id === id)
}

// Function to get random affirmation based on emotional state
const AFFIRMATIONS: Record<string, string[]> = {
  "can-thang": [
    "Tôi buông bỏ căng thẳng và lắng nghe cơ thể mình.",
    "Bình yên xuất phát từ việc thả lỏng, từ từ dần.",
    "Tôi xứng đáng được yên tĩnh và chữa lành.",
  ],
  "mong-lung": [
    "Tôi tin rằng phương hướng sẽ hiện diện khi tôi sẵn sàng.",
    "Mỗi bước nhỏ đều dẫn tôi về đúng hướng.",
    "Sự rõ ràng đến từ sự tĩnh lặng nội tâm.",
  ],
  "bat-an": [
    "Tôi an toàn, được bảo vệ và yên bình.",
    "Nỗi sợ chỉ là ảo ảnh, tôi mạnh mẽ hơn.",
    "Tôi chọn tin tưởng và buông bỏ lo lắng.",
  ],
  "nong-nay": [
    "Tôi lựa chọn bình tĩnh trước những khó khăn.",
    "Sự kiên nhẫn sẽ dẫn tôi đến thắng lợi.",
    "Tôi kiểm soát được cảm xúc của chính mình.",
  ],
  "te-nhat": [
    "Tôi mở ra để tiếp nhận những điều tuyệt vời.",
    "Sự phát triển bắt đầu từ sự dám bước ra khỏi vùng thoải mái.",
    "Tôi là đồng tác giả của những lựa chọn sáng suốt.",
  ],
  "vui-ve": [
    "Tôi lan tỏa sự vui vẻ và tích cực xung quanh mình.",
    "Lòng biết ơn làm tôi ngàn lần hạnh phúc hơn.",
    "Tôi lựa chọn hạnh phúc mỗi ngày.",
  ],
  "lo-lang": [
    "Tôi chọn tin tưởng vào bản thân và hành trình của mình.",
    "Mỗi lo lắng là cơ hội để học cách yêu thương bản thân.",
    "Tôi đủ mạnh mẽ để vượt qua bất kỳ thách thức nào.",
  ],
  "met-moi": [
    "Tôi cho phép bản thân nghỉ ngơi và khôi phục.",
    "Năng lượng của tôi được phục hồi mỗi ngày.",
    "Tôi xứng đáng được yên bình và chữa lành.",
  ],
  "day-cam-xuc": [
    "Cảm xúc của tôi là những thông điệp quý báu.",
    "Tôi lắng nghe cơ thể và tâm hồn mình với sự từ bi.",
    "Tôi cân bằng cảm xúc và hành động với sự khôn ngoan.",
  ],
  "dot-phat": [
    "Tôi khai thác tối đa tiềm năng của bản thân.",
    "Động lực và kỳ vọng lớn của tôi là sức mạnh tôi cần.",
    "Tôi thực hiện những điều tuyệt vời với đam mê và quyết tâm.",
  ],
  "default": [
    "Tôi tin tưởng vào hành trình của mình.",
    "Mọi thứ đang diễn ra đúng cách.",
    "Tôi xứng đáng được hạnh phúc và thịnh vượng.",
    "Mỗi ngày là cơ hội mới để tôi phát triển.",
    "Tôi là ánh sáng trong đời mình và trong đời người khác.",
  ],
}

export function getRandomAffirmation(emotionalState: string): string {
  const stateKey = emotionalState.toLowerCase().replace(/\s+/g, "-")
  const affirmations = AFFIRMATIONS[stateKey] || AFFIRMATIONS["default"]
  return affirmations[Math.floor(Math.random() * affirmations.length)]
}
