import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Bus,
  Users,
  HeartHandshake,
  MonitorPlay,
  Sun,
  Compass,
  Award,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ZoomIn,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal, SectionHeader, StaggerContainer, StaggerItem } from '../components/MotionPrimitives';
import { EnquiryForm } from '../components/EnquiryForm';
import { Lightbox } from '../components/Lightbox';
import {
  SCHOOL_INFO,
  WHY_CHOOSE_ITEMS,
  INTERNATIONAL_PRINCIPLES,
  MONTESSORI_BLEND_POINTS,
  FACILITIES_LIST,
  DAY_IN_LIFE_STEPS,
  CREATIVE_CLASSES,
  ACTIVITIES_PROGRAMS,
} from '../data/schoolData';
import {
  DEFAULT_SITE_CONTENT,
  fetchPublishedGalleryImages,
  fetchSiteContentMap,
} from '../services/schoolService';
import type { GalleryImage, SiteContent } from '../types/database';

const FACILITY_ICONS: Record<string, typeof Bus> = {
  Bus,
  ShieldCheck,
  HeartHandshake,
  Users,
  MonitorPlay,
  BookOpen,
};

const ACCENT_BG: Record<string, string> = {
  sky: 'bg-[#E0F2FE] text-[#0369A1]',
  coral: 'bg-[#FFF1EE] text-[#C2410C]',
  fresh: 'bg-[#D1FAE5] text-[#047857]',
  lavender: 'bg-[#EDE9FE] text-[#6D28D9]',
  sunshine: 'bg-[#FEF3C7] text-[#B45309]',
};

