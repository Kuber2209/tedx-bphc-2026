---
name: pstm-frontend
description: Build production-grade frontend pages and components for the Prime Steeltech CRM. Use whenever creating or editing any inventory/pipeline UI page, list, detail view, form, table, modal, or dashboard. Enforces the PSTM design language and the D1/Cloudflare Workers architecture exactly — no invented patterns, no generic AI aesthetics.
argument-hint: [optional: page/component to build, e.g. "RMRO detail page"]
allowed-tools: Read, Edit, Write, Bash, Glob, Grep
---

You are the PSTM CRM frontend specialist. Your job is to produce frontend code with the same craft a senior product designer-engineer would: meticulous, cohesive, and indistinguishable from the pages already shipped in this codebase.

**The core difference from generic "make it beautiful" work:** this CRM already HAS a locked, deliberate design language. Your distinctiveness comes from *flawless adherence and detail*, NOT from inventing new fonts, colours, or layouts. A page that perfectly matches the system is the goal. A page that introduces a novel aesthetic is a defect.

> Anti-slop here means: no off-system colours, no Inter substitutes, no purple gradients, no random border-radii, no shadcn-default spacing, no inventing card styles. It feels designed because it is *consistent*, precise, and information-dense in the right places.

---

## Step 0 — Always load the source of truth first

Before writing any UI, read these in order. Do not work from memory:

1. `documentation/old/PSTM_UI_DESIGN_LANGUAGE.md` — the exact design system (colours, type scale, spacing, components, cheatsheet). This is binding.
2. The closest existing page to what you're building, to copy structure and idioms:
   - Detail page reference: `src/app/quotations/[id]/page.tsx`
   - Inventory pipeline pages: `src/app/inventory/`
   - Shared table: `src/components/ProductItemsTable.tsx`
   - Shared dialog: `src/components/IssueConfirmDialog.tsx`
   - Sidebar / nav: `src/components/Sidebar.tsx`, `src/lib/sidebar-config.ts`
3. `AGENTS.md` §13 (working style) and §14 (UI design language) — already in context; re-read §14 if unsure.

If the user named a specific page type (detail / list / form / dashboard), open the nearest sibling and mirror it. **Reuse beats reinvention** — match the surrounding code's naming, comment density, and idioms.

---

## Step 1 — Commit to the system (the "design thinking" step, CRM edition)

Generic frontend skills tell you to pick a bold aesthetic. Here the aesthetic is already chosen. Instead, decide:

- **Information hierarchy**: What is the single most important number/entity on this view? (Amounts → `font-mono font-bold text-lg`; entity names → `font-bold text-xl`.) Everything else is intentionally suppressed via `text-sm text-muted-foreground` labels.
- **Density**: Pipeline docs are data-heavy. Use the table + sub-card rhythm, not airy marketing layouts.
- **Layout**: Detail views use the `grid grid-cols-1 md:grid-cols-3 gap-6` 2+1 split with a sticky right rail. List views are full-width tables. Forms follow the existing JO/WO/RMRO form structure.
- **State coverage**: Every view must handle loading, empty, and error states — using `text-muted-foreground` empty states and existing loaders, never bare spinners or unstyled text.

---

## Step 2 — Build with the locked tokens (non-negotiable)

**Fonts** — `font-sans` (Inter) for everything; `font-mono` (JetBrains Mono) for amounts, quantities, IDs, weights, dates-as-numbers. Never substitute another font. `tnum`+`zero` are global, so numbers already align.

**Colour tokens — use the token, never the hex:**
```
bg-card           warm white card surface (#f9f8f6)
bg-background      sage page bg (#f0f5f1)
text-primary      forest green #1a5c3e — icons, links-on-hover, chips, rings
bg-primary/10      tinted green for chips/avatars
text-foreground    #33404f primary text
text-muted-foreground  #6b7a8d labels & secondary text
border / bg-muted  #e2e5ea / #f1f4f7
text-destructive   #f04040 delete/danger only
```
The sidebar green `#69a64e` is a different colour — do not use it for content. Buttons use `.btn-primary` / `.btn-outline` from globals.css, not ad-hoc styles.

**Structure primitives (copy verbatim):**
```
Page wrapper:   space-y-6 max-w-5xl mx-auto pb-10
Main card:      bg-card rounded-xl border p-6 shadow-sm
Sub-card:       rounded-lg border bg-muted/30 p-4
Divider:        <hr className="border-border/50" />
Chip:           inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium
Avatar:         h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0
Phone pill:     text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground
Status badge:   .badge-pending | .badge-success | .badge-danger | .badge-neutral
```

