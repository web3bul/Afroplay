# Deploying AfroPlay (GitHub + Vercel auto-deploy)

This project is a Vite + React + TypeScript single-page app. Once it's on GitHub and
imported into Vercel, every push to your `main` branch will build and deploy
automatically. You only have to do the connection steps below once.

All commands are meant to be run on your **Windows machine** (PowerShell), from the
project folder:

```powershell
cd "C:\Users\benja\Documents\Afro play"
```

---

## 0. One-time cleanup (required before first commit)

During setup a partial `.git` folder was created that couldn't be finished (the tool
environment can't delete files in this folder, so a leftover `index.lock` is stuck
inside it). Delete that folder once, on Windows, so you can start git fresh:

```powershell
Remove-Item -Recurse -Force .git
```

If Explorer is easier: turn on "Hidden items" in the View menu, then delete the
`.git` folder. This does **not** touch any of your code or content.

---

## 1. Initialize git and make the first commit

```powershell
git init -b main
git add .
git commit -m "Restructure content into data files; add Vercel config"
```

`.gitignore` already excludes `node_modules`, `dist`, and `.env.local`, so your API
key and build output stay off GitHub. Your images under `public/` (team, guests,
partners, logo, music) **are** committed — the site needs them.

---

## 2. Create the GitHub repo and push

**Option A — GitHub CLI (fastest).** If you have the `gh` CLI installed and are
logged in (`gh auth login`):

```powershell
gh repo create afroplay --private --source=. --remote=origin --push
```

That creates the repo and pushes `main` in one step.

**Option B — GitHub website.**
1. Go to https://github.com/new
2. Name it `afroplay`, leave it empty (no README, no .gitignore — you already have them), click **Create repository**.
3. Back in PowerShell, connect and push (replace `YOUR-USERNAME`):

```powershell
git remote add origin https://github.com/YOUR-USERNAME/afroplay.git
git push -u origin main
```

---

## 3. Import into Vercel (turns on auto-deploy)

1. Go to https://vercel.com/new and sign in with GitHub.
2. Under **Import Git Repository**, pick `afroplay`. (First time, click *Adjust
   GitHub App Permissions* and grant access to the repo.)
3. Vercel auto-detects the settings from `vercel.json` — you should not need to
   change anything:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variables:** none required. (The `GEMINI_API_KEY` in `.env.local` is
   leftover scaffolding and is not used anywhere in the app.)
5. Click **Deploy**. First build takes ~1 minute; you'll get a `*.vercel.app` URL.

That's it. From now on, **every `git push` to `main` triggers a new production
deploy**, and pull requests get their own preview URLs automatically.

---

## 4. Day-to-day: editing content

Content now lives in typed data files under `data/` — you can edit copy without
touching component/JSX code:

| File | Controls |
|------|----------|
| `data/hero.ts` | Hero badge, headline, bullet points, primary CTA, stat card |
| `data/services.ts` | "Our Role in the Ecosystem" cards + "Why Partner" benefits |
| `data/market.ts` | "Why Africa? Why Now?" feature cards + closing quote |
| `data/team.ts` | Team members, grouped by category |
| `data/partners.ts` | Partner names, logos, and graph positions |
| `data/social.ts` | Footer social links |
| `data/episodes.ts` | Onchain Africa episodes (already existed) |
| `lib/constants.ts` | Brand-kit URL and shared Discord invite |

Icon choices in `hero`, `services`, and `market` use short string keys (e.g.
`iconKey: 'educate'`) that map to lucide-react icons inside each component — change
the string to swap icons, or add a new key to the map in the component.

To publish an edit: save the file, then

```powershell
git add .
git commit -m "Update <what you changed>"
git push
```

Vercel redeploys within a minute.

---

## 5. Custom domain (optional)

In the Vercel project: **Settings → Domains → Add**, enter your domain, and follow
the DNS instructions. Vercel provisions HTTPS automatically.
