# FOSSARYTHM8 — Content Intelligence Platform

A full-featured content creator SaaS dashboard. Open source, free to deploy.

## Features
- 8 switchable color palettes (60:30:10 ratio system)
- Real-time trend radar across YouTube, TikTok, Instagram, X
- Interactive trend drill-downs with sparklines and deep analysis
- Post lineup calendar — click to edit, add, delete posts
- AI Brain with persistent chat (Claude-powered)
- Content idea scorer and caption generator
- Interactive analytics with Recharts (area, bar, line charts)
- Shared global state — all data is consistent across every page

## Tech Stack
- **Vite + React 18** — fast dev, instant HMR
- **React Router v6** — real URL-based navigation
- **Zustand** — global state store (single source of truth)
- **Recharts** — interactive analytics charts
- **Vercel Edge Functions** — secure API proxy for Anthropic

---

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Set your API key
Create a `.env.local` file in the root:
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```
Get a free key at: https://console.anthropic.com

### 3. Run the dev server
```bash
npm run dev
```
Open http://localhost:5173

---

## Deploy to Vercel (Free — AI features work live)

### Option A: GitHub + Vercel (recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial FOSSARYTHM8 deploy"
   git remote add origin https://github.com/YOUR_USERNAME/fossarythm8.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com → New Project
   - Import your GitHub repo
   - Framework: **Vite** (auto-detected)
   - Click **Deploy**

3. **Add your API key in Vercel**
   - Go to your project → Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`
   - Redeploy (Deployments tab → Redeploy)

Your app is live at `https://fossarythm8.vercel.app` (or custom domain)

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
# Follow prompts, then:
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

---

## Deploy to Netlify (AI features require additional setup)

1. Build the project: `npm run build`
2. Go to https://netlify.com/drop
3. Drag the `dist/` folder onto the page
4. For AI features, add a Netlify Function (see `/netlify/functions/claude.js`)

---

## How the AI proxy works

In production, the app calls `/api/claude` which is a Vercel Edge Function
in `/api/claude.js`. It forwards requests to Anthropic with your server-side
API key. The key is never exposed to the browser.

In development, it calls the Anthropic API directly using the key from `.env.local`.

---

## Customising

- **Data**: Edit `/src/store/index.js` — all posts, trends, and analytics live here
- **Palettes**: Add new color schemes to the `PALETTES` array in the store
- **Pages**: Each page is a standalone file in `/src/pages/`
- **API model**: Change `claude-sonnet-4-20250514` in AIBrain.jsx to any model

---

## License
MIT — free to use, modify, and deploy.
