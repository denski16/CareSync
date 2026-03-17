'use client';
import Link from "next/link";
import { Activity, User, Mail, Phone, Lock, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { signup, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Patient' as any
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const result = await signup({
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      role: formData.role
    });

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      // Optional: Redirect after delay or show success message
      setTimeout(() => router.push('/login'), 2000);
    }
  }

  return (
    <div className="min-h-screen flex text-slate-900 font-sans">
      {/* Left Panel - Form */}
      <div className="flex-[1.2] flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8 my-8">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">Create Your<br/>Account</h2>
            <p className="text-slate-500">Please enter your details to register.</p>
          </div>
          
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={18} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <ShieldCheck size={18} className="shrink-0" />
              <p className="text-sm font-medium">Account created! Redirecting to login...</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Full Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" required
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                  placeholder="JOHN DOE" 
                  className="w-full pl-11 pr-4 py-3 rounded-none border-2 border-slate-900 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors uppercase placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="NAME@EXAMPLE.COM" 
                  className="w-full pl-11 pr-4 py-3 rounded-none border-2 border-slate-900 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors uppercase placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">I am a...</label>
              <select 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value as any})}
                className="w-full px-4 py-3 rounded-none border-2 border-slate-900 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors font-bold uppercase text-sm"
              >
                <option value="Patient">Patient / Motorist</option>
                <option value="Doctor">Doctor / Medical Examiner</option>
                <option value="Staff">Clinic Staff</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" required minLength={8}
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3 rounded-none border-2 border-slate-900 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors placeholder:text-slate-400 font-medium"
                />
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Min 8 characters.</p>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading || success}
                className="w-full bg-black text-white rounded-none py-4 font-bold text-sm tracking-wider uppercase hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? <><Loader2 size={18} className="animate-spin" /> Creating Account...</> : 'Create Account'}
              </button>
            </div>
          </form>
          
          <p className="text-center text-xs font-bold text-slate-500 tracking-wider uppercase pt-4">
            Already have an account? <Link href="/login" className="text-black underline">Log in</Link>
          </p>

          <div className="pt-8 border-t border-slate-200 mt-8">
            <div className="flex items-center justify-center gap-6 mb-8 text-xs font-bold uppercase tracking-wider text-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} /> HIPAA Compliant
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} /> 256-Bit SSL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex flex-1 bg-[#0A101C] text-white p-16 flex-col justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"></div>
        <div className="relative z-10 space-y-10 max-w-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-teal-500 flex items-center justify-center text-teal-400">
              <Activity size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight">CareSync</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">Your journey to the <br /> road starts here.</h1>
          <p className="text-lg text-slate-300 leading-relaxed">Access your medical records, schedule appointments, and message your care team securely from anywhere.</p>
        </div>
      </div>
    </div>
  );
}
