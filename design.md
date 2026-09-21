# Passes Section — Design Language & Architectural Specification
> **Location:** `src/app/passes/`  
> **Brand Identity:** TEDx BPHC 2026 · *Invisible Threads*  
> **Design Philosophy:** Editorial Swiss Minimalism & Authentic Event Ticketing (Zero AI clichés, zero rainbow neon glows, zero fake widget clutter).

---

## 1. Design Principles

1. **Human & Editorial, Not SaaS/AI Template**:
   TEDx is an intellectual, cultural, and storytelling institution. The ticketing interface must feel like an exclusive invitation or print conference booklet—clean typography, ample whitespace, hairline borders, and clear hierarchy.

2. **Zero Content Compromise**:
   Every pricing tier, Early Bird tag, student/faculty distinction, feature checklist item, and delegation contact protocol from `src/data/passes.ts` is strictly preserved.

3. **Restrained Brand Color Accent**:
   The signature TEDx Red (`#eb0028`) is applied with strict intentionality:
   - Primary action buttons
   - Status kicker rules (`h-[2px] w-10 bg-[#eb0028]`)
   - Early Bird / highlight accents
   Never diluted with arbitrary purple, blue, or rainbow gradients.

---

## 2. Color Palette & Tokens

| Token | Value | Semantic Use |
|---|---|---|
| **Canvas Background** | `#fafafa` / `#ffffff` | Clean, high-legibility page background |
| **Hero Dark Anchor** | `#0a0a0c` | Stage-inspired cinematic dark hero header |
| **TEDx Red** | `#eb0028` | Primary focal points, active badges, CTA buttons |
| **Foreground Primary** | `#09090b` / `#111827` | Headings, tier names, and primary pricing |
| **Foreground Muted** | `#71717a` / `#52525b` | Descriptive copy, labels, secondary metadata |
| **Hairline Borders** | `#e4e4e7` / `#e5e7eb` | Structural grid lines, card perimeters |
| **Badge Soft Neutral** | `#f4f4f5` | Category pills, audience chips |

---

## 3. Typography & Numerical Scale

- **Display Headings**: Clean sans-serif with tight tracking (`tracking-tight leading-[1.05]`).
- **Kickers / Metadata**: Monospace uppercase (`font-mono text-xs uppercase tracking-[0.25em] text-[#eb0028]`).
- **Monetary Amounts & Pricing**: Large, bold figures with tabular numbers (`font-sans font-bold text-3xl tracking-tight text-neutral-900`) accompanied by clean struck-through original amounts for Early Bird clarity.
- **Body & Bullet Copy**: Relaxed, readable font weights (`text-sm text-neutral-600 font-normal leading-relaxed`).

---

## 4. Component Hierarchy

```
┌────────────────────────────────────────────────────────────┐
│ 1. CINEMATIC HERO (Dark Anchor)                            │
│    - Stage dark backdrop (#0a0a0c) matching /speakers      │
│    - Thin TEDx red brand rule (2px)                        │
│    - High-contrast title: "Claim your seat in the room."   │
│    - Status pill: Phase 1 Admissions Open · Auditorium     │
└────────────────────────────────────────────────────────────┘
                              │
┌────────────────────────────────────────────────────────────┐
│ 2. CATEGORY SELECTOR & PASS CARDS GRID                     │
│    - 3-column structured grid (School / BITSian / External)│
│    - Hairline borders, clean white cards, subtle lift      │
│    - Category pill, pass name, target audience, bullets    │
│    - Perforated dashed divider for ticket feel             │
│    - Clear Standard vs. Premium price callout & CTA        │
└────────────────────────────────────────────────────────────┘
                              │
┌────────────────────────────────────────────────────────────┐
│ 3. COMPARISON MATRIX (Prospectus Style)                    │
│    - Switcher tabs: Student / BITSian / External           │
│    - Clean side-by-side: Standard vs. Premium              │
│    - Minimalist checkmarks (✓) and dashes (—)              │
│    - Transparent feature breakdown across all 11+ perks    │
└────────────────────────────────────────────────────────────┘
                              │
┌────────────────────────────────────────────────────────────┐
│ 4. INSTITUTIONAL & SCHOOL DELEGATION DESK                  │
│    - Executive layout for principals, teachers, group leads│
│    - Transit clearance, reserved block seating, invoicing  │
│    - Direct mailto link with prefilled subject             │
└────────────────────────────────────────────────────────────┘
                              │
┌────────────────────────────────────────────────────────────┐
│ 5. QUESTIONS & DELEGATE RELATIONS HELP                     │
│    - Clean direct assistance channel                       │
└────────────────────────────────────────────────────────────┘
```

---

## 5. Interaction Guidelines
- Fast, tactile hover states (`duration-200 ease-out`).
- No disruptive layout shifts.
- Full keyboard navigation and accessible color contrast meeting WCAG AA standards.
