import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function AIFuture() {
  return (
    <main className="gradient-background">
      <Header />

      <div className="pt-32 pb-20 px-4">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-5xl font-serif text-healing-brown mb-6">Tầm Nhìn Tương Lai</h1>
          <p className="text-xl text-foreground-secondary">
            Dự định tích hợp AI để tạo trải nghiệm cá nhân hóa hoàn toàn cho từng khách hàng.
          </p>
        </section>

        {/* Current Phase */}
        <section className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-serif text-healing-brown mb-8 text-center">Giai đoạn hiện tại</h2>

          <div className="healing-card p-12 mb-8 border-2 border-energy-gold">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-energy-gold text-white flex items-center justify-center font-serif text-2xl">
                ✓
              </div>
              <h3 className="font-serif text-2xl text-healing-brown">MVP - Showcase & Manual Orders</h3>
            </div>
            <p className="text-foreground-secondary mb-6">
              Phiên bản hiện tại của MẢNH tập trung vào việc giới thiệu bộ sưu tập sản phẩm chất lượng cao và kiểm chứng
              nhu cầu thị trường.
            </p>
            <ul className="space-y-3 ml-8">
              <li className="flex gap-3">
                <span className="text-energy-gold">•</span>
                <span className="text-foreground">Giới thiệu 4 chiếc vòng tay chính với ý nghĩa cảm xúc</span>
              </li>
              <li className="flex gap-3">
                <span className="text-energy-gold">•</span>
                <span className="text-foreground">Chi tiết về các viên đá và công dụng chữa lành</span>
              </li>
              <li className="flex gap-3">
                <span className="text-energy-gold">•</span>
                <span className="text-foreground">Đặt hàng thủ công qua Google Forms hoặc Zalo</span>
              </li>
              <li className="flex gap-3">
                <span className="text-energy-gold">•</span>
                <span className="text-foreground">Xây dựng cộng đồng và lắng nghe phản hồi khách hàng</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Future Roadmap */}
        <section className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-serif text-healing-brown mb-8 text-center">Lộ trình phát triển</h2>

          <div className="space-y-6">
            {/* Phase 2 */}
            <div className="healing-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent-cream text-healing-brown flex items-center justify-center font-serif text-2xl font-bold">
                  1
                </div>
                <h3 className="font-serif text-2xl text-healing-brown">Giai đoạn 1: AI Recommendation Engine</h3>
              </div>
              <p className="text-foreground-secondary mb-6">
                Tích hợp rule-based AI logic để phân tích cảm xúc và đề xuất sản phẩm phù hợp.
              </p>
              <ul className="space-y-2 ml-8">
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">
                    Form 5 bước: Cảm xúc → Màu sắc → Ý định → Ngày sinh → Thông tin
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">AI đọc năng lượng và đề xuất chiếc vòng phù hợp</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Hiển thị năng lượng reading và lý do gợi ý</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="healing-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent-cream text-healing-brown flex items-center justify-center font-serif text-2xl font-bold">
                  2
                </div>
                <h3 className="font-serif text-2xl text-healing-brown">Giai đoạn 2: User Accounts & History</h3>
              </div>
              <p className="text-foreground-secondary mb-6">
                Cho phép người dùng tạo tài khoản và lưu lịch sử đặt hàng.
              </p>
              <ul className="space-y-2 ml-8">
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Đăng ký/Đăng nhập</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Lưu kết quả AI reading</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Quản lý đơn hàng và yêu thích</span>
                </li>
              </ul>
            </div>

            {/* Phase 4 */}
            <div className="healing-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent-cream text-healing-brown flex items-center justify-center font-serif text-2xl font-bold">
                  3
                </div>
                <h3 className="font-serif text-2xl text-healing-brown">Giai đoạn 3: Payment Integration & Inventory</h3>
              </div>
              <p className="text-foreground-secondary mb-6">Triển khai hệ thống thanh toán và quản lý kho hàng.</p>
              <ul className="space-y-2 ml-8">
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Tích hợp Stripe/MoMo cho thanh toán</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Hệ thống quản lý kho hàng</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Theo dõi đơn hàng real-time</span>
                </li>
              </ul>
            </div>

            {/* Phase 5 */}
            <div className="healing-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent-cream text-healing-brown flex items-center justify-center font-serif text-2xl font-bold">
                  4
                </div>
                <h3 className="font-serif text-2xl text-healing-brown">Giai đoạn 4: ML-Based Personalization</h3>
              </div>
              <p className="text-foreground-secondary mb-6">
                Nâng cấp AI từ rule-based sang Machine Learning để hiểu sâu hơn khách hàng.
              </p>
              <ul className="space-y-2 ml-8">
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Phân tích hành vi người dùng</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Recommend sản phẩm mới dựa vào lịch sử</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-energy-gold">→</span>
                  <span className="text-foreground">Customized bracelet design service</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="max-w-3xl mx-auto mb-20">
          <div className="healing-card p-12 bg-gradient-to-br from-accent-cream to-white text-center">
            <h2 className="text-3xl font-serif text-healing-brown mb-6">Triết lý phát triển</h2>
            <p className="text-lg text-foreground-secondary mb-4">
              <strong className="text-healing-brown">MVP trước, AI sau</strong>
            </p>
            <p className="text-foreground-secondary">
              Chúng tôi tin vào việc xây dựng từ từ, lắng nghe khách hàng, và tích hợp công nghệ khi nó thật sự cần
              thiết. AI không phải điểm bắt đầu, mà là phương tiện để nâng cao trải nghiệm khách hàng.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-healing-brown mb-6">Khám phá ngay hôm nay</h2>
          <p className="text-foreground-secondary mb-8">
            Hãy là một phần của MẢNH từ giai đoạn MVP này. Phản hồi của bạn sẽ giúp định hình tương lai của chúng tôi.
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
