# BrainIT Automation — Fast Path

A one‑page React + Tailwind app that helps visitors self‑qualify and jump to the right next step on BrainITConsulting.com.

## Local dev
```bash
npm i
npm run dev
```

## Deploy
Export to Netlify/Vercel or open the repo in Bolt.new for quick edits.

## Bolt.new Prompt (paste this in Bolt's prompt box)
Build using the files in my GitHub repo (the repo URL I open in Bolt). Keep the project as a single-page app titled “BrainIT Automation — Fast Path”. Do not add a backend. Ensure:
- Industry dropdown (Boutique, Coffee Shop, Legal, Dental, Art Gallery).
- 5–7 dynamic questions per industry from src/questions.ts.
- Scoring: each “Yes” = 1 point; any item with weight:2 adds 2.
- Recommendation card:
  - 0–3 → “Start with a Free Prototype” → https://brainitconsulting.com
  - 4–6 → “Book a $50 Pro Work Session” → https://brainitconsulting.com/book-pro-work-session
  - 7+ → “Basic AI Setup ($250)” → https://brainitconsulting.com/pricing
- Responsive Tailwind styling, Reset button, and no external calls.
