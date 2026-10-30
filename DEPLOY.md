# Deploying to Hostinger

Pushing to `main` on GitHub deploys the site to Hostinger automatically.

- Repo: https://github.com/Martinez-2305/St-Paul-s-Cleaning-Services- (public, so no deploy key needed)
- Live site: https://www.stpaulscleaningservices.co.uk (www is the main address; the bare domain and http redirect to it)
- Hosting: Hostinger shared hosting (LiteSpeed). `.htaccess` controls redirects, security headers, caching and the 404 page.

## One-time setup in hPanel

1. **Empty `public_html`.** Hostinger only deploys into an empty folder. In hPanel → Files → File Manager → `public_html`, delete everything, including the "Coming soon" `default.php`.
2. **Connect the repo.** hPanel → Websites → Manage → Advanced → **Git**:
   - Repository: `https://github.com/Martinez-2305/St-Paul-s-Cleaning-Services-.git`
   - Branch: `main`
   - Directory: leave empty (deploys to `public_html`)
   - Click **Create**, then **Deploy**.
3. **Turn on auto-deploy.** On the same Git page, click **Auto deployment** and copy the webhook URL. In GitHub → repo **Settings → Webhooks → Add webhook**, paste it as the Payload URL, keep "Just the push event", and save.
4. **SSL** is already issued (Let's Encrypt, covers www and the bare domain). Leave it on auto-renew.

## Every deploy

```
git add -A
git commit -m "Describe the change"
git push
```

Hostinger pulls within a few seconds. If a deploy doesn't show up, open hPanel → Git and click **Deploy** to see the log.

Never edit files directly in File Manager. Hostinger runs `git pull`, so local edits on the server can block the next deploy.

## Check after the first deploy

- `http://stpaulscleaningservices.co.uk/` → one 301 redirect to `https://www.stpaulscleaningservices.co.uk/`
- `https://www.stpaulscleaningservices.co.uk/index.html` → 301 to `/`
- `https://www.stpaulscleaningservices.co.uk/.git/config` → 403 (must **not** download)
- `https://www.stpaulscleaningservices.co.uk/supabase/config.toml` → 403
- `https://www.stpaulscleaningservices.co.uk/SEO-TODO.md` → 403
- `https://www.stpaulscleaningservices.co.uk/does-not-exist` → the branded 404 page
- `https://www.stpaulscleaningservices.co.uk/googlea34612908ca94926.html` → loads (Search Console verification)
- Send a test quote from the contact form and confirm it arrives (Formspree)

## Retire Vercel

The domain no longer points to Vercel. In the Vercel dashboard, remove `stpaulscleaningservices.co.uk` and `www` from the project's Domains. Then disconnect the Git repo or delete the project so it stops building on every push.

## DNS and email

DNS is managed at Namecheap (`dns1/dns2.registrar-servers.com`), not Hostinger. The A record points to Hostinger (`145.14.152.16`), and `www` is a CNAME to the bare domain.

The site email is `contact@stpaulscleaningservices.co.uk` on Hostinger Email. For it to receive mail, the domain's mail records at Namecheap must point to Hostinger, not to Namecheap's email forwarding. Copy the exact values from hPanel → Emails → the domain → **DNS settings**. They are normally:

- Namecheap → Domain List → Manage → **Advanced DNS** → Mail Settings: switch from "Email Forwarding" to **Custom MX**
- MX `@` → `mx1.hostinger.com` (priority 5) and `mx2.hostinger.com` (priority 10)
- TXT `@` (SPF) → `v=spf1 include:_spf.mail.hostinger.com ~all`. Replace the old `spf.efwd.registrar-servers.com` record; keep only one SPF record.
- DKIM: the three CNAME records `hostingermail-a/b/c._domainkey` shown in hPanel
- TXT `_dmarc` → `v=DMARC1; p=none`
