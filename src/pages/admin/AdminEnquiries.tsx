import { useEffect, useMemo, useState } from 'react';
import { Mail, Phone, Trash2, Loader2, Inbox } from 'lucide-react';
import {
  adminDeleteEnquiry,
  adminFetchEnquiries,
  adminUpdateEnquiryStatus,
} from '../../services/schoolService';
import type { ContactEnquiry, EnquiryStatus } from '../../types/database';
import { SEOHead } from '../../components/SEOHead';

const STATUS_BADGES: Record<EnquiryStatus, string> = {
  new: 'bg-rose-100 text-rose-700',
  in_progress: 'bg-amber-100 text-amber-800',
  resolved: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-slate-200 text-slate-600',
};

export function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');
  const [selected, setSelected] = useState<ContactEnquiry | null>(null);

  useEffect(() => {
    adminFetchEnquiries()
      .then((data) => {
        setEnquiries(data);
        setSelected(data[0] ?? null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      statusFilter === 'all'
        ? enquiries
        : enquiries.filter((e) => e.status === statusFilter),
    [enquiries, statusFilter]
  );

  async function handleStatusChange(id: string, nextStatus: EnquiryStatus) {
    try {
      const updated = await adminUpdateEnquiryStatus(id, nextStatus);
      setEnquiries((prev) => prev.map((e) => (e.id === id ? updated : e)));
      if (selected?.id === id) setSelected(updated);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleDelete(enq: ContactEnquiry) {
    if (!window.confirm(`Delete enquiry from ${enq.name}?`)) return;
    try {
      await adminDeleteEnquiry(enq.id);
      setEnquiries((prev) => prev.filter((e) => e.id !== enq.id));
      if (selected?.id === enq.id) setSelected(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <>
      <SEOHead title="Contact Enquiries" description="Manage parent contact and admission enquiries." />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Contact &amp; Admission Enquiries
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Review parent messages submitted through the website and track follow-up status.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'new', 'in_progress', 'resolved', 'archived'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-300'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-16 flex justify-center text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin text-[#0284C7]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <Inbox className="w-9 h-9 text-slate-300 mx-auto" />
            <p className="font-display text-lg font-bold text-[#0F172A]">No enquiries here</p>
            <p className="text-sm text-slate-500">
              Enquiries submitted through the Contact and Admission forms will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List */}
            <div className="lg:col-span-5 space-y-2.5">
              {filtered.map((enq) => (
                <button
                  key={enq.id}
                  type="button"
                  onClick={() => setSelected(enq)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selected?.id === enq.id
                      ? 'bg-sky-50/70 border-[#0284C7] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-sm text-[#0F172A] truncate">{enq.name}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${STATUS_BADGES[enq.status]}`}
                    >
                      {enq.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 truncate mt-1">
                    {enq.subject}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                    <span className="capitalize">{enq.enquiry_type}</span>
                    <span>{new Date(enq.created_at).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-7">
              {selected ? (
                <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-full bg-sky-100 text-[#0369A1] text-[11px] font-bold uppercase mb-2">
                        {selected.enquiry_type} Enquiry
                      </span>
                      <h2 className="font-display text-2xl font-bold text-[#0F172A]">
                        {selected.subject}
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        From <strong className="text-[#0F172A]">{selected.name}</strong> on{' '}
                        {new Date(selected.created_at).toLocaleString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(selected)}
                      className="p-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50"
                      title="Delete enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 text-[#0369A1] text-xs font-bold hover:bg-sky-100"
                    >
                      <Mail className="w-4 h-4" />
                      {selected.email}
                    </a>
                    {selected.phone && (
                      <a
                        href={`tel:${selected.phone}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100"
                      >
                        <Phone className="w-4 h-4" />
                        {selected.phone}
                      </a>
                    )}
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {selected.message}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status:
                    </span>
                    {(['new', 'in_progress', 'resolved', 'archived'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(selected.id, st)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                          selected.status === st
                            ? 'bg-[#0284C7] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl bg-white border border-slate-200 p-12 text-center text-sm text-slate-500">
                  Select an enquiry from the list to view details.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
