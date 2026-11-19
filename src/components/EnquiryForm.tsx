import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail } from 'lucide-react';
import { submitContactEnquiry } from '../services/schoolService';
import { SCHOOL_INFO } from '../data/schoolData';
import type { EnquiryType } from '../types/database';

interface EnquiryFormProps {
  defaultType?: EnquiryType;
  showTypeToggle?: boolean;
  compact?: boolean;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  childGrade: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  childGrade: '',
};

export function EnquiryForm({
  defaultType = 'general',
  showTypeToggle = true,
  compact = false,
}: EnquiryFormProps) {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(defaultType);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (enquiryType === 'admission' && form.phone.trim().length < 7) {
      next.phone = 'Please provide a contact phone number for admission follow-up.';
    }
    if (form.subject.trim().length < 2) {
      next.subject = 'Please add a short subject.';
    }
    if (form.message.trim().length < 10) {
      next.message = 'Please share a few details (at least 10 characters).';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setSubmitting(true);
    const composedMessage =
      enquiryType === 'admission' && form.childGrade.trim()
        ? `Prospective Grade/Program: ${form.childGrade.trim()}\n\n${form.message.trim()}`
        : form.message.trim();

    const result = await submitContactEnquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject:
        enquiryType === 'admission' && !form.subject.toLowerCase().includes('admission')
          ? `Admission Enquiry: ${form.subject}`
          : form.subject,
      message: composedMessage,
      enquiry_type: enquiryType,
    });

    setSubmitting(false);

    if (result.ok) {
      setStatus({
        type: 'success',
        message:
          enquiryType === 'admission'
            ? 'Thank you! Your admission enquiry has been received by the SM English School office. Our team will reach out during school hours (Mon–Sat, 8:00 AM–4:00 PM).'
            : 'Thank you for contacting SM English School! Your message has been recorded and our office will respond shortly.',
      });
      setForm(INITIAL_STATE);
      setErrors({});
    } else {
      setStatus({
        type: 'error',
        message: result.error || 'Could not submit enquiry. Please try again or call us directly.',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {showTypeToggle && (
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
          <button
            type="button"
            onClick={() => {
              setEnquiryType('general');
              setStatus(null);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              enquiryType === 'general'
                ? 'bg-white text-[#0F172A] shadow-sm'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            General Contact
          </button>
          <button
            type="button"
            onClick={() => {
              setEnquiryType('admission');
              setStatus(null);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              enquiryType === 'admission'
                ? 'bg-[#0284C7] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Admission Enquiry
          </button>
        </div>
      )}

      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label htmlFor={`name-${enquiryType}`} className="block text-sm font-semibold text-slate-700 mb-1.5">
            {enquiryType === 'admission' ? 'Parent / Guardian Name *' : 'Full Name *'}
          </label>
          <input
            id={`name-${enquiryType}`}
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
          />
          {errors.name && <p className="mt-1 text-xs font-medium text-rose-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`email-${enquiryType}`} className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email Address *
          </label>
          <input
            id={`email-${enquiryType}`}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
          />
          {errors.email && <p className="mt-1 text-xs font-medium text-rose-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`phone-${enquiryType}`} className="block text-sm font-semibold text-slate-700 mb-1.5">
            Phone Number {enquiryType === 'admission' ? '*' : '(Optional)'}
          </label>
          <input
            id={`phone-${enquiryType}`}
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98XXXXXXXX"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
          />
          {errors.phone && <p className="mt-1 text-xs font-medium text-rose-600">{errors.phone}</p>}
        </div>

        {enquiryType === 'admission' ? (
          <div>
            <label htmlFor="child-grade" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Child’s Stage / Class of Interest
            </label>
            <select
              id="child-grade"
              value={form.childGrade}
              onChange={(e) => setForm({ ...form, childGrade: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#0F172A] focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
            >
              <option value="">Select stage</option>
              <option value="Early Learning Center / Pre-School">Early Learning Center / Pre-School</option>
              <option value="Primary School (Classes 1–5)">Primary School (Classes 1–5)</option>
              <option value="Middle School (Classes 6–8)">Middle School (Classes 6–8)</option>
              <option value="High School (Classes 9–10)">High School (Classes 9–10)</option>
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor={`subject-${enquiryType}`} className="block text-sm font-semibold text-slate-700 mb-1.5">
              Subject *
            </label>
            <input
              id={`subject-${enquiryType}`}
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
            />
            {errors.subject && <p className="mt-1 text-xs font-medium text-rose-600">{errors.subject}</p>}
          </div>
        )}
      </div>

      {enquiryType === 'admission' && (
        <div>
          <label htmlFor={`subject-${enquiryType}`} className="block text-sm font-semibold text-slate-700 mb-1.5">
            Enquiry Subject *
          </label>
          <input
            id={`subject-${enquiryType}`}
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="e.g., Campus visit & admission information"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
          />
          {errors.subject && <p className="mt-1 text-xs font-medium text-rose-600">{errors.subject}</p>}
        </div>
      )}

      <div>
        <label htmlFor={`message-${enquiryType}`} className="block text-sm font-semibold text-slate-700 mb-1.5">
          Message *
        </label>
        <textarea
          id={`message-${enquiryType}`}
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={
            enquiryType === 'admission'
              ? 'Tell us about your child and any questions you have about SM English School...'
              : 'Write your message for our school office...'
          }
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all resize-y"
        />
        {errors.message && <p className="mt-1 text-xs font-medium text-rose-600">{errors.message}</p>}
      </div>

      {status && (
        <div
          role="status"
          className={`p-4 rounded-2xl border flex items-start gap-3 text-sm ${
            status.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-2">
            <p className="font-medium leading-relaxed">{status.message}</p>
            {status.type === 'error' && (
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={SCHOOL_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 font-bold text-rose-800 underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {SCHOOL_INFO.phoneDisplay}
                </a>
                <a
                  href={SCHOOL_INFO.emailHref}
                  className="inline-flex items-center gap-1.5 font-bold text-rose-800 underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {SCHOOL_INFO.email}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:pointer-events-none"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {enquiryType === 'admission' ? 'Submit Admission Enquiry' : 'Send Message'}
          </>
        )}
      </button>
    </form>
  );
}
