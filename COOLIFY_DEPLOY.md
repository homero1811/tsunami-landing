# Coolify Deployment Guide — Tsunami Automation Landing Page

## Target

- **Domain:** `tsunamiautomation.com`
- **Server:** TSA_01 (Coolify at `https://coolify.tsunamiautomation.com`)
- **Deployment mode:** Git + Dockerfile, auto-deploy on commit to `main`

---

## Step 1: Create GitHub repo

Create a new private GitHub repo and push this code:

```bash
git init
git remote add origin git@github.com:homero1811/tsunami-landing.git
git add .
git commit -m "Initial: Tsunami Automation landing page"
git push -u origin main
```

---

## Step 2: Create Coolify app

In the Coolify dashboard (`https://coolify.tsunamiautomation.com`):

1. **New Resource → Application → Git + Dockerfile**
2. Set:
   - **Repository:** `git@github.com:homero1811/tsunami-landing.git`
   - **Branch:** `main`
   - **Dockerfile path:** `./Dockerfile`
   - **Internal port:** `3000`
   - **Domain:** `tsunamiautomation.com` (enable auto-SSL)
3. **Enable "Auto deploy on push"** (this replaces GitHub Actions)

---

## Step 3: Environment variables

No secrets required for the landing page — it's stateless.

Optional runtime vars (add if needed later):
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## Step 4: First deploy

Click **Deploy** in Coolify. Build takes ~2 minutes.

Verify after deploy:
```bash
curl -sf https://tsunamiautomation.com/api/health
# Expected: {"status":"ok","service":"tsunami-landing"}

curl -sf https://tsunamiautomation.com/
# Expected: 200 OK with landing page HTML
```

---

## Subsequent deploys

Any commit pushed to `main` triggers an automatic redeploy via Coolify's webhook. No manual steps needed.

---

## Lead capture

Form submissions currently log to Coolify service logs (stdout). To view:

- Coolify dashboard → Application → **Logs**

To connect to a CRM later, update `src/app/api/audit-call/route.ts` — the TODO comment marks the integration point.

---

## Notes

- The Dr. Ibarra social proof metrics (23% no-show, 16:1 ROI) are used as placeholders — confirm with Maya before launch if final copy is different
- `hello@tsunamiautomation.com` is in the footer — make sure that inbox is set up
