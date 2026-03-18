import { Link } from "react-router-dom";
import { formatDownloads } from "../utils/format";

export default function AppCard({ app }) {
  return (
    <Link
      to={`/apps/${app.id}`}
      className="app-card"
      aria-label={`Open ${app.title}`}
    >
      <img
        src={app.image}
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
  );
}
