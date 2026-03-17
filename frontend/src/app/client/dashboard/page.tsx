'use client';
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { getUpcomingAppointment, getAppointmentsByPatient } from "@/lib/services/appointments";
import type { Appointment } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
}

const STATUS_COLORS: Record<string, string> = {
  Completed: 'bg-green-100 text-green-700',
  'Checked-In': 'bg-blue-100 text-blue-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function ClientDashboard() {
  const [upcoming, setUpcoming] = useState<Appointment | null>(null);
  const [history, setHistory] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // patient-1 is the demo patient account
      const [up, all] = await Promise.all([
        getUpcomingAppointment('patient-1'),
        getAppointmentsByPatient('patient-1'),
      ]);
      setUpcoming(up);
      setHistory(all.filter(a => a.status === 'Completed'));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Welcome, Alex</h1>
        <p className="text-lg text-slate-500 mt-2">Manage your health and appointments at a glance.</p>
      </div>

      {/* Upcoming Appointment Card */}
      {upcoming ? (
        <div className="bg-white rounded-[2rem] p-8 border-4 border-black shadow-[8px_8px_0px_#000]">
          <div className="flex items-center justify-between mb-8">
            <div className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">Upcoming Appointment</div>
            <span className="text-sm font-bold text-slate-400 tracking-wider">In {Math.ceil((new Date(upcoming.scheduled_date).getTime() - Date.now()) / 86400000)} days</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">{upcoming.purpose} License Exam</h2>
          <p className="text-slate-500 font-medium mb-12">Routine LTO Medical Check-up • MJY 88 Medical Clinic</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Calendar, label: 'Date',     value: formatDate(upcoming.scheduled_date) },
              { icon: Clock,    label: 'Time',     value: formatTime(upcoming.scheduled_date) },
              { icon: MapPin,   label: 'Location', value: 'MJY 88 Clinic' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="font-bold text-slate-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-100">
            <button className="px-8 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors">Manage</button>
            <button className="px-8 py-3 bg-white text-black border-2 border-slate-200 font-bold text-sm uppercase tracking-wider rounded-lg hover:border-black transition-colors">Reschedule</button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl p-12 border-2 border-dashed border-slate-300 text-center space-y-4">
          <Calendar size={40} className="mx-auto text-slate-400" />
          <h2 className="text-xl font-bold text-slate-700">No upcoming appointments</h2>
          <a href="/client/book" className="inline-block px-8 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors">Book Now</a>
        </div>
      )}

      {/* Recent Appointments */}
      {history.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900">Recent Appointments</h3>
          <div className="bg-white rounded-2xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_#000]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black bg-slate-50">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500">Date</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500">Purpose</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500 hidden md:table-cell">QR Code</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {history.map(a => (
                  <tr key={a.appointment_id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-6 px-6 font-bold text-slate-900">{formatDate(a.scheduled_date)}</td>
                    <td className="py-6 px-6 font-medium text-slate-600">{a.purpose} License</td>
                    <td className="py-6 px-6 text-slate-500 hidden md:table-cell font-mono text-xs">{a.qr_code_hash}</td>
                    <td className="py-6 px-6 text-right">
                      <span className={`inline-flex items-center px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${STATUS_COLORS[a.status] ?? ''}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="pt-16 mt-16 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] font-bold text-slate-400 tracking-widest uppercase gap-4">
        <span>&copy; 2026 CareSync Health Systems</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-black transition-colors">Contact Support</a>
        </div>
      </div>
    </div>
  );
}
