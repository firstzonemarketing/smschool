import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Globe,
  Lightbulb,
  Mic,
  MonitorPlay,
  Sparkles,
  ArrowRight,
  Users,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal, SectionHeader, StaggerContainer, StaggerItem } from '../components/MotionPrimitives';
import { INTERNATIONAL_PRINCIPLES, SCHOOL_INFO } from '../data/schoolData';

const EARLY_LEARNING_POINTS = [
  'Fun and exciting programs planned each day for your child.',
  'Weekly lesson plans so parents can stay informed and follow classroom progress.',
  'Baby Magical Maths, Advanced Reading Programme, Painting, Music, and joyful hands-on activities.',
  'Individual learning plans designed around areas that need encouragement and development.',
  'Careful staff-to-child ratio ensuring warm individual attention for every learner.',
  'Learning and play equipment conforming to international early-childhood standards.',
];

const METHODICAL_HIGHLIGHTS = [
  {
    title: 'Audio-Visual Smart Classrooms',
    description:
      'Projector-equipped audio-visual rooms give students an engaging break from chalk-and-blackboard lessons and bring concepts alive visually.',
    image: '/assets/facilities/facility-av-smartroom.jpg',
  },
  {
    title: 'Digitally Designed Mathematics Lab',
    description:
      'Supporting Mathematical Magic, Abacus, and conceptual problem-solving through interactive mathematical learning tools.',
    image: '/assets/classrooms/classroom-montessori-counting.jpg',
  },
  {
    title: 'Well-Equipped School Library',
    description:
      'Encouraging students to cultivate a love for reading and discover knowledge far beyond their prescribed syllabus.',
    image: '/assets/facilities/facility-library.jpg',
  },
  {
    title: 'Saturday Four-House Competitions & Festivals',
    description:
      'Students grouped into four houses compete joyfully in co-curricular quizzes and events on Saturdays, while celebrating every festival together.',
    image: '/assets/events/event-house-quiz-wide.jpg',
  },
];

const PILL_COLORS: Record<string, string> = {
  sky: 'bg-[#E0F2FE] text-[#0369A1]',
  coral: 'bg-[#FFF1EE] text-[#C2410C]',
  fresh: 'bg-[#D1FAE5] text-[#047857]',
  lavender: 'bg-[#EDE9FE] text-[#6D28D9]',
  sunshine: 'bg-[#FEF3C7] text-[#B45309]',
};

