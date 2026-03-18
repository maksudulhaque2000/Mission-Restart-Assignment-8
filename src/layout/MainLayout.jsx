import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";
import BackToTop from "../components/BackToTop";

export default function MainLayout() {
  const navigation = useNavigation();
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timer = window.setTimeout(() => setRouteLoading(false), 280);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const isRouting = navigation.state === "loading" || routeLoading;

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        {isRouting ? <PageLoader /> : <Outlet />}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
