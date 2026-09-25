const StatCard = ({ label, value, icon }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] shadow-xs p-5 flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">{value}</p>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;