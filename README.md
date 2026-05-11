# Piolo Bagotao — Portfolio Website

A single-file portfolio site (`index.html`) with all CSS and JS inline. No build step. No dependencies.

---

## How to add images

1. Create the `images/` folder structure below next to your `index.html`:

```
index.html
images/
  photo.jpg                     ← your profile photo
  results/
    result-1.png                ← GSC screenshot
    result-2.png                ← GA4 screenshot
    result-3.png                ← rankings screenshot
  design/
    design-1.jpg
    design-2.jpg
    design-3.jpg
    design-4.jpg
    design-5.jpg
    design-6.jpg
  automation/
    n8n-1.png
    n8n-2.png
    n8n-3.png
    n8n-4.png
```

2. Drop your files in the correct subfolder.
3. Match the exact filenames (e.g. `photo.jpg`, `design-1.jpg`) — the HTML `src` attributes already reference them.
4. To rename: update both the filename AND the `src="images/..."` reference in `index.html`.

If an image is missing, the site will gracefully show a dashed placeholder card instead of a broken image — so you can deploy first and fill in screenshots later.

---

## How to get your screenshots

- **Profile photo:** Any good photo of yourself, cropped square. Export as `photo.jpg`.
- **Traffic results:** Open Google Search Console → Performance → screenshot the graph. Save as `result-1.png`. Repeat for GA4 (`result-2.png`) and your rank tracker (`result-3.png`).
- **Design samples:** Export from Canva as PNG/JPG, rename to `design-1.jpg` through `design-6.jpg`.
- **n8n workflows:** Open the n8n canvas → take a screenshot of each workflow. Save as `n8n-1.png` through `n8n-4.png`.

The captions for n8n samples are pre-set:
- `n8n-1.png` → Birthday Greeting Automation
- `n8n-2.png` → Watch Opportunity Data Entry
- `n8n-3.png` → Google Sheets Pipeline
- `n8n-4.png` → Content Repurposing Workflow

To change a caption, search for the filename in `index.html` and edit the value in the `autoCaptions` object.

---

## How to go live (free options)

### Option A — Netlify (easiest)
1. Go to https://netlify.com → sign up free.
2. Drag your entire project folder (with `index.html` + `images/`) onto the Netlify drop zone.
3. You get a live URL instantly (e.g. `piolo-bagotao.netlify.app`).
4. Connect a custom domain anytime from the Netlify dashboard.

### Option B — GitHub Pages
1. Push your files to a GitHub repo.
2. Go to repo Settings → Pages → set source to `main` branch, root folder.
3. Site goes live at `yourusername.github.io/repo-name`.

### Option C — Vercel
1. Go to https://vercel.com → sign up with GitHub.
2. Import the repo → deploy. Same instant URL flow as Netlify.

---

## How to update the Calendly link

Search for `calendly.com/piolobagotao` in `index.html` and replace with your actual Calendly URL. It appears in two spots — the "Set a Meeting" contact card.

---

## How to update other contact info

| What | Where to find it in `index.html` |
|------|----------------------------------|
| Email | Search `piolobagotao@gmail.com` |
| WhatsApp number | Search `639666856413` |
| LinkedIn URL | Search `linkedin.com/in/piolo-bagotao` |
| Canva portfolio | Search `piolob.my.canva.site` |

---

## How to add or remove a brand from the carousel

Open `index.html`, find the `brands` array in the `<script>` block, and edit:

```js
const brands = [
  { name: 'INGCO', domain: 'ingco.com', url: 'https://www.ingco.com' },
  // add/remove/reorder here
];
```

Logos are auto-fetched from `https://logo.clearbit.com/<domain>` — if that fails, the brand's first letter shows as a stylized fallback. Frames are grouped 4 brands at a time on desktop, 2 at a time on mobile.

---

## How to change a writing sample

Find the `<section id="writing">` block in `index.html` and edit the three `<a class="writing-card">` elements. Each has a domain, a title, and an `href`.

---

## Local preview

Just double-click `index.html` to open it in your browser. No server needed.

For live-reload while editing, run any static server in the project folder, e.g.:

```bash
npx serve .
# or
python -m http.server 8000
```

---

Built with intention.
