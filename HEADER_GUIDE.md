# 🎯 Header Enhancement Guide

## Overview

Header component đã được cập nhật với:
- ✨ Gradient background + backdrop blur
- 🌟 AI Reading page highlight badge
- 🔗 Animated underline navigation
- 💎 Glow effect khi hover
- 📱 Mobile-responsive design

---

## 🎨 Visual Design

### Desktop View
```
┌────────────────────────────────────────────────────────────┐
│  [MẢNH Logo]     Trải Nghiệm AI | Sản Phẩm | Về Chúng Tôi │
│                                                   ← Glow    │
└────────────────────────────────────────────────────────────┘
```

### AI Reading Page - Desktop View
```
┌────────────────────────────────────────────────────────────┐
│  [MẢNH Logo] ✨     ✨ AI Reading          Trải Nghiệm AI... │
│    [glow aura]      [pulse badge]                          │
│                                              ← Strong glow  │
└────────────────────────────────────────────────────────────┘
```

### Mobile View
```
┌──────────────────────────┐
│ [Logo] ☰                 │  ← Hamburger menu
└──────────────────────────┘
  ▼ (when open)
┌──────────────────────────┐
│ Trải Nghiệm AI           │
│ Sản Phẩm                 │
│ Về Chúng Tôi             │
│ Nhóm                     │
└──────────────────────────┘
```

---

## 🔧 Implementation Details

### File Location
```
components/Header.tsx
```

### Key Updates

#### 1. **Dynamic Path Detection**
```tsx
import { usePathname } from "next/navigation"

const pathname = usePathname()
const isAIReading = pathname === "/ai-reading" || 
                    pathname === "/ai-processing" || 
                    pathname === "/ai-result" || 
                    pathname.startsWith("/ai-")
```

Automatically detects when user is on AI Reading flow.

#### 2. **Gradient Background**
```tsx
className="bg-gradient-to-r from-accent-cream/85 to-white/85"
```
- Subtle gradient: accent-cream (85% opacity) → white (85% opacity)
- Smooth, não quá tối

#### 3. **Backdrop Blur**
```tsx
className="backdrop-blur-lg"
```
- Creates frosted glass effect
- Content behind header slightly blurred
- Modern, professional look

#### 4. **Glow Effect on AI Pages**
```tsx
style={isAIReading ? { 
  boxShadow: "0 0 20px rgba(198, 162, 93, 0.15)" 
} : {}}
```
- Conditional glow shadow
- Only when on AI Reading pages
- 20px radius, 15% opacity

#### 5. **Logo Enhancements**
```tsx
<div className="relative">
  <Image {...}
    className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
  />
  {isAIReading && (
    <div className="absolute inset-0 rounded-full bg-energy-gold/20 animate-pulse group-hover:animate-glow-pulse"></div>
  )}
</div>
```

**Features:**
- Logo scales 110% on hover
- Glow aura circle (energy-gold/20) appears on AI pages
- Aura pulses continuously
- Aura glows stronger on hover

#### 6. **AI Reading Badge**
```tsx
{isAIReading && (
  <span className="ml-2 text-xs md:text-sm bg-gradient-to-r from-energy-gold to-accent-pink text-white px-3 py-1 rounded-full font-semibold animate-pulse shadow-lg">
    ✨ AI Reading
  </span>
)}
```

**Styling:**
- Gradient background: energy-gold → accent-pink
- Text color: white (contrast)
- Font: semibold, uppercase
- Animation: pulse (2s infinite)
- Shadow: lg (depth)
- Display: xs on mobile, sm on desktop

#### 7. **Navigation Links - Underline Animation**
```tsx
<Link className="relative group">
  Trải Nghiệm AI
  <span className="absolute bottom-0 left-0 w-0 h-0.5 
    bg-gradient-to-r from-energy-gold to-accent-pink 
    group-hover:w-full transition-all duration-300" />
</Link>
```

**Animation:**
- Underline grows from left to right on hover
- Gradient: energy-gold → accent-pink
- Smooth transition: 300ms
- Full width on hover

#### 8. **Logo Text Animation**
```tsx
<span className="text-2xl font-serif font-bold text-healing-brown hidden sm:inline 
  group-hover:text-energy-gold transition-colors duration-300">
  MẢNH
</span>
```

