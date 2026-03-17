'use client';
import { useState, useEffect, useCallback } from "react";
import { Search, Bell, Hourglass, FlaskConical, Clock, GripVertical, MoreVertical, User as UserIcon } from "lucide-react";
import { getActiveQueue, callNextPatient, updateQueueStatus } from "@/lib/services/queue";
import type { QueueLog, QueueStatus } from "@/types";

const STATUS_BADGE: Record<QueueStatus, string> = {
  'Waiting':         'border-2 border-black rounded-full text-black',
  'At Lab':          'border-2 border-slate-200 bg-slate-100 rounded-full text-slate-600',
  'In Triage':       'border-2 border-yellow-400 bg-yellow-50 rounded-full text-yellow-700',
  'In Consultation': 'border-2 border-blue-400 bg-blue-50 rounded-full text-blue-700',
  'Completed':       'border-2 border-green-400 bg-green-50 rounded-full text-green-700',
};

export default function StaffQueue() {
  const [queue, setQueue] = useState<QueueLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const refresh = useCallback(async () => {
    const data = await getActiveQueue();
    setQueue(data);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function handleCallNext(logId: string) {
    await callNextPatient(logId);
    await refresh();
  }

  async function handleStatusChange(logId: string, status: QueueStatus) {
    await updateQueueStatus(logId, status);
    await refresh();
  }

  const displayed = queue.filter(q =>
    !search || q.patient?.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const waiting = queue.filter(q => q.status === 'Waiting').length;
  const atLab   = queue.filter(q => q.status === 'At Lab').length;

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
      {/* Main Content */}
      <div className="flex-1 border-r border-slate-200">
        <header className="flex flex-col md:flex-row md:items-center justify-between p-8 border-b border-slate-200 bg-white sticky top-0 z-10 gap-4">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Queue Management</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Search size={18} /></div>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm transition-all"
              />
            </div>
            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-black rounded-lg transition-colors relative shrink-0">
              <Bell size={20} />
              {waiting > 0 && <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>}
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center"><Hourglass size={20} /></div>
                <div className="text-xs font-bold text-black bg-slate-100 px-2 py-1 rounded">Live</div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Currently Waiting</span>
              <span className="text-4xl font-black tracking-tighter">{loading ? '–' : waiting}</span>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center"><FlaskConical size={20} /></div>
                <div className="text-xs font-bold text-black bg-slate-100 px-2 py-1 rounded">Live</div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">At Laboratory</span>
              <span className="text-4xl font-black tracking-tighter">{loading ? '–' : atLab}</span>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center"><Clock size={20} /></div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Total in Queue</span>
              <span className="text-4xl font-black tracking-tighter">{loading ? '–' : queue.length}</span>
            </div>
          </div>

          {/* Queue Table */}
          <div className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden">
            <div className="flex border-b-2 border-black">
              <button className="px-8 py-4 bg-black text-white font-bold text-xs uppercase tracking-widest">Active Queue</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-black bg-slate-50">
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">#</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Patient Name</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Check-in</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr><td colSpan={5} className="py-10 text-center text-slate-400 font-medium">Loading queue...</td></tr>
                  ) : displayed.length === 0 ? (
                    <tr><td colSpan={5} className="py-10 text-center text-slate-400 font-medium">No patients found.</td></tr>
                  ) : displayed.map((entry) => {
                    const initials = (entry.patient?.full_name ?? '??').split(' ').map(n => n[0]).join('').slice(0,2);
                    return (
                      <tr key={entry.log_id} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <GripVertical size={16} className="text-slate-300 cursor-grab group-hover:text-slate-500" />
                            <span className="font-black text-xl">{String(entry.queue_number).padStart(2,'0')}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center font-bold text-xs bg-white">{initials}</div>
                            <div>
                              <div className="font-bold text-sm">{entry.patient?.full_name}</div>
                              <div className="text-[10px] font-bold text-blue-500 tracking-wider">{entry.appointment?.qr_code_hash ?? entry.appointment_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-center">
                          <span className={`inline-flex items-center gap-2 px-4 py-1 text-[10px] font-black uppercase tracking-widest ${STATUS_BADGE[entry.status] ?? ''}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-current"></div> {entry.status}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="font-bold text-sm text-blue-600">
                            {new Date(entry.checked_in_at).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' })}
                          </div>
                        </td>
                        <td className="py-5 px-6 text-right">
                          {entry.status === 'Waiting' ? (
                            <button onClick={() => handleCallNext(entry.log_id)}
                              className="bg-black text-white font-bold text-[10px] uppercase tracking-widest px-5 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                              Call Next
                            </button>
                          ) : entry.status === 'In Consultation' ? (
                            <button onClick={() => handleStatusChange(entry.log_id, 'Completed')}
                              className="border-2 border-green-500 text-green-700 bg-green-50 font-bold text-[10px] uppercase tracking-widest px-5 py-3 rounded-lg hover:bg-green-100 transition-colors">
                              Complete
                            </button>
                          ) : (
                            <button className="text-slate-400 hover:text-black transition-colors">
                              <MoreVertical size={20} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t-2 border-black flex items-center justify-between bg-slate-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                Showing {displayed.length} of {queue.length} Patients
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 bg-slate-50 p-8 border-l border-slate-200">
        <div className="space-y-10">
          <section>
            <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-4">Physicians On Duty</h3>
            <div className="bg-white border border-black rounded-2xl p-4 flex gap-4 items-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                <UserIcon size={24} />
              </div>
              <div>
                <p className="font-bold text-sm">Dr. Pedro Santos</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Physician — On Duty</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-4">Queue Summary</h3>
            <div className="space-y-3">
              {(['Waiting', 'At Lab', 'In Consultation'] as QueueStatus[]).map(s => {
                const count = queue.filter(q => q.status === s).length;
                return (
                  <div key={s} className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center hover:border-black transition-colors">
                    <span className="text-sm font-bold">{s}</span>
                    <span className="text-xl font-black">{count}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
