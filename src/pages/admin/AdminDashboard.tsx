import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Images,
  Eye,
  FileEdit,
  FolderKanban,
  Inbox,
  Upload,
  ArrowRight,
  Loader2,
  AlertCircle,
  Star,
} from 'lucide-react';
import {
  adminFetchAllImages,
  adminFetchCategories,
  adminFetchEnquiries,
} from '../../services/schoolService';
import type { ContactEnquiry, GalleryCategory, GalleryImage } from '../../types/database';
import { SEOHead } from '../../components/SEOHead';

export function AdminDashboard() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([adminFetchAllImages(), adminFetchCategories(), adminFetchEnquiries()])
      .then(([imgs, cats, enqs]) => {
        if (!active) return;
        setImages(imgs);
        setCategories(cats);
        setEnquiries(enqs);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (!active) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const totalImages = images.length;
  const publishedImages = images.filter((i) => i.is_published).length;
  const draftImages = images.filter((i) => !i.is_published).length;
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;
  const recentUploads = [...images]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  return (
    <>
      <SEOHead title="Admin Dashboard" description="SM English School Admin Dashboard." />
      <div className="space-y-8">
        {/* Header + Quick Upload Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Live metrics from your Laravel database and gallery storage.
            </p>
          </div>
          <Link
            to="/admin/gallery?upload=1"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm shadow-md transition-all"
          >
            <Upload className="w-4 h-4" />
            Quick Upload Photos
          </Link>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 flex items-center justify-center text-slate-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#0284C7]" />
            <span className="text-sm font-medium">Loading live statistics...</span>
          </div>
        ) : (
          <>
            {/* Live KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              {[
                {
                  label: 'Total Uploaded Images',
                  value: totalImages,
                  icon: Images,
                  color: 'bg-sky-100 text-sky-700',
                  to: '/admin/gallery',
                },
                {
                  label: 'Published Images',
                  value: publishedImages,
                  icon: Eye,
                  color: 'bg-emerald-100 text-emerald-700',
                  to: '/admin/gallery',
                },
                {
                  label: 'Draft Images',
                  value: draftImages,
                  icon: FileEdit,
                  color: 'bg-amber-100 text-amber-700',
                  to: '/admin/gallery',
                },
                {
                  label: 'Gallery Categories',
                  value: categories.length,
                  icon: FolderKanban,
                  color: 'bg-violet-100 text-violet-700',
                  to: '/admin/categories',
                },
                {
                  label: 'New Enquiries',
                  value: newEnquiries,
                  icon: Inbox,
                  color: 'bg-rose-100 text-rose-700',
                  to: '/admin/enquiries',
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <Link
                    key={stat.label}
                    to={stat.to}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="mt-4 font-display text-3xl font-bold text-[#0F172A]">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">{stat.label}</p>
                  </Link>
                );
              })}
            </div>

            {/* Recent Uploads & Recent Enquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Uploads */}
              <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-[#0F172A]">Recent Uploads</h2>
                  <Link
                    to="/admin/gallery"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] hover:underline"
                  >
                    Manage Gallery
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {recentUploads.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
                    <Images className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-medium text-slate-600">
                      No photographs uploaded yet.
                    </p>
                    <Link
                      to="/admin/gallery?upload=1"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] text-white text-xs font-bold"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload First Photos
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recentUploads.map((img) => (
                      <div
                        key={img.id}
                        className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 bg-slate-50/70"
                      >
                        <img
                          src={img.image_url}
                          alt={img.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#0F172A] truncate">{img.title}</p>
                          <p className="text-xs text-slate-500 truncate">
                            {img.category?.name || 'Uncategorized'}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                img.is_published
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {img.is_published ? 'Published' : 'Draft'}
                            </span>
                            {img.is_featured && (
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold">
                                <Star className="w-2.5 h-2.5 fill-current" />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Enquiries */}
              <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-[#0F172A]">
                    Latest Enquiries
                  </h2>
                  <Link
                    to="/admin/enquiries"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] hover:underline"
                  >
                    View All
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {enquiries.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                    <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500 mt-2">No parent enquiries submitted yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {enquiries.slice(0, 5).map((enq) => (
                      <div
                        key={enq.id}
                        className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold text-[#0F172A] truncate">{enq.name}</p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              enq.status === 'new'
                                ? 'bg-rose-100 text-rose-700'
                                : enq.status === 'resolved'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {enq.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 truncate">{enq.subject}</p>
                        <p className="text-[11px] text-slate-500">
                          {enq.email} • {new Date(enq.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
