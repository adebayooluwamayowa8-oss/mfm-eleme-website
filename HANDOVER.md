# MFM Eleme website handover

1. Upload this folder to the existing GitHub repository on a review branch, then merge into `main` after testing. Keep Netlify online until the new site works.
2. Create a Cloudflare **Pages** project connected to that GitHub repository. Build command: `npm run build`. Output directory: `_site`.
3. Sign in at https://app.pagescms.org/ and install the Pages CMS GitHub App on that repository. The `.pages.yml` file supplies the editing forms. Invite trusted church editors by email as collaborators. `/admin/` points to the editing dashboard. Editors do not need to change code.
4. Make a small test edit, save and confirm Cloudflare rebuilds the site. Have a second church leader verify edits to giving account numbers.
5. Buy the domain under a church-controlled account. Add it in Pages > Custom domains and connect DNS as instructed. Preserve existing email MX, SPF, DKIM and DMARC records when changing nameservers. Add `www` if wanted and verify the preview before switching from Netlify.

## Editing

- **Welcome and photo gallery:** add, reorder and describe photos. The first five show on the home page, all on `/gallery/`.
- **Welcome video:** put a public direct HTTPS MP4 URL into the video field. When empty, the still image remains. Use a short silent loop and host videos larger than 25 MiB outside Cloudflare Pages.
- **Church details and schedules:** edit address, map search, streaming and social URLs, service times and welcome message. Confirm the map pin and replace the incomplete phone number.
- **Other pages, sermons and giving:** edit from their own menu entries.

No new photos or video were supplied. The existing church images are retained; the video remains optional. Confirm details, schedule, social links and bank accounts with church leadership.
