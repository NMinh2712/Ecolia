# Hero Section 2026 - Quick Start & Testing Guide

## 🚀 Quick Start

### Prerequisites
```bash
cd d:\2026\SP\EXE\Manhgems
npm install  # If dependencies need updating
npm run dev  # Start development server
```

### Access the Hero Section
Open your browser to: `http://localhost:3000`

The Hero Section will be the first component visible on the home page, covering the full viewport with animations.

---

## 🧪 Testing Checklist

### Visual Elements
- [ ] **Logo "MẢNH"** - Large text with gradient (brown → gold → pink)
  - Expected: Glowing gradient effect, underline accent visible
  - Location: Center top of section

- [ ] **Subtitle "Mảnh ghép của riêng bạn"** - Words appear one by one
  - Expected: Each word fades in with 0.2s delay between them
  - Timing: Total 1 second to complete all 5 words
  - Font: Italic, light brown color

- [ ] **Description Text** - "Mỗi chiếc vòng tay không chỉ là..."
  - Expected: Slides up with fade animation
  - Color: Gold (energy-gold/80)
  - Width: Max 3 columns on desktop, full width on mobile

### Interactive Elements

- [ ] **Primary Button "Khám Phá Với AI"** 
  - **Default State**:
    - Gradient background (gold → cream/pink)
    - White text with Sparkles icon and arrow
    - Rounded pill shape
  - **Hover State**:
    - Scales up to 110% size
    - Golden glow shadow appears: `0 0 40px rgba(198, 162, 93, 0.6)`
    - Arrow slides right with `translate-x-1`
  - **Tooltip**:
    - Text: "Chỉ 2 phút để khám phá mảnh ghép của bạn ✨"
    - Color: Brown background, white text
    - Position: Below button with arrow pointer
    - Animation: Fade in with tooltip
  - **Click Action**:
    - Navigate to `/ai-intro` page
    - Check URL changes to `http://localhost:3000/ai-intro`

- [ ] **Secondary Button "Xem Bộ Sưu Tập"**
  - **Default State**:
    - Outlined button with gold border
    - Brown text
  - **Hover State**:
    - Scales up to 105%
    - Light gradient background (gold/10 → pink/10) appears
    - Text color stays brown
  - **Click Action**:
    - Navigate to `/shop` page
    - Check URL changes to `http://localhost:3000/shop`

### Background Effects

- [ ] **Mouse-Follow Blur Orb**
  - **Behavior**: Large blurred circle follows your cursor
  - **Color**: Gradient from gold to pink
  - **Opacity**: Very subtle (15%), doesn't interfere with text
  - **Motion**: Smooth 300ms transition lag
  - **Test**: Move cursor around - orb should follow smoothly
  - **Note**: Only visible when moving cursor inside the section

- [ ] **Animated Background Circles**
  - **Elements**: 3 floating circles (gold, pink, brown)
  - **Position**: Scattered around background
  - **Animation**: Gentle vertical floating (±10px range)
  - **Duration**: 4 seconds per cycle with staggered starts (0s, 1s, 2s)
  - **Opacity**: 60% for subtle effect

- [ ] **Gradient Overlay Bottom**
  - **Position**: Bottom of section
  - **Effect**: Smooth fade from accent-cream to transparent
  - **Purpose**: Creates seamless transition to next section

### Product Showcase

- [ ] **Bracelet Visual - Rotating Gem**
  - **Outer Ring**:
    - Circular gradient (gold → pink)
    - Animation: 360° rotation with glow pulse (4s)
    - Opacity: 30% for subtlety
  
  - **Inner Glow**:
    - White semi-transparent circular container
    - Backdrop blur effect
    - Animation: Gentle float up/down (4s cycle)
  
  - **Diamond Gem Emoji (💎)**:
    - Large emoji (text-7xl)
    - Animation: Slow continuous rotation (8s) - NEW!
    - Color: White on blurred background
  
  - **Decorative Points**:
    - 4 small circles at cardinal positions (top, bottom, left, right)
    - Colors: Gold (top), Pink (bottom), Brown (right), Cream (left)
    - Size: 8px diameter circles
  
  - **Description Text**:
    - "AI sẽ tạo chiếc vòng tay dành riêng cho năng lượng của bạn ✨"
    - Font: Smaller, light gray
    - Animation: Fade in with 0.4s delay

### Scroll Indicator

- [ ] **Bottom Scroll Guide**
  - **Position**: Bottom center of section, 40px from bottom
  - **Style**: Unfilled rounded rectangle with small pulsing dot inside
  - **Color**: Energy-gold
  - **Animation**: Continuous bounce (1s cycle)
  - **Purpose**: Encourages user to scroll down to see more content

---

## 📱 Responsive Testing

### Mobile (iPhone 375px width)
- [ ] Text sizes scale down appropriately
- [ ] Logo: 7xl font size (vs 8xl desktop)
- [ ] Subtitle: 4xl font size (vs 5xl desktop)
- [ ] CTA buttons: Stack vertically with full width
- [ ] Buttons: Smaller padding maintains tap-friendly size (44px+ recommended)
- [ ] Bracelet showcase: Centered, takes appropriate width
- [ ] Tooltip: Positions correctly without overflow
- [ ] No horizontal scroll

### Tablet (iPad 768px width)
- [ ] Elements scale proportionally
- [ ] CTA buttons may flex horizontally (depends on gap)
- [ ] Layout remains centered

### Desktop (1920px width)
- [ ] Full gradient and animation effects visible
- [ ] Blur orb movement smooth at high refresh rates
- [ ] All decorative elements visible without clipping

---

## 🎬 Animation Performance Testing

