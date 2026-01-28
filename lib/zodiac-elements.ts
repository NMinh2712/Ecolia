// Zodiac and Birthstone Data
export const zodiacSigns = [
  { name: "Kim Ngưu", months: [4, 5], element: "Thổ", mainStone: "Ngọc Lục Bảo", color: "#50C878" },
  { name: "Song Tử", months: [5, 6], element: "Khí", mainStone: "Thạch Anh Vàng", color: "#FFD700" },
  { name: "Cự Giải", months: [6, 7], element: "Nước", mainStone: "Ngọc Xà Cừ", color: "#E75480" },
  { name: "Sư Tử", months: [7, 8], element: "Hỏa", mainStone: "Peridot", color: "#FFA500" },
  { name: "Xử Nữ", months: [8, 9], element: "Thổ", mainStone: "Sapphire Xanh", color: "#0F52BA" },
  { name: "Thiên Bình", months: [9, 10], element: "Khí", mainStone: "Opal", color: "#D3D3D3" },
  { name: "Bò Cạp", months: [10, 11], element: "Nước", mainStone: "Topaz", color: "#FF6347" },
  { name: "Nhân Mã", months: [11, 12], element: "Hỏa", mainStone: "Turquoise", color: "#40E0D0" },
  { name: "Ma Kết", months: [12, 1], element: "Thổ", mainStone: "Garnet", color: "#800020" },
  { name: "Bình Bô", months: [1, 2], element: "Khí", mainStone: "Amethyst", color: "#9966CC" },
  { name: "Song Cá", months: [2, 3], element: "Nước", mainStone: "Aquamarine", color: "#7FFFD4" },
  { name: "Bạch Dương", months: [3, 4], element: "Hỏa", mainStone: "Mặt Trăng Đá", color: "#F0E68C" },
]

export interface Zodiac {
  name: string
  months: number[]
  element: string
  mainStone: string
  color: string
}

export function getZodiacByDate(day: number, month: number): Zodiac {
  return zodiacSigns.find((z) => {
    if (z.months.length === 2) {
      const [m1, m2] = z.months
      if (m1 < m2) {
        return month === m1 || (month === m2 && day < 21)
      } else {
        return month === m1 || (month === m2 && day < 20)
      }
    }
    return false
  }) || zodiacSigns[0]
}

// Five Elements (Ngũ Hành)
export const fiveElements = {
  hoa: { name: "Hỏa (Lửa)", value: "hoa", supportColors: ["#FF6347", "#FFD700", "#FFA500"] },
  thuy: { name: "Thủy (Nước)", value: "thuy", supportColors: ["#00CED1", "#4169E1", "#1E90FF"] },
  moc: { name: "Mộc (Gỗ/Cây)", value: "moc", supportColors: ["#228B22", "#50C878", "#90EE90"] },
  tho: { name: "Thổ (Đất)", value: "tho", supportColors: ["#D2B48C", "#CD853F", "#8B4513"] },
  kim: { name: "Kim (Kim loại)", value: "kim", supportColors: ["#C0C0C0", "#FFD700", "#D3D3D3"] },
}

// Emotional Needs & Stone Recommendations (Cập nhật cho 11 đá)
export const emotionalNeeds = {
  stress: {
    label: "Căng thẳng, Kiệt sức",
    value: "stress",
    stones: ["Thạch Anh Tím (Amethyst)", "Aquamarine"],
    advice: "Bạn cần năng lượng bình yên để phục hồi sức sống.",
  },
  lost: {
    label: "Mông lung, Thiếu định hướng",
    value: "lost",
    stones: ["Đá Labradorite (Đá Hắc Nguyệt Quang)", "Thạch Anh Vàng (Citrine)"],
    advice: "Bạn cần rõ ràng và sự định hướng trong cuộc sống.",
  },
  anxious: {
    label: "Bất an, Khó ngủ",
    value: "anxious",
    stones: ["Aquamarine", "Đá Mặt Trăng (Moonstone)"],
    advice: "Năng lượng bình yên sẽ giúp bạn tìm lại cân bằng.",
  },
  angry: {
    label: "Nóng nảy, Dễ cáu gắt",
    value: "angry",
    stones: ["Aquamarine", "Thạch Anh Hồng (Rose Quartz)"],
    advice: "Bạn cần năng lượng mát mẻ để hạ bớt sự nóng nảy.",
  },
  bored: {
    label: "Bình ổn, Hơi tẻ nhạt",
    value: "bored",
    stones: ["Thạch Anh Vàng (Citrine)", "Đá Mặt Trời (Sunstone)"],
    advice: "Bạn cần kích thích năng lượng tích cực và niềm vui.",
  },
  happy: {
    label: "Vui vẻ, Bình yên",
    value: "happy",
    stones: ["Thạch Anh Hồng (Rose Quartz)", "Đá Mặt Trăng (Moonstone)"],
    advice: "Hãy duy trì và khuếch tán năng lượng tích cực này.",
  },
}

