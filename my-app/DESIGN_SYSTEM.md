# 🎨 Visual Design Guide - Expense Tracker

## Color Palette

### Light Mode
```
Primary Blue:        #3b82f6
Primary Purple:      #a855f7
Background:          #ffffff, #f0f4f8
Text:               #1f2937 (dark gray)
Light Text:         #6b7280
Success (Green):    #10b981
Warning (Orange):   #f97316
Danger (Red):       #ef4444
```

### Dark Mode
```
Primary Purple:      #a855f7
Primary Indigo:      #6366f1
Background:          #0f172a, #1e293b
Text:               #e5e7eb (light gray)
Light Text:         #9ca3af
Success (Green):    #22c55e
Warning (Orange):   #f97316
Danger (Red):       #ef4444
```

---

## Typography

### Heading 1 (Logo)
- Size: 2xl (28px) to 4xl (36px)
- Weight: Bold (700)
- Color: Theme dependent
- Font: System UI

### Heading 2/3 (Section Titles)
- Size: 2xl (28px) to 3xl (30px)
- Weight: Bold (700)
- Color: Theme dependent
- Margin: mb-4 to mb-6

### Body Text
- Size: 16px (base)
- Weight: Regular (400)
- Line Height: 1.5
- Color: Text color

### Label Text
- Size: 14px (sm)
- Weight: Semibold (600)
- Color: Text color

### Small Text
- Size: 12px (xs)
- Weight: Regular (400)
- Color: Light text

---

## Component Styling

### Cards

**Light Mode:**
```
Background: white
Border: subtle gray
Shadow: md (medium)
Rounded: xl (12px)
Padding: p-6 to p-8
```

**Dark Mode:**
```
Background: slate-800
Border: slate-700
Shadow: lg with opacity
Rounded: xl (12px)
Padding: p-6 to p-8
```

**Hover State:**
```
Transform: scale-105
Shadow: xl, shadow-2xl
Duration: 300ms
Cursor: pointer
```

---

### Buttons

**Primary Button**
```
Light: bg-gradient-to-r from-blue-600 to-purple-600
Dark: bg-gradient-to-r from-purple-600 to-indigo-600
Text: white
Padding: py-3 px-4
Rounded: lg
Hover: scale-105, shadow-lg
Active: scale-95
Transition: 300ms
```

**Secondary Button**
```
Light: bg-gray-200, text-gray-700
Dark: bg-slate-700, text-gray-300
Padding: py-3 px-4
Rounded: lg
Hover: scale-105, bg-darker
Active: scale-95
Transition: 300ms
```

---

### Input Fields

**Light Mode:**
```
Background: gray-50
Border: gray-300
Text: gray-900
Placeholder: gray-500
Focus Ring: blue-500
Padding: px-4 py-3
Rounded: lg
```

**Dark Mode:**
```
Background: slate-700
Border: slate-600
Text: white
Placeholder: gray-400
Focus Ring: purple-500
Padding: px-4 py-3
Rounded: lg
```

**States:**
```
Focus: ring-2, scale-105
Error: border-red-500, ring-red-500
Disabled: opacity-50, cursor-not-allowed
```

---

### Badges & Pills

**Category Badge:**
```
Light: bg-blue-100, text-blue-800
Dark: bg-purple-900/40, text-purple-300
Padding: px-3 py-1
Rounded: full
Size: text-xs
Weight: semibold
```

**Status Badge:**
```
Income: Green colors
Expense: Red colors
Padding: px-3 py-1
Rounded: full
Size: text-xs
Weight: bold
```

---

### Tables

**Header Row:**
```
Light: bg-white, text-gray-700
Dark: bg-slate-800, text-gray-200
Border: bottom, gray/slate
Padding: py-4 px-4
Weight: semibold
```

**Data Rows:**
```
Light: white, hover: bg-gray-50
Dark: slate-800, hover: bg-slate-700/50
Border: bottom, gray/slate
Padding: py-4 px-4
Transition: 300ms
```

**Row Hover:**
```
Background: lighter shade
Duration: 300ms
Scale: subtle (scale-x-105)
```

---

## Spacing System

```
xs  = 4px   (0.25rem)
sm  = 8px   (0.5rem)
md  = 16px  (1rem)
lg  = 24px  (1.5rem)
xl  = 32px  (2rem)
2xl = 40px  (2.5rem)
3xl = 48px  (3rem)
```

### Common Spacing Patterns

**Card Padding:**
- p-6 (24px) on mobile
- p-8 (32px) on desktop

**Gap between Cards:**
- gap-4 (16px) on mobile
- gap-6 (24px) on tablet
- gap-8 (32px) on desktop