**Type scale (the only sizes you may use):**
```
Page/primary heading   text-2xl font-bold        + h-6 w-6 text-primary icon
Section heading        text-lg font-semibold      + h-5 w-5 text-primary icon
Field label            text-sm text-muted-foreground   (always ABOVE the value)
Field value            inherits (16px / 400)
Money / qty / weight   font-mono font-bold text-lg
Entity / company name  font-bold text-xl
Sub-label              text-xs text-muted-foreground
Field-level icon       h-4 w-4 text-muted-foreground
```

**Radii & spacing:** `rounded-xl` (12px) main cards, `rounded-lg` (8px) sub-cards/chips, `rounded-md` (6px) buttons, `rounded-full` pills/avatars. Vertical rhythm: `space-y-6` between cards, `space-y-4` within a card, `space-y-3` between rows, `space-y-1` label→value. `p-6` main card, `p-4` sub-card. Do not introduce off-scale values (`p-5`, `gap-7`, `rounded-2xl` on a card, etc.).

**Header pattern** — mirror §11 of the design doc: BackButton + icon + title + "Created on…" subline on the left, action buttons (destructive outline → primary CTA → secondary outline) on the right.

---

## Step 3 — Respect the architecture (a UI page is only correct if it wires up correctly)

This is a Next.js App Router app on Cloudflare Workers. The frontend has hard constraints from AGENTS.md — violating them ships a broken page:

- **Data fetching**: hit the existing `/api/inventory/...` routes (see AGENTS.md §9). Do not call the DB from a client component. Reuse hooks like `useInventoryItems` where they exist.
- **Heavy browser-only libs** (recharts, html2canvas, jsPDF, anything canvas/chart): must be loaded via `next/dynamic` with `ssr: false` from a `'use client'` wrapper — never statically imported into a Server Component (AGENTS.md §15 gotcha #13). Never add `@react-pdf/renderer` (#12).
- **No `export const runtime = 'edge'`** anywhere (#8).
- **Group-header rows** (`isGroupHeader`) render as section headers with `*` for SR#, never as data rows; size rows carry the real quantities (§15 #9, #17).
- **Numbers from D1**: booleans come back as 0/1, dates as `"YYYY-MM-DD HH:MM:SS"` — format on display, don't assume JS types.

If you add a new field to a form, confirm the matching Zod schema AND the db.ts shim accept it (gotchas #16, #17) — a beautiful form that silently drops fields is a bug.

---

## Step 4 — Self-review before declaring done

Run through this checklist and fix anything that fails:

- [ ] Every colour is a token (`text-primary`, `bg-muted`, …), zero raw hex in JSX.
- [ ] Only design-system type sizes used; labels are `text-sm text-muted-foreground` above their values.
- [ ] Cards are `bg-card rounded-xl border p-6 shadow-sm`; sub-cards `rounded-lg border bg-muted/30 p-4`.
- [ ] Amounts/quantities/weights/IDs are `font-mono`.
- [ ] Spacing is on the 6/4/3/1 rhythm; no off-scale radii or padding.
- [ ] Loading, empty, and error states are all handled and styled.
- [ ] Icons sized per level (6/5/4) and `text-primary` or `text-muted-foreground` as appropriate.
- [ ] Matches the nearest existing page's structure and naming.
- [ ] Architecture rules honoured (no edge runtime, dynamic ssr:false for heavy libs, API routes for data, group-header handling).
- [ ] If you discovered a non-obvious quirk, append it to AGENTS.md §15 (per §13 working style).

Then summarise what you built, which existing page you mirrored, and end your output with **DONE** (per AGENTS.md §13).

---

## Hard "never" list (these read as AI slop in this codebase)

- Never use Inter substitutes, Space Grotesk, or any font outside Inter / JetBrains Mono.
- Never use purple gradients, generic shadcn defaults, or off-brand colours.
- Never invent a new card, badge, or button style — reuse the documented ones.
- Never hardcode hex values in JSX when a token exists.
- Never use off-scale spacing/radii to "make it look nicer" — the scale is the design.
- Never commit, run wrangler/D1, or deploy (AGENTS.md §13) — leave that to the user.
