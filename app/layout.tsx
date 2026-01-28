import type React from "react"
import type { Metadata } from "next"
import { Inter, Be_Vietnam_Pro } from "next/font/google" // ← thay Playfair bằng Be_Vietnam_Pro
import { Analytics } from "@vercel/analytics/next"
import { ChatbotWrapper } from "@/components/chatbot-wrapper"
import "./globals.css"

// Font cho body / sans-serif (rất tốt cho tiếng Việt)
const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"], // ← thêm "vietnamese"
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"], // tùy chọn weight bạn dùng
})

// Font cho heading / serif (thay Playfair bằng Be Vietnam Pro - tối ưu tiếng Việt)
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"], // ← rất quan trọng!
  variable: "--font-serif", // giữ variable cũ để không phải sửa nhiều class
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"], // hỗ trợ nhiều weight
})

export const metadata: Metadata = {
  title: "SoulGem AI - Vòng Tay Năng Lượng Cá Nhân Hóa",
  description:
    "Khám phá chiếc vòng tay độc nhất được tạo ra riêng cho bạn qua AI. SoulGem giúp bạn kết nối với năng lượng và tinh thần thông qua đá quý.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SoulGem AI - Vòng Tay Năng Lượng Cá Nhân Hóa",
    description:
      "Khám phá chiếc vòng tay độc nhất được tạo ra riêng cho bạn qua AI. SoulGem giúp bạn kết nối với năng lượng và tinh thần thông qua đá quý.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${beVietnamPro.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <ChatbotWrapper />
        <Analytics />
      </body>
    </html>
  )
}