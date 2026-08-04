# Games site design rules

## Game library cards

- Every game card uses the same cover aspect ratio and the same minimum label height. A longer or shorter game title must not change the overall card height.
- Use the real `cover.webp` from `static/images/<game-slug>/`. Do not reproduce the cover with CSS.

## Game landing pages

- Every game landing page uses the shared classes in `src/lib/styles/components.css`: `game-theme`, `game-landing`, `game-identity`, `game-logo`, `game-quote`, and `game-page-list`.
- The game theme supplies `--game-background-image` plus color tokens. It should not duplicate the shared landing-page layout.
- Background artwork is fixed, covers the full content area below the site header, and uses both a dark scrim and a radial vignette that falls into the game canvas color at the edges.
- Use the supplied `logo.webp` as the game identity. Do not replace it with a typed title, monogram, or recreated mark.
- Pair the logo with one short, game-appropriate quote and a concise attribution.
- Landing-page navigation rows stay translucent so the background artwork remains visible. Use the shared opacity and hover behavior unless the user explicitly requests a different material.
- Game landing pages use the shared two-column identity/navigation composition and collapse to one column below 48rem.

## Navigation hierarchy

- The global site header is the breadcrumb for game routes.
- Do not add another breadcrumb inside a game landing page or subpage.
- A subpage may provide local section navigation, but it must not repeat the site and game hierarchy already shown in the header.

## Theme ownership

- Shared structure and behavior belong in `src/lib/styles/components.css` or `src/app.css`.
- Game theme files should primarily define semantic color tokens, background assets, and truly game-specific component details.
- Before adding a game-specific override, check whether the decision should apply to all current and future games.
