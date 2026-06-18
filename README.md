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

## Notes

This is a design/UX prototype. "Enter", "Download GPX", and social links are
placeholders — in production they'd point at the official registration partner,
a real GPX file, and live social accounts. Imagery is rendered with CSS/SVG so
the prototype is fully self-contained; production would swap in race-day
photography and an interactive course map.
