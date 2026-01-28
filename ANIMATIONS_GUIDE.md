# 🎨 MẢNH Animations Guide

## Tổng Quan Animations

Chúng tôi đã tích hợp các animations hiện đại vào toàn website để tạo trải nghiệm mượt mà, sống động, nhưng vẫn giữ vibe chữa lành và thanh nhã.

---

## 📦 Các Loại Animations Sẵn Có

### 1. **Fade In** - Làm mờ dần từ vô hình đến hiện
```tsx
<div className="animate-fadeIn">Nội dung</div>
```
- **Khi dùng**: Khi load section mới, heading, subtitle
- **Thời gian**: 0.6s
- **Easing**: ease-in-out

### 2. **Slide In Up** - Trượt lên từ dưới
```tsx
<div className="animate-slideInUp">Nội dung</div>
```
- **Khi dùng**: Cho text, button, card khi scroll vào view
- **Thời gian**: 0.7s
- **Easing**: ease-out

### 3. **Slide In Down** - Trượt xuống từ trên
```tsx
<div className="animate-slideInDown">Nội dung</div>
```
- **Khi dùng**: Cho header nav item, badge
- **Thời gian**: 0.7s
- **Easing**: ease-out

### 4. **Scale In** - Phóng to từ nhỏ
```tsx
<div className="animate-scaleIn">Nội dung</div>
```
- **Khi dùng**: Cho dialog, modal, popup lần đầu xuất hiện
- **Thời gian**: 0.5s
- **Easing**: ease-out

### 5. **Float In** - Lơ lửng nhẹ từ dưới
```tsx
<div className="animate-floatIn">Nội dung</div>
```
- **Khi dùng**: Cho hero element, product card
- **Thời gian**: 0.8s
- **Easing**: ease-out

### 6. **Bounce In** - Nhảy vào như quả bóng
```tsx
<div className="animate-bounce-in">Nội dung</div>
```
- **Khi dùng**: Cho call-to-action button, form input
- **Thời gian**: 0.8s
- **Easing**: cubic-bezier(0.34, 1.56, 0.64, 1)

### 7. **Glow Pulse** - Tỏa sáng nhẹ (Energy-Gold)
```tsx
<div className="animate-glow-pulse">Nội dung</div>
```
- **Khi dùng**: Cho jewelry product, selected button, active state
- **Thời gian**: 3s
- **Easing**: ease-in-out infinite
- **Hiệu ứng**: box-shadow + scale nhẹ

### 8. **Float Gentle** - Lơ lửng mềm liên tục
```tsx
<div className="animate-float-gentle">Nội dung</div>
```
- **Khi dùng**: Cho blur circle, icon, product emoji
- **Thời gian**: 4s
- **Easing**: ease-in-out infinite
- **Hiệu ứng**: translateY liên tục ±10px

### 9. **Shimmer** - Thoáng sáng (Shimmer effect)
```tsx
<div className="animate-shimmer">Nội dung</div>
```
- **Khi dùng**: Cho product image, premium feel
- **Thời gian**: 2s
- **Hiệu ứng**: Gradient dịch từ trái sang phải

### 10. **Rotate Glow** - Xoay + Tỏa sáng
```tsx
<div className="animate-rotate-glow">Nội dung</div>
```
- **Khi dùng**: Cho icon sản phẩm khi hover
- **Thời gian**: 4s
- **Easing**: ease-in-out infinite
- **Hiệu ứng**: Xoay 360° + glow pulse

### 11. **Text Reveal** - Lộ dần từ trái sang phải
```tsx
<div className="animate-text-reveal">Nội dung</div>
```
- **Khi dùng**: Cho hero title chính
- **Thời gian**: 0.8s
- **Easing**: ease-out

### 12. **Stagger In** - Lộ dần lẫn trượt lên
```tsx
<div className="animate-stagger-in">Nội dung</div>
```
- **Khi dùng**: Cho product card trong grid
- **Thời gian**: 0.8s
- **Easing**: ease-out

---

## 🎯 Stagger Container - Animation Tuần Tự

Dùng class `stagger-container` để animate children elements theo thứ tự:

```tsx
<div className="stagger-container">
  <div className="animate-stagger-in">Item 1 (delay 0.1s)</div>
  <div className="animate-stagger-in">Item 2 (delay 0.2s)</div>
  <div className="animate-stagger-in">Item 3 (delay 0.3s)</div>
  {/* Tối đa 5 items, mỗi item +0.1s delay */}
</div>
```

**Ví dụ thực tế trong shop/page.tsx:**
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
  {filteredProducts.map((product) => (
    <div key={product.id} className="animate-stagger-in">
      {/* Product Card */}
    </div>
  ))}
</div>
```

---

## 💎 Product Card Hover Effects

Khi hover vào product card, sẽ kích hoạt nhiều hiệu ứng:

```tsx
<div className="product-card-hover group">
  {/* Image */}
  <div className="group-hover:animate-rotate-glow">
    {/* Emoji icon */}
  </div>
  
  {/* Title */}
  <h3 className="group-hover:text-energy-gold transition-colors">
    {product.name}
  </h3>
  
  {/* Price */}
  <p className="group-hover:text-accent-pink transition-colors">
    {price}đ
  </p>
</div>
```

**Các hiệu ứng kích hoạt:**
1. ✨ Glow + Scale (product card)
2. 🌀 Rotate Glow (emoji icon)
3. 🎨 Color transition (heading: → energy-gold)
4. 💝 Color transition (price: → accent-pink)
5. 📍 Translate X (CTA text: trượt phải)

---

## 📌 Text Glow Classes

Để làm cho text tỏa sáng:

```tsx
{/* Glow nhẹ */}
<h1 className="text-glow">Tiêu đề nhẹ</h1>

