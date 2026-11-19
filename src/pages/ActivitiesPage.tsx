import { Link } from 'react-router-dom';
import {
  Calculator,
  Lightbulb,
  BookOpenCheck,
  Trophy,
  Palette,
  Sparkles,
  PartyPopper,
  ArrowRight,
  Compass,
  Code2,
  Newspaper,
  Sprout,
  Music,
  Shield,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal, SectionHeader, StaggerContainer, StaggerItem } from '../components/MotionPrimitives';

const FEATURED_SECTIONS = [
  {
    id: 'mathematical-magic',
    eyebrow: 'Numeracy & Logic',
    title: 'Mathematical Magic & Abacus',
    description:
      'Through our “Mathematical Magic” program, we strive to erase all fears of mathematics from the minds of young learners. By visualizing math through Vedic Maths, Abacus, and Mental Arithmetic, students build rapid calculation ability alongside stronger concentration, memory, and visualization.',
    highlights: ['Vedic Maths', 'Abacus Mental Arithmetic', 'Hands-On Montessori Numeracy'],
    image: '/assets/classrooms/classroom-abacus-math.jpg',
    secondaryImage: '/assets/classrooms/classroom-montessori-pegs.jpg',
    theme: 'bg-[#FFF1EE] border-[#FED7AA]',
    badge: 'bg-[#F97316] text-white',
    icon: Calculator,
  },
  {
    id: 'innovative-learning',
    eyebrow: 'Future-Ready Exploration',
    title: 'Innovative Learning & Creative Study',
    description:
      'We embrace Innovative Learning with creative teaching methods, age-appropriate technology, and hands-on STEM experiments. Programs like Memory Boosters, Think Wide, Personality Development, and Coding inspire students to build websites, solve problems, and think outside the box.',
    highlights: ['STEM & Model Building', 'Web Development & Coding', 'Memory Boosters & Think Wide'],
    image: '/assets/activities/activity-robotics-model.jpg',
    secondaryImage: '/assets/facilities/facility-science-lab.jpg',
    theme: 'bg-[#E0F2FE] border-[#BAE6FD]',
    badge: 'bg-[#0284C7] text-white',
    icon: Lightbulb,
  },
  {
    id: 'methodical-study',
    eyebrow: 'Structured Discipline',
    title: 'Methodical Study & General Awareness',
    description:
      'Structured academic discipline is enhanced with projector-equipped audio-visual rooms, our well-stocked library, and Newspaper-in-Education (NIE) — a leading-publication initiative paired with fortnightly interactions with experts from diverse fields.',
    highlights: ['Audio-Visual Projectors', 'Newspaper-in-Education (NIE)', 'Fortnightly Expert Sessions'],
    image: '/assets/facilities/facility-av-smartroom.jpg',
    secondaryImage: '/assets/facilities/facility-library.jpg',
    theme: 'bg-[#EDE9FE] border-[#DDD6FE]',
    badge: 'bg-[#8B5CF6] text-white',
    icon: BookOpenCheck,
  },
  {
    id: 'sports',
    eyebrow: 'Fitness, Courage & Teamwork',
    title: 'Sports, Yoga & Karate',
    description:
      'Whether spiking a volleyball, playing throwball, sprinting on our track, practicing yoga asanas (Classes 4 to 10, winning accolades during Dasara and Karnataka Rajyotsava), or training in Karate self-defense under dedicated instructors, students develop strength, perseverance, and sportsmanship.',
    highlights: ['Volleyball, Throwball & Athletics', 'Guided Yoga Wellness', 'Karate & Self-Defense'],
    image: '/assets/activities/activity-volleyball.jpg',
    secondaryImage: '/assets/activities/activity-karate-demonstration.jpg',
    theme: 'bg-[#D1FAE5] border-[#A7F3D0]',
    badge: 'bg-[#10B981] text-white',
    icon: Trophy,
  },
  {
    id: 'creative-learning',
    eyebrow: 'Imagination & Voice',
    title: 'Creative Learning: Art, Craft & Singing',
    description:
      'Music relieves stress and brings joy to school life, while painting, drawing, clay sculpting, and puppetry spark imagination and refine fine motor skills. Every colourful project builds confidence and joyful self-expression.',
    highlights: ['Painting & Clay Craft', 'Singing & Vocal Music', 'Puppetry & Action Rhymes'],
    image: '/assets/activities/activity-clay-craft.jpg',
    secondaryImage: '/assets/activities/activity-rhymes-dance.jpg',
    theme: 'bg-[#FEF3C7] border-[#FDE68A]',
    badge: 'bg-[#D97706] text-white',
    icon: Palette,
  },
  {
    id: 'classroom-activities',
    eyebrow: 'Experiential Discovery',
    title: 'Classroom Activities, Gardening & Field Trips',
    description:
      'From collaborative science charts and botanical specimens to gardening in our very own school garden and educational field trips, students learn by doing — nurturing environmental responsibility, curiosity, and real-world social skills.',
    highlights: ['School Vegetable Garden', 'Educational Field Trips', 'Collaborative Science Projects'],
    image: '/assets/activities/activity-school-garden.jpg',
    secondaryImage: '/assets/classrooms/classroom-poster-teamwork.jpg',
    theme: 'bg-[#ECFDF5] border-[#A7F3D0]',
    badge: 'bg-[#059669] text-white',
    icon: Sparkles,
  },
  {
    id: 'celebrations',
    eyebrow: 'Unity in Diversity',
    title: 'Cultural Activities & School Celebrations',
    description:
      'Every festival and national occasion is celebrated with heart at SMES — from Dussehra and World Environment Day to traditional dances, school band marches, and lively Saturday four-house co-curricular competitions.',
    highlights: ['Festival Celebrations', 'Saturday Four-House Competitions', 'Cultural Exhibitions & Dance'],
    image: '/assets/events/event-dussehra-celebration.jpg',
    secondaryImage: '/assets/events/event-national-day-band.jpg',
    theme: 'bg-[#FCE7F3] border-[#FBCFE8]',
    badge: 'bg-[#DB2777] text-white',
    icon: PartyPopper,
  },
];

