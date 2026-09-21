# PSTM CRM - UI Design Language Guide
> **Source files verified:** `tailwind.config.ts`, `src/app/globals.css`, `src/app/quotations/[id]/page.tsx`
> Use this as the source of truth when building any new detail, list, or form page.

---

## 1. Fonts

### Body Font
```
font-family: 'Inter', system-ui, sans-serif
font-size: 16px (base)
```
Loaded from Google Fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900...');
```
Font features enabled globally:
```css
font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'zero' 1, 'tnum' 1;
/* tnum = tabular numbers (equal width) → important for amounts/IDs */
/* zero = slashed zero (distinct from 8) */
```

### Mono Font (used for amounts/numbers only)
```
font-family: 'JetBrains Mono', 'Fira Code', monospace
```
Loaded from Google Fonts:
```css
@import url('...family=JetBrains+Mono:wght@400;500...');
```
Use: `font-mono` Tailwind class on monetary values and numeric IDs.

---

## 2. Exact Colour Definitions

All tokens are CSS HSL variables resolved at runtime.

### Core Tokens (Light Mode)

| Token | CSS Variable | HSL Value | Computed Hex (approx) | Description |
|---|---|---|---|---|
| `background` | `--background: 130 20% 95%` | hsl(130, 20%, 95%) | `#f0f5f1` | Subtle sage green page background |
| `foreground` | `--foreground: 215 25% 27%` | hsl(215, 25%, 27%) | `#33404f` | Near-dark slate - main text |
| `card` | `--card: 45 15% 97%` | hsl(45, 15%, 97%) | `#f9f8f6` | Slightly warm white - card backgrounds |
| `card-foreground` | `--card-foreground: 215 25% 27%` | same as foreground | `#33404f` | |
| **`primary`** | `--primary: 152 55% 23%` | hsl(152, 55%, 23%) | **`#1a5c3e`** | **Dark Forest Green - brand colour** |
| `primary-foreground` | `--primary-foreground: 0 0% 100%` | white | `#ffffff` | Text on primary green bg |
| `muted` | `--muted: 210 20% 96%` | hsl(210, 20%, 96%) | `#f1f4f7` | Very light gray backgrounds |
| `muted-foreground` | `--muted-foreground: 215 16% 47%` | hsl(215, 16%, 47%) | `#6b7a8d` | Secondary/label text - slate gray |
| `border` | `--border: 220 13% 91%` | hsl(220, 13%, 91%) | `#e2e5ea` | Card borders, dividers |
| `input` | `--input: 220 13% 91%` | same as border | `#e2e5ea` | Input borders |
| `ring` | `--ring: 152 55% 23%` | same as primary | `#1a5c3e` | Focus ring colour |
| `destructive` | `--destructive: 0 84% 60%` | hsl(0, 84%, 60%) | `#f04040` | Delete/danger actions |
| `radius` | `--radius: 0.5rem` | - | 8px | Base border radius |

### Custom Extended Colours (direct hex, in tailwind.config.ts)
```
green-500: #69a64e   ← Sidebar green / chart primary
green-600: #4e8039   ← primary-dark (also as primary.dark token)
green-50:  #f4f9f2
green-100: #e6f2e0
green-200: #cde5c3
green-300: #a8d298
green-400: #7eb96c
green-700: #406630
green-800: #35512a
green-900: #2d4325
green-950: #152411
```

> **Important:** The `primary` token used on the detail page is `hsl(152 55% 23%)` = **`#1a5c3e`** (dark forest green), NOT `#69a64e`. The sidebar uses `#69a64e`. Always use `text-primary` / `bg-primary` tokens, not the hex directly.

---

## 3. Typography Scale (exact classes from source)

