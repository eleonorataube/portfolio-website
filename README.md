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
script.js             project lightbox, "Skatīt" cursor, image-row arrows + progress line
assets/
  favicon.svg         emoji favicon (🩰)
  images/              all photography + design-work images (jpg)
```

## Design system

**Concept.** Editorial and near-monochrome - a design-studio portfolio rather
than a landing page. Warm paper ground, ink type, one red accent. The human,
people-first angle comes through real photos, a hand-written note beside the
portrait and a signed pull-quote, not decoration.

**Color tokens** (defined in `:root` in `styles.css`):

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#f2e6dc` | page background |
| `--paper-deep` | `#e8d9cc` | image placeholders |
| `--ink` | `#150407` | text; background of the quote band |
| `--muted` / `--faint` | ink at 62% / 45% | secondary / tertiary text |
| `--line` | ink at 14% | hairline dividers |
| `--accent` | `#a1091b` | the one accent (numbers, notes, cursor, links on hover) |

**Type.**
- Everything - [Work Sans]: weight 500 with tight letter-spacing for headings,
  400 for text. Highlighted words use colour, not italics.
- Hand-written - [Caveat], only for "Hey, esmu..." in the hero, the two "Eleonora" signatures and the
  "tā esmu es" note.

**Layout.** Hero is a dark band with the text on the page grid and the photo
bleeding off the right edge, fading into the ink. Below: asymmetric 12-column "Par mani" with
an offset text column, typographic skill and experience rows, one full-bleed
dark quote band, and project rows whose images bleed off the right edge and
scroll sideways.

**Motion.** Deliberately minimal - the scroll-mouse in the hero, image hover
zoom, and the one signature detail: a red "Skatīt" cursor over project
images (mouse only; touch and keyboard keep the defaults). No scroll reveals.

## Content notes

- All copy is in Latvian, written in first person.
- Experience, education, languages and skills are pulled from her CV
  (`Eleonora_Taube_CV_2026.pdf`, not included in this repo).
- Project images live in `assets/images/`: Infografikas (`infografika-2`), Sociālo tīklu vizuāļi (`linkedin-content-fire`,
  `linkedin-roles`, `coming-soon`, `atplauksti-atsauksmes`,
  `atplauksti-jolanta`) and Fotogrāfija (`fotografija-1` … `fotografija-6`).
- The Plakāti project is hidden for now; its images (`coming-soon-poster`,
  `atplauksti-marupe`) stay in `assets/images/` for when it comes back.

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
