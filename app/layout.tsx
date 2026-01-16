import type React from "react"
import type { Metadata } from "next"

import { Playfair_Display } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { Analytics } from "@vercel/analytics/next"
import { Chatbot } from "@/components/chatbot"
import "./globals.css"

/* Google font */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MẢNH - Mảnh ghép của riêng bạn",
  description:
    "Khám phá chiếc vòng tay được tạo ra riêng cho bạn thông qua AI đọc năng lượng. MẢNH là nơi mỗi chiếc trang sức kể một câu chuyện cảm xúc độc nhất.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body
        className={`
          ${GeistSans.className}
          ${GeistMono.variable}
          ${playfair.variable}
          font-sans
          antialiased
        `}
      >
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
