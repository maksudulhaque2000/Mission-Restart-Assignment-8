import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { appsData } from "../data/apps";
import { formatDownloads } from "../utils/format";
import { getInstalledIds, uninstallApp } from "../utils/storage";

export default function InstallationPage() {
  const [installedIds, setInstalledIds] = useState(getInstalledIds);
  const [sortBy, setSortBy] = useState("high-low");

  const installedApps = useMemo(() => {
    const selected = appsData.filter((app) => installedIds.includes(app.id));
    const sorted = [...selected].sort((a, b) => {
      if (sortBy === "low-high") return a.downloads - b.downloads;
      return b.downloads - a.downloads;
    });
    return sorted;
  }, [installedIds, sortBy]);

  const handleUninstall = (id, title) => {
    uninstallApp(id);
    setInstalledIds((prev) => prev.filter((appId) => appId !== id));
    toast.success(`${title} removed from installation list.`);
  };

  return (
    <section className="container page-spacing">
      <div className="section-head center">
        <h2>Your Installed Apps</h2>
        <p>Explore all trending apps on the market developed by us.</p>
      </div>

      <div className="installation-toolbar">
        <p>
          <strong>{installedApps.length}</strong> Apps Found
        </p>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort installed apps by downloads"
        >
          <option value="high-low">Sort By Size (High-Low)</option>
          <option value="low-high">Sort By Size (Low-High)</option>
        </select>
      </div>

      {installedApps.length === 0 ? (
        <p className="empty-state">
          No installed app found. Install apps from the Apps page.
        </p>
      ) : (
        <div className="installed-list">
          {installedApps.map((app) => (
            <article key={app.id} className="installed-item">
              <img src={app.image} alt={app.title} />
              <div>
                <h3>{app.title}</h3>
                <div className="app-meta">
                  <span className="downloads">
                    ⬇ {formatDownloads(app.downloads)}
                  </span>
                  <span className="rating">★ {app.ratingAvg}</span>
                  <span>{app.size} MB</span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleUninstall(app.id, app.title)}
              >
                Uninstall
              </button>
            </article>
          ))}
        </div>
      )}

      {installedApps.length > 0 ? (
        <section className="installed-preview">
          <h3>App Cards</h3>
          <div className="apps-grid preview-grid">
            {installedApps.slice(0, 4).map((app) => (
              <article key={app.id} className="app-card mini-card">
                <img src={app.image} alt={app.title} className="app-image" />
                <h3>{app.title}</h3>
                <div className="app-meta">
                  <span className="downloads">
                    ⬇ {formatDownloads(app.downloads)}
                  </span>
                  <span className="rating">★ {app.ratingAvg}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
