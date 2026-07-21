import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F3] dark:bg-gray-950 transition-colors overflow-x-hidden">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;