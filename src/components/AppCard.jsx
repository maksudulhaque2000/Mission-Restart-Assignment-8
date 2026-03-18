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
      <button
        type="button"
        className={`favorite-btn ${favorite ? "is-favorite" : ""}`}
        onClick={handleFavorite}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "♥" : "♡"}
      </button>

      {installed ? <span className="badge-installed">Installed</span> : null}

      <Link to={`/apps/${app.id}`} aria-label={`Open ${app.title}`}>
        <img
          src={imageSrc}
          alt={app.title}
          className="app-image"
          loading="lazy"
        />
        <h3>{app.title}</h3>
        <div className="app-meta">
          <span className="downloads">⬇ {formatDownloads(app.downloads)}</span>
          <span className="rating">★ {app.ratingAvg}</span>
        </div>
      </Link>
    </article>
  );
}
