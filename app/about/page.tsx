import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function About() {
  return (
    <main className="gradient-background">
      <Header />

      <div className="pt-32 pb-20 px-4">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-5xl font-serif text-healing-brown mb-6">Về MẢNH</h1>
          <p className="text-xl text-foreground-secondary">
            MẢNH là một dự án startup tập trung vào trang sức chữa lành. Chúng tôi tin rằng mỗi chiếc vòng tay có một
            câu chuyện, và câu chuyện đó là câu chuyện của bạn.
          </p>
        </section>

        {/* Story Section */}
        <section className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-serif text-healing-brown mb-8 text-center">Câu chuyện của MẢNH</h2>

          <div className="healing-card p-12 mb-8">
            <p className="text-lg text-foreground-secondary mb-6">
              MẢNH ra đời từ một ý tưởng đơn giản:{" "}
              <span className="font-serif text-healing-brown">Mỗi người đều có những mảnh cảm xúc chưa trọn vẹn</span>.
            </p>
            <p className="text-lg text-foreground-secondary mb-6">
              Chúng tôi muốn tạo ra một không gian nơi trang sức không chỉ là phụ kiện, mà là một người bạn tinh thần -
              một mảnh ghép giúp bạn cảm thấy hoàn toàn hơn.
            </p>
            <p className="text-lg text-foreground-secondary">
              Với sự kết hợp của công nghệ, thiết kế, và hiểu biết sâu về các loại đá, chúng tôi xây dựng một bộ sưu tập
              những chiếc vòng tay ý nghĩa - mỗi chiếc là một lựa chọn cảm xúc.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-serif text-healing-brown mb-8 text-center">Sứ mệnh của chúng tôi</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="healing-card p-8">
              <h3 className="font-serif text-xl text-healing-brown mb-4">Trang sức có ý nghĩa</h3>
              <p className="text-foreground-secondary">
                Mỗi chiếc vòng tay MẢNH được tạo ra với mục đích cụ thể - để hỗ trợ bạn trên hành trình chữa lành và
                phát triển bản thân.
              </p>
            </div>

            <div className="healing-card p-8">
              <h3 className="font-serif text-xl text-healing-brown mb-4">Chất lượng cao</h3>
              <p className="text-foreground-secondary">
                Chúng tôi chọn lựa từng viên đá một, đảm bảo chất lượng tốt nhất và ý nghĩa sâu sắc cho từng sản phẩm.
              </p>
            </div>

            <div className="healing-card p-8">
              <h3 className="font-serif text-xl text-healing-brown mb-4">Cộng đồng chữa lành</h3>
              <p className="text-foreground-secondary">
                MẢNH tạo ra một cộng đồng những người tin vào sức mạnh của trang sức và sự cân bằng cảm xúc.
              </p>
            </div>

            <div className="healing-card p-8">
              <h3 className="font-serif text-xl text-healing-brown mb-4">Bền vững</h3>
              <p className="text-foreground-secondary">
                Chúng tôi cam kết sử dụng phương pháp sản xuất bền vững và thân thiện với môi trường.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-3xl font-serif text-healing-brown mb-8">Các giá trị của chúng tôi</h2>

          <div className="healing-card p-12 bg-gradient-to-br from-accent-cream to-white">
            <ul className="space-y-4 text-left max-w-2xl mx-auto">
              <li className="flex gap-3">
                <span className="text-energy-gold font-serif text-xl">✓</span>
                <span className="text-foreground">
                  <strong>Chân thành:</strong> Chúng tôi tin vào sức mạnh của sự lắng nghe và hiểu thấu đáo.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-energy-gold font-serif text-xl">✓</span>
                <span className="text-foreground">
                  <strong>Cá nhân hóa:</strong> Không có hai người nào giống nhau, vì vậy không có hai chiếc vòng tay
                  nào giống nhau.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-energy-gold font-serif text-xl">✓</span>
                <span className="text-foreground">
                  <strong>Công nghệ có tình:</strong> Công nghệ phải phục vụ con người, chứ không phải ngược lại.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-energy-gold font-serif text-xl">✓</span>
                <span className="text-foreground">
                  <strong>Bền vững:</strong> Chúng tôi cam kết sử dụng nguyên liệu chất lượng cao và phương pháp sản
                  xuất bền vững.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-healing-brown mb-6">Khám phá bộ sưu tập</h2>
          <p className="text-foreground-secondary mb-8">
            Sẵn sàng tìm mảnh ghép của riêng bạn? Hãy khám phá những chiếc vòng tay được tạo ra chỉ để đồng hành cùng
            cảm xúc của bạn.
          </p>
          <Link href="/shop" className="cta-button-gold inline-block">
            Xem bộ sưu tập
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  )
}
