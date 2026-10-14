ANIMATION WIZARD PORTFOLIO - SETUP (one time, about 15 minutes)

FILES
  index.html, portfolio.html  the two pages
  style.css, app.js           design and behavior (don't edit)
  videos.js                   THE ONLY FILE YOU EDIT (videos, links, categories)
  logo.png, favicon.png       your logo and browser icon

1) PUT THE FILES ON GITHUB
  - On github.com click New repository, name it animationwizard, keep it Public, click Create.
  - Click "uploading an existing file", drag ALL the files from this folder in, click Commit changes.

2) PUBLISH ON CLOUDFLARE (free)
  - dash.cloudflare.com > Workers & Pages > Create > Pages > Connect to Git.
  - Pick your animationwizard repository.
  - Project name: animationwizard (this becomes animationwizard.pages.dev).
  - Build command: leave empty. Build output directory: leave empty. Click Save and Deploy.
  - In about a minute your site is live on the pages.dev link.

3) CONNECT YOUR DOMAIN (animationwizard.site)
  - Cloudflare: Add a site > enter animationwizard.site > Free plan. It shows 2 nameservers.
  - Namecheap: Domain List > Manage > Nameservers > Custom DNS > paste the 2 Cloudflare nameservers > save.
  - Cloudflare: Workers & Pages > your project > Custom domains > Set up a domain > animationwizard.site.
  - Domain changes can take from a few minutes to a few hours.

4) CHANGE VIDEOS ANY TIME
  - GitHub > your repo > videos.js > pencil icon > edit > Commit changes.
  - The live site updates in about a minute.
  - Read the instructions at the top of videos.js.