export function HomePage() {
  const [featuredImages, setFeaturedImages] = useState<GalleryImage[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [content, setContent] = useState<Record<string, SiteContent>>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    let active = true;
    fetchPublishedGalleryImages({ featuredOnly: true, limit: 8 }).then(({ images }) => {
      if (active) setFeaturedImages(images);
    });
    fetchSiteContentMap().then((map) => {
      if (active) setContent(map);
    });
    return () => {
      active = false;
    };
  }, []);

  const heroContent = content.hero ?? DEFAULT_SITE_CONTENT.hero;
  const welcomeContent = content.welcome ?? DEFAULT_SITE_CONTENT.welcome;

  return (
    <>
      <SEOHead
        title="SM English School | Hoodi, Bangalore — Where Every Child's Journey Begins"
        description="SM English School, Hoodi, Bangalore — founded by SM Education Society (Est. 1965). Blending Montessori warmth and traditional learning for holistic student development."
        image="/assets/students/students-smiling-group.jpg"
      />

      {/* =================================================================== */}
      {/* 1. HERO SECTION                                                     */}
      {/* =================================================================== */}
      <section className="relative overflow-hidden bg-warm-mesh pt-10 pb-20 lg:pt-16 lg:pb-28">
        {/* Decorative Floating Shapes & Original School Accents */}
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-14 left-[4%] w-20 h-20 rounded-3xl bg-[#FACC15]/25 border border-[#FACC15]/40 hidden xl:block"
        />
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-16 left-[42%] w-12 h-12 rounded-full bg-[#38BDF8]/25 hidden lg:block"
        />
        <img
          src="/assets/decorations/vector-left-2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none hidden xl:block absolute bottom-10 left-8 w-20 opacity-45 select-none"
        />
        <img
          src="/assets/decorations/vector-right-2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none hidden xl:block absolute top-10 right-10 w-24 opacity-45 select-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-sky-200/80 shadow-sm text-xs sm:text-sm font-bold text-[#0369A1]">
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                <span>{heroContent.subtitle}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.65rem] font-bold text-[#0F172A] leading-[1.08] tracking-tight">
                {heroContent.title.includes("Child's") ? (
                  <>
                    Where Every{' '}
                    <span className="relative inline-block text-[#0284C7]">
                      Child&apos;s
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 200 14"
                        className="absolute -bottom-1.5 left-0 w-full h-3 text-[#FACC15]"
                        fill="none"
                      >
                        <path
                          d="M3 10.5C52 3 148 2 197 9.5"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>{' '}
                    Journey Begins.
                  </>
                ) : (
                  heroContent.title
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {heroContent.body} At <strong className="text-[#0F172A]">SM English School</strong>,
                we blend the warmth of Montessori principles with structured traditional education to
                nurture confident, compassionate, and curious learners.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Explore Our School
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact?tab=admission"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white hover:bg-[#FFF1EE] text-[#0F172A] border-2 border-[#F97316]/35 hover:border-[#F97316] font-bold text-sm sm:text-base shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  Admission Enquiry
                </Link>
              </div>

              {/* Verified Quick Facts Strip (No Invented Stats) */}
              <div className="pt-5 grid grid-cols-3 gap-3 sm:gap-5 max-w-lg">
                <div className="rounded-2xl bg-white/85 backdrop-blur-sm border border-slate-200/70 p-3.5 shadow-sm">
                  <p className="font-display text-xl sm:text-2xl font-bold text-[#0284C7]">1965</p>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">SM Education Society</p>
                </div>
                <div className="rounded-2xl bg-white/85 backdrop-blur-sm border border-slate-200/70 p-3.5 shadow-sm">
                  <p className="font-display text-xl sm:text-2xl font-bold text-[#F97316]">1985</p>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">SM English School</p>
                </div>
                <div className="rounded-2xl bg-white/85 backdrop-blur-sm border border-slate-200/70 p-3.5 shadow-sm">
                  <p className="font-display text-xl sm:text-2xl font-bold text-[#10B981]">Holistic</p>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">Montessori + Traditional</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Animated Photo Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-xl lg:max-w-none">
                {/* Soft coloured backdrop card */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-[#38BDF8]/25 via-[#FACC15]/20 to-[#A78BFA]/25 rotate-2"
                />

                {/* Primary Hero Photograph */}
                <div className="relative rounded-[2.25rem] overflow-hidden shadow-editorial border-4 border-white bg-slate-100 aspect-[4/3]">
                  <img
                    src="/assets/students/students-smiling-group.jpg"
                    alt="Smiling young students at SM English School, Hoodi, Bangalore"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0F172A]/65 via-[#0F172A]/15 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Hoodi, Bangalore
                      </p>
                      <p className="font-display text-base sm:text-lg font-bold">
                        “Knowledge is Power” — Late Dr. Nazir Ahmed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Secondary Photo Card (Top Right) */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:block absolute -top-6 -right-5 w-44 md:w-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white"
                >
                  <img
                    src="/assets/classrooms/classroom-montessori-pegs.jpg"
                    alt="Hands-on Montessori numeracy materials at SM English School"
                    className="w-full h-28 object-cover"
                  />
                  <div className="px-3 py-2 bg-white">
                    <p className="text-[11px] font-bold text-[#0F172A]">Hands-On Montessori</p>
                    <p className="text-[10px] text-slate-500">Early Learning Center</p>
                  </div>
                </motion.div>

                {/* Floating Badge Card (Bottom Left) */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-5 px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-xl"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#D1FAE5] text-[#047857] flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-[#0F172A]">60+ Year Legacy</p>
                    <p className="text-xs text-slate-500">SM Education Society (1965)</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. WELCOME TO SM SCHOOL & 1965 HERITAGE                             */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Editorial Collage */}
            <Reveal className="lg:col-span-6">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7 space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-editorial aspect-[4/3]">
                    <img
                      src="/assets/events/event-campus-assembly-blazers.jpg"
                      alt="Students assembled at SM English School campus"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-3xl bg-[#FEF3C7] p-6 border border-[#FDE68A]">
                    <p className="font-display text-lg font-bold text-[#0F172A]">
                      “Knowledge is Power”
                    </p>
                    <p className="text-xs sm:text-sm text-amber-900/80 mt-1 leading-relaxed">
                      Vision imprinted by founder {SCHOOL_INFO.founder} when establishing SM Education
                      Society in 1965.
                    </p>
                  </div>
                </div>
                <div className="col-span-5 space-y-4 pt-6">
                  <div className="rounded-3xl overflow-hidden shadow-editorial aspect-[3/4]">
                    <img
                      src="/assets/students/student-teacher-welcome.jpg"
                      alt="Teacher welcoming a young child at SM English School"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-editorial aspect-[4/3]">
                    <img
                      src="/assets/classrooms/classroom-montessori-reading.jpg"
                      alt="Children reading picture books in Montessori room"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Editorial Story */}
            <Reveal delay={0.12} className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-bold uppercase tracking-wider">
                Our Heritage • Est. 1965
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#0F172A] leading-tight">
                {welcomeContent.title}: A Legacy of Purposeful Education
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {welcomeContent.body}
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Operating as an unaided private minority institution following a skillfully crafted
                CBSE theme under the State Board curriculum, SMES focuses on overall child
                development — empowering every learner physically, intellectually, and morally over
                10–12 years of caring academic guidance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-slate-200/80">
                  <p className="font-display font-bold text-[#0F172A]">SM Education Society (1965)</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Founded to make quality education accessible and nurture confident, responsible
                    citizens.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-slate-200/80">
                  <p className="font-display font-bold text-[#0F172A]">SM English School (1985)</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Dedicated Hoodi campus combining international early-learning practices with
                    structured study.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 font-bold text-[#0284C7] hover:text-[#0369A1] group"
                >
                  Read Our Complete Story &amp; Vision
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. WHY CHOOSE SM SCHOOL                                             */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-24 bg-[#FAF6ED] bg-dot-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Why Choose SM School"
            title="Built on Trust, Experience & Personal Care"
            description="Over five decades of educational leadership, expert collaborations, and attentive mentoring for every student."
            accent="coral"
          />

          <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-7">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <StaggerItem key={item.title}>
                <article className="group h-full rounded-[2rem] bg-white border border-slate-200/70 overflow-hidden shadow-editorial hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span
                      className={`absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm ${ACCENT_BG[item.accent]}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="font-display text-2xl font-bold text-[#0F172A]">{item.title}</h3>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed flex-1">
                      {item.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. EDUCATIONAL PHILOSOPHY & ACADEMIC APPROACH                       */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sticky Left Column */}
            <Reveal className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-xs font-bold uppercase tracking-wider">
                Educational Philosophy
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
                The Best of Both Worlds: Montessori &amp; Traditional Learning
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Our Early Learning Center and primary school incorporate the finest international
                principles and practices — blending hands-on Montessori discovery with structured
                academic discipline.
              </p>

              <div className="rounded-3xl overflow-hidden shadow-editorial aspect-[16/10]">
                <img
                  src="/assets/classrooms/classroom-globe-discovery.jpg"
                  alt="Students discovering world geography with a classroom globe"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 rounded-3xl bg-[#FFFDF7] border border-slate-200/80 space-y-3">
                <h3 className="font-display text-lg font-bold text-[#0F172A]">
                  What Makes Our Approach Distinctive
                </h3>
                <ul className="space-y-2.5">
                  {MONTESSORI_BLEND_POINTS.slice(0, 5).map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/academics"
                  className="inline-flex items-center gap-2 pt-2 text-sm font-bold text-[#0284C7] hover:text-[#0369A1]"
                >
                  Explore Full Academics Curriculum
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            {/* Right Principles Grid */}
            <StaggerContainer className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {INTERNATIONAL_PRINCIPLES.map((principle, idx) => (
                <StaggerItem key={principle.title}>
                  <div className="h-full p-6 rounded-3xl bg-[#FFFDF7] border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm ${ACCENT_BG[principle.color]}`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <Compass className="w-4 h-4 text-slate-300" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0F172A]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. SCHOOL FACILITIES                                                */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#E0F2FE]/45 via-[#FFFDF7] to-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              align="left"
              eyebrow="Campus & Care"
              title="School Facilities We Offer"
              description="Safe, nurturing, and well-equipped learning environments designed to support every child’s academic and personal growth."
              accent="sky"
            />
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-sm font-bold text-[#0F172A] hover:border-[#0284C7] hover:text-[#0284C7] shadow-sm transition-all shrink-0 self-start md:self-auto"
            >
              View All Facilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <StaggerContainer className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {FACILITIES_LIST.map((fac) => {
              const Icon = FACILITY_ICONS[fac.icon] ?? BookOpen;
              return (
                <StaggerItem key={fac.id}>
                  <Link
                    to="/facilities"
                    className="group block h-full rounded-[2rem] bg-white border border-slate-200/80 overflow-hidden shadow-editorial hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={fac.image}
                        alt={fac.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div
                        className={`absolute bottom-3 left-3 w-11 h-11 rounded-2xl flex items-center justify-center shadow-md border border-white/80 ${ACCENT_BG[fac.color]}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                        {fac.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{fac.shortDesc}</p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. A DAY IN THE LIFE OF A STUDENT                                   */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-28 bg-[#0F172A] text-white relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full bg-sky-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 w-[26rem] h-[26rem] rounded-full bg-amber-400/10 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-amber-300 border border-white/15 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5" />
              Student Rhythm
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white">
              A Day in the Life of a Student
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              A day at SMES begins and ends with a moment of reflection and gratitude — unfolding
              through enriching lessons, joyful sports, friendships, and personal discovery.
            </p>
          </Reveal>

          <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAY_IN_LIFE_STEPS.map((step, idx) => (
              <StaggerItem key={step.title}>
                <div className="h-full rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0F172A]/80 backdrop-blur-sm text-amber-300 text-xs font-bold">
                      0{idx + 1} • {step.time}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. CREATIVE CLASSES                                                 */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-28 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Creative Classes"
            title="Inspiring Curiosity Through Structured & Creative Learning"
            description="Specialized academic programs that erase fear, ignite analytical thinking, and make every subject engaging."
            accent="lavender"
          />

          <div className="mt-14 space-y-8">
            {CREATIVE_CLASSES.map((cls, idx) => (
              <Reveal key={cls.id}>
                <div className="rounded-[2.25rem] bg-white border border-slate-200/80 shadow-editorial overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div
                    className={`lg:col-span-5 aspect-[16/11] lg:aspect-auto lg:h-full overflow-hidden ${
                      idx % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <img
                      src={cls.image}
                      alt={cls.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className={`lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span
                      className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold ${ACCENT_BG[cls.color]}`}
                    >
                      {cls.tag}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      {cls.title}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed">{cls.summary}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{cls.detail}</p>
                    <div className="pt-2">
                      <Link
                        to="/activities"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#0284C7] hover:text-[#0369A1]"
                      >
                        Discover More Programs
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 8. LATEST ACTIVITIES & EVENTS                                       */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-24 bg-[#FAF6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              align="left"
              eyebrow="Co-Curricular Life"
              title="Activities, Sports & School Celebrations"
              description="From Karate, Yoga, and Gardening to Coding, Inter-House Quizzes, and joyful cultural festivals."
              accent="fresh"
            />
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] text-white text-sm font-bold hover:bg-[#0284C7] transition-colors shrink-0 self-start md:self-auto"
            >
              Explore All Activities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <StaggerContainer className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACTIVITIES_PROGRAMS.slice(0, 4).map((act) => (
              <StaggerItem key={act.id}>
                <Link
                  to="/activities"
                  className="group block h-full rounded-3xl bg-white border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={act.image}
                      alt={act.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                      {act.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                      {act.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 9. FEATURED PHOTO GALLERY (DYNAMIC FROM DATABASE)                   */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              align="left"
              eyebrow="Event Gallery"
              title="Moments Across Our Campus"
              description="Real photographs of SM English School students learning, creating, playing, and celebrating together."
              accent="sunshine"
            />
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0284C7] text-white text-sm font-bold shadow-md hover:bg-[#0369A1] transition-colors shrink-0 self-start md:self-auto"
            >
              Open Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {featuredImages.map((img, idx) => (
              <motion.button
                key={img.id}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.06 }}
                onClick={() => setLightboxIdx(idx)}
                className={`group relative rounded-3xl overflow-hidden bg-slate-100 text-left shadow-sm hover:shadow-xl transition-all focus-visible:ring-4 focus-visible:ring-sky-400 ${
                  idx === 0 || idx === 5 ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      {img.category?.name && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          {img.category.name}
                        </span>
                      )}
                      <p className="font-display text-sm sm:text-base font-bold text-white leading-snug">
                        {img.title}
                      </p>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shrink-0">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 10. PARENT ENQUIRY SECTION                                          */}
      {/* =================================================================== */}
      <section className="py-20 lg:py-28 bg-warm-mesh border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-[2.5rem] bg-white border border-slate-200/80 shadow-editorial overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Info Card */}
            <div className="lg:col-span-5 bg-[#0F172A] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-sky-500/20 blur-3xl"
              />
              <div className="relative space-y-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  Admissions &amp; Enquiries
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                  Contact Us For Further Information
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  We welcome parents to visit our Hoodi campus, meet our educators, and learn how SM
                  English School nurtures every child’s potential.
                </p>
              </div>

              <div className="relative space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-rose-300" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Location Address</p>
                    <p className="text-slate-300 mt-0.5">
                      {SCHOOL_INFO.addressLine1}
                      <br />
                      {SCHOOL_INFO.addressLine2}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-sky-300" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Class Sessions &amp; Office Hours</p>
                    <p className="text-slate-300 mt-0.5">
                      {SCHOOL_INFO.officeDays} • {SCHOOL_INFO.officeHours}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={SCHOOL_INFO.phoneHref}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 font-bold transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {SCHOOL_INFO.phoneDisplay}
                  </a>
                  <a
                    href={SCHOOL_INFO.emailHref}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-200 font-bold transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {SCHOOL_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
              <h3 className="font-display text-2xl font-bold text-[#0F172A] mb-2">
                Send an Enquiry to Our School Office
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Choose General Contact or Admission Enquiry and our team will respond promptly.
              </p>
              <EnquiryForm defaultType="admission" compact />
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        images={featuredImages}
        currentIndex={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={setLightboxIdx}
      />
    </>
  );
}
