# Memory Lane Gift — A Timeline of You

A private birthday memory/timeline website. Password-protected, single-page app.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the built site locally
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Use these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click Deploy. That's it.

The `vercel.json` file already handles SPA routing so all paths (`/admin`, etc.) work correctly.

## Editing content

Visit `/admin` on the deployed site (or click the tiny "edit" link in the footer).  
All content is saved to `localStorage` in the visitor's browser — no database needed.

To reset to defaults, use the "reset" button in the admin panel.

## Features

- Password gate before entering
- Hero section with animated polaroid frames
- Timeline of memory/photo/song/letter cards
- Final surprise modal with a personal letter
- Admin panel to edit all content and reorder cards
- Fully responsive, mobile-friendly
