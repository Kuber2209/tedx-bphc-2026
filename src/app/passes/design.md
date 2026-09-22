# Passes Section — Native Design Specification (TEDx BPHC 2026)
> **Location:** `src/app/passes/`  
> **Brand Identity:** TEDx BPHC 2026 · *Invisible Threads*  
> **Design Philosophy:** Native integration with TEDx BPHC site standards, zero comparison tables, zero pill badges or AI clutter.

---

## 1. Design & Motion Architecture

1. **Reused Animation & Motion**:
   - Framer Motion (`motion/react`) with cubic-bezier easing `[0.16, 1, 0.3, 1]` for section and text entrance.
   - Staggered scroll entrance `[0.21, 0.47, 0.32, 0.98]` and `whileHover={{ y: -6 }}` card elevation matching homepage cards.
   - Word reveal animation on `"Get your pass."`.

2. **Zero Clutter & Zero Comparisons**:
   - The three passes serve three distinct audiences (Students, BPHC Community, External Guests). No comparison tables, matrix grids, or dash rows.
   - BITSian pass highlighted exclusively with a clean red border (`border-2 border-[#eb0028]`).
   - No eyebrow badges, pill badges, sparkles, or watermarks.

3. **Color & Typography Tokens**:
   - Fonts: `var(--font-inter)` and `var(--font-outfit)` via `var(--font-sans)`.
   - Colors: TEDx Red (`#eb0028`), Canvas Background (`#fafafa`), Stage Dark (`#0a0a0c`), Text Primary (`#09090b`), Text Muted (`#71717a`), Borders (`#e4e4e7`).

---

## 2. Page Hierarchy

### Listing Page (`/passes`)
1. **Hero**: Dark stage header (`#0a0a0c`), headline `"Get your pass."` with word reveal, single sentence, info line (`March 2026 · BITS Pilani Hyderabad Campus · Registrations open`).
2. **Standard / Premium Switch**: Directly above cards with smooth state and price/bullet transition.
3. **Three Pass Cards**: Student Pass (`₹429`), BITSian Pass (`₹650` with `₹999` struck through), External Guest Pass (`₹650`). 3 bullets each with red checkmarks, single site CTA button.
4. **Bottom Contact**: Delegation inquiries sentence and single support contact line.

### Individual Pass Pages (`/passes/[id]`)
1. **Hero**: Dark stage header with pass name in large type, one-line audience, pricing, and primary Register button.
2. **What you get**: Clean 2-column grid of inclusion cards (bold title + 1-line description, checkmark icon).
3. **Who it's for**: 1–2 plain editorial sentences.
4. **Standard vs Premium**: Two side-by-side cards detailing standard vs upgraded perks with individual CTAs.
5. **FAQ**: 4 core questions in a fluid `AnimatePresence` accordion.
6. **Mobile Sticky Bar**: Fixed bottom registration bar on small screens with price and Register button.
7. **Back Link**: `"← See other passes"` text link.
