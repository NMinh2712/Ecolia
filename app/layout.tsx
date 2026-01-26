import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SoulGem AI - Vòng Tay Năng Lượng Cá Nhân Hóa",
  description:
    "Khám phá chiếc vòng tay độc nhất được tạo ra riêng cho bạn qua AI. SoulGem giúp bạn kết nối với năng lượng và tinh thần thông qua đá quý.",
  charset: "utf-8",
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
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
