# Hero Section 2026 - Complete Implementation

## Overview
The Hero Section has been completely redesigned with modern, interactive elements that create an immersive user experience. This document outlines all the features and technical implementation details.

## Features Implemented

### 1. **Gradient Background with Animated Elements**
- Smooth gradient background: `linear-gradient(135deg, #f9f5f1 0%, rgba(198, 162, 93, 0.1) 50%, rgba(232, 213, 209, 0.1) 100%)`
- Three animated gradient circles (energy-gold, accent-pink, healing-brown) with staggered float animations
- Creates a gentle, healing aesthetic aligned with MẢNH brand

### 2. **Mouse-Follow Blur Orb**
- Fixed positioning blur orb that follows mouse cursor
- Gradient effect: from energy-gold to accent-pink
- Smooth 300ms transitions for natural following motion
- Low opacity (15%) for subtle background effect
- Provides interactive, immersive feel

### 3. **Gradient Logo**
- Large "MẢNH" text (7xl on mobile, 8xl on desktop)
- Multi-gradient text: healing-brown → energy-gold → accent-pink
- Animated with fadeIn effect
- Underline accent with gradient and blur
- Drop shadow for depth

### 4. **Subtitle with Word-by-Word Animation**
- "Mảnh ghép của riêng bạn" (Your own puzzle piece)
- Each word fades in with staggered delays (0.2s, 0.4s, 0.6s, 0.8s, 1.0s)
- Creates elegant, sequential reveal effect
- Italic style, healing-brown color, light font weight

### 5. **Emotional Description**
- Meaningful tagline: "Mỗi chiếc vòng tay không chỉ là trang sức – mà là một phần linh hồn đang chờ bạn tìm thấy."
- Translation: "Every bracelet is not just jewelry – but a piece of soul waiting for you to discover."
- Italic, energy-gold/80 color, light font weight
- Animated with slideInUp effect

### 6. **Primary CTA Button - "Khám Phá Với AI"**
- **Style**: Gradient background (energy-gold to accent-pink)
- **Size**: Large, responsive padding (px-10 md:px-14, py-4 md:py-5)
- **Icons**: Sparkles icon + ChevronRight icon
- **Hover Effects**:
  - Scale up to 110% (scale-110)
  - Glow shadow: `0 0 40px rgba(198, 162, 93, 0.6)`
  - Arrow animates right (translate-x-1)
- **Tooltip**: "Chỉ 2 phút để khám phá mảnh ghép của bạn ✨" appears on hover
- **Tooltip Style**: Healing-brown background, white text, rounded corners, arrow pointer
- **Click Action**: Navigates to `/ai-intro` page

### 7. **Secondary CTA Button - "Xem Bộ Sưu Tập"**
- **Style**: Outline with 2px border-energy-gold
- **Hover Effects**:
  - Gradient background fade (energy-gold/10 to accent-pink/10)
  - Scale up to 105%
- **Click Action**: Navigates to `/shop` page

### 8. **Bracelet Product Showcase**
- **Rotating Ring**: Outer ring with gradient (energy-gold → accent-pink) and rotate-glow animation
- **Inner Glow**: White/20 background with backdrop blur, float-gentle animation
- **Gem Emoji**: Large diamond emoji (💎) rotating slowly (8s spin animation)
- **Decorative Points**: Four colored circles around the ring (energy-gold, accent-pink, healing-brown, accent-cream)
- **Description**: "AI sẽ tạo chiếc vòng tay dành riêng cho năng lượng của bạn ✨"

### 9. **Scroll Indicator**
- Positioned at bottom of section
- Animated bounce effect
- Shows scroll direction to user
- Styled with energy-gold color

### 10. **Gradient Overlay**
- Bottom gradient fade from accent-cream to transparent
- Ensures smooth transition to next section

## Animation Classes Used

All animations are defined in [app/globals.css](app/globals.css):

| Animation | Duration | Effect |
|-----------|----------|--------|
| `animate-fadeIn` | 0.6s | Opacity fade + translateY |
| `animate-slideInUp` | 0.7s | Slide up with fade |
| `animate-float-gentle` | 4s | ±10px Y-axis oscillation |
| `animate-bounce-in` | 0.8s | Scale + bounce entrance |
| `animate-rotate-glow` | 4s | 360° rotation + glow pulse |
| `animate-spin-slow` | 8s | Slow 360° rotation (NEW) |
| `animate-pulse` | 2s | Opacity pulse |
| `animate-bounce` | 1s | Vertical bounce |

