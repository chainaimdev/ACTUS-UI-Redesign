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
