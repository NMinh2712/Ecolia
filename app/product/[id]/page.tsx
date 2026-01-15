"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { products } from "@/lib/products"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <main className="gradient-background min-h-screen">
        <Header />
        <div className="pt-32 pb-20 px-4 text-center max-w-2xl mx-auto">
          <h1 className="text-2xl font-serif text-healing-brown mb-4">Sản phẩm không tìm thấy</h1>
          <p className="text-foreground-secondary mb-6">Xin lỗi, chiếc vòng tay này không còn có sẵn.</p>
          <Link href="/shop" className="cta-button-gold">
            Quay lại cửa hàng
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="gradient-background">
      <Header />

      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-healing-brown hover:text-energy-gold transition-colors mb-8"
        >
          ← Quay lại cửa hàng
        </Link>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-accent-pink rounded-lg h-96 md:h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">
                {product.energyType === "Năng lượng Tích cực" && "☀️"}
                {product.energyType === "Năng lượng Tĩnh Lặng" && "🌙"}
                {product.energyType === "Năng lượng Thịnh Vượng" && "💎"}
                {product.energyType === "Năng lượng Chữa Lành" && "💕"}
              </div>
              <p className="text-foreground-secondary text-lg">{product.name}</p>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-serif text-healing-brown mb-4">{product.name}</h1>

            <div className="mb-8">
              <p className="text-lg text-foreground-secondary mb-4">{product.description}</p>

              <div className="healing-card p-6 mb-6">
                <p className="text-foreground-secondary text-sm font-medium mb-2">Ý nghĩa:</p>
                <p className="text-lg font-serif text-healing-brown">{product.meaning}</p>
              </div>

              <div className="healing-card p-6 mb-6">
                <p className="text-foreground-secondary text-sm font-medium mb-3">Những viên đá:</p>
                <ul className="space-y-2">
                  {product.stones.map((stone, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: stone.color }}
                      />
                      <div>
                        <p className="font-medium text-foreground">{stone.name}</p>
                        <p className="text-sm text-foreground-secondary">{stone.meaning}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="healing-card p-6 mb-8">
                <p className="text-foreground-secondary text-sm font-medium mb-2">Hướng dẫn chăm sóc:</p>
                <p className="text-foreground">{product.care}</p>
              </div>

              <div className="mb-8">
                <p className="text-foreground-secondary text-sm mb-2">Giá:</p>
                <p className="text-4xl font-serif text-healing-brown">{product.price.toLocaleString("vi-VN")}đ</p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://forms.gle/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button-gold w-full text-center block"
                >
                  Đặt hàng ngay
                </a>
                <a
                  href="https://zalo.me/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full font-medium text-healing-brown bg-accent-cream hover:bg-accent-pink transition-colors text-center block"
                >
                  Liên hệ qua Zalo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-3xl font-serif text-healing-brown mb-8">Các chiếc vòng khác</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== productId)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <div className="healing-card p-6 h-full hover:shadow-lg transition-all duration-300">
                    <div className="w-full h-40 bg-accent-pink rounded-lg flex items-center justify-center mb-4">
                      <div className="text-4xl">
                        {relatedProduct.energyType === "Năng lượng Tích cực" && "☀️"}
                        {relatedProduct.energyType === "Năng lượng Tĩnh Lặng" && "🌙"}
                        {relatedProduct.energyType === "Năng lượng Thịnh Vượng" && "💎"}
                        {relatedProduct.energyType === "Năng lượng Chữa Lành" && "💕"}
                      </div>
                    </div>
                    <h3 className="font-serif text-lg text-healing-brown mb-2">{relatedProduct.name}</h3>
                    <p className="text-sm text-foreground-secondary mb-4">{relatedProduct.meaning}</p>
                    <p className="font-serif text-healing-brown">{relatedProduct.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
