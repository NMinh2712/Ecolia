import { Leaf, Recycle, Sprout } from "lucide-react"

export default function WhyEcoliaSection() {
  const reasons = [
    {
      icon: <Recycle className="w-8 h-8 text-earth" />,
      title: "Vấn đề nhựa",
      description: "Hàng triệu chậu nhựa thải ra môi trường mỗi năm, gây ô nhiễm đất và nước trong hàng trăm năm.",
    },
    {
      icon: <Sprout className="w-8 h-8 text-primary" />,
      title: "Cơ hội từ phụ phẩm",
      description:
        "Lõi bắp, bã cà phê, xơ dừa - những phụ phẩm nông nghiệp có thể tái sử dụng thành sản phẩm có giá trị.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-accent" />,
      title: "Giải pháp ECOLIA",
      description: "Chậu cây tự phân hủy, bổ sung dinh dưỡng cho đất, tạo chu trình sống bền vững.",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Tại sao chọn ECOLIA?</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto text-pretty leading-relaxed">
            Chúng tôi biến phụ phẩm nông nghiệp thành giải pháp bền vững cho ngành làm vườn
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-card p-8 rounded-2xl card-hover border border-border/50">
              <div className="mb-6">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{reason.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
