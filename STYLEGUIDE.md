# HexaLabs style guide (v2 — light canvas, art cards, floating nav)

Inspired by large enterprise sites (light blue-grey canvas, white cards with soft
shadows, one or two near-black feature sections with card carousels, inset art
heroes). **Never copy** another site's text, names, logos or images.

Live reference of every primitive: **http://localhost:5173/_styleguide** (dev only,
source `src/pages/StyleGuide.tsx`, removed from production builds).

---

## 1. Colour and surfaces

Tokens live in `src/styles/theme.css` (Tailwind's default palette is disabled — only
these exist). Never hard-code hex values in components.

| Token / utility | Value | Use |
|---|---|---|
| `canvas` (`bg-canvas`) | #EDF1F8 | Page background, tone `paper` |
| `canvas-200` | #DFE6F1 | Deeper band, rails, soft chips |
| `white` | #FFFFFF | Cards, tone `white`, footer |
| `ink-950` | #061426 | Headings/text on light; dark sections; dark pills/chips |
| `ink-900` / `ink-700` / `ink-600` | | Raised fills and borders on dark |
| `blue-600` | #0A66C2 | Primary pill, links, accent gradient (light) |
| `blue-400` | #5AA6FF | Links/accent on dark |
| `orange-500` | #F28C1E | Max 1–2 tiny highlights per screen (offer chip, a dot). Never text on light. |
| `slate-600` / `slate-500` | | Body / muted on light |
| `slate-300` / `slate-400` | | Body / muted on dark |

No purple, no pink, no other hues.

### Surfaces (`<Section tone=…>`)

| tone | class | background | semantic utilities |
|---|---|---|---|
| `paper` | `surface-paper` | canvas | `text-heading` ink-950, `text-body` slate-600, `text-muted` slate-500, `border-line` slate-200, `bg-raised` white, `text-link` blue-600 |
| `white` | `surface-white` | white | same as paper, but `bg-raised` = canvas |
| `dark` | `surface-dark` | ink-950 | `text-heading` white, `text-body` slate-300, `text-muted` slate-400, `border-line` ink-700, `bg-raised` ink-900, `text-link` blue-400 |

Always use the semantic utilities (`text-heading`, `text-body`, `text-muted`,
`border-line`, `border-line-strong`, `bg-raised`, `text-link`) inside sections — they
flip automatically. `.card` forces light semantics inside it, so a white card on a
dark section still gets navy headings.

`<Section tone="dark" glow>` adds a soft blue radial glow behind the content.

### Section rhythm (every page)

```
PageHero (inset dark art panel, optional overlapping white cards)
→ paper   (canvas)  — centred SectionIntro + white card grid
→ white             — detail / list / split content
→ dark    (glow)    — feature section with a card Carousel  ← 1 per page (max 2)
→ paper             — more cards / FAQ / index of links
→ CtaBand (dark, framed artwork)  → Footer (white)
```

Rules: never put two dark sections next to each other; never two identical tones
next to each other unless a full-width element separates them; the CtaBand already
is dark, so the section before it must be `paper` or `white`.

---

## 2. Type

Geist (variable). Big headings are **light** — that is the look.

| Element | Classes | Weight |
|---|---|---|
| Home hero h1 | `display text-mega` | 300 |
| Inner hero h1 | rendered by `PageHero` | 300 |
| Section h2 | `text-h2` (base weight 400) | 400 |
| CTA / big h2 | `display text-h1` | 300 |
| Card title h3 | `text-xl font-medium tracking-tight` (or `text-lg`) | 500 |
| Lead | `text-lead text-body` | 400 |
| Eyebrow | `eyebrow` (Geist Mono, uppercase, muted) | — |

**Accent word** — exactly one per heading (1–2 words):
`<Accent>hands-on</Accent>` → brand-blue gradient text, light/dark aware.
`AccentHeadline title={{before, accent, after}}` for content-driven titles.
`<Accent variant="serif">` (Instrument Serif italic) — optional, at most once per page.

One `h1` per page and it is never animated.

---

## 3. Components (`src/components/ui/*`)

### Section headers — `ui/Section.tsx`
- `SectionIntro` **(default for new sections)**: centred eyebrow (blue dot), h2 with
  one `<Accent>`, short intro (max 2 lines), optional `actions` (one dark pill with arrow).
  `align="left"` for split layouts.
  ```tsx
  <Section tone="paper" labelledBy="cat-title">
    <SectionIntro id="cat-title" eyebrow="Lab catalogue"
      title={<>Pick the <Accent>stack</Accent> your course teaches.</>}
      intro="…" actions={<ButtonLink href="/labs" variant="dark" arrow="up-right">See all labs</ButtonLink>} />
    …content with mt-14…
  </Section>
  ```
