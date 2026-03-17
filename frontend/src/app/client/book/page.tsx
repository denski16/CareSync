import { ChevronLeft, ChevronRight, CheckCircle2, User, CreditCard } from "lucide-react";

export default function BookAppointmentPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-8 min-h-[calc(100vh-6rem)]">
      {/* Main Booking Flow */}
      <div className="flex-1 space-y-10">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Book Appointment</h1>
          <p className="text-lg text-slate-500 mt-2">Complete the steps below to schedule your visit with our specialists.</p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest overflow-x-auto pb-4">
          <div className="flex items-center gap-2 text-black shrink-0">
            <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">1</div>
            Purpose
          </div>
          <div className="w-12 h-px bg-slate-200 shrink-0"></div>
          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center">2</div>
            Date & Time
          </div>
          <div className="w-12 h-px bg-slate-200 shrink-0"></div>
          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center">3</div>
            Payment
          </div>
          <div className="w-12 h-px bg-slate-200 shrink-0"></div>
          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center">4</div>
            Confirmation
          </div>
        </div>

        {/* Step 1: Purpose */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="text-xl">📋</span> Step 1: Purpose of Medical
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Student', 'Non-Professional', 'Professional', 'Conversion'].map((purpose) => (
              <button 
                key={purpose}
                className={`p-4 rounded-xl text-left border-2 font-bold transition-all ${
                  purpose === 'Student' 
                    ? 'border-black bg-slate-100 shadow-[4px_4px_0px_#000]' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                {purpose}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Date & Time */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 pt-6">
          {/* Calendar */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="text-xl">📅</span> Step 2: Select Date
            </h2>
            <div className="border border-slate-200 rounded-2xl p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-lg">October 2026</span>
                <div className="flex gap-2 text-slate-400">
                  <button className="hover:text-black transition-colors"><ChevronLeft /></button>
                  <button className="hover:text-black transition-colors"><ChevronRight /></button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-y-6 text-center text-sm">
                {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
                  <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-widest">{day}</div>
                ))}
                
                {/* Blank days */}
                <div className="text-slate-300">29</div>
                <div className="text-slate-300">30</div>
                
                {/* Actual days */}
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex justify-center">
                    <button className={`w-8 h-8 flex items-center justify-center rounded-full font-bold
                      ${(i+1) === 10 ? 'bg-black text-white shadow-lg' : 'text-slate-700 hover:bg-slate-100'}`}>
                      {i + 1}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="text-xl">🕗</span> Select Time
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {['09:00 AM', '10:30 AM', '11:15 AM', '01:00 PM', '02:30 PM', '04:00 PM'].map((time) => (
                <button 
                  key={time}
                  className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                    time === '11:15 AM'
                      ? 'border-black bg-black text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            
            <div className="bg-slate-100 text-slate-600 text-sm font-medium p-4 rounded-xl mt-6">
              <span className="font-bold text-black">Selected: </span>
              Thursday, Oct 10th at 11:15 AM
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-200 mt-12 gap-4">
          <button className="flex items-center gap-2 font-bold text-slate-500 hover:text-black transition-colors">
            <ChevronLeft size={20} />
            Save Draft
          </button>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-4 rounded-xl border-2 border-slate-200 font-bold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button className="flex-1 sm:flex-none px-8 py-4 rounded-xl bg-black text-white font-bold tracking-wide hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 shadow-lg hover:-translate-y-1">
              Proceed to Payment
              <CreditCard size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Summary */}
      <div className="w-full xl:w-80 bg-white rounded-3xl border border-slate-200 p-8 h-fit sticky top-8">
        <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-6 border-b border-slate-100 pb-4">
          Appointment Summary
        </h3>
        
        <div className="space-y-6">
          {/* Patient */}
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 block mb-2">Patient</span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center">
                AD
              </div>
              <span className="font-bold">Alex Driver</span>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 block mb-1">Clinic</span>
              <p className="font-bold text-sm">MJY 88 Medical Clinic</p>
              <p className="text-xs text-slate-500">Subic Bay Freeport Zone</p>
            </div>
            
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 block mb-1">Date & Time</span>
              <p className="font-bold text-sm">Thu, Oct 10th</p>
              <p className="text-xs text-slate-500">11:15 AM (PST)</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="pt-4 border-t border-slate-100 space-y-3 pb-6 border-b border-slate-100 text-sm">
            <div className="flex justify-between items-center text-slate-600">
              <span className="font-semibold">Medical Fee</span>
              <span className="font-bold text-black">₱550.00</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span className="font-semibold">Online Fee</span>
              <span className="font-bold text-black">₱50.00</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end pt-2">
            <span className="font-bold text-slate-700">Due Today</span>
            <span className="text-2xl font-black">₱600.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