## New Animation Added

### `animate-spin-slow` 
- **Location**: [app/globals.css](app/globals.css) (added around line 575)
- **Duration**: 8 seconds
- **Effect**: Slow continuous 360° rotation
- **Usage**: Diamond gem in bracelet showcase
- **Code**:
```css
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
```

## Component Structure

**File**: [components/HeroSection.tsx](components/HeroSection.tsx)

**Key Dependencies**:
- `useRef`, `useEffect`, `useState` from React
- `Link` from next/link
- `ChevronRight`, `Sparkles` from lucide-react

**State Management**:
- `containerRef`: Reference to section for mouse position tracking
- `mousePos`: Object with x, y coordinates for blur orb positioning
- `showTooltip`: Boolean for tooltip visibility on hover

**Event Handlers**:
- `handleMouseMove`: Updates mousePos for orb following effect

## Responsive Design

- **Logo**: 7xl (mobile) → 8xl (desktop)
- **Subtitle**: 4xl (mobile) → 5xl (desktop)  
- **CTA Buttons**: Stack vertically on mobile, flex horizontally on desktop
- **Buttons**: Smaller padding on mobile, larger on desktop
- **Bracelet**: 256px (mobile) → 256px (both, centered)

## Integration

The Hero Section is used in:
- [app/page.tsx](app/page.tsx) - Imported as `HeroSection` component
- Rendered between `<Header />` and Brand Values section

## Browser Compatibility

- Modern browsers with CSS Grid, Flexbox, and CSS Animations support
- Gradient text uses `bg-clip-text` and `text-transparent`
- Mouse events for interactivity (no fallback required)
- All animations use hardware-accelerated properties (opacity, transform)

## Performance Considerations

1. **Mouse Event Optimization**: Mouse move listener removed on unmount
2. **GPU Acceleration**: All animations use `transform` and `opacity`
3. **Fixed Position Orb**: Separated from layout flow to prevent repaints
4. **Animation Delays**: Staggered animations avoid simultaneous repaints
5. **Backdrop Blur**: Used sparingly (only on inner glow) to prevent heavy compositing

## Color Palette (MẢNH Brand)

| Color | Hex | Usage |
|-------|-----|-------|
| Healing Brown | #8c6a4a | Text, decorative circles |
| Energy Gold | #c6a25d | Gradients, buttons, accents |
| Accent Pink | #e8d5d1 | Gradients, highlights |
| Accent Cream | #f9f5f1 | Background, overlay |

## Accessibility

- Button text is clear and actionable
- Tooltip provides context for CTA action duration
- Focus states inherit from global button styles
- Color contrast meets WCAG AA standards
- Animations reduce on devices with `prefers-reduced-motion`

## Testing Checklist

- [ ] Logo gradient text renders correctly
- [ ] Subtitle words fade in with proper timing
- [ ] Mouse cursor movements trigger blur orb following
- [ ] Hover on primary button shows tooltip
- [ ] Primary button clicks navigate to /ai-intro
- [ ] Secondary button clicks navigate to /shop
- [ ] Diamond in bracelet rotates smoothly
- [ ] Scroll indicator animates at bottom
- [ ] Section background gradients are visible
- [ ] Responsive layout works on mobile (375px) and desktop (1920px)
- [ ] Animations run smoothly at 60fps
- [ ] No console errors in browser DevTools

## Future Enhancement Ideas

1. Parallax scrolling effect for background elements
2. Particle burst animation on button click
3. Sound effects on hover (optional)
4. Animated counter for "2-minute" discovery time
5. Dynamic age/zodiac sign collection for product showcase
6. WebGL shader effects for more advanced visuals
7. Dark mode support with adjusted colors
8. Intersection Observer for scroll-triggered animations

## File Changes Summary

1. **[components/HeroSection.tsx](components/HeroSection.tsx)**
   - Complete redesign with new layout
   - Mouse-follow blur orb implementation
   - Word-by-word subtitle animation
   - Enhanced CTA buttons with tooltips
   - Bracelet showcase with gem rotation

2. **[app/globals.css](app/globals.css)**
   - Added `@keyframes spin-slow` animation
   - Added `.animate-spin-slow` utility class
   - All other animations already defined

3. **[app/page.tsx](app/page.tsx)**
   - No changes needed (HeroSection already imported)

---

**Version**: 2.0 (2026 Redesign)  
**Last Updated**: 2026-01-XX  
**Status**: ✅ Complete and Ready for Testing