// Barriers & Solutions (Cập nhật cho 11 đá)
export const barriers = {
  procrastination: {
    label: "Sự trì hoãn, Lười biếng",
    value: "procrastination",
    supportStones: ["Fluorite", "Ngọc Hồng Lựu (Garnet)"],
    advice: "Tăng cường ý chí hành động",
  },
  confidence: {
    label: "Thiếu sự tự tin, Sợ đám đông",
    value: "confidence",
    supportStones: ["Đá Mặt Trời (Sunstone)", "Thạch Anh Hồng (Rose Quartz)"],
    advice: "Xây dựng tự tin từ trong sâu thẳm",
  },
  luck: {
    label: "Thiếu may mắn, Gặp vận xui",
    value: "luck",
    supportStones: ["Peridot", "Thạch Anh Vàng (Citrine)"],
    advice: "Thu hút năng lượng tích cực và may mắn",
  },
  health: {
    label: "Sức khỏe thể chất không tốt",
    value: "health",
    supportStones: ["Hematite", "Tourmaline"],
    advice: "Hỗ trợ sức khỏe tổng thể",
  },
}

// Life Goals (Khía cạnh hỗ trợ)
export const lifeGoals = {
  wealth: {
    label: "Tài lộc & Sự nghiệp",
    value: "wealth",
    description: "Thăng tiến, kinh doanh, thu hút tiền bạc",
    mainStone: "Citrine",
    affirmations: ["Tôi giàu có", "Thành công đang tìm đến tôi", "Tiền bạc chảy tự do đến tôi"],
  },
  love: {
    label: "Tình duyên & Mối quan hệ",
    value: "love",
    description: "Tìm người yêu, chữa lành tổn thương, kết nối bạn bè",
    mainStone: "Thạch Anh Hồng",
    affirmations: ["Tôi xứng đáng được yêu thương", "Tôi thu hút tình yêu thật", "Mối quan hệ của tôi hòa hợp"],
  },
  wisdom: {
    label: "Trí tuệ & Học tập",
    value: "wisdom",
    description: "Tăng tập trung, thi cử đỗ đạt, sáng suốt",
    mainStone: "Sapphire Xanh",
    affirmations: ["Tôi thông minh và sáng suốt", "Tôi học hỏi mọi điều một cách dễ dàng", "Tôi tập trung như một chiến binh"],
  },
  health: {
    label: "Sức khỏe & Bình an",
    value: "health",
    description: "Ngủ ngon, trừ tà, tâm trí an yên",
    mainStone: "Thạch Anh Tím",
    affirmations: ["Tôi khỏe mạnh và bình an", "Cơ thể tôi đầy sức sống", "Tôi an yên mỗi đêm"],
  },
}

// Energy Vibes
export const energyVibes = {
  strong: {
    label: "Mạnh mẽ, quyết liệt",
    value: "strong",
    description: "Năng lượng đầy sức mạnh và ý chí",
  },
  gentle: {
    label: "Nhẹ nhàng, xoa dịu",
    value: "gentle",
    description: "Năng lượng dịu dàng và chữa lành",
  },
  mysterious: {
    label: "Bí ẩn, quyến rũ",
    value: "mysterious",
    description: "Năng lượng sâu sắc và quyến rũ",
  },
}

// Fashion Styles
export const fashionStyles = {
  minimalist: { label: "Tối giản (Minimalism)", value: "minimalist" },
  street: { label: "Cá tính/Nổi loạn (Streetwear)", value: "street" },
  vintage: { label: "Vintage/Cổ điển", value: "vintage" },
  feminine: { label: "Bánh bèo/Nữ tính", value: "feminine" },
  active: { label: "Năng động", value: "active" },
}

// Color Preferences (Negative Filter)
export const colorPreferences = {
  bright: { label: "Các tông màu tối/đen (Tôi thích sự tươi sáng)", value: "bright" },
  neutral: { label: "Các tông màu nóng/rực rỡ (Tôi thích sự nhã nhặn)", value: "neutral" },
  minimal: { label: "Các tông màu quá sặc sỡ (Tôi thích đơn sắc)", value: "minimal" },
  any: { label: "Không kén chọn, miễn hợp năng lượng", value: "any" },
}

// Random Affirmations if User Skips Question 10
export const randomAffirmations = [
  "Tôi bình an",
  "Tôi giàu có",
  "Mọi việc hanh thông",
  "Tôi xứng đáng",
  "Tôi mạnh mẽ",
  "Tôi yêu bản thân",
  "Tôi thu hút điều tốt đẹp",
  "Tôi sáng suốt",
  "Tôi là chủ nhân của cuộc sống tôi",
  "Tôi biết ơn",
]
