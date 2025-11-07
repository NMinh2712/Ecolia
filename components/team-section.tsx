export default function TeamSection() {
  const teamMembers = [
    {
      name: "Phùng Thị Thảo My",
      role: "Giám đốc Điều hành & Kiêm phụ trách Tài chính - Hành chính",
      description:
        "Chuyên gia về nông nghiệp bền vững với 10 năm kinh nghiệm trong lĩnh vực tái chế phụ phẩm nông nghiệp.",
      image: "/team-member-ceo-sustainable-agriculture-expert.jpg",
    },
    {
      name: "Nguyễn Ngọc San San",
      role: "Trưởng bộ phận Sản xuất",
      description: "Kỹ sư công nghệ sinh học, chuyên về quy trình sản xuất vật liệu phân hủy sinh học.",
      image: "/team-member-production-director-biotechnology-eng.jpg",
    },
    {
      name: "Phan Nguyễn Thanh Bạch",
      role: "Trưởng bộ phận Thiết kế - Thương hiệu",
      description: "Tiến sĩ Khoa học Vật liệu, nghiên cứu và phát triển công nghệ chế biến phụ phẩm nông nghiệp.",
      image: "/team-member-rd-director-materials-science-phd.jpg",
    },
      {
      name: "Trần Trung Nhân",
      role: "Chuyên viên phát triển Sản phẩm",
      description: "Tiến sĩ Khoa học Vật liệu, nghiên cứu và phát triển công nghệ chế biến phụ phẩm nông nghiệp.",
      image: "/team-member-rd-director-materials-science-phd.jpg",
    },
      {
      name: "Phạm Lê Nhật Minh",
      role: "Chuyên viên Kỹ thuật",
      description: "Tiến sĩ Khoa học Vật liệu, nghiên cứu và phát triển công nghệ chế biến phụ phẩm nông nghiệp.",
      image: "/team-member-rd-director-materials-science-phd.jpg",
    },
      {
      name: "Vỏ Thị Thủy Tiên",
      role: "Marketing & Chăm sóc khách hàng",
      description: "Tiến sĩ Khoa học Vật liệu, nghiên cứu và phát triển công nghệ chế biến phụ phẩm nông nghiệp.",
      image: "/team-member-rd-director-materials-science-phd.jpg",
    },
  ]

  return (
    <section id="team" className="py-20 bg-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Đội ngũ ECOLIA</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto text-pretty leading-relaxed">
            Những chuyên gia tận tâm với sứ mệnh tạo ra giải pháp bền vững cho môi trường
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-background rounded-2xl overflow-hidden card-hover border border-border/50">
              <div className="aspect-square bg-cream">
                <img
                  src={member.image || "/placeholder.svg?height=400&width=400"}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-foreground/70 leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
