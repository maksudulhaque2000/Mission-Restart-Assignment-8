import { Link } from "react-router-dom";
import AppCard from "../components/AppCard";
import { appsData } from "../data/apps";
import { formatDownloads } from "../utils/format";

const topApps = appsData.slice(0, 8);
const totalDownloads = appsData.reduce((sum, app) => sum + app.downloads, 0);
const totalReviews = appsData.reduce((sum, app) => sum + app.reviews, 0);

export default function HomePage() {
  return (
    <section className="container home-page">
      <div className="hero-banner">
        <h1>
          We Build <span>Productive</span> Apps
        </h1>
        <p>
          At HERO.IO, we craft innovative apps designed to make everyday life
          simple, smarter, and more exciting.
        </p>

        <div className="hero-actions">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            Google Play
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            App Store
          </a>
        </div>
      </div>

      <section className="stats-section">
        <article className="stat-card">
          <p>Total Downloads</p>
          <h3>{formatDownloads(totalDownloads)}</h3>
          <small>Across all listed apps</small>
        </article>
        <article className="stat-card">
          <p>Total Reviews</p>
          <h3>{formatDownloads(totalReviews)}</h3>
          <small>Real user feedback</small>
        </article>
        <article className="stat-card">
          <p>Active Apps</p>
          <h3>{appsData.length}+</h3>
          <small>More launching every month</small>
        </article>
      </section>

      <section className="section-head center">
        <h2>Trending Apps</h2>
        <p>Explore all trending apps on the market developed by us.</p>
      </section>

      <section className="apps-grid">
        {topApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </section>

      <div className="center">
        <Link className="btn" to="/apps">
          Show All
        </Link>
      </div>
    </section>
  );
}
