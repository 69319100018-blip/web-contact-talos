# Talos · Fusion

Portfolio site for **Talos Blackagency** — cinematic themes, music player, projects & character gallery.

## Structure

```
├── index.html              # Entry page
├── css/
│   ├── base.css            # Reset + tokens
│   ├── background.css      # Video bg, overlay, particles
│   ├── intro.css           # Enter gate
│   ├── loader.css          # Loading screen
│   ├── layout.css          # Site shell + navbar
│   ├── sections.css        # About / projects / chars
│   ├── gallery.css         # Album modal + lightbox
│   ├── player.css          # Music player
│   ├── responsive.css      # Mobile breakpoints
│   ├── theme-adapt.css     # Theme class hooks
│   ├── animations.css      # Extra motion
│   ├── effects.css         # Spotlight, reveal, select-lock
│   ├── style.css           # Optional @import barrel
│   └── themes/             # Theme packs (secret, 222, noir, …)
├── js/
│   ├── core.js             # DOM + audio play/progress
│   ├── enter.js            # Intro loader + progressive reveal
│   ├── themes.js           # Theme / background switch
│   ├── secret.js           # Secret lyric theme
│   ├── boot.js             # Default theme on load
│   ├── effects.js          # Stars + particles
│   ├── nav.js              # Navbar + scroll
│   ├── gallery.js          # Albums, lightbox, chars
│   ├── fx-ui.js            # Spotlight + card reflection
│   ├── viz.js              # Music visualizer
│   └── anti-inspect.js     # Light inspect deterrents
├── assets/
│   ├── audio/              # Soundtrack tracks
│   ├── video/
│   │   ├── bg/             # Background theme videos
│   │   └── clips/          # Project showcase clips
│   └── images/
│       ├── profile/        # Avatar, QR, hero photo
│       ├── chars/          # Character art
│       ├── games/          # Game project stills
│       ├── thumbs/         # Video thumbnails
│       └── works/          # Other work images
├── README.md
└── .gitignore
```

## Run locally

Open `index.html` in a browser, or use a simple static server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

> Note: some browsers restrict autoplay / audio on `file://`. Prefer a local server.

## Themes

| Theme   | Background                         | Track |
|---------|------------------------------------|--------|
| Secret  | `photo-2k.png` (default)           | Impulsive — THEKIDSZN |
| 222     | `assets/video/bg/222.mp4`          | Bye Into You remix |
| Noir    | `assets/video/bg/noir.mp4`         | Insomnia |
| Aegir   | `assets/video/bg/qingxioa.mp4`     | Funk Mandala |
| Alucard | `assets/video/bg/alucard.mp4`      | Sweater Weather |

## GitHub notes

- Video/audio files are large. For GitHub consider [Git LFS](https://git-lfs.github.com/):
  ```bash
  git lfs install
  git lfs track "assets/video/**"
  git lfs track "assets/audio/**"
  ```
- Default landing theme is **secret** (lyric view + Impulsive).

## License

Personal portfolio — all rights reserved unless otherwise noted.
