import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiRequest, getAuthToken, setAuthToken } from '../lib/api';

export interface AdminProfile {
  id: number | string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  is_admin: boolean;
}

interface AuthContextValue {
  user: AdminProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    let mounted = true;
    apiRequest<{ user: AdminProfile }>('/api/admin/me', { auth: true })
      .then((res) => {
        if (mounted && res.user?.is_admin) {
          setUser(res.user);
        } else if (mounted) {
          setAuthToken(null);
          setUser(null);
        }
      })
      .catch(() => {
        if (mounted) {
          setAuthToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function signIn(email: string, password: string): Promise<{ error: string | null }> {
    try {
      const res = await apiRequest<{ token: string; user: AdminProfile }>('/api/admin/login', {
        method: 'POST',
        body: { email: email.trim(), password },
      });
      setAuthToken(res.token);
      setUser(res.user);
      return { error: null };
    } catch (err) {
      return { error: (err as Error).message || 'Invalid credentials.' };
    }
  }

  async function signOut() {
    try {
      await apiRequest('/api/admin/logout', { method: 'POST', auth: true });
    } catch {
      // clear client session regardless
    } finally {
      setAuthToken(null);
      setUser(null);
    }
  }

  async function updatePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<{ error: string | null }> {
    try {
      await apiRequest('/api/admin/password', {
        method: 'PUT',
        auth: true,
        body: {
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        },
      });
      return { error: null };
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: Boolean(user?.is_admin),
        loading,
        signIn,
        signOut,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
