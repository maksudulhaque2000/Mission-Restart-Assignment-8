# Hero IO AppNest

Hero IO AppNest is a responsive app marketplace web application where users can browse productivity apps, search by title, view app details with rating charts, install apps, and manage installations.

## Live Features

- Responsive UI for desktop, tablet, and mobile
- Header with logo, route navigation, active route indication, and Contribute button
- Home page with banner, stats cards, and top 8 trending apps
- All Apps page with live case-insensitive title search
- Search loading animation and no-result state
- App Details page with:
  - app summary (downloads, rating, reviews)
  - install button with installed state
  - success toast after install
  - responsive Recharts rating chart
  - app description section
- My Installation page with:
  - installed app list from localStorage
  - uninstall with toast
  - sort by downloads (High-Low / Low-High)
- Custom not found pages:
  - invalid route 404 page
  - app not found message in app details
- Route transition loading animation

## Technologies

- React
- React Router DOM
- Recharts
- React Hot Toast
- Vite
- CSS

## Local Development

```bash
npm install
npm run dev
```

## Build For Production

```bash
npm run build
npm run preview
```

## Deployment Note (SPA Reload Fix)

This project includes `vercel.json` rewrite rules so reloading any route does not return 404 on Vercel deployment.
