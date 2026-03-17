import { Search, Bell, Users, Banknote, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Action Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between p-8 border-b border-black">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">Dashboard Overview</h1>
          <p className="text-slate-600 mt-2 font-medium">Facility operations and metrics • October 23, 2026</p>
        </div>
        
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="SEARCH RECORDS..." 
              className="w-full md:w-80 pl-12 pr-4 py-3 border border-black focus:outline-none focus:ring-1 focus:ring-black uppercase text-sm font-bold placeholder:text-slate-400"
            />
          </div>
          <button className="w-12 h-12 border border-black flex items-center justify-center hover:bg-slate-50 transition-colors shrink-0">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-8 space-y-10 flex-1 overflow-y-auto">
        
        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-black p-8 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                <Users size={24} />
              </div>
              <div className="border border-black px-3 py-1 text-sm font-bold">
                +2.4%
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Total Active Staff</span>
              <span className="text-6xl font-black tracking-tighter">142</span>
            </div>
          </div>

          <div className="border border-black p-8 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                <Banknote size={24} />
              </div>
              <div className="border border-black px-3 py-1 text-sm font-bold">
                +8.1%
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Daily Revenue</span>
              <span className="text-6xl font-black tracking-tighter">$12,450</span>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-black uppercase tracking-tight">Staff On-Duty</h2>
            <button className="border border-black px-4 py-2 text-xs font-bold uppercase hover:bg-slate-50 transition-colors">
              All Departments
            </button>
          </div>
          
          <div className="border border-black overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-black text-white">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest">Staff Member</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest">Department</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest">Shift</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest">Status</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black text-sm">
                
                <tr className="hover:bg-slate-50">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-xs shrink-0">RM</div>
                      <div>
                        <div className="font-bold text-base uppercase">Dr. Robert Miller</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Chief Surgeon</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 font-bold text-slate-700 uppercase">Surgical Wing</td>
                  <td className="py-6 px-6 font-medium text-slate-600">08:00 - 20:00</td>
                  <td className="py-6 px-6">
                    <span className="inline-block border border-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Active</span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <button className="text-slate-400 hover:text-black transition-colors"><MoreVertical size={20} /></button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-xs shrink-0">AW</div>
                      <div>
                        <div className="font-bold text-base uppercase">Nurse Alice Wong</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Head Nurse</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 font-bold text-slate-700 uppercase">ICU</td>
                  <td className="py-6 px-6 font-medium text-slate-600">19:00 - 07:00</td>
                  <td className="py-6 px-6">
                    <span className="inline-block bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">On-Call</span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <button className="text-slate-400 hover:text-black transition-colors"><MoreVertical size={20} /></button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-xs shrink-0">JS</div>
                      <div>
                        <div className="font-bold text-base uppercase">James Sterling</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ER Technician</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 font-bold text-slate-700 uppercase">Emergency</td>
                  <td className="py-6 px-6 font-medium text-slate-600">08:00 - 16:00</td>
                  <td className="py-6 px-6">
                    <span className="inline-block border border-black text-slate-500 bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Break</span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <button className="text-slate-400 hover:text-black transition-colors"><MoreVertical size={20} /></button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-xs shrink-0">EC</div>
                      <div>
                        <div className="font-bold text-base uppercase">Dr. Elena Chen</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pediatrician</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 font-bold text-slate-700 uppercase">Pediatrics</td>
                  <td className="py-6 px-6 font-medium text-slate-600">09:00 - 17:00</td>
                  <td className="py-6 px-6">
                    <span className="inline-block border border-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Active</span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <button className="text-slate-400 hover:text-black transition-colors"><MoreVertical size={20} /></button>
                  </td>
                </tr>
                
              </tbody>
            </table>
            
            {/* Pagination Footer */}
            <div className="p-4 border-t border-black bg-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Showing 4 of 42 On-Duty Personnel</span>
              <div className="flex gap-2">
                <button className="w-6 h-6 border border-black flex items-center justify-center text-slate-400 hover:text-black transition-colors"><ChevronLeft size={16}/></button>
                <button className="w-6 h-6 border border-black flex items-center justify-center text-black hover:bg-slate-100 transition-colors"><ChevronRight size={16}/></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
