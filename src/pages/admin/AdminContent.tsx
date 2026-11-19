import { useEffect, useState, type FormEvent } from 'react';
import { Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  DEFAULT_SITE_CONTENT,
  adminFetchSiteContent,
  adminUpsertSiteContent,
} from '../../services/schoolService';
import type { SiteContent } from '../../types/database';
import { SEOHead } from '../../components/SEOHead';

const MANAGED_SECTIONS = [
  { key: 'hero', label: 'Homepage Hero Section' },
  { key: 'welcome', label: 'Welcome to SM School Section' },
  { key: 'admissions_banner', label: 'Admissions Callout Banner' },
];

export function AdminContent() {
  const [blocks, setBlocks] = useState<Record<string, SiteContent>>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  useEffect(() => {
    adminFetchSiteContent()
      .then((rows) => {
        const merged: Record<string, SiteContent> = { ...DEFAULT_SITE_CONTENT };
        rows.forEach((r) => {
          merged[r.section_key] = r;
        });
        setBlocks(merged);
      })
      .catch((err: Error) => setFeedback({ type: 'error', message: err.message }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: FormEvent, key: string) {
    e.preventDefault();
    const block = blocks[key];
    if (!block) return;

    setSavingKey(key);
    setFeedback(null);
    try {
      const saved = await adminUpsertSiteContent({
        section_key: key,
        title: block.title,
        subtitle: block.subtitle,
        body: block.body,
      });
      setBlocks((prev) => ({ ...prev, [key]: saved }));
      setFeedback({ type: 'success', message: `Saved "${key}" section to live website.` });
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <>
      <SEOHead title="Website Content" description="Manage editable SM English School website content." />
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Website Content
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Update key homepage headlines and introduction text without code changes.
          </p>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-2.5 text-sm ${
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

        {loading ? (
          <div className="py-16 flex justify-center text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin text-[#0284C7]" />
          </div>
        ) : (
          <div className="space-y-6">
            {MANAGED_SECTIONS.map(({ key, label }) => {
              const block = blocks[key] ?? DEFAULT_SITE_CONTENT[key];
              return (
                <form
                  key={key}
                  onSubmit={(e) => handleSave(e, key)}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-[#0F172A]">{label}</h2>
                    <span className="text-xs font-mono text-slate-400">{key}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Headline *
                      </label>
                      <input
                        type="text"
                        required
                        value={block.title}
                        onChange={(e) =>
                          setBlocks((prev) => ({
                            ...prev,
                            [key]: { ...block, title: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Badge / Subtitle
                      </label>
                      <input
                        type="text"
                        value={block.subtitle}
                        onChange={(e) =>
                          setBlocks((prev) => ({
                            ...prev,
                            [key]: { ...block, subtitle: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Body Copy *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={block.body}
                      onChange={(e) =>
                        setBlocks((prev) => ({
                          ...prev,
                          [key]: { ...block, body: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={savingKey === key}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-xs disabled:opacity-60"
                    >
                      {savingKey === key ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save Section
                    </button>
                  </div>
                </form>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