export function AcademicsPage() {
  return (
    <>
      <SEOHead
        title="Academics & Learning"
        description="Explore SM English School's Early Learning Center, Montessori and traditional curriculum, Innovative Learning, Spoken English, and Methodical Study in Hoodi, Bangalore."
        image="/assets/classrooms/classroom-montessori-reading.jpg"
      />

      {/* Header Banner */}
      <section className="bg-warm-mesh pt-14 pb-20 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-xs font-bold uppercase tracking-wider">
                Academics &amp; Learning
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#0F172A] leading-tight">
                Right Mix of Academics, Creativity &amp; Character Building
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                The 21st century moves rapidly. SMES prepares students through a balanced curriculum
                pairing strong academics with hands-on exploration, communication skills, and
                community-based values like citizenship, compassion, and empathy.
              </p>
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-sm font-semibold text-slate-700">
                <Clock className="w-4 h-4 text-[#0284C7]" />
                Regular Academic Schedule: {SCHOOL_INFO.classSchedule}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden shadow-editorial aspect-[4/5] border-4 border-white">
                <img
                  src="/assets/classrooms/classroom-montessori-reading.jpg"
                  alt="Montessori reading session"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-3xl overflow-hidden shadow-editorial aspect-square border-4 border-white">
                  <img
                    src="/assets/facilities/facility-science-lab.jpg"
                    alt="Science laboratory microscopy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-editorial aspect-[4/3] border-4 border-white">
                  <img
                    src="/assets/classrooms/classroom-chalkboard-phonics.jpg"
                    alt="Interactive language learning at chalkboard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Early Learning Center (Montessori + International Principles) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-6">
              <div className="rounded-[2.25rem] overflow-hidden shadow-editorial aspect-[16/11]">
                <img
                  src="/assets/classrooms/classroom-montessori-pegs.jpg"
                  alt="Early Learning Center Montessori apparatus"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF1EE] text-[#C2410C] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Early Learning Center
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A]">
                A Gentle Bridge From Home to School
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Our pre-school incorporates international early-childhood principles and practices
                within a warm, harmonious environment — helping little ones transition joyfully from
                the security of home into their school years.
              </p>
              <ul className="space-y-3">
                {EARLY_LEARNING_POINTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 Pillars of Holistic Learning */}
      <section className="py-20 bg-[#FAF6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Ten Core Pillars"
            title="International Principles in Everyday Practice"
            description="Every classroom experience at SM English School is guided by child-centred learning, inclusivity, language fluency, and strong parent partnership."
            accent="sky"
          />

          <StaggerContainer className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERNATIONAL_PRINCIPLES.map((item, idx) => (
              <StaggerItem key={item.title}>
                <div className="h-full p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all">
                  <span
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-display font-bold text-sm mb-4 ${PILL_COLORS[item.color]}`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Innovative Learning: Creative Study + Communication Skills */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Innovative Learning"
            title="Going Beyond Textbooks on an Affordable Platform"
            description="Alongside our structured daily schedule (9:00 AM – 3:15 PM, 7 periods of 45 minutes), students participate in dedicated enrichment modules."
            accent="coral"
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="h-full rounded-[2rem] bg-[#FFFDF7] border border-slate-200/80 overflow-hidden shadow-editorial flex flex-col">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/classrooms/classroom-poster-teamwork.jpg"
                    alt="Creative study teamwork at SM English School"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 space-y-3 flex-1">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2410C]">
                    <Lightbulb className="w-4 h-4" />
                    Creative Study
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                    Memory Boosters, Think Wide &amp; Personality Development
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Well-chosen creative study programs enhance each student’s productivity and
                    bring out their best — sharpening mental skills, building self-confidence, and
                    cultivating a resilient, positive attitude toward life.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-[2rem] bg-[#FFFDF7] border border-slate-200/80 overflow-hidden shadow-editorial flex flex-col">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/students/student-mic-speaking.jpg"
                    alt="Student practicing spoken English on microphone"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 space-y-3 flex-1">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0369A1]">
                    <Mic className="w-4 h-4" />
                    Communication Skills
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                    Spoken English Classes by Qualified Guest Faculty
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Strong communication opens doors to confidence. SMES conducts dedicated Spoken
                    English classes for all students, led by specially appointed, qualified, and
                    experienced guest faculty.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Methodical Study */}
      <section className="py-20 bg-gradient-to-b from-[#E0F2FE]/35 to-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Methodical Study"
            title="Structured Learning Supported by Modern Tools"
            description="Combining disciplined classroom instruction with audio-visual projection, labs, reading, sports, and house spirit."
            accent="fresh"
          />

          <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-7">
            {METHODICAL_HIGHLIGHTS.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-[2rem] bg-white border border-slate-200/80 overflow-hidden shadow-editorial flex flex-col sm:flex-row">
                  <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col justify-center">
                    <h3 className="font-display text-xl font-bold text-[#0F172A]">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom CTA */}
          <Reveal className="mt-14 rounded-[2.25rem] bg-[#0F172A] text-white p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                <MonitorPlay className="w-4 h-4" />
                <BookOpen className="w-4 h-4" />
                <Users className="w-4 h-4" />
                <span>Parent Partnership</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                Want to learn more about our curriculum and classrooms?
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Schedule a visit to our Hoodi campus or send an admission enquiry to speak with our
                school office.
              </p>
            </div>
            <Link
              to="/contact?tab=admission"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all shrink-0"
            >
              Enquire About Admissions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
