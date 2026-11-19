import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you are looking for could not be found on SM English School's website."
      />
      <section className="py-24 px-4 text-center max-w-xl mx-auto space-y-5">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-bold uppercase tracking-wider">
          404 • Page Not Found
        </span>
        <h1 className="font-display text-4xl font-bold text-[#0F172A]">
          Oops! We couldn&apos;t find that page.
        </h1>
        <p className="text-slate-600">
          Let&apos;s bring you back to the SM English School homepage or photo gallery.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0284C7] text-white font-bold text-sm"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-[#0F172A] font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            View Gallery
          </Link>
        </div>
      </section>
    </>
  );
}
