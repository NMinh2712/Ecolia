export default function ProcessSection() {
  const steps = [
    {
      title: "Thu thập",
      description: "Kết nối nông dân, thu mua lõi bắp, bã cà phê từ các trang trại địa phương.",
      image: "/farmers-collecting-corn-cobs-coffee-grounds.jpg",
    },
    {
      title: "Sơ chế",
      description: "Rửa sạch → Sấy khô → Xay mịn thành bột nguyên liệu.",
      image: "/processing-corn-cob-grinding-drying.jpg",
    },
    {
      title: "Pha trộn & Đúc",
      description: "Tỉ lệ kiểm soát chính xác, nén loại bỏ khí, tạo hình chậu.",
      image: "/mixing-molding-biodegradable-plant-pots.jpg",
    },
    {
      title: "Kiểm nghiệm",
      description: "Kiểm tra độ chịu lực, thời gian phân hủy, đảm bảo chất lượng.",
      image: "/quality-testing-biodegradable-pots-laboratory.jpg",
    },
  ]

  return (
    <section id="process" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Quy trình sản xuất</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto text-pretty leading-relaxed">
            Từ phụ phẩm nông nghiệp đến sản phẩm hoàn thiện, mỗi bước đều được kiểm soát chặt chẽ
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-accent/30 transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:block absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 border-4 border-background"></div>

                <div
                  className={`bg-card rounded-2xl overflow-hidden card-hover border border-border/50 ${index % 2 === 0 ? "md:mb-16" : "md:mt-16"}`}
                >
                  <div className="aspect-video bg-cream">
                    <img
                      src={step.image || "/placeholder.svg"}
                      alt={`Quy trình ${step.title} - ECOLIA`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
