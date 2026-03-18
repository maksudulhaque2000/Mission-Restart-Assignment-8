import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDownloads } from "../utils/format";
import {
  getFavoriteEventName,
  isFavorite,
  toggleFavorite,
} from "../utils/favorites";
import { getInstalledEventName, isInstalled } from "../utils/storage";

export default function AppCard({ app }) {
  // Fallback demo images
  const demoImages = [
    "/assets/demo-app (1).webp",
    "/assets/demo-app (2).webp",
    "/assets/demo-app (3).webp",
    "/assets/demo-app (4).webp",
    "/assets/demo-app (5).webp",
    "/assets/demo-app (6).webp",
  ];
  const fallbackImage = demoImages[app.id % demoImages.length];
  const imageSrc = app.image ? app.image : fallbackImage;
  const [favorite, setFavorite] = useState(() => isFavorite(app.id));
  const [installed, setInstalled] = useState(() => isInstalled(app.id));

  useEffect(() => {
    const syncFavorite = () => setFavorite(isFavorite(app.id));
    const syncInstalled = () => setInstalled(isInstalled(app.id));

    window.addEventListener(getFavoriteEventName(), syncFavorite);
    window.addEventListener(getInstalledEventName(), syncInstalled);

    return () => {
      window.removeEventListener(getFavoriteEventName(), syncFavorite);
      window.removeEventListener(getInstalledEventName(), syncInstalled);
    };
  }, [app.id]);

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const next = toggleFavorite(app.id);
    setFavorite(next);
  };

  return (
    <article className="app-card" aria-label={`${app.title} app card`}>
      <div className="app-card-top">
        <span
          className={`category-badge category-${(app.category || "Other").toLowerCase()}`}
        >
          {app.category || "Other"}
        </span>
        <button
          type="button"
          className={`favorite-btn modern-fav ${favorite ? "is-favorite" : ""}`}
          onClick={handleFavorite}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19s-6.5-4.7-8.2-7.2C1.1 10.5 1 8.2 2.5 6.7c1.5-1.5 4-1.4 5.5 0C9.5 7.7 11 9.5 11 9.5s1.5-1.8 3-2.8c1.5-1.4 4-1.5 5.5 0 1.5 1.5 1.4 3.8-.3 5.1C17.5 14.3 11 19 11 19z"
              stroke={favorite ? "#de3c68" : "#aaa"}
              strokeWidth="1.5"
              fill={favorite ? "#de3c68" : "none"}
              style={{ transition: "all 0.2s" }}
            />
          </svg>
        </button>
        {installed ? <span className="badge-installed">Installed</span> : null}
      </div>
      <Link
        to={`/apps/${app.id}`}
        aria-label={`Open ${app.title}`}
        className="app-card-link"
      >
        <div className="app-image-wrap">
          <img
            src={imageSrc}
            alt={app.title}
            className="app-image"
            loading="lazy"
          />
        </div>
        <h3 className="app-title">{app.title}</h3>
        <div className="app-meta">
          <span className="downloads">⬇ {formatDownloads(app.downloads)}</span>
          <span className="rating">★ {app.ratingAvg}</span>
        </div>
      </Link>
    </article>
  );
}
