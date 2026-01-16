export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  email: string
  responsibility: string
}

export const teamMembers: TeamMember[] = [
  {
    id: "member-1",
    name: "Nguyễn Thị A",
    role: "Sáng lập viên & CEO",
    bio: "Người sáng lập MẢNH, với 5 năm kinh nghiệm trong lĩnh vực khởi nghiệp công nghệ và trang sức.",
    email: "nguyena@manh.vn",
    responsibility: "Lãnh đạo chiến l略, xây dựng tầm nhìn & sứ mệnh, quản lý mối quan hệ khách hàng chính.",
  },
  {
    id: "member-2",
    name: "Trần Văn B",
    role: "Kỹ sư AI & Backend",
    bio: "Chuyên gia về Machine Learning và phát triển hệ thống AI. Tốt nghiệp Đại học Bách Khoa Hà Nội.",
    email: "tranb@manh.vn",
    responsibility: "Phát triển logic AI, xây dựng backend, tối ưu hóa hệ thống phân tích năng lượng.",
  },
  {
    id: "member-3",
    name: "Phạm Hương C",
    role: "Product & Design",
    bio: "Product Designer với 3 năm kinh nghiệm thiết kế UX/UI. Đam mê trải nghiệm người dùng.",
    email: "phamc@manh.vn",
    responsibility: "Thiết kế giao diện, xây dựng trải nghiệm người dùng, nghiên cứu thị trường.",
  },
  {
    id: "member-4",
    name: "Lê Minh D",
    role: "Chuyên gia trang sức",
    bio: "Chuyên gia trang sức với 8 năm kinh nghiệm. Hiểu biết sâu về ý nghĩa và đặc tính của các loại đá.",
    email: "mind@manh.vn",
    responsibility: "Chọn lựa đá, tạo công thức vòng tay, kiểm chất lượng sản phẩm.",
  },
  {
    id: "member-5",
    name: "Hoàng Thu E",
    role: "Marketing & Community",
    bio: "Chuyên gia marketing kỹ thuật số. Xây dựng cộng đồng và chiến lược phát triển thương hiệu.",
    email: "hoange@manh.vn",
    responsibility: "Phát triển chiến lược marketing, xây dựng cộng đồng, quản lý mạng xã hội.",
  },
]
