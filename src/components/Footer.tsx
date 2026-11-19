import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Lock } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

const FOOTER_GALLERY_PREVIEW = [
  { src: '/assets/events/event-morning-assembly-aerial.jpg', alt: 'Morning assembly' },
  { src: '/assets/classrooms/classroom-montessori-pegs.jpg', alt: 'Montessori numeracy' },
  { src: '/assets/activities/activity-volleyball.jpg', alt: 'School volleyball' },
  { src: '/assets/activities/activity-yoga-group.jpg', alt: 'Campus yoga' },
  { src: '/assets/facilities/facility-library.jpg', alt: 'School library' },
  { src: '/assets/events/event-house-quiz-wide.jpg', alt: 'Inter-house quiz' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0F172A] text-slate-300 overflow-hidden">
      {/* Subtle colourful top accent ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#38BDF8] via-[#FACC15] via-50% to-[#34D399]" />

      {/* Decorative ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* School Identity */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md">
                <img
                  src={SCHOOL_INFO.logo}
                  alt="SM English School Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white leading-tight">
                  {SCHOOL_INFO.name}
                </h3>
                <p className="text-xs font-semibold text-amber-300">
                  {SCHOOL_INFO.societyName} • Est. {SCHOOL_INFO.societyEstablished}
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Guided by the enduring vision of {SCHOOL_INFO.founder} —{' '}
              <span className="text-white font-semibold">“{SCHOOL_INFO.motto}”</span> — SM
              English School blends Montessori warmth with structured academic excellence in Hoodi,
              Bangalore.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                {SCHOOL_INFO.officeDays} • {SCHOOL_INFO.officeHours}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-base font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Academics', to: '/academics' },
                { label: 'Facilities', to: '/facilities' },
                { label: 'Activities & Programs', to: '/activities' },
                { label: 'Event Gallery', to: '/gallery' },
                { label: 'Contact & Admissions', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-sky-300 transition-colors"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-bold text-white mb-4">Contact Information</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-coral-rose text-[#FB7185] mt-1 shrink-0" />
                <div>
                  <p className="text-slate-200 leading-relaxed">
                    {SCHOOL_INFO.addressLine1}
                    <br />
                    {SCHOOL_INFO.addressLine2}
                  </p>
                  <a
                    href={SCHOOL_INFO.mapDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-semibold mt-1"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </li>
              <li>
                <a
                  href={SCHOOL_INFO.phoneHref}
                  className="flex items-center gap-3 text-slate-200 hover:text-emerald-300 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{SCHOOL_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={SCHOOL_INFO.emailHref}
                  className="flex items-center gap-3 text-slate-200 hover:text-amber-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{SCHOOL_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Mini Campus Gallery */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-base font-bold text-white">Campus Moments</h4>
              <Link
                to="/gallery"
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
              >
                View all
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {FOOTER_GALLERY_PREVIEW.map((item) => (
                <Link
                  key={item.src}
                  to="/gallery"
                  className="group relative aspect-square rounded-xl overflow-hidden bg-slate-800"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {year} {SCHOOL_INFO.name} ({SCHOOL_INFO.societyName}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact?tab=admission" className="hover:text-white transition-colors">
              Admission Enquiry
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 hover:text-sky-300 transition-colors"
            >
              <Lock className="w-3 h-3" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
