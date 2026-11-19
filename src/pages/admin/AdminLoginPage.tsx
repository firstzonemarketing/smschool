import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SCHOOL_INFO } from '../../data/schoolData';
import { SEOHead } from '../../components/SEOHead';

export function AdminLoginPage() {
  const { isAdmin, loading, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!loading && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter both your administrator email and password.');
      return;
    }

    setSubmitting(true);
    const result = await signIn(email, password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else {
      navigate('/admin', { replace: true });
    }
  }

  return (
    <>
      <SEOHead
        title="Admin Login"
        description="Authorized administrator sign-in portal for SM English School."
      />
      <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl"
        />

        <div className="relative w-full max-w-md space-y-6">
          <div className="text-center space-y-3">
            <Link to="/" className="inline-flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-xl">
                <img
                  src={SCHOOL_INFO.logo}
                  alt="SM English School Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">SM English School</h1>
                <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
                  Administration Portal
                </p>
              </div>
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-7 sm:p-8 shadow-2xl space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#0F172A]">
                Authorized Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Protected Laravel administration portal for SM English School. Public registration
                is disabled.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                >
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@smschool.co.in"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-[#0F172A] focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-sm text-[#0F172A] focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying Credentials...
                  </>
                ) : (
                  'Sign In to Admin Panel'
                )}
              </button>
            </form>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