- `SectionHeader` (left-aligned editorial, kept for split layouts).
- `Section` props: `tone`, `labelledBy`, `id`, `flush`, `glow`, `className`.
  Default padding `py-20 sm:py-24 lg:py-28`. Content under an intro starts at `mt-12`–`mt-14`.

### Buttons — `ui/Button.tsx` (all pills, soft shadow)
`<ButtonLink href variant size arrow>`; `buttonClass(variant, size)` for `<a>`/`<button>`.

| variant | look | where |
|---|---|---|
| `primary` | blue-600 pill | the one main action per view |
| `dark` | navy pill | secondary emphasis on light ("I'm curious" style), card actions |
| `light` | white pill | main action on dark sections / imagery |
| `secondary` | outline pill | low emphasis (adapts to surface) |
| `ghost` | translucent outline | second action over dark imagery |

`arrow="up-right"` (↗) or `"right"` (→) adds an icon that nudges on hover.
Sizes `sm` (36px), `md` (44px), `lg` (48px).

### Links
- `<LinkArrow href stretched srContext={title}>Know more</LinkArrow>` — underlined
  "Know more ↗". Use in every card. `stretched` makes the whole card panel clickable
  (card must be `relative`; `.card` is). `srContext` gives screen readers "Know more about X".
- `.link-underline` — plain underlined link (footer columns, "index of links" grids).
- `.link` — inline body link.

### Chips — `ui/Chip.tsx`
`<Chip>Use case</Chip>` navy label on white cards. `tone="light"` on dark/imagery,
`tone="soft"` pale on white cards, `tone="accent"` orange (offers only, max 1–2 per screen).

### Cards
- **`.card`** — white, radius 16, soft diffuse shadow; light semantics inside.
  Add **`.card-hover`** for hover lift (−6px, deeper shadow, 450ms smooth) on
  interactive cards. Padding `p-6 sm:p-8` (compact `p-5`).
- **`<IconCard icon title body href />`** — icon in a soft circle (`.icon-bubble`),
  title, one line, "Know more". `compact` = tighter on phones (2-up grids).
- **`<ArtCard image | logos | icon title body chip href | action />`** — ONE visual on
  top (zooms on hover), white panel overlapping its lower part, chip, title, body,
  "Know more ↗" or a custom `action` (e.g. `ButtonLink variant="dark" size="sm"`).
  `image` = one photo (`ph-*`) for kinds of lab, use cases and programs; `logos` = the
  product's single official logo, only on cards about one product. Never a cluster of
  logos on a card. `PhotoMedia` is the same photo block for custom cards.
- **Horizontal story card** (see `/_styleguide` "Top stories"): `card card-hover group grid
  overflow-hidden sm:grid-cols-[2fr_3fr]` with an `.art-zoom` image cell and text cell.
- `.card-night` — dark card for dark sections when white would be too loud (stats, specs).
- `.icon-bubble` — 40px soft circle for icons (blue on light, blue-400 on dark).
- `.card-lift` — legacy hover (kept for old cards; prefer `.card-hover`).

### Use cases (instead of "case studies")
No customer names, logos, stats, testimonials or prices. Use-case cards are built
from real offerings: chip "Use case", titles like "Run an AZ-104 batch for 30
learners", "Give each learner an OCI sandbox", body = a fact from `src/content/*`.

### Photography — `ph-*` (the main visual language)
Editorial photos of learners, trainers, engineers and data centres, one cool blue-teal
grade (originals in `brand-source/art/ph-*.png`, regenerated with the same style prompt).
No text, logos or readable screens in any photo, and never a portal screenshot.
- **Cards**: one photo per card (`ArtCard image` / `PhotoMedia`).
- **`<PhotoStage image>`** (`ui/PhotoStage.tsx`): rounded photo panel with white product
  cards (diagrams, timelines, chats) floating over its lower part. Use instead of a plain
  gradient stage.
- **`<Section tone="dark" image>`**: full-bleed photo band under a navy wash
  (`.band-wash`) for carousels and step rows.
- **Heroes**: `PageHero image="ph-hero-*"` (low-key, dark space on the left);
  `CtaBand` is an inset photo banner (`image`, default `ph-cta`).
- Don't put a plain colour gradient behind a section's visual when a photo fits.