| Element | Tailwind Class | Size | Weight | Colour token |
|---|---|---|---|---|
| Page ID / title (h1) | `text-2xl font-bold` | 24px | 700 | `text-foreground` |
| "Created on…" | `text-sm text-muted-foreground` | 14px | 400 | `text-muted-foreground` |
| **Primary card heading** | `text-2xl font-bold` | 24px | 700 | `text-foreground` |
| **Secondary card heading** | `text-lg font-semibold` | 18px | 600 | `text-foreground` |
| **Sub-section heading** (Contact Persons) | `text-lg font-semibold` | 18px | 600 | `text-foreground` |
| Field label | `text-sm text-muted-foreground` | 14px | 400 | `text-muted-foreground` |
| Field value (normal) | *(no extra class - inherits body)* | 16px | 400 | `text-foreground` |
| **Amount / money** | `font-mono font-bold text-lg` | 18px | 700 | `text-foreground` |
| **Company name (sidebar)** | `font-bold text-xl` | 20px | 700 | `text-foreground` |
| Company type | `text-sm font-medium text-muted-foreground` | 14px | 500 | `text-muted-foreground` |
| Location city | `font-semibold text-foreground` + `text-sm` | 14px | 600 | `text-foreground` |
| Location sub-label ("Head Office") | `text-muted-foreground text-xs` | 12px | 400 | `text-muted-foreground` |
| Contact person name | `font-semibold text-base` | 16px | 600 | `text-foreground` |
| Contact designation | `text-sm text-muted-foreground` | 14px | 400 | `text-muted-foreground` |
| Contact email | `text-sm hover:text-primary transition-colors` | 14px | 400 | `text-foreground` → primary on hover |
| Phone number | `text-sm font-medium hover:text-primary transition-colors` | 14px | 500 | `text-foreground` → primary on hover |
| Phone tag pill | `text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground` | 12px | 400 | `text-muted-foreground` |
| Empty state | `text-muted-foreground` | 16px (inherits body) | 400 | `text-muted-foreground` |
| Icon (heading level) | `h-6 w-6 text-primary` | 24px | - | `text-primary` |
| Icon (sub-heading level) | `h-5 w-5 text-primary` | 20px | - | `text-primary` |
| Icon (field level) | `h-4 w-4 text-muted-foreground` | 16px | - | `text-muted-foreground` |

---

## 4. Border Radius

```
--radius: 0.5rem (8px) - base radius

rounded-sm  = calc(0.5rem - 4px) = 4px
rounded-md  = calc(0.5rem - 2px) = 6px   ← buttons
rounded-lg  = 0.5rem = 8px               ← sub-cards, chips, small elements
rounded-xl  = 0.75rem = 12px             ← main cards ← most used
rounded-2xl = 1rem = 16px
rounded-3xl = 1.5rem = 24px             ← .island utility class
rounded-full                             ← pill badges, avatar circles
```

---

## 5. Shadows

```css
shadow-sm:  0 1px 2px 0 rgba(0,0,0,0.05)        ← all cards use this
shadow:     0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)
shadow-md:  0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)
shadow-primary: 0 4px 14px 0 rgba(105,166,78,0.39)   ← green glow
```

---

## 6. Card / Container System

### Main Card (used everywhere)
```
bg-card rounded-xl border p-6 shadow-sm
```
Translates to:
- background: `hsl(45 15% 97%)` = warm white `#f9f8f6`
- border-radius: `0.75rem` (12px)
- border: `1px solid hsl(220 13% 91%)` = `#e2e5ea`
- padding: `24px` all sides
- shadow: `0 1px 2px rgba(0,0,0,0.05)`

### Sub-card (contact person tile, inside a card)
```
rounded-lg border bg-muted/30 p-4
```
- border-radius: `0.5rem` (8px)
- border: `1px solid #e2e5ea`
- background: `hsl(210 20% 96% / 0.3)` = very faint gray
- padding: `16px` all sides

### Divider inside card
```html
<hr className="border-border/50" />
```
50% opacity of `#e2e5ea`.

---

## 7. Layout Structure

### Page Wrapper
```
space-y-6 max-w-5xl mx-auto pb-10
```
- max-width: 1024px, centered
- vertical gap between sections: 24px
- bottom padding: 40px

### Two-Column Detail Grid
```
grid grid-cols-1 md:grid-cols-3 gap-6
  Left:  md:col-span-2 space-y-6   → 66% width
  Right: (1 col)       space-y-6   → 33% width (sticky top-6)
```

---

## 8. Component Patterns

### Product / Category Chip
```
inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium
```
- Background: `#1a5c3e` at 10% opacity = very light green tint
- Text & icon: `#1a5c3e` (primary green)
- Padding: 8px top/bottom, 16px left/right
- Border-radius: 8px

### Avatar Circle
```
h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0
```
- Size: 40×40px
- Background: 10% primary green
- Contains: `h-5 w-5 text-primary` icon

### Phone Tag Pill
```
text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground
```
- Font: 12px
- Background: `hsl(210 20% 96%)` = `#f1f4f7`
- Text: `hsl(215 16% 47%)` = `#6b7a8d`
- Shape: pill (rounded-full)

### Status Badges (pre-built CSS classes)
```css
.badge-pending  → bg: hsl(38 92% 95%), text: hsl(38 92% 40%), border: hsl(38 92% 85%)
.badge-success  → bg: hsl(142 70% 95%), text: hsl(142 70% 35%), border: hsl(142 70% 85%)
.badge-danger   → bg: hsl(0 84% 95%), text: hsl(0 84% 45%), border: hsl(0 84% 85%)
.badge-neutral  → bg: hsl(210 20% 96%), text: hsl(215 16% 47%), border: hsl(220 13% 91%)
```

---

## 9. Button System

