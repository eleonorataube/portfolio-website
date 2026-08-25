# Eleonora Taube - Portfolio

**Live site:** https://eleonorataube.github.io/portfolio-website/

A personal portfolio site for Eleonora Taube (PR speciāliste, grafiskā dizainere,
deju skolotāja, fotogrāfe). Plain HTML/CSS/JS - no build step, no framework.
Open `index.html` directly, or serve it locally (see below).

## Running locally

No install needed - just open `index.html` in a browser. For a proper local
server (recommended, so relative paths and any future fetch calls behave
like production):

```bash
npx serve .
# or, with the VS Code "Live Server" extension: right-click index.html → Open with Live Server
```

## Project structure

```
index.html          all page markup and copy (Latvian)
styles.css           full design system + layout
script.js             scroll-reveal (IntersectionObserver)
assets/
  favicon.svg         emoji favicon (🩰)
  images/              all photography + design-work images (jpg)
```

## Design system

**Concept.** Everything Eleonora does - PR, graphic design, dance teaching,
photography - is read through one lens: movement. The site is built as a
"contact sheet" - a dark gallery wall that her black-and-white dance
photography and colour client work both get displayed against, with subtle
scroll-reveal motion and hover states that behave like flipping through
negatives.

**Color tokens** (defined in `:root` in `styles.css`):

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#141416` | page background |
| `--ink-raised` | `#1c1c1f` | gallery tile background |
| `--paper` | `#ece4d4` | primary text (warm bone) |
| `--paper-dim` | `#a89d8b` | secondary text |
| `--paper-faint` | `#726a5d` | tertiary / index numbers |
| `--accent` | `#c99a4c` | brass accent (dots, waveform bars) |
| `--accent-soft` | `#e0bb7c` | accent on text (links, emphasis) |
| `--wine` | `#8c3b45` | reserved secondary accent, currently unused - available for a future CTA or badge |
| `--line` / `--line-soft` | rgba bone at 14% / 7% | hairline dividers |

This is currently a **single committed dark theme** (a deliberate choice, not
an oversight - it's meant to read like a lit gallery wall / darkroom). If you
ever want a light mode, every color is already a token in `:root`, so the
next step would be adding a `prefers-color-scheme: light` override plus a
`[data-theme]` toggle.

**Type.**
- Display - [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable,
  `ital,opsz,wght` axes) for the name, headings and italic pull-quotes.
- Body - [Work Sans] for running copy.
- Labels / meta / numbers - [JetBrains Mono] for eyebrows, dates, frame
  numbers and nav - a nod to contact-sheet frame counters.

All three are loaded from Google Fonts in `index.html`'s `<head>`. If you
later add a bundler, swap that `<link>` for self-hosted `@font-face` files
for performance and to drop the external request.

**Layout.** Hero is a full-bleed, desaturated dance photo with a huge kinetic
name treatment. Sections below run in a single `.wrap` column
(max-width 1180px) with a numbered index (`01 - Ievads`, `02 - Rīki & ritms`
…) that doubles as a table of contents. The two portfolio sections
(`#darbi`, `#fotografija`) use an asymmetric CSS grid (`.contact-sheet`) with
varied tile spans (`.f-w1`, `.f-w2`, `.f-tall`) rather than a uniform grid, so
it reads like a curated wall rather than a template gallery.

## Content notes

- All copy is in Latvian, written in first person.
- Experience, education, languages and skills are pulled from her CV
  (`Eleonora_Taube_CV_2026.pdf`, not included in this repo).
- The seven images under `assets/images/` (`kristianam`, `ielugums`,
  `ieelpot`, `lieldienas`, `novelejumi`, `uzmanibu`, `pink_poster`) were
  cropped from `PORTFOLIO_2026_1.pdf`. Six more
  (`hero`, `ph_arm`, `ph_shoulder`, `ph_group`, `ph_legs`, `ph_street`) are
  her own black-and-white photography from the same file's "Fotogrāfija"
  page. Swap any of these for higher-resolution originals if she has them -
  these were compressed for a fast first load.

## Deploy

Hosted on **GitHub Pages**, served from the `main` branch root. Pushing to
`main` republishes the live site automatically - no build step, no CI config.

## Ideas for next steps

- Real `<meta property="og:*">` tags + a social preview image, now that
  there's a live URL to point them at.
- A contact form (currently just `mailto:` / `tel:` links).
- Self-host the three Google Fonts if you want to drop the external request
  entirely.
- A custom domain, if she gets one - GitHub Pages supports this via repo
  Settings → Pages → Custom domain.
