import { assetUrl } from '../lib/assetUrl';
import { Link } from 'react-router-dom';
import {
  Bus,
  ShieldCheck,
  HeartHandshake,
  Users,
  MonitorPlay,
  BookOpen,
  ArrowRight,
  Microscope,
  Trees,
  Trophy,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal, SectionHeader, StaggerContainer, StaggerItem } from '../components/MotionPrimitives';
import { FACILITIES_LIST } from '../data/schoolData';

const ICON_MAP: Record<string, typeof Bus> = {
  Bus,
  ShieldCheck,
  HeartHandshake,
  Users,
  MonitorPlay,
  BookOpen,
};

const COLOR_STYLES: Record<string, { badge: string; ring: string }> = {
  sunshine: { badge: 'bg-[#FEF3C7] text-[#B45309]', ring: 'border-[#FDE68A]' },
  sky: { badge: 'bg-[#E0F2FE] text-[#0369A1]', ring: 'border-[#BAE6FD]' },
  fresh: { badge: 'bg-[#D1FAE5] text-[#047857]', ring: 'border-[#A7F3D0]' },
  coral: { badge: 'bg-[#FFF1EE] text-[#C2410C]', ring: 'border-[#FED7AA]' },
  lavender: { badge: 'bg-[#EDE9FE] text-[#6D28D9]', ring: 'border-[#DDD6FE]' },
};

const CAMPUS_EXTRAS = [
  {
    title: 'Science & Chemistry Laboratories',
    description:
      'Hands-on microscope investigations and guided practical chemistry experiments strengthen conceptual science learning.',
    image: assetUrl('/assets/facilities/facility-science-lab.jpg'),
    icon: Microscope,
  },
  {
    title: 'School Garden & Nature Space',
    description:
      'Students connect with nature by tending crops and saplings right inside our very own school garden.',
    image: assetUrl('/assets/activities/activity-school-garden.jpg'),
    icon: Trees,
  },
  {
    title: 'Outdoor Sports Playground',
    description:
      'Dedicated campus ground for volleyball, throwball, athletics, karate demonstrations, and morning assembly.',
    image: assetUrl('/assets/activities/activity-volleyball.jpg'),
    icon: Trophy,
  },
];

export function FacilitiesPage() {
  return (
    <>
      <SEOHead
        title="Campus Facilities"
        description="Explore SM English School's campus facilities in Hoodi, Bangalore: Transportation, CCTV Surveillance, Yoga, Parents Meet, Audio-Visual Classrooms, Library, and Laboratories."
        image={assetUrl('/assets/facilities/facility-library.jpg')}
      />

      {/* Banner */}
      <section className="bg-warm-mesh pt-14 pb-18 lg:pt-20 lg:pb-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <SectionHeader
            eyebrow="Campus & Infrastructure"
            title="Thoughtful Facilities Built Around Every Child"
            description="From CCTV-monitored corridors and transportation to yoga wellness, Montessori rooms, audio-visual projectors, library, and science labs."
            accent="sky"
          />
        </div>
      </section>

      {/* Main 6 Facility Visual Cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES_LIST.map((fac) => {
              const Icon = ICON_MAP[fac.icon] ?? BookOpen;
              const style = COLOR_STYLES[fac.color] ?? COLOR_STYLES.sky;
              return (
                <StaggerItem key={fac.id}>
                  <article
                    className={`group h-full rounded-[2rem] bg-[#FFFDF7] border ${style.ring} overflow-hidden shadow-editorial hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col`}
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
                        className={`absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md border border-white ${style.badge}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="p-7 flex-1 flex flex-col">
                      <h2 className="font-display text-2xl font-bold text-[#0F172A]">
                        {fac.title}
                      </h2>
                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed flex-1">
                        {fac.fullDesc}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Additional Real Learning Spaces */}
      <section className="py-20 bg-[#FAF6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Hands-On Spaces"
            title="Labs, Garden & Sports Ground"
            description="Authentic learning environments where students observe, experiment, plant, and play."
            accent="fresh"
          />

          <StaggerContainer className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-7">
            {CAMPUS_EXTRAS.map((extra) => {
              const Icon = extra.icon;
              return (
                <StaggerItem key={extra.title}>
                  <div className="h-full rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-card-hover transition-all flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={extra.image}
                        alt={extra.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] text-[#047857] flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#0F172A]">
                        {extra.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {extra.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <Reveal className="mt-14 text-center">
            <Link
              to="/contact?tab=admission"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-500/25 transition-all"
            >
              Visit Our Hoodi Campus
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
