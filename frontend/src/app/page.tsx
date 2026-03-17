import { ShieldCheck, Calendar, Radio, Activity, Eye, Zap, FileText, ChevronRight, MessageSquareDefault, Users, Clock, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
              <Activity size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">CareSync</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link href="#services" className="hover:text-blue-600 transition-colors">Services</Link>
            <Link href="/queue" className="hover:text-blue-600 transition-colors">Live Queue</Link>
            <Link href="#about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link href="#contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2.5 rounded-full border border-slate-200 font-medium text-sm hover:bg-slate-50 transition-colors">
              Login
            </Link>
            <Link href="/book" className="px-5 py-2.5 rounded-full bg-black text-white font-medium text-sm hover:bg-slate-800 transition-colors">
              Book Now
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold tracking-wider">
              <ShieldCheck size={16} />
              TRUSTED HEALTHCARE EXCELLENCE
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Your Partner in <br /> Road Readiness
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              MJY 88 Medical Clinic delivers expert medical assessments for driver&apos;s license applications and renewals. Our modern clinic ensures a smooth, high-quality experience for every motorist.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/book" className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all hover:scale-105">
                <Calendar size={20} />
                Book Appointment
              </Link>
              <Link href="/queue" className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-slate-200 font-semibold flex items-center justify-center gap-2 hover:border-black hover:bg-slate-50 transition-all">
                <Radio size={20} />
                View Live Queue
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 relative shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-slate-300 to-slate-100 flex items-center justify-center">
                 <span className="text-slate-400 font-medium">Hero Image (Clinic Facade)</span>
               </div>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section id="services" className="bg-slate-100 py-24 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tight">Our Specializations</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">LTO-Accredited medical evaluations for a seamless licensing experience.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: FileText, title: "Physical Exam", desc: "Comprehensive medical assessments for Student Permits, New Licenses, and Renewals." },
                { icon: Eye, title: "Vision Testing", desc: "Precision eyesight and color blindness checks meeting LTO safety standards." },
                { icon: Zap, title: "Instant Encoding", desc: "Real-time uploading of medical certificates directly to the LTO IT system." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-800 group-hover:bg-black group-hover:text-white transition-colors">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Floating Chat Icon */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
             <button className="w-16 h-16 bg-black rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
               <span className="sr-only">Open Chat</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
             </button>
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="about" className="py-24 container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-12">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight">Why Choose</h2>
                <div className="inline-block bg-black text-white px-4 py-2 mt-2">
                  <h2 className="text-3xl font-black uppercase tracking-tight">MJY 88 Medical Clinic</h2>
                </div>
              </div>
              
              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: "LTO-ACCREDITED EXCELLENCE", desc: "We ensure all medical evaluations strictly follow LTO standards for a guaranteed valid certification." },
                  { icon: Zap, title: "MODERN & EFFICIENT PROCESS", desc: "Utilizing the latest LTO-integrated systems for real-time data encoding and faster transactions." },
                  { icon: Clock, title: "LIVE QUEUE MANAGEMENT", desc: "Save time with our real-time tracking system. No more waiting aimlessly in clinics." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-black rounded-full shrink-0 flex items-center justify-center text-white mt-1">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 w-full h-[600px]">
               <div className="bg-slate-300 rounded-3xl col-span-1 row-span-1 flex items-center justify-center text-slate-500 overflow-hidden relative">
                   {/* Abstract diagram placeholder */}
                   <Activity size={48} className="opacity-20" />
               </div>
               <div className="bg-[#2A2A2A] rounded-3xl col-span-1 row-span-1 flex flex-col items-center justify-center text-white shadow-xl">
                 <span className="text-5xl font-black mb-1">20k</span>
                 <span className="text-sm font-bold tracking-wider text-slate-300 uppercase">Happy Patients</span>
               </div>
               <div className="bg-black rounded-3xl col-span-1 row-span-1 flex flex-col items-center justify-center text-white shadow-xl">
                 <span className="text-5xl font-black mb-1">15+</span>
                 <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">Years Experience</span>
               </div>
               <div className="bg-slate-200 rounded-3xl col-span-1 row-span-1 flex items-center justify-center text-slate-500 overflow-hidden relative">
                   <Users size={48} className="opacity-20" />
               </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 max-w-6xl pb-24">
          <div className="bg-black text-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5">
               <ShieldCheck size={400} />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Ready to get back on the road?</h2>
              <p className="text-slate-400 text-lg md:text-xl">
                Join thousands of drivers who trust MJY 88 Medical Services for their licensing requirements. Get your medical certificate fast and hassle-free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link href="/book" className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-bold flex items-center justify-center hover:bg-slate-200 transition-all hover:scale-105">
                  Book an Appointment Now
                </Link>
                <Link href="/contact" className="w-full sm:w-auto px-10 py-5 rounded-full border-2 border-slate-700 font-bold flex items-center justify-center hover:border-white transition-all">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1 space-y-4">
              <h3 className="text-2xl font-black">MJY 88</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                LTO-Accredited Medical Clinic providing fast and reliable medical certifications for student permits and driver&apos;s licenses. Committed to road safety and efficient service for every motorist.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><Link href="#" className="hover:text-black">Medical Evaluation</Link></li>
                <li><Link href="#" className="hover:text-black">Visual Acuity & Color Blindness Test</Link></li>
                <li><Link href="#" className="hover:text-black">LTO IT System Encoding</Link></li>
                <li><Link href="#" className="hover:text-black">Physical Examination</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wider text-sm">Business Hours</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li className="flex justify-between"><span>Mon - Fri</span> <span>08:00 AM - 3:30 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>Closed</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wider text-sm">Contact Us</h4>
              <p className="text-slate-500 text-sm leading-relaxed flex items-start gap-2">
                 <span>Bldg. 308-A Canal Road, Central Business District, Subic Bay Freeport Zone, 2222</span>
              </p>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-slate-400 text-sm gap-4">
            <p>&copy; 2026 CareSync / MJY 88. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-black">Privacy Policy</Link>
              <Link href="#" className="hover:text-black">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
