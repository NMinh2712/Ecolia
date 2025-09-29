import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "ECOLIA | Chậu cây tự phân hủy từ lõi bắp — Trồng xanh, Sống xanh",
  description:
    "ECOLIA tạo ra chậu cây tự phân hủy từ lõi bắp và phụ phẩm nông nghiệp — thân thiện môi trường, bổ sung dinh dưỡng cho đất. Khám phá dòng sản phẩm EcoGreen.",
  keywords: "chậu cây phân hủy, lõi bắp, thân thiện môi trường, nông nghiệp bền vững, sống xanh",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="alternate" href="https://ecolia.com/vi" hrefLang="vi" />
        <link rel="alternate" href="https://ecolia.com/en" hrefLang="en" />
      </head>
      <body className="font-sans bg-background text-foreground">{children}</body>
    </html>
  )
}
