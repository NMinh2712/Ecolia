# Hero Section 2026 - Visual Architecture & Component Hierarchy

## 📐 Section Layout Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     HERO SECTION CONTAINER                       │
│  min-h-screen | flex items-center justify-center pt-20 px-4     │
│  Background: linear-gradient(135deg, #f9f5f1 → gold/10 → pink/10)│
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
    ┌────────┐            ┌────────┐           ┌────────┐
    │ LAYER  │  LAYER 1   │ LAYER  │  LAYER 2  │ LAYER  │ LAYER 3
    │  0     │            │  0.5   │           │  10    │
    │(Back)  │            │        │           │(Front) │
    └────────┘            └────────┘           └────────┘
        │                     │                     │
        │                     │                     │
    ┌───┴──────┐          ┌───┴──────┐         ┌───┴─────────┐
    │ Gradient │          │   Blur   │         │   Content   │
    │Background│          │   Orb    │         │ Container   │
    │Circles   │          │(Mouse)   │         │   (z-10)    │
    └──────────┘          └──────────┘         └─────────────┘
```

---

## 🎯 Content Hierarchy (Vertical Flow)

```
HERO SECTION
│
├─ Background Effects (fixed/absolute, z-index: 0-5)
│  ├─ 3x Animated Gradient Circles (float-gentle, 4s cycle)
│  │  ├─ Gold circle (top-left)
│  │  ├─ Pink circle (top-right)
│  │  └─ Brown circle (bottom-center)
│  │
│  └─ Mouse-Follow Blur Orb (fixed, z-index: 0)
│     ├─ Gradient: gold → pink
│     ├─ Size: 384px (96*4)
│     ├─ Blur: 3xl (48px)
│     ├─ Opacity: 15%
│     └─ Transition: 300ms (smooth follow)
│
├─ Content Container (relative, z-index: 10, max-w-5xl)
│  │
│  ├─ Logo Section
│  │  └─ "MẢNH" (7xl/8xl serif bold)
│  │     ├─ Gradient: brown → gold → pink
│  │     ├─ Animation: fadeIn (0.6s)
│  │     └─ Decoration: underline gradient
│  │
│  ├─ Subtitle Section (min-h-20)
│  │  └─ "Mảnh ghép của riêng bạn" (4xl/5xl serif light italic)
│  │     ├─ Word 1: fadeIn (0.2s delay)
│  │     ├─ Word 2: fadeIn (0.4s delay)
│  │     ├─ Word 3: fadeIn (0.6s delay)
│  │     ├─ Word 4: fadeIn (0.8s delay)
│  │     └─ Word 5: fadeIn (1.0s delay)
│  │
│  ├─ Description Section
│  │  └─ "Mỗi chiếc vòng tay..." (lg/xl light italic)
│  │     ├─ Color: energy-gold/80
│  │     ├─ Max-width: 3xl
│  │     └─ Animation: slideInUp (0.7s)
│  │
│  ├─ CTA Buttons Section (flex row, gap-6)
│  │  │
│  │  ├─ Primary Button
│  │  │  ├─ Text: "Khám Phá Với AI"
│  │  │  ├─ Style: gradient bg (gold → pink), white text
│  │  │  ├─ Padding: px-10 md:px-14, py-4 md:py-5
│  │  │  ├─ Shape: rounded-full (pill)
│  │  │  ├─ Size: 20px icons
│  │  │  │  ├─ Sparkles icon (left)
│  │  │  │  └─ ChevronRight icon (right)
│  │  │  │
│  │  │  ├─ Interactions:
│  │  │  │  ├─ Hover: scale-110, shadow-2xl
│  │  │  │  ├─ Glow: 0 0 40px rgba(198,162,93,0.6)
│  │  │  │  ├─ Arrow: translate-x-1
│  │  │  │  └─ Duration: 0.3s
│  │  │  │
│  │  │  ├─ Tooltip (on hover)
│  │  │  │  ├─ Text: "Chỉ 2 phút để khám phá..."
│  │  │  │  ├─ Position: top-full, -translate-x-1/2
│  │  │  │  ├─ Style: brown bg, white text
│  │  │  │  ├─ Shape: rounded-lg
│  │  │  │  ├─ Arrow: rotate-45 triangle
│  │  │  │  └─ Animation: fadeIn
│  │  │  │
│  │  │  ├─ Animation: bounce-in (0.8s)
│  │  │  └─ Link: → /ai-intro
│  │  │
│  │  └─ Secondary Button
│  │     ├─ Text: "Xem Bộ Sưu Tập"
│  │     ├─ Style: border-2 border-energy-gold, brown text
│  │     ├─ Padding: px-10 md:px-12, py-4 md:py-5
│  │     ├─ Shape: rounded-full (pill)
│  │     ├─ Hover: gradient bg fade, scale-105
│  │     ├─ Duration: 0.3s
│  │     ├─ Animation: bounce-in (0.8s)
│  │     └─ Link: → /shop
│  │
│  ├─ Bracelet Showcase Section (mt-20, mb-12)
│  │  │
│  │  └─ Bracelet Visual (w-64 h-64, mx-auto)
│  │     │ Animation: fadeIn (0.4s delay)
│  │     │
│  │     ├─ Outer Ring (absolute inset-0)
│  │     │  ├─ Background: gradient (gold/30 → pink/30)
│  │     │  ├─ Shape: rounded-full
│  │     │  ├─ Animation: rotate-glow (4s)
│  │     │  └─ Effect: 360° rotation + glow pulse
│  │     │
│  │     ├─ Inner Glow (absolute inset-4)
│  │     │  ├─ Background: white/20 (blur-sm)
│  │     │  ├─ Backdrop: blur-sm (frosted glass)
│  │     │  ├─ Display: flex center
│  │     │  └─ Animation: float-gentle (4s)
│  │     │
│  │     ├─ Diamond Emoji (💎)
│  │     │  ├─ Size: text-7xl
│  │     │  ├─ Position: center of inner glow
│  │     │  └─ Animation: spin-slow (8s) ⭐ NEW
│  │     │
│  │     ├─ Decorative Point (top)
│  │     │  ├─ Position: absolute top-0, left-1/2
│  │     │  ├─ Size: 8px circle
│  │     │  └─ Color: energy-gold
│  │     │
│  │     ├─ Decorative Point (bottom)
│  │     │  ├─ Position: absolute bottom-0, left-1/2
│  │     │  ├─ Size: 8px circle
│  │     │  └─ Color: accent-pink
│  │     │
│  │     ├─ Decorative Point (right)
│  │     │  ├─ Position: absolute top-1/2 right-0
│  │     │  ├─ Size: 8px circle
│  │     │  └─ Color: healing-brown
│  │     │
│  │     └─ Decorative Point (left)
│  │        ├─ Position: absolute top-1/2 left-0
│  │        ├─ Size: 8px circle
│  │        └─ Color: accent-cream
│  │
│  ├─ Description Text (text-center, mt-20)
│  │  └─ "AI sẽ tạo chiếc vòng tay..." (sm/base)
│  │     ├─ Color: foreground-secondary
│  │     └─ Max-width: 2xl
│  │
│  └─ Scroll Indicator (absolute bottom-10)
│     └─ Bouncing guide
│        ├─ Text: "Cuộn xuống"
│        ├─ Icon: rounded rectangle with pulsing dot
│        ├─ Color: healing-brown
│        ├─ Animation: bounce (1s)
│        └─ Position: centered bottom
│
└─ Gradient Overlay Bottom (absolute inset-bottom)
   ├─ Height: h-32
   ├─ Gradient: from-accent-cream to-transparent
   └─ Purpose: Smooth transition to next section
```

---

## 🎬 Animation Timeline

```
Time    0s        0.2s      0.4s      0.6s      0.8s      1.0s      2.0s
│       │         │         │         │         │         │         │
├───────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│
│   Logo Fade ════════════════════╗
│                                 
│         Subtitle Word 1 ════════════════════╗
│                     Subtitle Word 2 ════════════════════╗
│                                 Subtitle Word 3 ════════════════════╗
│                                             Subtitle Word 4 ════════════════════╗
│                                                         Subtitle Word 5 ════════════════════╗
│
│   Description Slide ═════════════════════════════╗
│   Button Entrance ═══════════════════════════════╗
│
│         Bracelet Fade ═════════════════╗
│
│   Background Circle 1 float (continuous, 4s cycle)
│      Background Circle 2 float (delay 1s, continuous, 4s cycle)
│         Background Circle 3 float (delay 2s, continuous, 4s cycle)
│
│   Blur Orb (follows mouse, no animation)
│
│   Outer Ring Rotate (continuous, 4s cycle)
│   Inner Glow Float (continuous, 4s cycle)
│   Diamond Spin (continuous, 8s cycle)
│
│   Scroll Indicator Bounce (continuous, 1s cycle)
```

---

## 🎨 Color Gradient Mappings

### Logo Gradient (Horizontal)
```
Start (Left)          Mid                   End (Right)
#8c6a4a ────────────────► #c6a25d ────────────────► #e8d5d1
 Brown      (Healing)      Gold     (Energy)       Pink   (Softness)
```

### Button Gradient (Diagonal 135deg)
```
Top-Left              Diagonal               Bottom-Right
#c6a25d ────────────────────────────────────► #e8d5d1
 Gold                                        Pink/Cream
```

### Blur Orb Gradient (Left to Right)
```
Left              Center                   Right
#c6a25d ──────────────────────────────────► #e8d5d1
 Gold              Blend                    Pink
```

### Background Circle Gradients
```
Circle 1: #c6a25d (Energy Gold)
Circle 2: #e8d5d1 (Accent Pink)
Circle 3: #8c6a4a (Healing Brown)
```

### Bottom Overlay Gradient (Top to Bottom)
```
Top                        Bottom
#f9f5f1 ────────────────► transparent
 Cream        Fade-out
```

---

## 📏 Layout Grid & Spacing

```
┌────────────────────────────────────────────────┐
│         Container: max-w-5xl (64rem)           │
│  px-4 (mobile) | px-8 (tablet) | px-16 (web)  │
│                                                │
│        ┌──────────────────────────────┐        │
│        │   Logo (mb-8)                │        │
│        │   "MẢNH"                     │        │
│        └──────────────────────────────┘        │
│                                                │
│        ┌──────────────────────────────┐        │
│        │   Subtitle (mb-6, min-h-20)  │        │
│        │   "Mảnh ghép của riêng bạn"  │        │
│        └──────────────────────────────┘        │
│                                                │
│        ┌──────────────────────────────┐        │
│        │   Description (mb-12)        │        │
│        │   "Mỗi chiếc vòng tay..."    │        │
│        │   max-w-3xl (48rem)          │        │
│        └──────────────────────────────┘        │
│                                                │
│        ┌──────────────────────────────┐        │
│        │   Buttons (mb-16, gap-6)     │        │
│        │   ┌────────┐     ┌────────┐  │        │
│        │   │Primary │     │Secondary│ │        │
│        │   └────────┘     └────────┘  │        │
│        └──────────────────────────────┘        │
│                                                │
│        ┌──────────────────────────────┐        │
│        │   Bracelet (mt-20, mb-12)    │        │
│        │   w-64 h-64                  │        │
│        │   ┌──────────────────┐       │        │
│        │   │       💎         │       │        │
│        │   │     (Diamond)    │       │        │
│        │   └──────────────────┘       │        │
│        └──────────────────────────────┘        │
│                                                │
│        ┌──────────────────────────────┐        │
│        │   Description (max-w-2xl)    │        │
│        │   "AI sẽ tạo vòng tay..."    │        │
│        └──────────────────────────────┘        │
│                                                │
│                 Scroll Indicator              │
│                 (bottom-10)                    │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 🔌 State & Event Flow

```
┌──────────────────────────────────────────┐
│         HeroSection Component             │
│         (useState + useRef + useEffect)   │
└──────────────────────────────────────────┘
           │
           ├─ State: mousePos { x, y }
           │  └─ Updates on window mousemove
           │
           ├─ State: showTooltip (boolean)
           │  ├─ Set true on button mouseenter
           │  └─ Set false on button mouseleave
           │
           └─ Ref: containerRef (section element)
              ├─ Used to get bounding rect
              └─ Calculates relative mouse position

Events Flow:
─────────────

1. User moves mouse inside section
   └─ window.addEventListener("mousemove")
      └─ containerRef.getBoundingClientRect()
         └─ Calculate relative position
            └─ setMousePos({ x, y })
               └─ Blur orb updates position via style.left/top

2. User hovers over primary button
   └─ onMouseEnter event
      └─ setShowTooltip(true)
         └─ Tooltip div renders with fadeIn animation

3. User leaves primary button
   └─ onMouseLeave event
      └─ setShowTooltip(false)
         └─ Tooltip div unmounts (removed from DOM)

4. User clicks primary button
   └─ <Link href="/ai-intro">
      └─ Next.js router navigates to /ai-intro page

5. User clicks secondary button
   └─ <Link href="/shop">
      └─ Next.js router navigates to /shop page
```

---

## 📊 Responsive Behavior

### Mobile (< 640px)
```
┌─────────────────┐
│   HERO SECTION  │
│   pt-20 px-4    │
│                 │
│      MẢNH       │ text-7xl (smaller)
│    (Logo)       │ mb-8
│                 │
│  Mảnh ghép      │ text-4xl (smaller)
│ của riêng bạn   │ mb-6, min-h-20
│  (Subtitle)     │
│                 │
│ Mỗi chiếc       │ text-lg (responsive)
│ vòng tay...     │ mb-12, max-w-3xl
│ (Description)   │
│                 │
│ ┌─────────────┐ │ flex col (stack)
│ │  AI Button  │ │ full width
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │  View Shop  │ │ full width
│ └─────────────┘ │ gap-6
│                 │
│    Bracelet     │ w-64 h-64
│     (💎)        │ centered
│                 │
│   Description   │ text-sm
│   "AI sẽ tạo"   │ max-w-2xl
│                 │
│  ↓ Scroll ↓     │
│                 │
└─────────────────┘
```

### Desktop (> 1024px)
```
┌──────────────────────────────────────────────┐
│             HERO SECTION (min-h-screen)      │
│      Container: max-w-5xl, centered          │
│                                              │
│                   MẢNH                       │ text-8xl (larger)
│                 (Logo)                       │ mb-8
│                                              │
│            Mảnh ghép của riêng bạn           │ text-5xl (larger)
│              (Subtitle - 5 words)            │ min-h-20
│                                              │
│        Mỗi chiếc vòng tay không chỉ là       │ text-xl
│       trang sức – mà là một phần linh        │ mb-12
│     hồn đang chờ bạn tìm thấy.              │ max-w-3xl
│              (Description)                   │
│                                              │
│  ┌──────────────────┐  ┌──────────────────┐ │
│  │ Khám Phá Với AI  │  │  Xem Bộ Sưu Tập  │ │ flex row (inline)
│  │ [Sparkles] [→]   │  │                  │ │ gap-6, mb-16
│  │ (Glow on hover)  │  │(Outline on hover)│ │
│  └──────────────────┘  └──────────────────┘ │
│                                              │
│                  Bracelet                    │ w-64 h-64
│                   (💎)                       │ mt-20, mb-12
│                                              │
│        AI sẽ tạo chiếc vòng tay...          │ text-base
│      dành riêng cho năng lượng của bạn      │ max-w-2xl
│                                              │
│                   ↓ Scroll ↓                │
│                                              │
└──────────────────────────────────────────────┘
```

---

## 🎭 Animation State Machine

```
Initial State
     │
     ├─ Logo: opacity 0 → animate-fadeIn → opacity 1 (0.6s)
     │  └─ DONE: Stays visible
     │
     ├─ Subtitle Words: staggered fadeIn
     │  ├─ Word 1: 0.2s → opacity 1 (DONE)
     │  ├─ Word 2: 0.4s → opacity 1 (DONE)
     │  ├─ Word 3: 0.6s → opacity 1 (DONE)
     │  ├─ Word 4: 0.8s → opacity 1 (DONE)
     │  └─ Word 5: 1.0s → opacity 1 (DONE)
     │
     ├─ Description: translateY(20px) opacity 0 → slideInUp → translateY(0) opacity 1 (0.7s)
     │  └─ DONE: Stays visible
     │
     ├─ Buttons: scale(0.8) → bounce-in → scale(1) (0.8s)
     │  └─ DONE: Stays visible, ready for hover
     │
     ├─ Bracelet: opacity 0 (0.4s delay) → opacity 1 (0.6s animation)
     │  └─ DONE: Stays visible, animations loop
     │
     └─ Background effects: LOOPING ANIMATIONS (no end state)
        ├─ Circles: float-gentle 4s infinite ↻
        ├─ Outer Ring: rotate-glow 4s infinite ↻
        ├─ Inner Glow: float-gentle 4s infinite ↻
        ├─ Diamond: spin-slow 8s infinite ↻
        ├─ Scroll Indicator: bounce 1s infinite ↻
        └─ Blur Orb: continuous position updates (no animation)

Hover States
─────────────

Primary Button:
  Idle → Hover Start (0.3s duration)
    ├─ scale: 100% → 110%
    ├─ box-shadow: 0 0 0 → 0 0 40px gold
    ├─ arrow: translateX(0) → translateX(4px)
    └─ glow: opacity 0 → opacity 100%
         ↓
  Hover Sustained (while hovering)
    └─ All scale(110%) state maintained
         ↓
  Hover End (0.3s duration)
    └─ All properties return to original state

Secondary Button:
  Idle → Hover Start (0.3s)
    ├─ scale: 100% → 105%
    ├─ background: transparent → gradient(gold/10 → pink/10)
    └─ duration: 0.3s ease
         ↓
  Hover Sustained (while hovering)
    └─ All hover state maintained
         ↓
  Hover End (0.3s)
    └─ All properties return to original
```

---

## 🔌 Tailwind CSS Utilities Used

### Layout & Positioning
```css
relative, absolute, fixed
inset-0, inset-4, inset-8, inset-x-1/2, inset-y-1/2
z-0, z-5, z-10, z-20
flex, flex-col, flex-row, items-center, justify-center
transform, -translate-x-1/2, -translate-y-1/2, translate-x-1
max-w-5xl, max-w-3xl, max-w-2xl
min-h-screen, min-h-20, min-h-24
w-64, h-64, w-96, h-96, w-6, h-10
```

### Styling & Effects
```css
rounded-full, rounded-lg
px-4, px-10, px-14, px-12, py-4, py-5, py-2
gap-6, gap-2
opacity-15, opacity-60, opacity-30, opacity-40, opacity-50, opacity-100
bg-gradient-to-r, bg-gradient-to-br, from-*, via-*, to-*
border-2, border-energy-gold
shadow-lg, shadow-2xl, drop-shadow-lg
backdrop-blur-sm, filter, blur-3xl
```

### Text & Typography
```css
text-7xl, text-8xl, text-4xl, text-5xl, text-lg, text-xl, text-sm, text-base
font-serif, font-sans, font-bold, font-semibold, font-light
font-medium
italic
leading-relaxed, leading-relaxed
tracking-wide
text-transparent, bg-clip-text
```

### Responsive Breakpoints
```css
md:text-8xl, md:text-5xl, md:text-xl, md:px-14, md:py-5
sm:flex-row, sm:gap-6, sm:text-lg
```

### Interactive States
```css
hover:scale-110, hover:scale-105
hover:shadow-2xl
hover:shadow-lg
hover:opacity-100
hover:translate-x-1
hover:text-energy-gold
hover:bg-gradient-to-r
transition-all, transition-colors, transition-transform, transition-opacity
duration-300
group, group-hover:*
```

### Animations (Custom)
```css
animate-fadeIn
animate-slideInUp
animate-bounce-in
animate-float-gentle
animate-rotate-glow
animate-spin-slow (NEW)
animate-pulse
animate-bounce
animation-delay-* (via style={{ animationDelay }})
```

---

## 🚀 Performance Optimization Points

```
GPU Acceleration Layer
├─ Transforms: scale, translateX, translateY ✓
├─ Opacity changes ✓
├─ filter (blur) ✓
└─ NO width/height changes during animation ✓

Layout Thrashing Prevention
├─ Fixed/Absolute positioning for moving elements ✓
├─ Blur orb doesn't affect layout (fixed) ✓
├─ Background circles separated from content (absolute) ✓
└─ Content uses relative positioning only ✓

Animation Optimization
├─ All keyframes use transform + opacity ✓
├─ Staggered animations prevent simultaneous repaints
├─ No simultaneous full-page animations
└─ Continuous animations use will-change (CSS)

CSS Specificity
├─ Single class selectors (no nesting needed)
├─ No !important declarations
└─ Proper cascade usage
```

---

**Diagram Complete** ✨  
This visual architecture shows the complete structure, layout, and relationships within the Hero Section 2026.
