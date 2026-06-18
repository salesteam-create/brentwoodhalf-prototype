# Matchroom Brentwood Half Marathon — Redesign Prototype

A static, front-end-only concept redesign for the **Matchroom Brentwood Half
Marathon** (brentwoodhalf.org) — Essex's largest half marathon, in its 44th
year, now backed by a 5-year Matchroom title sponsorship.

> **Design direction:** *Matchroom Bold + heritage* — dark, high-contrast,
> sport-broadcast energy with an electric-lime accent and oversized condensed
> type, warmed up with the event's 44-year heritage and local charity story.

## Run it

It's pure HTML/CSS/JS with no build step or backend. Open `index.html` in a
browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What's in here

```
index.html        # single long-scroll landing page
css/styles.css    # design system + all section styling
js/main.js        # countdown, animated counters, scroll reveal, nav, FAQ
```

## Sections

1. **Hero** — cinematic dark hero, live countdown to race day, dual CTAs
2. **Marquee** — scrolling event facts band
3. **Stats** — animated counters (44 yrs · 13.1 mi · 2,500 runners · £100k)
4. **The Course** — animated SVG elevation profile, course facts, GPX hook
5. **The Story** — heritage 1982→2026 + the Matchroom partnership
6. **Charities** — the four local causes the event supports
7. **Entry** — three pricing tiers with a featured Half Marathon plan
8. **FAQ** — accessible accordion
9. **Sponsors + final CTA + footer**

## Notable details

- **Live countdown** rolls forward to the next 22-March edition automatically,
  so it always shows a positive, ticking countdown.
- **Scroll-triggered** stat counters and elevation line-draw via
  `IntersectionObserver`.
- Fully **responsive** with a mobile slide-in menu.
- Respects **`prefers-reduced-motion`** (animations disabled, content shown).

## Photography

The layout is photography-first. Each photo slot loads a real image and falls
back to a branded SVG placeholder if the file is missing — so dropping in the
official shots is just a filename swap (no code changes). Add these files to
`assets/photos/`:

| File                    | Where it appears              | Suggested size      |
| ----------------------- | ----------------------------- | ------------------- |
| `hero.jpg`              | Full-screen hero background   | ~1600×1000, landscape |
| `story.jpg`             | "The Story" portrait panel    | ~1000×1250, portrait  |
| `g1.jpg` … `g6.jpg`     | Race-day gallery tiles        | ~900×700, landscape   |

> **Licensing note:** the live site's race photos appear to be by a commissioned
> photographer (Sussex Sport Photography). Use images you have the rights to —
> either the official race photography (with the photographer's clearance) or
> properly-licensed stock. This environment can't fetch external images, so the
> placeholders ship in their place for now.

## Notes

This is a design/UX prototype. "Enter", "Download GPX", and social links are
placeholders — in production they'd point at the official registration partner,
a real GPX file, and live social accounts.
