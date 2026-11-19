import { useState, type FormEvent } from 'react';
import { ShieldCheck, KeyRound, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/SEOHead';

export function AdminSettings() {
  const { user, updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  async function handlePasswordUpdate(e: FormEvent) {
    e.preventDefault();
    setFeedback(null);

    if (newPassword.length < 8) {
      setFeedback({ type: 'error', message: 'New password must be at least 8 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setSaving(true);
    const result = await updatePassword(currentPassword, newPassword, confirmPassword);
    setSaving(false);

    if (result.error) {
      setFeedback({ type: 'error', message: result.error });
    } else {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setFeedback({ type: 'success', message: 'Your administrator password has been updated.' });
    }
  }

  return (
    <>
      <SEOHead title="Account Settings" description="SM English School admin account settings." />
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Account Settings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Review your administrator session details and manage password security.
          </p>
        </div>

        {/* Account Info Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-[#0F172A]">
                Administrator Profile
              </h2>
              <p className="text-xs text-slate-500">
                Verified via Laravel Sanctum Token &amp; Admin Middleware
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</dt>
              <dd className="font-semibold text-[#0F172A] mt-1">{user?.email}</dd>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Role</dt>
              <dd className="font-semibold text-[#0F172A] mt-1 capitalize">
                {(user?.role || 'admin').replace('_', ' ')}
              </dd>
            </div>
          </dl>
        </div>

        {/* Change Password Form */}
        <form
          onSubmit={handlePasswordUpdate}
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-[#0284C7]" />
            <h2 className="font-display text-lg font-bold text-[#0F172A]">Update Password</h2>
          </div>

          {feedback && (
            <div
              className={`p-3.5 rounded-2xl border flex items-center gap-2 text-sm ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <div>
            <label htmlFor="cur-pw" className="block text-xs font-bold text-slate-600 mb-1">
              Current Password *
            </label>
            <input
              id="cur-pw"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label htmlFor="new-pw" className="block text-xs font-bold text-slate-600 mb-1">
              New Password *
            </label>
            <input
              id="new-pw"
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label htmlFor="confirm-pw" className="block text-xs font-bold text-slate-600 mb-1">
              Confirm New Password *
            </label>
            <input
              id="confirm-pw"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}
