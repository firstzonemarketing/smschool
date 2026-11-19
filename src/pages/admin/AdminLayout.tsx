import { useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Images,
  FolderKanban,
  Star,
  Inbox,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SCHOOL_INFO } from '../../data/schoolData';

const ADMIN_NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/gallery', label: 'Gallery', icon: Images, end: false },
  { to: '/admin/categories', label: 'Categories', icon: FolderKanban, end: false },
  { to: '/admin/featured', label: 'Featured Images', icon: Star, end: false },
  { to: '/admin/enquiries', label: 'Contact Enquiries', icon: Inbox, end: false },
  { to: '/admin/content', label: 'Website Content', icon: FileText, end: false },
  { to: '/admin/settings', label: 'Account Settings', icon: Settings, end: false },
];

export function AdminLayout() {
  const { isAdmin, loading, user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#0284C7]" />
          <p className="text-sm font-semibold">Checking administrator session...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  async function handleLogout() {
    await signOut();
    navigate('/admin/login', { replace: true });
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-200 w-64">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1 shrink-0">
            <img
              src={SCHOOL_INFO.logo}
              alt="SM School"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-white leading-tight">
              SM School Admin
            </p>
            <p className="text-[11px] text-sky-300 font-medium">Management Portal</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav aria-label="Admin navigation" className="flex-1 p-3 space-y-1 overflow-y-auto">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0284C7] text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Live Website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-xs font-semibold text-rose-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen">{sidebarContent}</aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="relative z-10">{sidebarContent}</div>
          <div
            className="flex-1 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <p className="text-xs font-semibold text-slate-500">
              SM English School • Content &amp; Gallery Administration
            </p>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#0F172A]">{user?.email}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Authenticated Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#E0F2FE] text-[#0369A1] font-bold text-xs flex items-center justify-center uppercase">
              {(user?.email || 'A').slice(0, 2)}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
