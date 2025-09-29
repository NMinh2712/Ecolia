import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Recycle, Users, Target } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="section-spacing bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title font-bold text-foreground mb-6 text-balance">Về ECOLIA</h2>
          <p className="text-xl text-readable max-w-3xl mx-auto leading-relaxed">
            ECOLIA ra đời từ mong muốn giải quyết vấn đề rác thải nhựa trong nông nghiệp và tạo ra giải pháp bền vững
            cho người trồng trọt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="card-hover border-0 shadow-sm bg-cream/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Thân thiện môi trường</h3>
              <p className="text-sm text-muted-readable">100% từ nguyên liệu tự nhiên, phân hủy hoàn toàn</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-sm bg-cream/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Tái chế phụ phẩm</h3>
              <p className="text-sm text-muted-readable">Biến lõi bắp, bã cà phê thành sản phẩm có giá trị</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-sm bg-cream/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-earth/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-earth" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hỗ trợ nông dân</h3>
              <p className="text-sm text-muted-readable">Tạo thu nhập thêm từ phụ phẩm nông nghiệp</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-sm bg-cream/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Nông nghiệp bền vững</h3>
              <p className="text-sm text-muted-readable">Góp phần xây dựng hệ thống nông nghiệp tuần hoàn</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-cream/30 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Thông tin công ty</h3>
              <div className="space-y-4 text-readable">
                <div>
                  <strong className="text-foreground">Tên công ty:</strong> ECOLIA Vietnam
                </div>
                <div>
                  <strong className="text-foreground">Địa chỉ:</strong> Khu Công nghệ cao TP.HCM
                </div>
                <div>
                  <strong className="text-foreground">Ngày thành lập:</strong> 2024
                </div>
                <div>
                  <strong className="text-foreground">Email:</strong> info@ecolia.vn
                </div>
                <div>
                  <strong className="text-foreground">Fanpage:</strong> facebook.com/ecolia.vietnam
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/sustainable-agriculture-team-working-with-corn-cob.jpg"
                alt="Đội ngũ ECOLIA làm việc với nguyên liệu lõi bắp"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
