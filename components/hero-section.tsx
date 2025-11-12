"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export default function HeroSection() {
  const handleScrollToProducts = () => {
    const element = document.querySelector("#products")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToProcess = () => {
    const element = document.querySelector("#process")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center hero-gradient texture-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-6">
              <h1 className="hero-title font-bold text-foreground text-balance">
                Trồng xanh — Sống xanh cùng <span className="text-primary">ECOLIA</span>
              </h1>
              <p className="text-xl text-readable leading-relaxed text-pretty max-w-2xl">
                Chậu cây tự phân hủy làm từ lõi bắp và phụ phẩm nông nghiệp — Thân thiện môi trường, bổ sung dinh dưỡng
                cho đất, góp phần xây dựng nông nghiệp bền vững.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white h-12 px-8 font-medium"
                onClick={handleScrollToProducts}
              >
                Xem sản phẩm
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-primary text-primary hover:bg-primary hover:text-white bg-transparent font-medium"
                onClick={handleScrollToProcess}
              >
                <Play className="mr-2 w-5 h-5" />
                Tìm hiểu quy trình
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/30">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-primary">2-4</div>
                <div className="text-sm text-muted-readable font-medium">tuần phân hủy</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-readable font-medium">tự nhiên</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-readable font-medium">chất hóa học</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src="ecoliane.jpg"
                alt="Chậu cây ECOLIA tự phân hủy từ lõi bắp với cây xanh đang phát triển"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/15 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
