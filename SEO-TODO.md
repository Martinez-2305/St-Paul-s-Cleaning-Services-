# SEO to-do — St Paul's Cleaning Services

The real domain is **https://www.stpaulscleaningservices.co.uk**. Every page used to point its canonical tag at `stpaulscleaning.co.uk`, a domain that doesn't exist (it doesn't even resolve). Google saw that as "the real page is somewhere else" and held the pages back from the index. That is now fixed in the code.

## Done in code (30 Oct 2026)

- Canonical, `og:url`, schema URLs, sitemap and robots.txt now all use `https://www.stpaulscleaningservices.co.uk/...`. Each page's canonical points to itself.
- Footer: the dead `#` links are replaced by one link to the new `privacy-policy.html` (privacy and cookies on one page). Terms link removed.
- "House Cleaning in Epsom" (links to `areas-epsom.html`) added to the desktop nav, mobile menu and footer on every page.
- Desktop nav switches to the menu button below 1200px wide so the longer labels don't wrap.
- Schema: removed the self-made star rating (`aggregateRating`) from the homepage and Epsom page. `areaServed` now lists only Epsom, Ewell, Ashtead, Leatherhead, Tadworth, Banstead, Cheam and Sutton. Service pages list the same towns. Logo added as the business image. Removed the fake site-search action and an empty `sameAs`.
- `.htaccess` corrected to force www (the live site is on Vercel, which ignores this file).

## Do now, after deploying

1. ~~Fix the email address.~~ Done: the site now uses `contact@stpaulscleaningservices.co.uk` (Hostinger Email). Use the same address on the Google Business Profile.
2. In Google Search Console, **Request Indexing on every page**: `/`, `/areas-epsom.html`, `/regular-cleaning.html`, `/deep-clean.html`, `/carpet-cleaning.html`, `/oven-cleaning.html`, `/contact.html`, `/privacy-policy.html`. They were blocked by the canonical, so they should index quickly now.
3. **Resubmit the sitemap** in GSC: `https://www.stpaulscleaningservices.co.uk/sitemap.xml` (it now uses the www host throughout).
4. In a week or two, check GSC → Pages. The "Alternate page with proper canonical tag" count should fall to zero.
5. **Review the privacy page** wording, especially how long you keep customer records.

## Google Business Profile

- Name, address and phone must match the website exactly: "St Paul's Cleaning Services", Epsom KT17, +44 7930 405972.
- Primary category: House cleaning service. Website: `https://www.stpaulscleaningservices.co.uk/`.
- Ask happy customers for Google reviews. Real reviews on the profile replace the star schema that was removed.
- When the profile URL is live, add it (and any Facebook or Instagram page) to `sameAs` in the homepage LocalBusiness schema.

## Old domain

`stpaulscleaning.co.uk` currently doesn't resolve, and nothing on the site uses it any more. If you own it (or buy it to protect the brand), 301-redirect it to `https://www.stpaulscleaningservices.co.uk` so there is no ambiguity.

## Next: area pages (start once the fix is live and pages are indexing)

Use `areas-epsom.html` as the template. Each page needs **unique** local content (600–900 words): local context, the services, a call to action, and links to the Epsom page and the other area pages. Each page also needs a self-referencing www canonical, an entry in `sitemap.xml`, and links from the nav and footer.

Order by evidence:

1. **Tadworth** (`areas-tadworth.html`). "domestic cleaner tadworth" already ranks at position 2.4 with no dedicated page.
2. Ewell
3. Ashtead
4. Banstead
5. Leatherhead
6. Cheam

## Brand-name note ("St Paul's Cray")

About half of the brand impressions are for "St Paul's Cray" (Bromley) and "St Paul's" (London). That comes from the name and can't be fixed directly, only outweighed by Epsom signals: the canonical fix, the Epsom links on every page, Epsom-only `areaServed`, and the area pages above. Never list St Paul's Cray anywhere on the site.