### Art — `ui/Art.tsx`
`<Art name="sandboxes" />` — `<picture>` with AVIF/WebP 800w/1600w + JPG fallback,
1200×800 intrinsic size, lazy by default, `alt=""` (decorative) unless meaningful.
`priority` only for the hero image (eager + fetchpriority=high). Pass `sizes` that match
the rendered width.

| Dark (behind text) | Light (cards, frames) |
|---|---|
| `hero`, `dark-silk`, `dark-spiral` | `official-labs`, `sandboxes`, `lab-machines`, `certifications`, `training`, `ask-hexa`, `white-label`, `security`, `honeycomb` |

Use each light artwork once per page. Match art to topic (sandboxes page → `sandboxes`).

### Carousel — `ui/Carousel.tsx`
```tsx
<Carousel label="Use cases" className="mt-14">
  {items.map((u) => <ArtCard key={u.title} … />)}
</Carousel>
```
- Scroll-snap track, square prev/next buttons, live "1 / N" counter (N = real stops).
- Bleeds to the viewport edge by default (`bleed`), first card on the container line.
- `slideClassName` sets slide width (default 86% phone, 2-up sm, 3-up lg).
- `header={<p className="eyebrow">Top stories</p>}` puts controls top-right instead of centred below.
- No autoplay. Keyboard: Tab into cards, ←/→ inside the track, or the buttons.
- Use in the **dark** feature section (1 per page) or a white/paper "stories" row.

### Hero — `sections/PageHero.tsx`
Inset rounded dark panel (8–12px margin), a low-key photo drifting slowly behind a
light-weight h1 with one gradient accent word, chip eyebrow, lead, actions.
Props: `eyebrow`, `title` (AccentTitle), `body`, `actions`, `aside`,
`image` (a `ph-hero-*` photo; `imageFocus` sets the focal point), `overlap` (a row of
white cards overlapping the bottom edge —
use `IconCard`s, `grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4`).
Hero actions: `primary` + `ghost` (both `size="lg"`).

### CtaBand — `sections/CtaBand.tsx`
Inset rounded photo banner (navy wash, slow drift): chip, big light h2, body, white pill
+ "Existing customer? Log in". Props `title`, `body`, `cta`, `chip`, `image` (default
`ph-cta`), `imageFocus`.

### Forms
`.field` (48px, radius 12, blue focus ring), `.field-label`, `.field-error`. Forms sit in
a `.card p-6 sm:p-10`. Checkbox options are rounded-xl tiles.

---

## 4. Motion

All motion is transform/opacity, 0.4–0.8s, `--ease-smooth` (cubic-bezier(.22,1,.36,1)),
and is switched off under `prefers-reduced-motion` (CSS + MotionConfig).

| Pattern | How |
|---|---|
| Rise in on scroll (single block) | `<Reveal>` (fade + 24px rise, 0.7s) |
| Staggered card grid | `<RevealGroup as="ul" className="grid …">` + `<RevealItem as="li">` per card (90ms stagger) |
| Card hover | `.card-hover` (lift) ; `.art-zoom` image zooms inside a `.group` |
| Hero art | `.art-drift` wrapper — 26s slow zoom/pan (PageHero/Hero do this) |
| Hero cards on load | `.rise-in` with `style={{'--d': '200ms'}}` |
| Carousel | native smooth scroll-snap |
| Header | morphs into a floating pill after 24px of scroll (automatic) |

Never animate the h1 or anything above the fold that could be the LCP. Don't put
`Reveal` around hero content. Don't animate width/height/top/left. No autoplay, no parallax
on text, no infinite animations except the hero art drift and status dots.

---

## 5. Layout and accessibility checklist

- Container: `container-site` (1200px max, 16px gutter on phones).
- No horizontal page scroll at 360px — carousels scroll inside themselves.
- Contrast: navy/slate-600 on light, slate-300+ on dark; orange never as small text on
  light (use `chip-accent`, which uses a darker orange text).
- Every section has `aria-labelledby` pointing at its h2 id.
- Visible focus is global (`:focus-visible` outline, blue-600 / blue-400 on dark).
- Icons are `aria-hidden`; links with generic text ("Know more") get `srContext`.
- Prerender-safe: no `Math.random`, dates or `window` reads during render.

## 6. Do / don't

- Do: canvas page, white cards, one dark carousel section, light big headings, one
  accent word, art at the top of cards, underlined "Know more ↗".
- Don't: portal screenshots or UI mockups, invented customers/stats/prices, purple/pink,
  more than one orange highlight per screen, more than one primary button per view,
  borders + shadows on the same card (pick the shadow), new npm dependencies.