- Color transitions: healing-brown → energy-gold
- Hidden on mobile (< sm breakpoint)
- Smooth 300ms transition

---

## 🎯 Features Breakdown

### ✨ Logo Section
```
┌─────────────────────┐
│ [Logo]  MẢNH ✨AI   │
│ [aura] [text] [badge]
└─────────────────────┘
  ↓ on hover
┌─────────────────────┐
│ [Logo↑] MẢNH ✨AI   │  (logo scales up)
│ [glow] [↓gold] [↓]   (text turns gold)
└─────────────────────┘
```

### 🔗 Navigation Links
```
Before Hover:
Trải Nghiệm AI
                    (underline hidden)

After Hover:
Trải Nghiệm AI
═══════════════    (underline grows, gradient)
```

### 📌 Desktop vs Mobile
```
Desktop:
[Logo] MẢNH ✨AI Reading    [Nav Links]

Mobile:
[Logo] ☰
[Mobile Menu when toggled]
```

---

## 🎨 Color Scheme

| Element | Color | Opacity | Usage |
|---------|-------|---------|-------|
| Background | accent-cream + white | 85% | Main background |
| Border | energy-gold | 20% | Bottom border |
| Glow | energy-gold | 15% | Box shadow on AI pages |
| Logo aura | energy-gold | 20% | Circle behind logo |
| Text hover | energy-gold | 100% | Logo text on hover |
| Underline | energy-gold → accent-pink | 100% | Nav link underline |
| Badge | energy-gold → accent-pink | 100% | AI Reading badge |

---

## 📱 Responsive Behavior

### Desktop (md and above)
```css
┌────────────────────────────────────────┐
│ [Logo] MẢNH ✨AI   Trải Nghiệm... ...  │
└────────────────────────────────────────┘
- Logo + text visible side-by-side
- Full navigation visible
- No hamburger menu
```

### Mobile (below md)
```css
┌──────────────────────┐
│ [Logo] ☰             │
├──────────────────────┤
│ Trải Nghiệm AI       │  ← Only when menu open
│ Sản Phẩm             │
│ Về Chúng Tôi         │
│ Nhóm                 │
└──────────────────────┘
- Logo text hidden
- Hamburger menu visible
- Menu slides in with animate-slideInDown
- Navigation items stack vertically
```

---

## 🎬 Animation Breakdown

### 1. **Logo Hover Animation**
```tsx
transition-transform group-hover:scale-110
```
- Duration: 300ms (default)
- Transform: scale from 100% to 110%
- Easing: ease (default)

### 2. **Glow Aura on AI Pages**
```tsx
animate-pulse group-hover:animate-glow-pulse
```
- Default: `animate-pulse` (2s, opacity change)
- On hover: `animate-glow-pulse` (glow + scale)
- Continuous loop

### 3. **Badge Pulse**
```tsx
animate-pulse
```
- 2s cycle
- Opacity: 1 → 0.5 → 1
- Draws attention to AI Reading status

### 4. **Underline Animation**
```tsx
w-0 h-0.5 group-hover:w-full transition-all duration-300
```
- Width: 0 → 100% (full link width)
- Height: fixed at 2px
- Easing: ease (default)
- Smooth growth

### 5. **Mobile Menu Animation**
```tsx
animate-slideInDown
```
- 0.7s duration
- Slides down from top
- Opacity fade in simultaneously

---

## 🔌 Integration Checklist

When using Header:

- [ ] Import Header in layout: `import Header from "@/components/Header"`
- [ ] Place Header in main layout (fixed, z-50)
- [ ] Verify navigation links are correct
- [ ] Test on mobile (hamburger menu works?)
- [ ] Test on AI Reading pages (badge appears?)
- [ ] Check glow effect visibility
- [ ] Verify font sizing is correct (xs/sm badge)
- [ ] Test logo hover scale
- [ ] Check underline animation on nav links
- [ ] Test mobile menu animation (slideInDown)

---

## 🎯 Customization Guide

### Change Badge Text
```tsx
// Find in Header.tsx:
<span className="...">
  ✨ AI Reading  {/* ← Change this */}
</span>
```

### Change Badge Colors
```tsx
// Find classNames:
className="bg-gradient-to-r from-energy-gold to-accent-pink"
// Change to: from-[#custom] to-[#custom]
```