### Primary Button
```css
/* .btn-primary in globals.css */
background: linear-gradient(180deg, hsl(94 36% 52%) 0%, hsl(94 40% 38%) 100%)
border: 1px solid hsl(94 36% 45%)
box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 12px rgba(105,166,78,0.3)
color: white
font-weight: 500
```
Hover: translates up 1px, shadow increases.

### Outline Button
```css
/* .btn-outline in globals.css */
background: transparent
border: 1px solid hsl(220 13% 91%)   → #e2e5ea
color: hsl(215 25% 27%)              → #33404f
hover bg: hsl(210 20% 96%)          → #f1f4f7
```

### Input Focus Ring
```css
border-color: hsl(94 36% 48%)            → #69a64e (medium green)
box-shadow: 0 0 0 3px hsl(94 36% 48% / 0.1)
```

---

## 10. Spacing Rhythm

| Tailwind class | px value | Used for |
|---|---|---|
| `space-y-6` / `gap-6` | 24px | Between cards/sections at page level; main grid gaps |
| `space-y-4` / `gap-4` | 16px | Between grouped items inside a card |
| `space-y-3` | 12px | Between rows within a contact tile |
| `space-y-1` | 4px | Between field label and its value |
| `p-6` | 24px | Main card padding |
| `p-4` | 16px | Sub-card padding |
| `gap-2` | 8px | Icon + text combinations |
| `gap-3` | 12px | Icon + text (slightly more breathing room) |
| `mb-4` | 16px | Below card heading, before first content |
| `mb-6` | 24px | Between major field groups inside a card |
| `pt-5 mt-2` | 20px top padding + 8px top margin | Section divider before "Contact Persons" |

---

## 11. Page Header Pattern (exact structure)
```jsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-4">
    <BackButton fallbackUrl="/quotations" />
    <div>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        {quotation.quotationNumber}
      </h1>
      <p className="text-muted-foreground text-sm">
        Created on {formatDateIST(quotation.createdAt)}
      </p>
    </div>
  </div>
  <div className="flex gap-2">
    {/* Delete (destructive outline) */}
    {/* Primary CTA */}
    {/* Secondary outline button */}
  </div>
</div>
```

---

## 12. Data Hierarchy - Visual Weight Rules

| Data type | Class(es) | Why |
|---|---|---|
| Monetary amount | `font-mono font-bold text-lg` | Most important number - stands out via mono + bold + 18px |
| Company/entity name | `font-bold text-xl` | Second most important - 20px bold |
| Page/section title | `text-2xl font-bold` or `text-lg font-semibold` | Clear structural landmark |
| Person name | `font-semibold text-base` | Medium emphasis - 16px semibold |
| Field value (date, text) | *(inherits 16px 400)* | Just readable, no decoration |
| Field label | `text-sm text-muted-foreground` | Suppressed - 14px gray so value stands out |
| Sub-label (Head Office, Mobile) | `text-xs text-muted-foreground` | Most suppressed - 12px gray |
| Empty state | `text-muted-foreground` | Same as label - de-emphasised |

**Core principle:** Labels are intentionally small and gray so that the actual values feel prominent without needing to be oversized. Only amounts and company names get an explicit size boost.

---

## 13. Page/Site Background

```
--background: hsl(130 20% 95%) = #f0f5f1
```
This is a subtle **sage green tint** - not pure white and not gray. It creates warmth and ties back to the green brand without being heavy.

---

## 14. Quick Copy Cheatsheet

```
Page wrapper:         space-y-6 max-w-5xl mx-auto pb-10
Header row:           flex items-center justify-between
H1 (page title):      text-2xl font-bold flex items-center gap-2
Sub-line (dates):     text-sm text-muted-foreground
Grid 2+1 col:         grid grid-cols-1 md:grid-cols-3 gap-6
Left col:             md:col-span-2 space-y-6
Right col (sticky):   space-y-6  → each card: sticky top-6

Main card:            bg-card rounded-xl border p-6 shadow-sm
Card heading (main):  text-2xl font-bold flex items-center gap-2
Card heading (rest):  text-lg font-semibold flex items-center gap-2
Icon heading (large): h-6 w-6 text-primary
Icon heading (small): h-5 w-5 text-primary
Icon field-level:     h-4 w-4 text-muted-foreground

Field label:          text-sm text-muted-foreground block mb-2
Field value:          (body default - no class)
Money value:          font-mono font-bold text-lg
Company name:         font-bold text-xl text-foreground

Product chip:         inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium
Avatar circle:        h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0
Sub-card:             rounded-lg border bg-muted/30 p-4
Person name:          font-semibold text-base
Designation:          text-sm text-muted-foreground
Phone tag:            text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground
Location city:        font-semibold text-foreground text-sm
Location sub:         text-muted-foreground text-xs
Divider:              border-border/50 (inside an <hr>)
Empty state:          text-muted-foreground
CTA full-width:       <Button className="w-full">
```
