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

## Hero video

The hero is a muted, looping background **video** with the still photo as a
fallback. It activates automatically the moment a file exists — see
[`assets/video/README.md`](assets/video/README.md) for specs and a couple of
suggested free Pexels clips. Autoplay is suppressed under
`prefers-reduced-motion`; off-screen it pauses to save resources.

## Photography

The layout is photography-first. The **hero and the five Brentwood landmark
slots are now real, self-hosted photos of the actual places** — pulled from
Wikimedia Commons under Creative Commons licences and bundled into
`assets/photos/` (see [`assets/photos/CREDITS.md`](assets/photos/CREDITS.md) for
attribution). The six race-day gallery tiles are **also self-hosted** now —
real marathon / half-marathon photos from Wikimedia Commons (they used to
hotlink Pexels, but `images.pexels.com` now blocks hotlinks with HTTP 403, so
nothing rendered). Every slot still falls back to a branded SVG placeholder if
the file can't load (e.g. offline).

> **Attribution:** all bundled photos are CC BY / CC BY-SA; credit the
> photographers per `assets/photos/CREDITS.md`, and note CC BY-SA's share-alike
> requirement.

To swap in your own / the official race photography, replace the `src` URLs in
`index.html` (or drop files into `assets/photos/` and point the `src` at them).

| Slot                       | File (`assets/photos/`)   | Where it appears            | Suggested size        |
| -------------------------- | ------------------------- | --------------------------- | --------------------- |
| hero still (place-led)     | `brentwood-hero.jpg`      | Full-screen hero backdrop   | ~1600×1000, landscape |
| hero video (optional)      | `../video/hero.mp4`       | Hero motion layer           | 1920×1080             |
| Brentwood Cathedral        | `lm-cathedral.jpg`        | "Run through Brentwood"     | ~900×1200, portrait   |
| The High Street            | `lm-highstreet.jpg`       | "Run through Brentwood"     | ~900×700              |
| The Chapel Ruins           | `lm-chapel.jpg`           | "Run through Brentwood"     | ~900×700              |
| Essex Countryside          | `lm-countryside.jpg`      | "Run through Brentwood"     | ~900×700              |
| Town-centre finish         | `lm-finish.jpg`           | "Run through Brentwood"     | ~1400×700, landscape  |
| Heritage / archive race    | `archive.jpg`             | "The Story" panel           | ~1000×1250, portrait  |
| gallery `g1`–`g6`          | hotlinked Pexels (swap)   | Race-day gallery tiles      | ~900×700              |

### Sourcing Brentwood landmark photos (free / properly-licensed)

Generic stock won't have Brentwood Cathedral or the High Street. Best free,
attribution-friendly sources for the *actual* places:

- **Wikimedia Commons** — search "Brentwood, Essex", "Brentwood Cathedral",
  "Brentwood High Street" (mostly CC BY-SA; credit the photographer).
- **Geograph Britain & Ireland** (geograph.org.uk) — excellent coverage of
  Brentwood streets, parks and the route's countryside (CC BY-SA 2.0).
- The town's own visitor sites / the official race archive for race-day shots
  (clear rights first).

> **Now bundled:** the hero, the five Brentwood landmark slots, the heritage
> `archive.jpg` and the six gallery tiles have all been fetched from Wikimedia
> Commons (`upload.wikimedia.org`) and self-hosted in `assets/photos/` under the
> filenames above — see [`CREDITS.md`](assets/photos/CREDITS.md). The archive
> shot is a road-race photo shown with a CSS grayscale/sepia "archive" tone (no
> freely-licensed *historic Brentwood Half* photo exists).

> **Licensing:** the live site's race photos appear to be by a commissioned
> photographer (Sussex Sport Photography) — clear rights before using those.
> The Pexels images shipped here are free to use under the Pexels licence.

## Notes

This is a design/UX prototype. "Enter", "Download GPX", and social links are
placeholders — in production they'd point at the official registration partner,
a real GPX file, and live social accounts.
