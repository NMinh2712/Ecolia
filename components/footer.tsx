import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-earth text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo_exe.jpg"
                alt="ECOLIA Logo"
                className="w-8 h-8 rounded-full object-cover"
              />

              <span className="font-serif font-bold text-xl">ECOLIA</span>
            </div>
            <p className="text-cream/80 leading-relaxed">
              Chậu cây tự phân hủy từ lõi bắp — Giải pháp bền vững cho tương lai xanh.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/Ecolia.id.vn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="ghost" className="text-cream hover:bg-cream/10">
                  <Facebook className="w-5 h-5" />
                </Button>
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Sản phẩm</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/mini" className="text-cream/80 hover:text-cream transition-colors">
                  EcoGreen Mini
                </Link>
              </li>
              <li>
                <Link href="/products/standard" className="text-cream/80 hover:text-cream transition-colors">
                  EcoGreen Standard
                </Link>
              </li>
              <li>
                <Link href="/products/large" className="text-cream/80 hover:text-cream transition-colors">
                  EcoGreen Large
                </Link>
              </li>
              <li>
                <Link href="/products/custom" className="text-cream/80 hover:text-cream transition-colors">
                  Đặt hàng theo yêu cầu
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-cream/60 mt-0.5 flex-shrink-0" />
                <span className="text-cream/80">205N1 Trần Hưng Đạo Nối Dài, Cái Răng, Cần Thơ
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-cream/60" />
                <span className="text-cream/80">+84 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-cream/60" />
                <span className="text-cream/80">Ecolia@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Đăng ký nhận bản tin</h4>
            <p className="text-cream/80 mb-4">Nhận thông tin mới nhất về sản phẩm và mẹo trồng cây bền vững.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Email của bạn"
                className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/60"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white">Đăng ký</Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/60 text-sm">© 2025 ECOLIA. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-cream/60 hover:text-cream text-sm transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="text-cream/60 hover:text-cream text-sm transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