**Section Margins:**
- my-8 (32px) between sections
- my-12 (48px) between major sections

---

## Shadow System

```
Light Mode:
- sm: subtle shadows
- md: medium shadows
- lg: prominent shadows
- xl: deep shadows
- 2xl: very deep shadows

Dark Mode:
- Same, with opacity adjustments
- Typically darker for visibility
```

### Shadow Usage
- Cards: shadow-lg
- Hover state: shadow-xl to shadow-2xl
- Buttons: shadow-md on hover
- Buttons: shadow-lg with color tint

---

## Animation Keyframes

### Slide In
```css
from: translateX(-100%), opacity 0
to:   translateX(0), opacity 1
Duration: 0.5s
Easing: ease-out
```

### Fade In
```css
from: opacity 0
to:   opacity 1
Duration: 0.5s
Easing: ease-out
```

### Slide Up
```css
from: translateY(20px), opacity 0
to:   translateY(0), opacity 1
Duration: 0.5s
Easing: ease-out
```

### Transform on Hover
```
scale: 105%
Duration: 300ms
Easing: ease-in-out
```

### Transform on Click
```
scale: 95%
Duration: instant
Easing: ease-out
```

---

## Responsive Breakpoints

```
Mobile (max-width: 639px)
- Single column (grid-cols-1)
- Full width components
- Smaller padding
- Stacked forms

Tablet (640px to 1023px)
- Two columns (grid-cols-2)
- Medium padding
- Side-by-side forms
- Expanded navigation

Desktop (1024px+)
- Three columns (grid-cols-3)
- Maximum padding
- Full-width layouts
- Complete navigation
- Max width: 7xl (80rem)
```

---

## Dark Mode Implementation

### CSS Strategy
```css
/* Light mode (default) */
body { background: light; }

/* Dark mode */
:root.dark { background: dark; }
:root.dark .component { color: light; }
```

### Tailwind Usage
```
Light: bg-white text-gray-900
Dark: dark:bg-slate-800 dark:text-gray-100
```

### Transitions
```
All color properties: 300ms transition
Smooth switching between themes
No jarring color changes
```

---

## State Indicators

### Loading
```
opacity-50
cursor-wait
pointer-events-none
```

### Hover
```
scale-105 (buttons/cards)
text-darker/lighter
shadow-xl
```

### Active/Focus
```
ring-2 ring-primary-color
scale-95 (buttons)
Darker background
```

### Disabled
```
opacity-50
cursor-not-allowed
pointer-events-none
```

### Error
```
border-red-500
text-red-500
ring-red-500
```

### Success
```
border-green-500
text-green-500
ring-green-500
```

---

## Icon System

### Emoji Icons (Used throughout)
```
Dashboard:  📊
Transactions: 📝
Analytics: 📈
Income: 📈
Expense: 📉
Balance: 💰
Search: 🔍
Add: ➕
Edit: ✏️
Delete: 🗑️
Warning: ⚠️
Success: ✓
Theme: ☀️ 🌙
```

### Icon Sizing
- Header: text-3xl to text-4xl
- Cards: text-3xl to text-4xl
- Buttons: text-lg
- Badges: text-sm

---

## Accessibility

### Color Contrast
- All text: WCAG AA or better
- Text on buttons: 4.5:1 or better
- Icons: color + shape distinction

### Focus States
- Clear ring around focused elements
- Visible on both light and dark modes
- Keyboard navigation support

### Semantic HTML
- Proper heading hierarchy
- Label associations
- Form validation messages
- ARIA attributes where needed

---

## Performance Considerations

### CSS Optimizations
- Tailwind CSS purging
- Minified production builds
- GPU-accelerated transforms
- Efficient animations

### Animation Performance
- Use transform and opacity only
- Avoid layout-triggering properties
- 60 FPS target
- Prefers-reduced-motion support

---

## Design Tokens Summary

| Token | Light | Dark |
|-------|-------|------|
| Primary | #3b82f6 | #a855f7 |
| Secondary | #a855f7 | #6366f1 |
| Success | #10b981 | #22c55e |
| Warning | #f97316 | #f97316 |
| Danger | #ef4444 | #ef4444 |
| Background | #ffffff | #0f172a |
| Card BG | #ffffff | #1e293b |
| Text Primary | #1f2937 | #e5e7eb |
| Text Secondary | #6b7280 | #9ca3af |
| Border | #e5e7eb | #475569 |

---

**Design System Version:** 1.0  
**Last Updated:** January 10, 2026  
**Status:** ✨ Complete