### Change Glow Radius
```tsx
// In usePathname logic:
style={isAIReading ? { 
  boxShadow: "0 0 30px rgba(198, 162, 93, 0.2)" 
  // Change 30px (radius) or 0.2 (opacity)
} : {}}
```

### Disable Logo Scale on Hover
```tsx
// Remove or comment out:
className="... group-hover:scale-110"
```

### Change Underline Color
```tsx
className="... bg-gradient-to-r from-energy-gold to-accent-pink"
// Change to: from-[#color] to-[#color]
```

### Change Backdrop Blur Strength
```tsx
className="... backdrop-blur-lg"
// Options: blur-none, blur-sm, blur-md, blur-lg, blur-xl
```

---

## 🚨 Troubleshooting

### Issue 1: Badge not showing
**Check:**
- [ ] Pathname detection correct?
- [ ] isAIReading logic includes all AI pages?
- [ ] Badge CSS classes correct?

**Fix:**
```tsx
// Add console log to debug
console.log("pathname:", pathname, "isAIReading:", isAIReading)
```

### Issue 2: Logo glow not visible
**Check:**
- [ ] isAIReading is true?
- [ ] animate-glow-pulse is defined in globals.css?
- [ ] Z-index not hidden behind other elements?

**Fix:**
```tsx
// Make glow more visible temporarily:
<div className="... bg-energy-gold/30 ..."></div> {/* Increase opacity */}
```

### Issue 3: Mobile menu not animating
**Check:**
- [ ] animate-slideInDown exists in globals.css?
- [ ] isMenuOpen state is toggled?
- [ ] Mobile menu div renders when isMenuOpen=true?

**Fix:**
```tsx
{isMenuOpen && (
  <div className="... animate-slideInDown">
    {/* Menu items */}
  </div>
)}
```

### Issue 4: Underline not showing
**Check:**
- [ ] Link has group class?
- [ ] Span has absolute positioning?
- [ ] group-hover selector working?

**Fix:**
```tsx
<Link className="... group hover:text-healing-brown ...">
  Text
  <span className="... group-hover:w-full ..."></span>
</Link>
```

---

## ♿ Accessibility Features

Component includes:
- ✅ Semantic HTML (`<header>`, `<nav>`, `<button>`)
- ✅ Proper ARIA attributes
- ✅ Keyboard navigation (Tab, Enter)
- ✅ Focus states (visible outline)
- ✅ Color contrast (WCAG AA)
- ✅ Mobile menu toggle with aria-label

---

## 📊 Performance Considerations

### Optimizations Already Applied:
1. ✅ `usePathname` hook (client-side, efficient)
2. ✅ Conditional glow (only when needed)
3. ✅ CSS animations (GPU-accelerated)
4. ✅ Image optimization (next/image component)

### Further Optimizations (Optional):
```tsx
// Memoize pathname check
const isAIReading = useMemo(() => {
  return pathname === "/ai-reading" || ...
}, [pathname])
```

---

## 🎓 Example Modifications

### Example 1: Change Logo on AI Pages
```tsx
<Image
  src={isAIReading ? "/logo_ai.png" : "/logo_exe_xoanen.png"}
  alt="Logo"
  {...}
/>
```

### Example 2: Hide Badge on Mobile
```tsx
{isAIReading && (
  <span className="hidden sm:inline ..."> {/* Hidden on mobile */}
    ✨ AI Reading
  </span>
)}
```

### Example 3: Different Navigation for AI Pages
```tsx
{isAIReading ? (
  <div className="...">
    <Link href="/ai-intro">Back to Start</Link>
  </div>
) : (
  <div className="...">
    {/* Normal nav */}
  </div>
)}
```

---

## 🎉 Summary

Enhanced Header provides:
- ✨ **Visual Feedback** - Know when you're on AI Reading pages
- 🎯 **Better UX** - Smooth animations, clear navigation
- 📱 **Responsive** - Works great on all screen sizes
- 🎨 **Brand Consistency** - Matches MẢNH aesthetic
- ♿ **Accessible** - Keyboard navigation, contrast, semantics

---

## 📚 Related Files

- `components/Header.tsx` - Header component
- `app/globals.css` - Animation definitions
- `ANIMATIONS_GUIDE.md` - Animation documentation
- `app/layout.tsx` - Main layout wrapper

---

Enjoy your enhanced header! ✨💎
