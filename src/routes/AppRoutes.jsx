import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Prompts from "../pages/Prompts";
import Favorites from "../pages/Favorites";
import Categories from "../pages/Categories";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/prompts"
        element={
          <DashboardLayout>
            <Prompts />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/favorites"
        element={
          <DashboardLayout>
            <Favorites />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/categories"
        element={
          <DashboardLayout>
            <Categories />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;