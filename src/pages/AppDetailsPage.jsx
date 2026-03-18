import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { appsData } from "../data/apps";
import { formatDownloads } from "../utils/format";
import { installApp, isInstalled } from "../utils/storage";

export default function AppDetailsPage() {
  const { id } = useParams();
  const app = useMemo(
    () => appsData.find((item) => item.id === Number(id)),
    [id],
  );

  const [installed, setInstalled] = useState(() =>
    app ? isInstalled(app.id) : false,
  );

  if (!app) {
    return (
      <section className="container not-found-app page-spacing">
        <img src="/assets/App-Error.png" alt="App not found" />
        <h2>OPPS!! APP NOT FOUND</h2>
        <p>
          The app you are requesting is not found in our system. Please try
          another app.
        </p>
        <Link to="/apps" className="btn">
          Go Start
        </Link>
      </section>
    );
  }

  const handleInstall = () => {
    const added = installApp(app.id);
    if (!added) {
      setInstalled(true);
      toast("App already installed.");
      return;
    }
    setInstalled(true);
    toast.success(`${app.title} installed successfully.`);
  };

  return (
    <section className="container page-spacing">
      <article className="details-card">
        <img src={app.image} alt={app.title} className="details-image" />

        <div className="details-main">
          <h1>{app.title}</h1>
          <p>
            Developed by <span>{app.companyName}</span>
          </p>

          <div className="details-metrics">
            <div>
              <strong>{formatDownloads(app.downloads)}</strong>
              <small>Download</small>
            </div>
            <div>
              <strong>{app.ratingAvg}</strong>
              <small>Average Rating</small>
            </div>
            <div>
              <strong>{formatDownloads(app.reviews)}</strong>
              <small>Total Reviews</small>
            </div>
          </div>

          <button
            className="btn"
            type="button"
            onClick={handleInstall}
            disabled={installed}
          >
            {installed ? "Installed" : `Install Now (${app.size} MB)`}
          </button>
        </div>
      </article>

      <section className="chart-card">
        <h3>Ratings</h3>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={app.ratings} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={60} />
              <Tooltip />
              <Bar dataKey="count" fill="#f88b1c" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="description-card">
        <h3>Description</h3>
        <p>{app.description}</p>
      </section>
    </section>
  );
}
