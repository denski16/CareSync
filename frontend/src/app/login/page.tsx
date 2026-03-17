'use client';
import Link from "next/link";
import { Activity, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const result = await login({ email, password });
    if (result.error) setError(result.error);
  }

  return (
    <div className="min-h-screen flex text-slate-900 font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-[#0A101C] text-white p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
           <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="2" x2="12" y2="22"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        </div>
        
        <div className="relative z-10 flex flex-col h-full justify-center space-y-8 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full border border-teal-500 flex items-center justify-center text-teal-400">
              <Activity size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight">CareSync</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Faster licensing <br /> starts with better <br /> access.
          </h1>
          <p className="text-lg text-slate-300">Manage your LTO medical requirements, schedule your physical exam.</p>
          
          {/* Demo Credentials */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Demo Accounts</p>
            {[
              { role: 'Patient',  email: 'patient@demo.com', pass: 'patient123' },
              { role: 'Doctor',   email: 'doctor@demo.com',  pass: 'doctor123' },
              { role: 'Staff',    email: 'staff@demo.com',   pass: 'staff123' },
              { role: 'Admin',    email: 'admin@demo.com',   pass: 'admin123' },
            ].map(a => (
              <button key={a.role} type="button"
                onClick={() => { setEmail(a.email); setPassword(a.pass); setError(''); }}
                className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex justify-between items-center group">
                <span className="text-white font-bold text-sm">{a.role}</span>
                <span className="text-slate-400 text-xs font-mono group-hover:text-white">{a.email}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-12 pt-4">
            <div><h3 className="text-3xl font-black mb-1">24/7</h3><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Support</p></div>
            <div className="w-px h-12 bg-slate-800"></div>
            <div><h3 className="text-3xl font-black mb-1">100%</h3><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Secure</p></div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-[1.2] flex items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Please enter your details to access your portal</p>
          </div>
          
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={18} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
              <input 
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="name@example.com" 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-slate-400"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
                <Link href="/forgot-password" className="text-sm font-semibold text-slate-900 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-slate-400"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button type="submit" disabled={isLoading}
              className="w-full bg-black text-white rounded-lg py-4 font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'LOG IN'}
            </button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center"><span className="bg-white px-4 text-xs font-bold tracking-widest uppercase text-slate-400">Or continue with</span></div>
          </div>
          
          <button type="button" className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg py-4 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.69 17.57V20.34H19.25C21.33 18.43 22.56 15.6 22.56 12.25Z" fill="#4285F4"/><path d="M12 23C14.97 23 17.46 22.02 19.25 20.34L15.69 17.57C14.72 18.22 13.47 18.63 12 18.63C9.15 18.63 6.74 16.71 5.86 14.13H2.18V16.98C3.99 20.58 7.69 23 12 23Z" fill="#34A853"/><path d="M5.86 14.13C5.63 13.43 5.5 12.72 5.5 12C5.5 11.28 5.63 10.57 5.86 9.87V7.02H2.18C1.43 8.5 1 10.2 1 12C1 13.8 1.43 15.5 2.18 16.98L5.86 14.13Z" fill="#FBBC05"/><path d="M12 5.38C13.62 5.38 15.07 5.94 16.22 7.03L19.33 3.92C17.45 2.17 14.97 1 12 1C7.69 1 3.99 3.42 2.18 7.02L5.86 9.87C6.74 7.29 9.15 5.38 12 5.38Z" fill="#EA4335"/></svg>
            GOOGLE (Coming Soon)
          </button>
          
          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account? <Link href="/signup" className="text-slate-900 font-bold hover:underline">Register here</Link>
          </p>
          
          <div className="pt-4 flex items-center justify-center gap-6 text-xs font-bold tracking-widest uppercase text-slate-400">
            <Link href="#" className="hover:text-slate-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-600">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-600">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
