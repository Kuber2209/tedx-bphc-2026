# Site structure — TEDx BPHC 2026

Page-by-page content outline for the site. This is the shared plan both of you are
building against — update it if scope changes so it stays accurate.

## `/` — Landing page (Team #1)

- **Hero** — event name, 2026 theme/tagline, date & venue, countdown timer, primary CTA
  ("Register" / "Get Tickets"), secondary CTA ("Nominate a Speaker")
- **Theme reveal** — the bold visual/typographic centerpiece for the 2026 theme
- **Credibility strip** — past-edition stats (attendees, speakers, views, editions run)
- **Teasers into inner sections** — small preview cards linking to `/speakers` and
  `/sponsors` (pulls from the same data Team #2 defines in `src/data/`)
- **Community / newsletter signup**
- Also owns: global theme tokens in `globals.css`, `Navbar`/`Footer` styling

## `/speakers` — Speakers (Team #2) ok ok 

- Current lineup grid: photo, name, one-line bio, talk title (if known)
- Past speakers / alumni section
- "Nominate a speaker" call-to-action

## `/team` — Team (Team #2)

- Organizing committee grouped by department (curation, design, marketing, ops,
  sponsorship, etc.)
- Core team vs. volunteers

## `/sponsors` — Sponsors (Team #2)

- Tiered sponsor logos (title / gold / silver / partner)
- Past sponsors
- "Partner with us" call-to-action

## `/gallery` — Gallery (Team #2)

- Photos (and video if available) from past events
- Optionally filterable by year

## `/schedule` — Schedule (Team #2)

- Event-day timeline/agenda

## `/venue` — Venue (Team #2)

- Location, embedded map, directions/parking info

## `/faq` — FAQ (Team #2)

- Accordion of common questions (tickets, registration, code of conduct, accessibility)

## Shared

- Design system (colors, fonts, spacing, motion feel) is set by Team #1 on the landing
  page — Team #2 matches it rather than inventing a separate one.
- Content types for cross-page data (speakers, team, sponsors, FAQ) live in
  `src/data/types.ts`.
- Admin CMS and final animation-library choice are open, not yet decided (see the
  project's coordination `CLAUDE.md`/`LOG.md`, kept outside this repo).
