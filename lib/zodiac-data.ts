// SoulGem Zodiac & Elements System - Vietnamese Standard

export const ZODIAC_SIGNS = [
  {
    id: "bach-duong",
    name: "Bạch Dương",
    startDate: { month: 3, day: 21 },
    endDate: { month: 4, day: 19 },
    element: "Hỏa",
    birthstone: "Mắt Hổ",
  },
  {
    id: "kim-nguu",
    name: "Kim Ngưu",
    startDate: { month: 4, day: 20 },
    endDate: { month: 5, day: 20 },
    element: "Thổ",
    birthstone: "Thạch Anh Hồng",
  },
  {
    id: "song-tu",
    name: "Song Tử",
    startDate: { month: 5, day: 21 },
    endDate: { month: 6, day: 20 },
    element: "Khí",
    birthstone: "Thạch Anh Vàng",
  },
  {
    id: "cu-giai",
    name: "Cự Giải",
    startDate: { month: 6, day: 21 },
    endDate: { month: 7, day: 22 },
    element: "Nước",
    birthstone: "Đá Mặt Trăng",
  },
  {
    id: "su-tu",
    name: "Sư Tử",
    startDate: { month: 7, day: 23 },
    endDate: { month: 8, day: 22 },
    element: "Hỏa",
    birthstone: "Đá Mặt Trời",
  },
  {
    id: "xu-nu",
    name: "Xử Nữ",
    startDate: { month: 8, day: 23 },
    endDate: { month: 9, day: 22 },
    element: "Thổ",
    birthstone: "Sapphire Xanh",
  },
  {
    id: "thien-binh",
    name: "Thiên Bình",
    startDate: { month: 9, day: 23 },
    endDate: { month: 10, day: 22 },
    element: "Khí",
    birthstone: "Opal",
  },
  {
    id: "bo-cap",
    name: "Bọ Cạp",
    startDate: { month: 10, day: 23 },
    endDate: { month: 11, day: 21 },
    element: "Nước",
    birthstone: "Topaz",
  },
  {
    id: "nhan-ma",
    name: "Nhân Mã",
    startDate: { month: 11, day: 22 },
    endDate: { month: 12, day: 21 },
    element: "Hỏa",
    birthstone: "Turquoise",
  },
  {
    id: "ma-ket",
    name: "Ma Kết",
    startDate: { month: 12, day: 22 },
    endDate: { month: 1, day: 19 },
    element: "Thổ",
    birthstone: "Garnet",
  },
  {
    id: "bao-binh",
    name: "Bảo Bình",
    startDate: { month: 1, day: 20 },
    endDate: { month: 2, day: 18 },
    element: "Khí",
    birthstone: "Thạch Anh Tím",
  },
  {
    id: "song-ngu",
    name: "Song Ngư",
    startDate: { month: 2, day: 19 },
    endDate: { month: 3, day: 20 },
    element: "Nước",
    birthstone: "Aquamarine",
  },
]

// Element to color mapping
export const ELEMENT_COLORS: Record<string, string> = {
  Hỏa: "#FF6B6B", // Red - Fire
  Thủy: "#4ECDC4", // Teal - Water
  Mộc: "#95E1D3", // Green - Wood
  Thổ: "#D4A574", // Brown - Earth
  Kim: "#C0C0C0", // Silver - Metal
  Khí: "#B19CD9", // Purple - Air
  Nước: "#4ECDC4", // Teal - Water
}

// Stones database - only allowed stones
export const ALLOWED_STONES = [
  {
    id: "thach-anh-trang",
    name: "Thạch Anh Trắng",
    color: "#FFFFFF",
    vibes: ["mạnh mẽ", "nhẹ nhàng"],
    meaning: "Sạch sẽ, thanh tịnh, tăng cường năng lượng",
  },
  {
    id: "thach-anh-tim",
    name: "Thạch Anh Tím",
    color: "#9966CC",
    vibes: ["nhẹ nhàng", "bí ẩn"],
    meaning: "Bình yên, tĩnh lặng, trí tuệ",
  },
  {
    id: "mat-ho",
    name: "Mắt Hổ",
    color: "#C29B6F",
    vibes: ["mạnh mẽ"],
    meaning: "Bảo vệ, tự tin, quyết đoán",
  },
  {
    id: "thach-anh-vang",
    name: "Thạch Anh Vàng",
    color: "#FFD700",
    vibes: ["mạnh mẽ", "nhẹ nhàng"],
    meaning: "Tài lộc, thành công, tích cực",
  },
  {
    id: "thach-anh-hong",
    name: "Thạch Anh Hồng",
    color: "#FFB6C1",
    vibes: ["nhẹ nhàng", "bí ẩn"],
    meaning: "Tình yêu, cảm xúc, bình yên",
  },
  {
    id: "da-mat-trang",
    name: "Đá Mặt Trăng",
    color: "#F0E68C",
    vibes: ["nhẹ nhàng", "bí ẩn"],
    meaning: "Trực giác, tâm linh, nữ tính",
  },
  {
    id: "aquamarine",
    name: "Aquamarine",
    color: "#7FFFD4",
    vibes: ["nhẹ nhàng", "bí ẩn"],
    meaning: "Bình tĩnh, giao tiếp, sự thật",
  },
  {
    id: "fluorite",
    name: "Fluorite",
    color: "#8B7DBC",
    vibes: ["nhẹ nhàng", "mạnh mẽ"],
    meaning: "Sáng suốt, cân bằng, bảo vệ",
  },
  {
    id: "thach-anh-xanh",
    name: "Thạch Anh Xanh",
    color: "#00CED1",
    vibes: ["nhẹ nhàng", "mạnh mẽ"],
    meaning: "Chữa lành, yên bình, phục hồi",
  },
  {
    id: "obsidian-den",
    name: "Obsidian Đen",
    color: "#000000",
    vibes: ["mạnh mẽ"],
    meaning: "Bảo vệ, an toàn, buông bỏ",
  },
  {
    id: "da-mat-troi",
    name: "Đá Mặt Trời",
    color: "#FF8C00",
    vibes: ["mạnh mẽ"],
    meaning: "Sắc bén, tích cực, sinh lực",
  },
]

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
const AFFIRMATIONS = {
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
}

export function getRandomAffirmation(emotionalState: string): string {
  const stateKey = emotionalState.toLowerCase().replace(/\s+/g, "-")
  const affirmations = AFFIRMATIONS[stateKey as keyof typeof AFFIRMATIONS] || AFFIRMATIONS["vui-ve"]
  return affirmations[Math.floor(Math.random() * affirmations.length)]
}
