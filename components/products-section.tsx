import { Badge } from "@/components/ui/badge"

export default function ProductsSection() {
  const products = [
    {
      name: "EcoGreen Mini",
      description: "Chậu ươm 8×7 cm — Phân hủy 2–4 tuần. Lý tưởng cho hạt giống & rau gia vị.",
      image: "/small-biodegradable-plant-pot-8x7cm-corn-cob-mater.jpg",
      biodegradationTime: "2–4 tuần",
      size: "8×7 cm",
    },
    {
      name: "EcoGreen Standard",
      description: "Chậu trồng 12×10 cm — Phân hủy 4–6 tuần. Hoàn hảo cho cây con và hoa nhỏ.",
      image: "/medium-biodegradable-plant-pot-12x10cm-natural-bro.jpg",
      biodegradationTime: "4–6 tuần",
      size: "12×10 cm",
    },
    {
      name: "EcoGreen Large",
      description: "Chậu lớn 15×12 cm — Phân hủy 6–8 tuần. Dành cho cây trồng lâu dài.",
      image: "/large-biodegradable-plant-pot-15x12cm-sustainable-.jpg",
      biodegradationTime: "6–8 tuần",
      size: "15×12 cm",
    },
  ]

  return (
    <section id="products" className="py-20 bg-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Dòng sản phẩm EcoGreen</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto text-pretty leading-relaxed">
            Từ ươm hạt đến trồng cây lớn, chúng tôi có giải pháp phù hợp cho mọi nhu cầu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-background rounded-2xl overflow-hidden card-hover border border-border/50">
              <div className="aspect-square bg-cream">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} - chậu cây tự phân hủy từ lõi bắp`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
                  <Badge variant="secondary" className="bg-accent/20 text-foreground border-accent/30">
                    {product.biodegradationTime}
                  </Badge>
                </div>
                <p className="text-foreground/70 mb-4 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">Kích thước: {product.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
