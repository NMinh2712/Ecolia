# Hướng Dẫn Setup Chatbot Ecolia

## 📋 Yêu Cầu

1. **Gemini API Key** - Lấy từ [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Qdrant** - Vector database. Setup local hoặc cloud

## 🚀 Setup

### 1. Cấu Hình Environment Variables

Thêm vào file `.env.local`:

```env
# Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Qdrant Configuration
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=
```

### 2. Cài Đặt Qdrant (Local)

#### Sử dụng Docker:
```bash
docker run -p 6333:6333 qdrant/qdrant
```

#### Hoặc tải từ: https://github.com/qdrant/qdrant/releases

### 3. Khởi Tạo Dữ Liệu

Truy cập endpoint này để load dữ liệu mẫu:

```bash
# Initialize data
curl http://localhost:3000/api/seed-data -X POST

# Check status
curl http://localhost:3000/api/seed-data

# Force reinitialize
curl http://localhost:3000/api/seed-data?force=true -X POST
```

## 🧪 Testing

### 1. Chatbot UI
- Mở http://localhost:3000
- Click nút chat ở góc dưới phải
- Hỏi các câu hỏi về Ecolia

### Ví dụ câu hỏi:
- "Chậu cây EcoGreen là gì?"
- "Chậu cây phân hủy trong bao lâu?"
- "Ecolia có những sản phẩm nào?"
- "Quy trình sản xuất như thế nào?"

### 2. API Testing

#### Search and Generate
```bash
curl -X POST http://localhost:3000/api/qdrant-gemini \
  -H "Content-Type: application/json" \
  -d '{
    "action": "search-and-generate",
    "query": "Chậu cây EcoGreen là gì?",
    "limit": 3
  }'
```

#### Embed and Store
```bash
curl -X POST http://localhost:3000/api/qdrant-gemini \
  -H "Content-Type: application/json" \
  -d '{
    "action": "embed-and-store",
    "text": "Your custom document text here"
  }'
```

#### Search Only
```bash
curl -X POST http://localhost:3000/api/qdrant-gemini \
  -H "Content-Type: application/json" \
  -d '{
    "action": "search",
    "query": "Ecolia products",
    "limit": 5
  }'
```

## 📊 Debugging

### Xem Logs
Console sẽ hiển thị logs chi tiết:
```
[2024-01-14T10:30:45.123Z] [CHATBOT] search-and-generate: Request received
[2024-01-14T10:30:45.234Z] [CHATBOT] search-and-generate: Generating embedding for query
...
```

### Kiểm Tra Qdrant Dashboard
- Mở http://localhost:6333/dashboard (nếu dùng Qdrant Cloud)
- Hoặc sử dụng Qdrant CLI

## 🔧 Cấu Hình Advanced

### Thay Đổi Timeout
File: `app/api/qdrant-gemini/route.ts`
```typescript
const REQUEST_TIMEOUT = 30000; // 30 seconds
```

### Thêm Nhiều Tài Liệu
Edit file `app/api/seed-data/route.ts` và thêm vào array `SEED_DOCUMENTS`

### Tối Ưu Hóa Vector Size
File: `lib/qdrant-client.ts`
```typescript
export async function ensureCollectionExists(
  collectionName: string,
  vectorSize: number = 768  // Change here
)
```

## 📝 Tính Năng

✅ **Chatbot tích hợp** - Widget chat nổi trên trang
✅ **Search by embedding** - Tìm kiếm ngữ cảnh liên quan
✅ **AI Response** - Phản hồi tự động từ Gemini
✅ **Source References** - Hiển thị nguồn tài liệu
✅ **Error Handling** - Xử lý lỗi chi tiết
✅ **Chat History** - Lưu lịch sử cuộc trò chuyện
✅ **Typing Indicator** - Biểu thị đang xử lý
✅ **Vietnamese Optimized** - Tối ưu cho tiếng Việt

## 🐛 Troubleshooting

### "GEMINI_API_KEY is not set"
- Kiểm tra file `.env.local`
- Restart dev server: `npm run dev`

### "Cannot connect to Qdrant"
- Kiểm tra Qdrant đang chạy
- Kiểm tra port 6333 không bị chặn
- Hoặc dùng cloud Qdrant

### "No search results found"
- Gọi endpoint `/api/seed-data` để load dữ liệu
- Sử dụng `?force=true` để reinitialize

### Timeout Errors
- Tăng `REQUEST_TIMEOUT` trong route.ts
- Kiểm tra network connection
- Kiểm tra API limits

## 📚 Tài Liệu

- [Google Gemini API](https://ai.google.dev/docs)
- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## 🤝 Support

Nếu gặp vấn đề:
1. Kiểm tra logs trong console
2. Kiểm tra network requests (F12)
3. Test API endpoints trực tiếp
4. Kiểm tra environment variables
