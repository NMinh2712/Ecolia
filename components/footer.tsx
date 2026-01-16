import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-healing-brown text-white py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-lg mb-4">MẢNH</h3>
            <p className="text-white/80 text-sm">Mảnh ghép của riêng bạn. Trang sức mang theo cảm xúc.</p>
          </div>
          <div>
            <h4 className="font-serif text-sm mb-4">Điều hướng</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Nhóm
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm mb-4">Thông tin</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="mailto:hello@manh.vn" className="hover:text-white transition-colors">
                  hello@manh.vn
                </a>
              </li>
              <li>
                <a href="https://instagram.com/manh.vn" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://zalo.me/manh.vn" className="hover:text-white transition-colors">
                  Zalo
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
          <p>
            Tạo với tình yêu từ Việt Nam. Mảnh ghép của riêng bạn.
            <br />© {currentYear} MẢNH. Bản quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
