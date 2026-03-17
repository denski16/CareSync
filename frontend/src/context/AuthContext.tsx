'use client';
// ============================================================
// Auth Context
// SUPABASE VERSION: Uses real Supabase Auth
// ============================================================
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthUser, LoginCredentials, UserRole } from '@/types';
import { supabase } from '@/lib/supabase';

const PORTAL_ROUTES: Record<UserRole, string> = {
  Patient: '/client/dashboard',
  Doctor:  '/doctor/dashboard',
  Nurse:   '/doctor/dashboard',
  Staff:   '/staff/queue',
  Admin:   '/admin/dashboard',
};

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (creds: LoginCredentials) => Promise<{ error?: string }>;
  signup: (data: { email: string; password: string; full_name: string; role: UserRole }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await refreshProfile(session.user.id, session.user.email!);
      }
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await refreshProfile(session.user.id, session.user.email!);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function refreshProfile(userId: string, email: string) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
      return;
    }

    setUser({ ...profile, email });
  }

  async function login(creds: LoginCredentials): Promise<{ error?: string }> {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: creds.email,
      password: creds.password,
    });

    if (error) {
      setIsLoading(false);
      return { error: error.message };
    }

    // Profile will be handle by onAuthStateChange, but we want to redirect now
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profile) {
      router.push(PORTAL_ROUTES[profile.role as UserRole]);
    }

    setIsLoading(false);
    return {};
  }

  async function signup(data: { email: string; password: string; full_name: string; role: UserRole }): Promise<{ error?: string }> {
    setIsLoading(true);
    
    // 1. Auth Sign Up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          role: data.role,
        }
      }
    });

    if (authError) {
      setIsLoading(false);
      return { error: authError.message };
    }

    if (!authData.user) {
      setIsLoading(false);
      return { error: 'Signup failed. Please try again.' };
    }

    setIsLoading(false);
    return {};
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
