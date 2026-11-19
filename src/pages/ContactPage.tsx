import { assetUrl } from '../lib/assetUrl';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal, SectionHeader, StaggerContainer, StaggerItem } from '../components/MotionPrimitives';
import { EnquiryForm } from '../components/EnquiryForm';
import { SCHOOL_INFO } from '../data/schoolData';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'admission' ? 'admission' : 'general';

  return (
    <>
      <SEOHead
        title="Contact & Admissions"
        description="Contact SM English School at Devi Anugraha, Basi Reddy Garden, Hoodi, Bangalore - 560 048. Call +91 7676995557 or email info@smschool.co.in for admissions and general enquiries."
        image={assetUrl('/assets/students/student-teacher-welcome.jpg')}
      />

      {/* Hero */}
      <section className="bg-warm-mesh pt-14 pb-16 lg:pt-20 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Contact & Admissions"
            title="We’d Love to Welcome Your Family to SMES"
            description="Reach out with your admission questions, arrange a visit to our Hoodi campus, or connect with our school office during working hours."
            accent="sky"
          />

          {/* Quick Contact Cards */}
          <StaggerContainer className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StaggerItem>
              <div className="h-full p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF1EE] text-[#C2410C] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="font-display text-lg font-bold text-[#0F172A]">Location Address</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {SCHOOL_INFO.addressLine1}
                  <br />
                  {SCHOOL_INFO.addressLine2}
                </p>
                <a
                  href={SCHOOL_INFO.mapDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:underline"
                >
                  Get Directions
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <a
                href={SCHOOL_INFO.phoneHref}
                className="block h-full p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#D1FAE5] text-[#047857] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="font-display text-lg font-bold text-[#0F172A]">Phone Number</h2>
                <p className="text-base font-bold text-[#047857]">{SCHOOL_INFO.phoneDisplay}</p>
                <p className="text-xs text-slate-500">Tap to call our school office directly</p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href={SCHOOL_INFO.emailHref}
                className="block h-full p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="font-display text-lg font-bold text-[#0F172A]">Email Address</h2>
                <p className="text-base font-bold text-[#0369A1] break-all">{SCHOOL_INFO.email}</p>
                <p className="text-xs text-slate-500">Write to us anytime for information</p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="font-display text-lg font-bold text-[#0F172A]">Office &amp; Class Hours</h2>
                <p className="text-sm font-semibold text-slate-700">{SCHOOL_INFO.officeDays}</p>
                <p className="text-sm text-slate-600">{SCHOOL_INFO.officeHours}</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Forms + Map Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Interactive Contact / Admission Enquiry Form */}
          <Reveal className="lg:col-span-7 rounded-[2.25rem] bg-[#FFFDF7] border border-slate-200/80 p-7 sm:p-10 shadow-editorial">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Contact &amp; Admission Enquiry Form
            </h2>
            <p className="mt-2 text-sm text-slate-600 mb-6">
              Submit your contact message or admission enquiry directly to the SM English School
              office. We do not collect payment or fees online — our team will guide you personally
              on campus visits and admission procedures.
            </p>
            <EnquiryForm defaultType={initialTab} showTypeToggle />
          </Reveal>

          {/* Google Maps & Campus Visual */}
          <Reveal delay={0.1} className="lg:col-span-5 space-y-6">
            <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-editorial bg-slate-100">
              <iframe
                title="SM English School Hoodi Bangalore Map"
                src={SCHOOL_INFO.mapEmbedUrl}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-[2rem] overflow-hidden border border-slate-200/80 bg-[#0F172A] text-white p-6 space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                <img
                  src={assetUrl('/assets/students/student-teacher-welcome.jpg')}
                  alt="Warm welcome at SM English School Hoodi"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Visit Our Campus in Hoodi</h3>
                <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                  {SCHOOL_INFO.name}, {SCHOOL_INFO.fullAddress}. Our school office is open{' '}
                  {SCHOOL_INFO.officeDays}, {SCHOOL_INFO.officeHours}.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