### Animation Timing
- [ ] **Logo Fade**: ~0.6s smooth entrance
- [ ] **Subtitle Words**: Each word appears after 0.2s increments
  - Word 1 ("Mảnh"): 0.2s delay
  - Word 2 ("ghép"): 0.4s delay
  - Word 3 ("của"): 0.6s delay
  - Word 4 ("riêng"): 0.8s delay
  - Word 5 ("bạn"): 1.0s delay
- [ ] **Description Slide**: ~0.7s slide up animation
- [ ] **Button Entrance**: ~0.8s bounce-in effect
- [ ] **Bracelet Showcase**: 0.4s fade delay
- [ ] **Background Circles**: Continuous 4s float animations with staggered starts

### Animation Smoothness
- [ ] Use Chrome DevTools Performance tab (F12 → Performance)
- [ ] Record 5-second session while hovering mouse and scrolling
- [ ] Check FPS: Should maintain 60 FPS (or 120 FPS on high-refresh monitors)
- [ ] No frame drops or stuttering when:
  - Moving cursor around section
  - Hovering over buttons
  - Scrolling page
  - Animations playing simultaneously

### Performance Metrics
- [ ] First Contentful Paint (FCP): < 2s
- [ ] Largest Contentful Paint (LCP): < 3s
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Time to Interactive (TTI): < 3.5s

---

## 🎨 Visual Quality Checks

### Color Accuracy
- [ ] **Healing Brown** (#8c6a4a): Warm, earthy tone
- [ ] **Energy Gold** (#c6a25d): Warm, energetic accent
- [ ] **Accent Pink** (#e8d5d1: Soft, calming pink
- [ ] **Accent Cream** (#f9f5f1): Very light background
- [ ] Gradients blend smoothly without banding artifacts

### Font Rendering
- [ ] **Logo "MẢNH"**: Vietnamese characters render correctly
  - Accent marks clear and properly positioned
  - No fuzzy or blurry text
- [ ] **Subtitle "ghép"**: Vietnamese text clear
- [ ] **All text**: Clear, readable, no rendering artifacts
- [ ] Font family: Be Vietnam Pro (serif) for headers

### Shadow & Glow Effects
- [ ] **Button Glow**: Visible golden glow on hover
  - Glow color: `rgba(198, 162, 93, 0.6)` (semi-transparent gold)
  - Spread: ~40px (looks balanced)
- [ ] **Logo Drop Shadow**: Subtle depth effect
- [ ] **Blur Orb**: Smooth gradient blend without harsh edges

---

## 🔧 Developer Testing

### Console Check
```javascript
// Open DevTools (F12) and check Console tab
// Should see no errors or warnings
```

### Component Props
- [ ] HeroSection receives no required props
- [ ] All state managed internally
- [ ] Links properly point to `/ai-intro` and `/shop`

### CSS Classes
- [ ] All animation classes exist in [app/globals.css](app/globals.css)
  - `animate-fadeIn` ✅
  - `animate-float-gentle` ✅
  - `animate-slideInUp` ✅
  - `animate-bounce-in` ✅
  - `animate-rotate-glow` ✅
  - `animate-spin-slow` ✅ (NEW)

### TypeScript Check
- Run `npm run build` to verify no TypeScript errors:
```bash
cd d:\2026\SP\EXE\Manhgems
npm run build
```

### Browser DevTools
- [ ] No 404 errors for images/icons
- [ ] No memory leaks (check heap after visiting section multiple times)
- [ ] Event listeners properly cleaned up on unmount

---

## 🐛 Troubleshooting

### Issue: Blur Orb Not Following Mouse
**Solution**: Check that `containerRef` is properly attached to section element. Verify mouse event listener is registered.

### Issue: Animations Not Smooth
**Solution**: 
- Check browser GPU acceleration is enabled
- Close other heavy applications
- Test in different browser (Chrome vs Firefox vs Safari)
- Check for CSS conflicts in DevTools Computed tab

### Issue: Text Rendering Garbled (Vietnamese Characters)
**Solution**:
- Verify `next/font/google` imports Be Vietnam Pro correctly
- Check `lang="vi"` attribute on `<html>` tag (or ensure UTF-8 meta tag)
- Clear browser cache and reload

### Issue: Tooltip Not Appearing
**Solution**: 
- Hover over primary button (not secondary)
- Check `showTooltip` state in React DevTools
- Verify onMouseEnter/onMouseLeave handlers fire

### Issue: Button Links Not Working
**Solution**:
- Check routing in Next.js (pages should exist at `/ai-intro` and `/shop`)
- Verify `next/link` import is correct
- Check browser console for navigation errors

---

## 📊 Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Gradients | ✅ | ✅ | ✅ | ✅ |
| Backdrop Blur | ✅ | ✅ | ✅ | ✅ |
| CSS Animations | ✅ | ✅ | ✅ | ✅ |
| Emoji Rendering | ✅ | ✅ | ✅ | ✅ |
| Mouse Events | ✅ | ✅ | ✅ | ✅ |
| Transform 3D | ✅ | ✅ | ✅ | ✅ |

---

## 📝 Session Notes

**Test Date**: _____________  
**Tester Name**: _____________  
**Browser**: _____________  
**Device**: _____________  
**Screen Size**: _____________  

### Observations
_________________________________________________________________

### Issues Found
1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

### Recommendations
_________________________________________________________________

---

## ✅ Final Sign-Off

- [ ] All visual elements render correctly
- [ ] All animations play smoothly (60 FPS)
- [ ] All interactive elements respond to user input
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No console errors
- [ ] No broken links
- [ ] Component ready for production deployment

---

**Hero Section 2026 Status**: Ready for Testing ✨
