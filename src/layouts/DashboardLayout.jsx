import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors duration-200 overflow-x-hidden text-slate-900 dark:text-slate-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;