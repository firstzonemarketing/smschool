import { Link } from 'react-router-dom';
import { Award, Compass, Heart, Sparkles, CheckCircle2, ArrowRight, Users } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal, SectionHeader, StaggerContainer, StaggerItem } from '../components/MotionPrimitives';
import { MONTESSORI_BLEND_POINTS, SCHOOL_INFO } from '../data/schoolData';

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us"
        description="Learn about SM English School and the SM Education Society (established in 1965 by late Dr. Nazir Ahmed) in Hoodi, Bangalore — our vision, mission, faculty, and holistic approach."
        image="/assets/events/event-campus-assembly-blazers.jpg"
      />

      {/* Editorial Hero Banner */}
      <section className="relative bg-warm-mesh pt-14 pb-20 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-bold uppercase tracking-wider">
                About SM English School
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#0F172A] leading-tight">
                Shaping Competent, Confident &amp; Responsible Citizens Since 1965
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Founded under the pioneering umbrella of <strong>{SCHOOL_INFO.societyName}</strong>,
                SM English School brings together five decades of educational dedication,
                Montessori warmth, and structured academic excellence in Hoodi, Bangalore.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-[2.25rem] overflow-hidden shadow-editorial border-4 border-white aspect-[4/3]">
                <img
                  src="/assets/events/event-campus-assembly-blazers.jpg"
                  alt="Students of SM English School assembled on campus"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Birth of SM Education Society & Verified Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-bold uppercase tracking-wider">
                Our Origin Story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A]">
                Birth of SM Education Society
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                <strong>SM Education Society, established in 1965</strong>, aims to develop young
                minds into competent, nurturing, confident, and responsible adults equipped with the
                right skills and values to succeed in all walks of life.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                <strong>SM English School came into existence in 1985</strong> as an unaided,
                private minority organization following a skillfully packed CBSE theme under the
                State Board curriculum. It aims to provide excellent, effective, and affordable
                quality education with a holistic approach.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Its main focus is the overall development of the child — gifting society a young,
                talented, and purposeful future after rigorous academic training of 10–12 years,
                empowered both physically and mentally to meet the challenges of the world and
                emerge as true winners.
              </p>
            </Reveal>

            <StaggerContainer className="lg:col-span-6 space-y-5">
              {[
                {
                  year: '1965',
                  title: 'SM Education Society Founded',
                  body: 'Established by late Dr. Nazir Ahmed — a socialist and educator committed to making quality education accessible — imprinting the enduring vision “Knowledge is Power” in every young mind and heart.',
                  color: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
                },
                {
                  year: '1985',
                  title: 'SM English School Established',
                  body: 'Launched as an unaided private minority school combining a CBSE-aligned academic framework under the State Board curriculum with strong character formation.',
                  color: 'bg-[#FFF1EE] text-[#C2410C] border-[#FED7AA]',
                },
                {
                  year: 'Today',
                  title: 'Holistic Learning in Hoodi, Bangalore',
                  body: 'Blending Montessori play-based early learning, audio-visual classrooms, laboratories, yoga, karate, sports, and community values across every grade.',
                  color: 'bg-[#D1FAE5] text-[#047857] border-[#A7F3D0]',
                },
              ].map((milestone) => (
                <StaggerItem key={milestone.year}>
                  <div className="flex gap-5 p-6 rounded-3xl bg-[#FFFDF7] border border-slate-200/80 shadow-sm">
                    <div
                      className={`w-20 h-20 rounded-2xl border flex items-center justify-center font-display text-xl font-bold shrink-0 ${milestone.color}`}
                    >
                      {milestone.year}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#0F172A]">
                        {milestone.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                        {milestone.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#FAF6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Vision & Mission"
            title="Guided by “Knowledge is Power”"
            description="Since 1965, SM Education Society has spread its branches across Bangalore with an unwavering commitment to academic excellence and character."
            accent="lavender"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="h-full rounded-[2rem] bg-white p-8 sm:p-10 border border-slate-200/80 shadow-editorial space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  Understanding the depth of knowledge, <strong>late Dr. Nazir Ahmed</strong>{' '}
                  imprinted the vision <strong>“Knowledge is Power”</strong> in each young mind and
                  heart. SM Education Trust aspires to carry a reputation for consistently producing
                  citizens whose surge for excellence helps them achieve their goals and go beyond.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-[2rem] bg-white p-8 sm:p-10 border border-slate-200/80 shadow-editorial space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-[#FFF1EE] text-[#F97316] flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our mission is to provide school education that ensures academic excellence,
                  empowers students, and arms them with the faculties, values, and confidence that
                  will help them conquer their dreams while serving society with integrity.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Child-Centred Montessori + Traditional Blend */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden shadow-editorial aspect-[4/5]">
                <img
                  src="/assets/classrooms/classroom-montessori-pink-tower.jpg"
                  alt="Child working with Montessori Pink Tower"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden shadow-editorial aspect-square">
                  <img
                    src="/assets/activities/activity-school-garden.jpg"
                    alt="Students watering saplings in the SMES school garden"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl bg-[#D1FAE5] p-5 border border-[#A7F3D0]">
                  <p className="font-display text-base font-bold text-[#047857]">
                    Holistic Growth
                  </p>
                  <p className="text-xs text-emerald-900/80 mt-1">
                    Cognitive, social, emotional, physical, and cultural nurture.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1FAE5] text-[#047857] text-xs font-bold uppercase tracking-wider">
                Child-Centred Learning
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A]">
                Combining Montessori &amp; Traditional Learning
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                We follow a thoughtful blend of the Montessori and traditional methods to give
                students <strong>“the best of both worlds”</strong> — balancing tactile, play-based
                exploration with steady academic foundations.
              </p>
              <ul className="space-y-3 pt-2">
                {MONTESSORI_BLEND_POINTS.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Faculty & Character */}
      <section className="py-20 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                Dedicated Faculty
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Experienced Educators Who Nurture Honesty &amp; Courage
              </h2>
              <p className="text-slate-300 leading-relaxed">
                SM English School is supported by well-qualified and experienced teachers trained to
                guide children in a professional and nurturing manner. A favourable teacher-student
                ratio helps our faculty focus on each child’s unique pace and development.
              </p>
              <p className="text-slate-300 leading-relaxed">
                At SMES, each student has the right to education. With a clear understanding of
                rules and responsibilities, learners grow into fearless, compassionate, and
                responsible citizens — rooted in our belief that when self-esteem is nurtured early,
                honesty and courage become part of a child’s character.
              </p>
              <div className="flex flex-wrap gap-4 pt-3">
                <Link
                  to="/academics"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#38BDF8] text-[#0F172A] font-bold text-sm hover:bg-sky-300 transition-colors"
                >
                  Explore Academics
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact?tab=admission"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
                >
                  Meet Us at Campus
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-5">
              <div className="rounded-[2rem] overflow-hidden border-4 border-white/15 shadow-2xl aspect-[4/3]">
                <img
                  src="/assets/classrooms/classroom-botany-lesson.jpg"
                  alt="Teacher explaining plant science with real specimens at SM English School"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Heart className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Warmth &amp; Individual Care</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-300 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Character &amp; Citizenship</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
