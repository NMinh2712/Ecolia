"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function AIIntroPage() {
  return (
    <main className="gradient-background min-h-screen">
      <Header />

      <div className="pt-40 pb-20 px-4 max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="mb-8 animate-fadeIn">
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-5xl md:text-6xl font-serif text-healing-brown mb-6">Trải Nghiệm AI Cá Nhân Hóa</h1>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
              AI của MẢNH giúp bạn hiểu rõ trạng thái cảm xúc và phong cách hiện tại, từ đó gợi ý chiếc vòng phù hợp
              nhất.
            </p>
          </div>
        </section>

        {/* Key Points */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Point 1 */}
            <div className="healing-card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-serif text-lg text-healing-brown mb-3">Phân Tích Cảm Xúc</h3>
              <p className="text-foreground-secondary text-sm">
                Trả lời những câu hỏi đơn giản về trạng thái hiện tại của bạn.
              </p>
            </div>

            {/* Point 2 */}
            <div className="healing-card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="font-serif text-lg text-healing-brown mb-3">Đề Xuất Thông Minh</h3>
              <p className="text-foreground-secondary text-sm">
                AI học hỏi từ năng lượng của bạn để gợi ý sản phẩm hoàn hảo.
              </p>
            </div>

            {/* Point 3 */}
            <div className="healing-card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="font-serif text-lg text-healing-brown mb-3">Mảnh Ghép Của Bạn</h3>
              <p className="text-foreground-secondary text-sm">Khám phá chiếc vòng được tạo ra riêng cho bạn.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-healing-brown text-center mb-12">Cách Nó Hoạt Động</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="healing-card p-6 md:p-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-energy-gold text-white flex items-center justify-center font-serif font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-healing-brown mb-2">Trả Lời Câu Hỏi</h3>
                  <p className="text-foreground-secondary">
                    Bạn sẽ trả lời các câu hỏi về trạng thái cảm xúc, nhu cầu hiện tại, và phong cách cá nhân. Quá trình
                    này mất khoảng 2 phút.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="healing-card p-6 md:p-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-energy-gold text-white flex items-center justify-center font-serif font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-healing-brown mb-2">AI Phân Tích</h3>
                  <p className="text-foreground-secondary">
                    AI sẽ phân tích câu trả lời của bạn dựa trên các quy tắc năng lượng và ý nghĩa đá quý để tìm ra sản
                    phẩm phù hợp nhất.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="healing-card p-6 md:p-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-energy-gold text-white flex items-center justify-center font-serif font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-healing-brown mb-2">Nhận Kết Quả</h3>
                  <p className="text-foreground-secondary">
                    Bạn sẽ nhận được một bài đọc năng lượng cá nhân hóa cùng với gợi ý sản phẩm dành riêng cho bạn.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="healing-card p-6 md:p-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-energy-gold text-white flex items-center justify-center font-serif font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-healing-brown mb-2">Đặt Hàng</h3>
                  <p className="text-foreground-secondary">
                    Nếu bạn yêu thích sản phẩm được đề xuất, bạn có thể đặt hàng ngay thông qua Google Form hoặc Zalo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Note */}
        <section className="healing-card p-8 mb-12 bg-accent-cream border-l-4 border-energy-gold">
          <p className="text-foreground-secondary text-sm">
            <span className="font-medium text-healing-brown">Bảo mật của bạn:</span> Chúng tôi không thu thập dữ liệu
            nhạy cảm hay sử dụng thông tin của bạn cho mục đích khác. Dữ liệu chỉ được sử dụng để gợi ý sản phẩm phù hợp
            nhất.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Link href="/ai-reading" className="cta-button-gold inline-block mb-6">
            Bắt Đầu Trải Nghiệm
          </Link>
          <div className="text-foreground-secondary text-sm">
            Hoặc{" "}
            <Link href="/shop" className="text-healing-brown hover:text-energy-gold font-medium">
              khám phá bộ sưu tập
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
