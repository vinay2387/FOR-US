# Black Rose Love Story 🖤🌹

A premium, interactive romantic website — black-and-gold, glassmorphism, book-and-rose themed. Built with plain HTML, CSS, and vanilla JavaScript (no frameworks, no build step).

## Project structure

```
Love-Website/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── photo1.jpg … photo6.jpg   (placeholders — replace with real photos)
├── music/
│   └── piano.mp3                 (add your own — see below)
└── README.md
```

## 1. Adding your own photos

- Drop your images into the `images/` folder.
- Keep the same file names (`photo1.jpg`, `photo2.jpg`, …) to avoid touching the code, **or**
- Open `script.js`, find the `CONFIG` object at the top, and update the `img` paths inside `memories` and `polaroids` to match your new file names.
- Recommended: landscape photos (4:3 or 1:1) around 1200px wide, compressed as `.jpg` or `.webp` for fast loading.
- The hero background image is set directly in `index.html` on the element with class `hero-bg` (`background-image:url('images/photo1.jpg')`).

## 2. Changing the music

- Add an MP3 file to the `music/` folder and name it `piano.mp3` (or update the `<source>` path inside the `<audio id="bg-music">` tag in `index.html`).
- The floating button in the bottom-right corner toggles play/pause. Browsers block autoplay with sound, so the visitor must click the button once.

## 3. Editing the messages & text

Almost everything is easy to find and edit directly:

- **Hero title / subtitle** — edit the text inside `<section id="hero">` in `index.html`. The typewriter phrases live in `initTypewriter()` inside `script.js`.
- **Our Story (book)** — edit the two `.book-page` blocks in `index.html`.
- **Apology Letter** — the letter text is `contenteditable`, so visitors (or you, before publishing) can click directly on the paragraph in the browser and type. Finalize the wording, then remove `contenteditable="true"` in `index.html` if you don't want it editable after publishing.
- **Memory Cards, Bookshelf chapters, Rose Garden notes, Future Dreams** — all driven by the `CONFIG` object at the top of `script.js`. Add, remove, or edit array entries — the page updates automatically (memory cards support unlimited entries).
- **100 Reasons** — edit the `sample` array inside `renderReasons()` in `script.js`, or replace it with 100 unique lines.
- **Timeline** — edit the six `<li class="timeline-item">` blocks in `index.html`.
- **Final Love Letter** — edit the paragraph inside `<section id="final-letter">`.
- **Will You Forgive Me** — the celebration message is inside `#forgive-message` in `index.html`.

## 4. Colors & fonts

All colors are CSS variables at the top of `style.css`:

```css
:root {
  --bg: #050505;
  --card: #111111;
  --gold: #D4AF37;
  --wine: #4A0015;
  --white: #FFFFFF;
  --gray: #CCCCCC;
}
```

Change a value once and it updates everywhere. Fonts (Great Vibes, Cormorant Garamond, Poppins) are loaded from Google Fonts in `index.html` and referenced as `--font-script`, `--font-serif`, `--font-body` in `style.css`.

## 5. How to deploy

**Easiest — Netlify Drop**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `Love-Website` folder onto the page.
3. You'll get a live link instantly.

**GitHub Pages**
1. Create a new GitHub repository and push the contents of `Love-Website/` to it.
2. In the repo, go to **Settings → Pages**, set the source branch to `main` and folder to `/root`.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

**Vercel**
1. Go to [vercel.com/new](https://vercel.com/new) and import the folder/repo.
2. Leave build settings blank (it's a static site) and deploy.

**Just want to preview locally?** Simply double-click `index.html` to open it in a browser, or run a tiny local server for the smoothest experience (some browsers restrict `contenteditable`/audio on the `file://` protocol):

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- The site is fully responsive (desktop, laptop, tablet, mobile) and respects `prefers-reduced-motion` for visitors sensitive to animation.
- All interactive elements (book, rose garden, bookshelf, lightbox, forgive buttons) are keyboard accessible.
- Placeholder images and a music placeholder note are already included so the project runs out of the box — swap them for your real photos and song before sharing it. 🖤
