
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  isGuest: boolean;
  guestName: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setGuestUser: (name: string) => void;
  clearGuestUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a guest user in localStorage
    const storedGuestName = localStorage.getItem('guestName');
    if (storedGuestName) {
      setIsGuest(true);
      setGuestName(storedGuestName);
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // Clear any guest user when logging in
    clearGuestUser();
  };

  const register = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { name }
      }
    });
    if (error) throw error;
    // Clear any guest user when registering
    clearGuestUser();
  };

  const logout = async () => {
    if (isGuest) {
      clearGuestUser();
    } else {
      await supabase.auth.signOut();
    }
  };

  const setGuestUser = (name: string) => {
    localStorage.setItem('guestName', name);
    setIsGuest(true);
    setGuestName(name);
  };

  const clearGuestUser = () => {
    localStorage.removeItem('guestName');
    setIsGuest(false);
    setGuestName(null);
  };

  const value = {
    isAuthenticated: !!user || isGuest,
    user,
    session,
    isGuest,
    guestName,
    login,
    register,
    logout,
    setGuestUser,
    clearGuestUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
