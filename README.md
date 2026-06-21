# deltalabsai.com — Delta Labs AI marketing site

Next.js (App Router) marketing site for Delta Labs AI. Served at **deltalabsai.com** via Vercel.

## Repo layout (important)

The Next.js app lives in **`src/`**, not the repo root:

```
deltalabsai-website/
├── public/            # repo-root public assets (served as-is)
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── public/        # additional public assets
│   ├── package.json   # app deps + scripts
│   └── next.config.js
└── .vercel/           # Vercel project link (gitignored)
```

> **Vercel Root Directory must be set to `src`** for git-triggered builds to find `package.json`.

## Local dev

```bash
cd src
npm install
npm run dev
```

## Deploy

- **Auto:** push to `main` → Vercel builds & deploys to production (deltalabsai.com).
- **Manual:** `vercel --prod` from repo root.
