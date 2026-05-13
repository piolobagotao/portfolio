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
