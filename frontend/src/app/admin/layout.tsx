import Link from "next/link";
import { Activity, LayoutDashboard, Users, CircleDollarSign, Package, Wrench, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400 shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">CareSync</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white text-black font-bold text-sm tracking-wide transition-colors">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin/staff" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 font-bold text-sm tracking-wide transition-colors">
            <Users size={18} />
            Staff Management
          </Link>
          <Link href="/admin/revenue" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 font-bold text-sm tracking-wide transition-colors">
            <CircleDollarSign size={18} />
            Revenue
          </Link>
          <Link href="/admin/inventory" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 font-bold text-sm tracking-wide transition-colors">
            <Package size={18} />
            Inventory
          </Link>
          <Link href="/admin/maintenance" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 font-bold text-sm tracking-wide transition-colors">
            <Wrench size={18} />
            Maintenance
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 font-bold text-sm tracking-wide transition-colors">
            <Settings size={18} />
            Settings
          </Link>
          
          <div className="flex items-center gap-3 px-4 py-3 mt-4">
             <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-sm">
               ADM
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold truncate">System Admin</p>
               <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">Administrator</p>
             </div>
             <button className="text-slate-500 hover:text-white transition-colors">
               <LogOut size={16} />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}
