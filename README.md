# Hero IO AppNest

A modern, responsive app marketplace built with React, Vite, and Recharts. Browse, search, and install productivity, health, education, and utility apps with a beautiful UI, dark/light mode, and blazing-fast performance.

## 🚀 Live Demo

[Live Site](https://your-vercel-link.com)

## ✨ Features

- Responsive design for all devices
- Dark/Light mode toggle
- App category filter (Productivity, Health, Education, Utility)
- Live search and sort (downloads, rating)
- App details with install, reviews, and Recharts chart
- My Installation page with uninstall and summary
- Favorites (localStorage sync)
- Custom 404 and not found pages
- Loading animations for navigation/search
- Vercel SPA deployment ready (vercel.json included)

## 🛠️ Technologies

- React 19
- Vite 8
- React Router DOM 6
- Recharts 3
- React Hot Toast
- CSS (custom, responsive)

## 🏁 Getting Started

```bash
npm install
npm run dev
```

## 🏗️ Build & Preview

```bash
npm run build
npm run preview
```

## 📝 Project Structure

- `src/` — All React source code
- `public/assets/` — All images/icons (must be in public for deployment)
- `src/data/apps.js` — App data (with category)
- `src/pages/` — Main pages (Home, Apps, Installation, Details, 404)
- `src/components/` — UI components (AppCard, Header, Footer, etc.)
- `src/styles/` — CSS

## 🌐 Deployment (Vercel)

- Push to GitHub
- Import to Vercel (Framework: Vite, Output: dist)
- `vercel.json` ensures SPA routing works (no 404 on reload)

## 📸 Screenshots

![Home Page](./public/assets/hero.png)

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first.

## 📄 License

MIT

---

> Developed by Maksudul Haque | [GitHub](https://github.com/maksudulhaque2000)
