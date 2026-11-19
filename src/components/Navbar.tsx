import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/academics', label: 'Academics' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/activities', label: 'Activities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Utility Strip */}
      <div className="hidden lg:block bg-[#0F172A] text-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
              SM Education Society • Established 1965
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {SCHOOL_INFO.officeDays}: {SCHOOL_INFO.officeHours}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={SCHOOL_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 hover:text-sky-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              {SCHOOL_INFO.phoneDisplay}
            </a>
            <a
              href={SCHOOL_INFO.emailHref}
              className="inline-flex items-center gap-1.5 hover:text-sky-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              {SCHOOL_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFDF7]/95 backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.08)] border-b border-slate-200/70'
            : 'bg-[#FFFDF7]/85 backdrop-blur-sm border-b border-slate-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Original SM School Logo + Identity */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200/80 group-hover:scale-105 transition-transform">
              <img
                src={SCHOOL_INFO.logo}
                alt="SM English School Official Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block font-display text-lg sm:text-xl font-bold text-[#0F172A] leading-tight">
                SM English School
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold text-sky-700 tracking-wide">
                Hoodi, Bangalore • Since 1965
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0284C7] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#0284C7] hover:bg-sky-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/contact?tab=admission"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white text-sm font-bold shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
            >
              Admission Enquiry
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-slate-200 text-[#0F172A] shadow-sm hover:bg-sky-50 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#FFFDF7] border-b border-slate-200 shadow-xl"
          >
            <div className="px-4 py-5 space-y-1.5">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-2xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#0284C7] text-white'
                        : 'text-slate-700 hover:bg-sky-50 hover:text-[#0284C7]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-slate-200/80 space-y-3">
                <Link
                  to="/contact?tab=admission"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white font-bold shadow-md"
                >
                  Admission Enquiry
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 px-1 pt-1">
                  <a href={SCHOOL_INFO.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {SCHOOL_INFO.phoneDisplay}
                  </a>
                  <a href={SCHOOL_INFO.emailHref} className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                    <Mail className="w-3.5 h-3.5 text-sky-600" />
                    {SCHOOL_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