{/* Glow mạnh */}
<h1 className="text-glow-intense">Tiêu đề mạnh</h1>
```

---

## 🎬 Hero Section Animations

Dành cho trang chủ / hero sections:

```tsx
<section className="particles-bg">
  <h1 className="hero-title text-glow-intense">MẢNH</h1>
  <p className="hero-subtitle">Mảnh ghép của riêng bạn</p>
  <div className="animate-bounce-in">
    <button className="cta-button-gold">Khám Phá</button>
  </div>
  
  {/* Blur circles */}
  <div className="blur-circle animate-float-gentle" />
  <div 
    className="blur-circle animate-float-gentle" 
    style={{ animationDelay: "1s" }} 
  />
</section>
```

**Các parts:**
- `hero-title` → `text-reveal` animation
- `hero-subtitle` → `fadeIn` animation (delay 0.2s)
- Button → `bounce-in` animation
- Blur circles → `float-gentle` animation (staggered)

---

## 🎮 Hover State Animations

Thêm micro-interactions vào buttons và links:

```tsx
{/* Button hover */}
<button className="hover:scale-105 hover:shadow-lg transition-all duration-300">
  Khám Phá
</button>

{/* Link hover - underline */}
<Link className="relative group">
  Navigation Item
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-energy-gold group-hover:w-full transition-all duration-300" />
</Link>

{/* Card hover */}
<div className="hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
  <h3 className="group-hover:text-energy-gold transition-colors">Title</h3>
</div>
```

---

## 🌊 Particles Background

Tạo hiệu ứng particle-like ở background:

```tsx
<section className="particles-bg">
  {/* Content */}
</section>
```

**Hiệu ứng:**
- Radial gradient nhẹ (energy-gold + accent-pink)
- `float-gentle` animation
- Tạo chiều sâu mà không quá flashy

---

## ⚡ Animation Delays

Để stagger animations thủ công:

```tsx
{/* Delay 0s (default) */}
<div className="animate-fadeIn">Item 1</div>

{/* Delay 0.1s */}
<div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
  Item 2
</div>

{/* Delay 0.2s */}
<div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
  Item 3
</div>
```

---

## 🎯 Best Practices

### ✅ DO:
1. **Dùng animation cho entrance** (khi element xuất hiện)
2. **Dùng transition cho hover/state change** (smooth)
3. **Stagger animations** trong list/grid (mịn hơn)
4. **Respectful với tốc độ** (không quá nhanh, 0.5-1s thường tốt)
5. **Test trên mobile** (animation mượt không?)

### ❌ DON'T:
1. ❌ Quá nhiều animation (gây choáng)
2. ❌ Animation quá nhanh (< 0.3s gây chóng mặt)
3. ❌ Animation quá lâu (> 2s gây chán)
4. ❌ Animation cho mọi element (chỉ key elements)
5. ❌ Quên test accessibility (prefers-reduced-motion)

---

## 📱 Mobile Optimization

Trên mobile, hãy:
1. Giảm animation complexity (bỏ shimmer, giữ fade-in)
2. Tăng animation delay (user xử lý touch, không hover)
3. Disable animation nếu user set `prefers-reduced-motion`

```tsx
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔧 Tùy Chỉnh Animations

Trong `app/globals.css`, bạn có thể:

1. **Sửa keyframes:**
   ```css
   @keyframes fadeIn {
     from { opacity: 0; transform: translateY(10px); }
     to { opacity: 1; transform: translateY(0); }
   }
   ```

2. **Thêm animation mới:**
   ```css
   @keyframes my-custom {
     0% { /* start */ }
     50% { /* middle */ }
     100% { /* end */ }
   }

   .animate-my-custom {
     animation: my-custom 0.8s ease-out;
   }
   ```

3. **Thêm timing:**
   ```css
   .animate-slow {
     animation-duration: 2s;
   }

   .animate-fast {
     animation-duration: 0.3s;
   }
   ```

---

## 📚 Tóm Tắt Quick Reference

| Class | Thời gian | Khi dùng |
|-------|----------|---------|
| `animate-fadeIn` | 0.6s | Load section, heading |
| `animate-slideInUp` | 0.7s | Text, card, button |
| `animate-slideInDown` | 0.7s | Header, nav, badge |
| `animate-scaleIn` | 0.5s | Modal, dialog, popup |
| `animate-floatIn` | 0.8s | Hero, large element |
| `animate-bounce-in` | 0.8s | CTA, form input |
| `animate-glow-pulse` | 3s ∞ | Product, selected state |
| `animate-float-gentle` | 4s ∞ | Icon, blur, gentle motion |
| `animate-shimmer` | 2s | Product image premium feel |
| `animate-rotate-glow` | 4s ∞ | Icon hover, product emoji |
| `animate-text-reveal` | 0.8s | Hero title |
| `animate-stagger-in` | 0.8s | Grid items (+ delay) |

---

## 🎨 Color Integration

Các animations dùng MẢNH brand colors:
- **Primary Glow**: `rgba(198, 162, 93, 0.3)` → 0.6 (energy-gold)
- **Secondary**: `rgba(232, 213, 209, 0.1)` (accent-pink)
- **Text Color**: healing-brown (#8c6a4a)

---

## 🚀 Next Steps

1. **Verify animations work** trên tất cả pages
2. **Test responsive** (mobile/tablet/desktop)
3. **Optimize performance** (check FPS trên mobile)
4. **A/B test** nếu cần (user preference?)
5. **Document custom animations** nếu thêm

---

Enjoy the smooth, healing animations! ✨💎
