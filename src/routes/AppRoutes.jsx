import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Prompts from "../pages/Prompts";
import Favorites from "../pages/Favorites";
import Categories from "../pages/Categories";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/prompts" element={<Prompts />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;