const EXTRA_BADGES = [
  { label: 'Karate Self-Defense', icon: Shield },
  { label: 'Coding & Web Dev', icon: Code2 },
  { label: 'Newspaper-in-Education', icon: Newspaper },
  { label: 'School Gardening', icon: Sprout },
  { label: 'Singing & Music', icon: Music },
  { label: 'Curated Field Trips', icon: Compass },
];

export function ActivitiesPage() {
  return (
    <>
      <SEOHead
        title="Activities & Programs"
        description="Discover SM English School's holistic programs: Mathematical Magic, Abacus, Coding, Yoga, Karate, Sports, Art & Craft, Singing, Gardening, Field Trips, and School Celebrations."
        image="/assets/activities/activity-volleyball.jpg"
      />

      {/* Hero */}
      <section className="bg-warm-mesh pt-14 pb-18 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeader
            eyebrow="Activities & Co-Curriculars"
            title="Where Talents Blossom Beyond the Classroom"
            description="SMES combines practical experiences, sports, arts, mental arithmetic, coding, nature, and cultural celebrations inside a warm, child-friendly campus."
            accent="coral"
          />

          <StaggerContainer className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {EXTRA_BADGES.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.label}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs sm:text-sm font-bold text-[#0F172A]">
                    <Icon className="w-4 h-4 text-[#0284C7]" />
                    {item.label}
                  </span>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Distinct Visual Identity Sections */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {FEATURED_SECTIONS.map((sec, idx) => {
            const Icon = sec.icon;
            const reversed = idx % 2 === 1;
            return (
              <Reveal key={sec.id}>
                <article
                  id={sec.id}
                  className={`rounded-[2.5rem] border p-6 sm:p-10 lg:p-12 ${sec.theme}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Photo Pair */}
                    <div
                      className={`lg:col-span-6 grid grid-cols-12 gap-4 items-center ${
                        reversed ? 'lg:order-2' : ''
                      }`}
                    >
                      <div className="col-span-8 rounded-3xl overflow-hidden shadow-editorial border-4 border-white aspect-[4/3]">
                        <img
                          src={sec.image}
                          alt={sec.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="col-span-4 rounded-2xl overflow-hidden shadow-md border-4 border-white aspect-[3/4]">
                        <img
                          src={sec.secondaryImage}
                          alt={`${sec.title} highlight`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    {/* Copy */}
                    <div
                      className={`lg:col-span-6 space-y-4 ${reversed ? 'lg:order-1' : ''}`}
                    >
                      <div className="inline-flex items-center gap-2.5">
                        <span
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${sec.badge}`}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                          {sec.eyebrow}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A]">
                        {sec.title}
                      </h2>

                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {sec.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {sec.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 text-xs font-bold text-[#0F172A] shadow-xs"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* CTA to Gallery */}
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 text-center">
          <div className="rounded-[2.25rem] bg-[#0F172A] text-white p-8 sm:p-12 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              See Our Students in Action
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Browse authentic photographs from sports matches, cultural celebrations, yoga
              sessions, classrooms, and hands-on learning across our campus.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#38BDF8] hover:bg-sky-300 text-[#0F172A] font-bold text-sm transition-colors"
              >
                Open Photo Gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?tab=admission"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-colors"
              >
                Admission Enquiry
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
