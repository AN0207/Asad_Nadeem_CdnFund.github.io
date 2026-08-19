# Asad Nadeem — Portfolio

A personal profile website with a dark-navy "supernova" theme: a twinkling starfield background, an ignition animation on the name, and flip cards for education and experience.

**Live sections:** Hero → Education → Experience → Skills → Industries of Interest → Contact

## Preview

Open `index.html` in any browser — no build step, no dependencies to install.

## Tech

Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools.

```
.
├── index.html      # page structure and content
├── style.css       # design system (colors, type, layout, animation)
├── script.js       # starfield canvas, flip-card interaction, scroll reveal
└── README.md
```

## Features

- **Starfield canvas** with soft twinkle and occasional ambient supernova flares.
- **Flip cards** for Education and Experience — tap/click (or press Enter/Space when
  focused) to reveal degree or role details on the back of the card, with a small
  flare burst on flip.
- **Grouped skill chips** and a bulleted industries-of-interest card.
- Scroll-reveal for each section, keyboard-accessible cards, visible focus states,
  and full support for `prefers-reduced-motion`.
- Fully responsive down to mobile.

## Customizing

- **Colors / type:** all design tokens live at the top of `style.css` under `:root`
  (`--bg-void`, `--flare-orange`, `--font-display`, etc.) — change them once, the
  whole site updates.
- **Content:** every section in `index.html` is plain markup — edit the text
  directly in the `education-grid`, `experience-grid`, `chip-row`, and
  `interest-list` blocks.
- **Company logos:** experience cards currently use a single initial in a
  gradient badge (`.logo-badge`). To use real logo images instead, replace the
  `<span class="badge-ring logo-badge">X</span>` with an `<img>` tag pointing to
  a logo file.

## Deploying with GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder, then **Save**.
5. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two.

## License

Personal project — feel free to fork the structure for your own profile site.
