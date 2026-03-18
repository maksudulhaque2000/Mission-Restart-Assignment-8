import { useEffect, useMemo, useRef, useState } from "react";
import AppCard from "../components/AppCard";
import SearchLoader from "../components/SearchLoader";
import { appsData } from "../data/apps";

export default function AppsPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimer = useRef(null);

  const filteredApps = useMemo(() => {
    return appsData.filter((app) =>
      app.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

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
    }, 280);
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
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="search apps"
          aria-label="Search apps by title"
        />
      </div>

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
