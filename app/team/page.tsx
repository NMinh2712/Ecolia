import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { teamMembers } from "@/lib/team"

export default function Team() {
  return (
    <main className="gradient-background">
      <Header />

      <div className="pt-32 pb-20 px-4">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-5xl font-serif text-healing-brown mb-6">Nhóm MẢNH</h1>
          <p className="text-xl text-foreground-secondary">
            Những người tạo nên MẢNH với tình yêu, đam mê, và cam kết xây dựng một sản phẩm tuyệt vời.
          </p>
        </section>

        {/* Team Members Grid */}
        <section className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {teamMembers.map((member) => (
              <div key={member.id} className="healing-card p-8 hover:shadow-lg transition-all duration-300">
                {/* Avatar Placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-energy-gold to-healing-brown flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">👤</span>
                </div>

                {/* Member Info */}
                <h3 className="font-serif text-2xl text-healing-brown text-center mb-1">{member.name}</h3>
                <p className="text-center text-energy-gold font-medium mb-4">{member.role}</p>

                <p className="text-foreground-secondary text-sm mb-6 text-center">{member.bio}</p>

                {/* Responsibility */}
                <div className="border-t border-border pt-4 mb-4">
                  <p className="text-foreground-secondary text-xs font-medium mb-2">Nhiệm vụ:</p>
                  <p className="text-foreground text-sm">{member.responsibility}</p>
                </div>

                {/* Contact */}
                <a
                  href={`mailto:${member.email}`}
                  className="text-energy-gold hover:text-healing-brown transition-colors text-sm"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>

          {/* Team Values */}
          <div className="healing-card p-12 bg-gradient-to-br from-accent-cream to-white text-center">
            <h2 className="text-3xl font-serif text-healing-brown mb-6">Tại sao chúng tôi?</h2>
            <p className="text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Nhóm MẢNH được tạo thành bởi những cá nhân đam mê với công nghệ, thiết kế, và trang sức. Chúng tôi tin
              rằng kết hợp các kỹ năng khác nhau có thể tạo ra những sản phẩm tuyệt vời. Mỗi thành viên mang đến một góc
              nhìn độc nhất, và cùng nhau, chúng tôi xây dựng MẢNH.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="font-serif text-2xl text-energy-gold mb-2">{teamMembers.length}</p>
                <p className="text-foreground-secondary text-sm">Thành viên chính</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-energy-gold mb-2">35+</p>
                <p className="text-foreground-secondary text-sm">Năm kinh nghiệm tích lũy</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-energy-gold mb-2">100%</p>
                <p className="text-foreground-secondary text-sm">Đam mê với sản phẩm</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-2xl mx-auto text-center mt-20">
          <h2 className="text-3xl font-serif text-healing-brown mb-6">Hãy gặp các viên đá được chọn bởi nhóm</h2>
          <p className="text-foreground-secondary mb-8">
            Mỗi chiếc vòng tay là kết quả của sự hợp tác giữa thiết kế, kinh nghiệm, và tình yêu với sản phẩm.
          </p>
          <Link href="/shop" className="cta-button-gold inline-block">
            Khám phá bộ sưu tập
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  )
}
