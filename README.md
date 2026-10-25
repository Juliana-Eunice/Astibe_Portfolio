# Portfolio — Modular Structure

This is my portfolio for WebDev.

Refactored from flat `index.html / style.css / script.js` into section-based modules.

## Structure

```
portfolio/
  index.html              # markup only (no inline CSS/JS)
  css/
    main.css              # entry — @imports all below in order
    variables.css         # :root + [data-theme="dark"] tokens
    base.css              # reset, .page-shell, section bands, .grid2
    components.css        # shared UI: .btn, .card, .tags, .icon-btn, .pill, image helpers
    header.css            # nav / burger / backdrop
    hero.css              # home: headline, frame, tape
    about.css             # about carousel + education
    projects.css          # featured + grid cards
    experience.css        # timeline + skills
    certifications.css    # vertical carousel + training
    contact.css           # footer + form
    modal.css             # image lightbox
    motion.css            # hover motion, image zooms, icon and skill interactions
    responsive.css        # all @media + reduced-motion
  js/
    main.js               # entry — imports all modules
    utils.js              # $, $$, root, mod
    theme.js              # dark/light toggle
    navbar.js             # active section + mobile menu (exports closeNav)
    modal.js              # lightbox (exports openModal/closeModal)
    about.js              # about carousel data + render
    projects.js           # projects data + featured/grid render (exports renderProjects)
    experience.js         # timeline render
    certifications.js     # certs carousel render
    contact.js            # validated form to email draft
    motion.js             # shared animation playback and reduced-motion cancellation
    reveal.js             # sequenced typography, portrait, stamp, and scroll entrances
  assets/
    images/               # photos, screenshots, certificates, SVG motifs and covers
```

## Notes

- JS uses native ES modules (`<script type="module" src="js/main.js">`). Open via a local server (`npx serve`, VS Code Live Server, or `python -m http.server`), not `file://`, so imports resolve.
- CSS uses `@import` via `css/main.css`, linked once from `index.html`.
- Image paths are `assets/images/*`. `me.JPG` keeps its uppercase extension for case-sensitive hosts. The reviewer app, student-management system, and My Little Pony analysis use their supplied images.
- `.page-shell` in `css/base.css` keeps navigation, content, and footer aligned. Its width and responsive gutters are defined in `css/variables.css`.
- The sticky navigation has a small Jea wordmark, soft active-link highlights, and a theme control. At 800px and below, it uses an expanding dropdown with Escape-to-close and keyboard focus handling.
- The shared palette uses warm white, lilac, periwinkle, blush pink, and cream. Small Mane Six cutie-mark illustrations accompany section headings: Twilight's star, Rainbow Dash's cloud and bolt, Pinkie Pie's balloons, Rarity's diamonds, Applejack's apples, and Fluttershy's butterflies. A six-mark footer brings them together. Both light and dark themes use the same tokens.
- The featured carousel cycles through five projects with public repositories. The grid shows the six remaining projects, including those without public links; selecting a linked project's title features it. The carousel remains available on mobile. Photos and certificates support keyboard-accessible image previews.
- Experience and Technical Skills have separate full-width sections. All six roles appear in a two-column timeline, followed by three skill groups; both stack into one column at 768px and below. Certifications and Training retain their paired layout.
- The contact form validates the fields and opens an email draft. It needs the visitor's email app; no delivery service or backend is configured.
- Motion includes line-by-line headline reveals, a settling portrait, sticker and cutie-mark stamps, project image wipes, directional gallery changes, and staggered section entrances. Desktop hover adds card lifts, image zooms, icon movement, and skill-chip feedback. Content stays visible without JavaScript; reduced-motion preferences skip or cancel animations and suppress hover movement. No animation library or extra installation is needed.
