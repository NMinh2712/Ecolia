export interface Stone {
  name: string
  meaning: string
  energy: string
  color: string
}

export interface Product {
  id: string
  name: string
  stones: Stone[]
  description: string
  price: number
  meaning: string
  energyType: string
  care: string
  image?: string
}

export const stones: Record<string, Stone> = {
  "rose-quartz": {
    name: "Rose Quartz",
    meaning: "Tình yêu thương bản thân",
    energy: "Mềm mại, nhẹ nhàng",
    color: "#E8D5D1",
  },
  "smoky-quartz": {
    name: "Smoky Quartz",
    meaning: "Bảo vệ và ổn định",
    energy: "Mạnh mẽ, có gốc",
    color: "#B8B1A9",
  },
  sunstone: {
    name: "Sunstone",
    meaning: "Sự sáng suốt và quyền lực",
    energy: "Ấm áp, rạng rỡ",
    color: "#F4A460",
  },
  moonstone: {
    name: "Moonstone",
    meaning: "Nữ tính và cân bằng",
    energy: "Mộc mạc, nhịp điệu",
    color: "#FFFACD",
  },
  citrine: {
    name: "Citrine",
    meaning: "Tài lộc và thành công",
    energy: "Sáng, tích cực",
    color: "#FFD700",
  },
  rhodonite: {
    name: "Rhodonite",
    meaning: "Tình cảm và tha thứ",
    energy: "Từ bi, hỗ trợ",
    color: "#E75480",
  },
  amethyst: {
    name: "Amethyst",
    meaning: "Bình an và tâm linh",
    energy: "Yên tĩnh, quán chiếu",
    color: "#9966CC",
  },
  jade: {
    name: "Jade",
    meaning: "Sự sung túc và hòa hợp",
    energy: "Cân bằng, ổn định",
    color: "#66BB6A",
  },
}

export const products: Product[] = [
  {
    id: "sun-balance",
    name: "Sunstone Harmony",
    stones: [stones["sunstone"], stones["rose-quartz"]],
    description:
      "Vòng tay kết hợp ánh nắng với tình yêu thương. Cho những ai cần tái kết nối với nguồn năng lượng tích cực.",
    price: 150000,
    meaning: "Cân bằng cảm xúc & tiếp thêm động lực",
    energyType: "Năng lượng Tích cực",
    care: "Tránh tiếp xúc với nước nóng và hóa chất mạnh. Lau sạch bằng khăn mềm.",
    image: "/bracelet-sunny.jpg",
  },
  {
    id: "calm-night",
    name: "Midnight Serenity",
    stones: [stones["amethyst"], stones["moonstone"]],
    description: "Kết hợp bình an của đêm với chiếc ánh trăng. Dành cho những tâm hồn cần tìm lại sự yên tĩnh.",
    price: 150000,
    meaning: "Bình an nội tâm & kết nối tâm linh",
    energyType: "Năng lượng Tĩnh Lặng",
    care: "Để xa ánh sáng mặt trời trực tiếp. Lau sạch và giữ khô ráo.",
    image: "/bracelet-calm.jpg",
  },
  {
    id: "prosperity-flow",
    name: "Golden Abundance",
    stones: [stones["citrine"], stones["jade"]],
    description: "Năng lượng thành công và sự sung túc. Cho những ai đang theo đuổi mục tiêu của mình.",
    price: 150000,
    meaning: "Tài lộc & sự phát triển bền vững",
    energyType: "Năng lượng Thịnh Vượng",
    care: "Giữ sạch và khô. Có thể rửa bằng nước lạnh hàng tuần.",
    image: "/bracelet-gold.jpg",
  },
  {
    id: "heart-healing",
    name: "Compassion Embrace",
    stones: [stones["rose-quartz"], stones["rhodonite"]],
    description: "Sự tha thứ và yêu thương bản thân. Cho những ai đang trên hành trình chữa lành cảm xúc.",
    price: 150000,
    meaning: "Tình cảm sâu sắc & tha thứ",
    energyType: "Năng lượng Chữa Lành",
    care: "Hạn chế tiếp xúc với mồ hôi. Lau sạch hàng ngày.",
    image: "/bracelet-heart.jpg",
  },
]
