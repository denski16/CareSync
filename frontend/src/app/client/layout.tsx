import Link from "next/link";
import { Activity, LayoutDashboard, CalendarPlus, CalendarDays, Settings, LogOut } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400 shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">CareSync</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Patient Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/client/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white text-black rounded-lg font-bold text-sm tracking-wide transition-colors">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/client/book" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <CalendarPlus size={18} />
            Book Appointment
          </Link>
          <Link href="/client/appointments" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <CalendarDays size={18} />
            My Appointments
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link href="/client/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <Settings size={18} />
            Settings
          </Link>
          
          <div className="flex items-center gap-3 px-4 py-3 mt-4">
             <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-sm">
               AL
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold truncate">Alex Driver</p>
               <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">Patient Account</p>
             </div>
             <button className="text-slate-500 hover:text-white transition-colors">
               <LogOut size={16} />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 md:p-12 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
