# ACTUS unified site — change log

Base: `Actus_white_blue-main`. Theme palettes merged from `actus-black-gold-main`,
`actus-bg-dark-blue-main` and `actus-main` (Graphite Oxblood).

## Task 1: theme switcher

| File | Change |
|---|---|
| `lib/themes.ts` | **New.** Theme registry (id, label, color scheme, browser theme-color, swatch), `DEFAULT_THEME`, storage key, `?theme=` param, no-flash boot script. |
| `app/globals.css` | `:root` = White & Blue. Added `[data-theme='black-gold' \| 'dark-blue' \| 'graphite']` blocks. New tokens replace the old hardcoded colours: `--elevated`, `--on-brand`, `--on-brand-hover`, `--header-bg`, `--footer-bg`, `--logo-inverted-mid`, `--shadow-rgb`, `--text-gradient`. |
| `components/theme-provider.tsx` | **New.** React context: `useTheme()` → `{ theme, themes, setTheme }`. Persists the choice to localStorage. |
| `components/theme-switcher.tsx` | **New.** Header dropdown (Base UI menu, radio items with swatches, closes on select, keyboard accessible). |
| `components/ui/dropdown-menu.tsx` | Copied from `actus-bg-dark-blue-main` (same `@base-ui/react` dependency). |
| `app/layout.tsx` | Wraps the app in `<ThemeProvider>` and runs the boot script in `<head>`. Viewport derives from `DEFAULT_THEME`. |
| `components/site-header.tsx` | Adds `<ThemeSwitcher />`. `bg-white` changed to `bg-header` / `bg-elevated`. |
| `site-footer`, `newsletter-form`, `section`, `actus-logo`, `home/contact-section`, `home/try-it`, `home/hero-illustration`, `app/page.tsx` | Hardcoded white and navy values changed to theme tokens. |

Configuration:
- `NEXT_PUBLIC_DEFAULT_THEME=white-blue|black-gold|dark-blue|graphite`: site default (build time).
- `?theme=<id>` in the URL forces a theme for that visit, e.g. for sharing a preview.
- `<ThemeProvider defaultTheme=… persist={false}>`: per-app overrides.
- To add a theme, add one entry in `lib/themes.ts` and one `[data-theme]` block in `globals.css`.

## Task 2: text (`data/home.ts`)
- What is ACTUS card: "The Standard" → "The ACTUS Standard"
- "Why is it important?" → "Why is ACTUS important?"
- "How can you try it?" → "How can you try ACTUS?"
- What is ACTUS description: "…the foundation that stewards it." → "…stewards ACTUS."
- Footer: `© {year} …` → `© Year ACTUS Financial Research Foundation`, set by `foundationInfo.copyrightYear`.

## Task 3: new sections
| File | Change |
|---|---|
| `data/showcase.ts` | Rewritten. `useCaseItems` has 4 empty slots and `projectItems` has 5. |
| `components/home/showcase-card.tsx` | **New.** Shared card. Shows a placeholder until `title` is filled. |
| `components/home/use-cases.tsx` | **New.** "ACTUS Use cases": responsive 1→2→4 column grid. |
| `components/home/projects-carousel.tsx` | **New.** "ACTUS Projects": Embla carousel with dots and prev/next. |
| `components/home/showcase-carousel.tsx` | **Removed.** The old "ACTUS Use Cases & Projects" carousel would duplicate the new sections. |
| `app/page.tsx` | The two new sections take the old carousel's slot (after Quick resources, before Get involved). |

---

# v2 — logos, gallery, refined White & Blue, Colors dropdown

## 1. Logo integration (source: `Actus-UI-Redesign/ACTUS-Logos`, originals untouched)
Web copies in `public/brand/`, white backgrounds removed with a colour-to-alpha pass so they sit on any theme.

| Placement | Logo used | Why |
|---|---|---|
| Header + mobile menu | `ACTUS Logo.png` → `actus-wordmark.png` (mark + wordmark, tagline trimmed) | The tagline is ~4px tall at header size and turns into noise. |
| Footer | `ACTUS-RESEARCH-FOUNDATION.png`, reversed to white | The site belongs to the foundation, and the footer is dark in every theme. |
| Favicon | `ACTUS Favicon.png` → `favicon-32/192/512.png`, `apple-touch-icon.png`, `favicon-32-dark.png` | Official favicon art, cropped to the A so it reads at 16–32px; white version for dark browser UI. |
| New "Powered by ACTUS" partners section | Research Foundation, Users Association, Powered by ACTUS | The three ecosystem marks. |
| Not used on the web | `Actus Logo CMYK (print).jpg`, `Actus Logo RGB (web).jpg`, `Actus Logo (black version).png` | CMYK is print-only; the RGB JPG duplicates the PNG on a white box; the black outline version is for single-colour print. Dark themes use the colour logo reversed to white instead. |

Files: `components/actus-logo.tsx` (renders official PNGs; `variant` + `tone` props; `tone="auto"` reverses on dark themes), `components/site-footer.tsx`, `app/layout.tsx` (icons), `app/globals.css` (`.brand-logo` reverse rule), `data/partners.ts`, `components/home/powered-by.tsx`.

## 2. Gallery section (same page, after "ACTUS Projects")
- `data/gallery.ts`: categories plus 8 PLACEHOLDER items (generic copy, no real events, names or dates). Set `image` / `href` per item when real content exists.
- `components/home/gallery.tsx`: dark "stage" band in the active theme's deepest colour, filter chips with counts (All, Hackathons, Announcements, Previous Winners, Upcoming Events), bento grid, generated ACTUS-tile artwork when there's no image, staggered scroll-in animation, hover lift and sheen, pulsing dot on upcoming items. Respects reduced-motion.
- `app/globals.css`: `.gallery-*` styles and keyframes.

## 3. White & Blue refinement (`[data-theme='white-blue']` only; other themes unchanged)
- Palette sampled from the official logo: navy `#002d56`, blue `#0069aa`, mid `#015289`; off-white paper `#fbfcfd`, cool-grey neutrals, no cyan.
- Headline: navy resolving into logo blue (no rainbow gradient). Headings in Inter 700, tight tracking.
- Buttons: solid navy with a subtle top highlight and layered navy-tinted shadows; outline buttons are hairline.
- Cards: hairline borders, soft two-layer shadows, 2px solid accent instead of a gradient bar; smaller radius (0.5rem); hero glows toned down.
- `components/home/hero.tsx`: glow opacities read `--hero-glow-a/b` tokens.

## 4. Separate "Colors" dropdown
- `lib/themes.ts`: every entry has a `group`: `theme` (White & Blue, Black & Gold, Dark Blue, Graphite) or `palette` (Sandpaper, Sage, Harbor, Plum Noir).
- `components/theme-switcher.tsx`: `group` prop; the header renders two dropdowns (Theme, Colors). One skin is active at a time; the other dropdown shows "none selected".
- `app/globals.css`: `[data-theme='sandpaper' | 'sage' | 'harbor' | 'plum']` palettes (Sandpaper adds a paper grain).
- `components/site-header.tsx`: second dropdown; from 1024 to 1279px the dropdowns are icon-only and nav links are slightly tighter so everything fits.
