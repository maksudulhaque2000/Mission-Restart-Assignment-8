import { useEffect, useMemo, useRef, useState } from "react";
import AppCard from "../components/AppCard";
import SearchLoader from "../components/SearchLoader";
import { appsData } from "../data/apps";

const SEARCH_HISTORY_KEY = "heroio_search_history";

function readHistory() {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(items.slice(0, 6)));
}

export default function AppsPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [minRating, setMinRating] = useState(0);
  const [category, setCategory] = useState("all");
  const [searchHistory, setSearchHistory] = useState(readHistory);
  const searchTimer = useRef(null);

  const filteredApps = useMemo(() => {
    let base = appsData
      .filter((app) => app.title.toLowerCase().includes(query.toLowerCase()))
      .filter((app) => app.ratingAvg >= minRating);
    if (category !== "all") {
      base = base.filter((app) => app.category === category);
    }
    if (sortBy === "downloads-high") {
      return [...base].sort((a, b) => b.downloads - a.downloads);
    }
    if (sortBy === "downloads-low") {
      return [...base].sort((a, b) => a.downloads - b.downloads);
    }
    if (sortBy === "rating-high") {
      return [...base].sort((a, b) => b.ratingAvg - a.ratingAvg);
    }
    return base;
  }, [query, sortBy, minRating, category]);

  useEffect(() => {
    return () => {
      if (searchTimer.current) {
        window.clearTimeout(searchTimer.current);
      }
    };
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setIsSearching(true);
    setQuery(value);

    if (searchTimer.current) {
      window.clearTimeout(searchTimer.current);
    }

    searchTimer.current = window.setTimeout(() => {
      setIsSearching(false);

      const trimmed = value.trim();
      if (trimmed.length > 1) {
        setSearchHistory((prev) => {
          const next = [trimmed, ...prev.filter((item) => item !== trimmed)];
          saveHistory(next);
          return next.slice(0, 6);
        });
      }
    }, 280);
  };

  const applyHistorySearch = (item) => {
    setQuery(item);
    setIsSearching(false);
  };

  const clearFilters = () => {
    setSortBy("default");
    setMinRating(0);
    setQuery("");
    setIsSearching(false);
  };

  return (
    <section className="container page-spacing">
      <div className="section-head center">
        <h2>Our All Applications</h2>
        <p>
          Explore all apps on the market developed by us. We code for millions.
        </p>
      </div>

      <div className="apps-toolbar">
        <p>
          <strong>({filteredApps.length})</strong> Apps Found
        </p>
        <div className="apps-inputs">
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="search apps"
            aria-label="Search apps by title"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            <option value="Productivity">Productivity</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Utility">Utility</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort all apps"
          >
            <option value="default">Sort: Default</option>
            <option value="downloads-high">Downloads: High-Low</option>
            <option value="downloads-low">Downloads: Low-High</option>
            <option value="rating-high">Rating: High-Low</option>
          </select>
        </div>
      </div>

      <div className="filter-row" aria-label="Extra app filters">
        <button
          type="button"
          className={`chip ${minRating === 0 ? "chip-active" : ""}`}
          onClick={() => setMinRating(0)}
        >
          All Ratings
        </button>
        <button
          type="button"
          className={`chip ${minRating === 4 ? "chip-active" : ""}`}
          onClick={() => setMinRating(4)}
        >
          4.0+
        </button>
        <button
          type="button"
          className={`chip ${minRating === 4.5 ? "chip-active" : ""}`}
          onClick={() => setMinRating(4.5)}
        >
          4.5+
        </button>
        <button type="button" className="chip" onClick={clearFilters}>
          Reset
        </button>
      </div>

      {searchHistory.length > 0 ? (
        <div className="history-row" aria-label="Recent searches">
          <span>Recent:</span>
          {searchHistory.map((item) => (
            <button
              key={item}
              type="button"
              className="history-chip"
              onClick={() => applyHistorySearch(item)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      {isSearching ? <SearchLoader /> : null}

      {!isSearching && filteredApps.length === 0 ? (
        <p className="empty-state">No App Found</p>
      ) : (
        <section className="apps-grid page-grid">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </section>
      )}
    </section>
  );
}
