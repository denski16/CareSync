import Link from "next/link";
import { Activity, LayoutDashboard, QrCode, Users, CalendarDays, ReceiptText, FileText, Settings, LogOut } from "lucide-react";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400 shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">CareSync</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Reception Terminal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link href="/staff/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/staff/checkin" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <QrCode size={18} />
            Client Check-in
          </Link>
          <Link href="/staff/queue" className="flex items-center gap-3 px-4 py-3 bg-white text-black rounded-lg font-bold text-sm tracking-wide transition-colors shadow-lg">
            <Users size={18} />
            Client Queue
          </Link>
          <Link href="/staff/appointments" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <CalendarDays size={18} />
            Appointments
          </Link>
          <Link href="/staff/payments" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <ReceiptText size={18} />
            Payment Record
          </Link>
          <Link href="/staff/records" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <FileText size={18} />
            Client Record
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/staff/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg font-bold text-sm tracking-wide transition-colors">
            <Settings size={18} />
            Settings
          </Link>
          
          <div className="flex items-center gap-3 px-4 py-3 mt-4">
             <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-sm">
               JD
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold truncate">Juan Dela Cruz</p>
               <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">Front Desk Admin</p>
             </div>
             <button className="text-slate-500 hover:text-white transition-colors">
               <LogOut size={16} />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
