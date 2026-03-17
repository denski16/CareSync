'use client';
import { useState, useEffect } from "react";
import { Bell, ArrowRight, User as UserIcon, Activity } from "lucide-react";
import { getActiveQueue, callNextPatient, updateQueueStatus } from "@/lib/services/queue";
import type { QueueLog } from "@/types";

const STATUS_STYLES: Record<string, string> = {
  'Waiting':         'border-2 border-black text-black bg-white',
  'In Consultation': 'bg-blue-600 text-white border-2 border-blue-600',
  'At Lab':          'border-2 border-slate-300 bg-slate-100 text-slate-600',
  'In Triage':       'bg-yellow-500 text-white border-2 border-yellow-500',
};

export default function DoctorDashboard() {
  const [queue, setQueue] = useState<QueueLog[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const data = await getActiveQueue();
    setQueue(data);
    setLoading(false);
  }

  useEffect(() => { refresh(); }, []);

  async function handleStartConsultation(logId: string) {
    await callNextPatient(logId);
    await refresh();
  }

  const currentPatient = queue[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Welcome back, Dr. Santos</h1>
          <p className="text-slate-500 mt-1 font-medium">{new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
        </div>
        <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-black hover:border-black transition-colors">
          <Bell size={20} />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-4">Today&apos;s Appointments</span>
          <div className="flex justify-between items-end">
            <span className="text-5xl font-black tracking-tighter">{loading ? '–' : queue.length}</span>
            <div className="flex items-center gap-1 text-sm font-bold text-black bg-slate-100 px-3 py-1 rounded-full">Active</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-4">Patients in Queue</span>
          <div className="flex justify-between items-end">
            <span className="text-5xl font-black tracking-tighter">{loading ? '–' : queue.filter(q => q.status === 'Waiting').length.toString().padStart(2,'0')}</span>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Waiting</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">Today&apos;s Schedule</h2>
          <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-400 font-medium">Loading queue...</div>
            ) : queue.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-medium">No active patients in queue.</div>
            ) : queue.map((entry, i) => (
              <div key={entry.log_id} className={`p-6 flex items-center gap-6 ${i === 0 ? 'bg-slate-50' : ''}`}>
                <div className="flex-col text-center shrink-0 w-16">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                    {i === 0 ? 'Current' : `#${entry.queue_number}`}
                  </span>
                  <span className="text-lg font-bold font-mono text-slate-700">
                    {new Date(entry.checked_in_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold truncate">{entry.patient?.full_name ?? 'Unknown'}</h3>
                  <p className="text-sm text-slate-500 truncate">{entry.appointment?.purpose ?? '–'}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full ${STATUS_STYLES[entry.status] ?? 'bg-slate-100 text-slate-500'}`}>
                    {entry.status}
                  </span>
                  {i === 0 && entry.status === 'Waiting' && (
                    <button onClick={() => handleStartConsultation(entry.log_id)}
                      className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Patient Vitals */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Active Patient Vitals</h2>
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            {!currentPatient ? (
              <div className="text-center text-slate-400 py-8 font-medium">No active patient.</div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{currentPatient.patient?.full_name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{currentPatient.appointment?.purpose} License</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Height', value: '182 cm' },
                    { label: 'Weight', value: '78 kg' },
                    { label: 'BP', value: '120/80' },
                    { label: 'Heart Rate', value: '72 bpm' },
                  ].map(v => (
                    <div key={v.label} className="border border-slate-100 rounded-xl p-4 bg-slate-50">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-2 flex items-center gap-1">
                        <Activity size={10} /> {v.label}
                      </span>
                      <span className="text-xl font-black block mt-2">{v.value}</span>
                    </div>
                  ))}
                </div>

                <div className="border border-slate-200 rounded-xl p-4 flex gap-3 mb-6">
                  <div className="text-green-600 mt-1"><Activity size={16} /></div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1">All Clear</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Vitals are within normal range.</p>
                  </div>
                </div>

                <button
                  onClick={() => handleStartConsultation(currentPatient.log_id)}
                  disabled={currentPatient.status === 'In Consultation'}
                  className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  {currentPatient.status === 'In Consultation' ? 'Consultation In Progress' : 'Start Consultation'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
