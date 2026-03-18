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
        <img src="/assets/hero.png" alt="Hero Banner" className="hero-img" />
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
        </div>
        <div className="stats-section">
          <div className="stat-card">
            <img
              src="/assets/icon-downloads.png"
              alt="Downloads"
              style={{ width: 32, height: 32 }}
            />
            <h3>{formatDownloads(totalDownloads)}</h3>
            <p>Total Downloads</p>
          </div>
          <div className="stat-card">
            <img
              src="/assets/icon-review.png"
              alt="Reviews"
              style={{ width: 32, height: 32 }}
            />
            <h3>{totalReviews}</h3>
            <p>Total Reviews</p>
          </div>
          <div className="stat-card">
            <img
              src="/assets/icon-ratings.png"
              alt="Ratings"
              style={{ width: 32, height: 32 }}
            />
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <section className="section-head center">
        <h2>Trending Apps</h2>
        <p>Explore all trending apps on the market developed by us.</p>
      </section>

      <section className="apps-grid">
        {topApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </section>

      <div
        className="center show-all-btn-wrap"
        style={{ marginTop: 64, marginBottom: 24 }}
      >
        <Link className="btn" to="/apps">
          Show All
        </Link>
      </div>
    </section>
  );
}
