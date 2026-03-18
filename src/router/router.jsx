import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import AppsPage from "../pages/AppsPage";
import InstallationPage from "../pages/InstallationPage";
import AppDetailsPage from "../pages/AppDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<NotFoundPage />}>
      <Route index element={<HomePage />} />
      <Route path="apps" element={<AppsPage />} />
      <Route path="installation" element={<InstallationPage />} />
      <Route path="apps/:id" element={<AppDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);
