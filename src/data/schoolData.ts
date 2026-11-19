export const SCHOOL_INFO = {
  name: 'SM English School',
  shortName: 'SMES',
  societyName: 'SM Education Society',
  trustName: 'SM Education Trust',
  founder: 'Late Dr. Nazir Ahmed',
  motto: 'Knowledge is Power',
  societyEstablished: 1965,
  schoolEstablished: 1985,
  addressLine1: 'Devi Anugraha, Basi Reddy Garden, Hoodi,',
  addressLine2: 'Bangalore - 560 048',
  fullAddress: 'Devi Anugraha, Basi Reddy Garden, Hoodi, Bangalore - 560 048',
  phoneDisplay: '+91 7676995557',
  phoneHref: 'tel:+917676995557',
  email: 'info@smschool.co.in',
  emailHref: 'mailto:info@smschool.co.in',
  officeDays: 'Monday – Saturday',
  officeHours: '8:00 AM to 4:00 PM',
  classSchedule: '9:00 AM to 3:15 PM (7 periods of 45 minutes each)',
  mapEmbedUrl:
    'https://www.google.com/maps?q=SM+English+School+Devi+Anugraha+Basi+Reddy+Garden+Hoodi+Bangalore+560048&output=embed',
  mapDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=SM+English+School+Devi+Anugraha+Basi+Reddy+Garden+Hoodi+Bangalore+560048',
  logo: '/assets/logo/sm-school-logo.png',
};

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Years of Experience',
    badge: 'Since 1965',
    description:
      'Established in 1965, the SM Education Society has been a pioneer in the field of education for over five decades.',
    accent: 'sky',
    image: '/assets/events/event-campus-assembly-blazers.jpg',
  },
  {
    title: 'Collaborations',
    badge: 'Expert Mentorship',
    description:
      'SM School collaborates with various experts across different fields to ensure that students have a creative and enriching learning experience.',
    accent: 'coral',
    image: '/assets/activities/activity-robotics-model.jpg',
  },
  {
    title: 'Individual Attention',
    badge: 'Every Child Matters',
    description:
      'At SM School, we prioritize individual attention, ensuring that each student receives the support and guidance they need to thrive in their learning journey.',
    accent: 'fresh',
    image: '/assets/students/student-teacher-welcome.jpg',
  },
] as const;

export const INTERNATIONAL_PRINCIPLES = [
  {
    title: 'Child-Centered Learning',
    description:
      'Adopting a child-centered approach, focusing on each child’s unique needs, interests, and developmental pace.',
    color: 'sky',
  },
  {
    title: 'Hands-On Activities',
    description:
      'Encouraging learning through play and hands-on activities that promote creativity, critical thinking, and problem-solving skills.',
    color: 'coral',
  },
  {
    title: 'Global Curriculum',
    description:
      'Integrating an internationally recognized curriculum that fosters holistic development, including cognitive, social, emotional, and physical growth.',
    color: 'fresh',
  },
  {
    title: 'Language Development',
    description:
      'Emphasizing language skills through exposure to multiple languages, promoting bilingualism or multilingualism at an early age.',
    color: 'lavender',
  },
  {
    title: 'Cultural Awareness',
    description:
      'Incorporating global perspectives to help children understand and appreciate different cultures, values, and traditions.',
    color: 'sunshine',
  },
  {
    title: 'Inclusive Education',
    description:
      'Promoting inclusivity and diversity, ensuring that all children, regardless of background or ability, receive equal opportunities to succeed.',
    color: 'sky',
  },
  {
    title: 'Interactive Technology',
    description:
      'Integrating age-appropriate technology to enhance learning experiences while fostering digital literacy.',
    color: 'coral',
  },
  {
    title: 'Experienced Educators',
    description:
      'Employing qualified educators who are trained in the best practices to nurture young minds effectively.',
    color: 'fresh',
  },
  {
    title: 'Strong Parent Partnership',
    description:
      'Encouraging active communication and collaboration between parents and teachers to ensure a supportive learning environment at home and school.',
    color: 'lavender',
  },
  {
    title: 'Focus on Social-Emotional Learning',
    description:
      'Fostering emotional intelligence, empathy, and social skills through structured activities and positive reinforcement.',
    color: 'sunshine',
  },
] as const;

export const MONTESSORI_BLEND_POINTS = [
  'Fun and exciting programs planned for each day.',
  'Curriculum designed by experts in the field.',
  'A nurturing environment that provides warmth and harmony, helping the transition from home to school.',
  'A good adult-child ratio following play-based learning.',
  'Field trips to help them explore different environments and engage their minds.',
  'Children are taught to respect one another’s cultures and traditions.',
  'Regular assessments to mark their progress.',
  'Being one with nature by playing with various elements as well as through activities such as gardening in our very own garden.',
];

export const FACILITIES_LIST = [
  {
    id: 'transportation',
    title: 'Transportation',
    shortDesc: 'Reliable school transportation facility is available for students commuting to our Hoodi campus.',
    fullDesc:
      'Transportation facility is available to support safe, punctual, and convenient daily commutes for students traveling between home and our Hoodi campus.',
    image: '/assets/events/event-campus-assembly-blazers.jpg',
    color: 'sunshine',
    icon: 'Bus',
  },
  {
    id: 'cctv',
    title: 'CCTV Surveillance',
    shortDesc: 'Cameras have been installed across campus to monitor school activities and support a safe environment.',
    fullDesc:
      'CCTV cameras have been installed across the school premises to monitor campus activities and maintain a secure, well-supervised environment for every child.',
    image: '/assets/facilities/facility-campus-corridor.jpg',
    color: 'sky',
    icon: 'ShieldCheck',
  },
  {
    id: 'yoga',
    title: 'Yoga & Wellness',
    shortDesc: 'Yoga plays a vital role in the physical and mental growth of a child, guided by trained experts.',
    fullDesc:
      'Yoga plays a vital role in the physical and mental growth of a child. Classes for students in Classes 4 to 10 are handled by trained experts, with students also winning accolades in Dasara and Karnataka Rajyotsava competitions.',
    image: '/assets/activities/activity-yoga-group.jpg',
    color: 'fresh',
    icon: 'HeartHandshake',
  },
  {
    id: 'parents-meet',
    title: 'Parents Meet',
    shortDesc: 'Parents are encouraged to participate in their ward’s development and offer valuable suggestions.',
    fullDesc:
      'We believe strong parent-teacher collaboration builds confident learners. Through regular Parents Meets, parents actively participate in their ward’s development and contribute suggestions towards continuous school improvement.',
    image: '/assets/students/student-teacher-welcome.jpg',
    color: 'coral',
    icon: 'Users',
  },
  {
    id: 'classrooms',
    title: 'Audio-Visual & Montessori Classrooms',
    shortDesc: 'Projector-equipped audiovisual rooms and tactile Montessori spaces that make learning vivid and engaging.',
    fullDesc:
      'Alongside bright, child-friendly classrooms and an international-standard Montessori Early Learning Center, SMES features audio-visual rooms equipped with projectors that bring methodical study beyond traditional chalk-and-blackboard methods.',
    image: '/assets/facilities/facility-av-smartroom.jpg',
    color: 'lavender',
    icon: 'MonitorPlay',
  },
  {
    id: 'learning-resources',
    title: 'Learning Resources & Labs',
    shortDesc: 'Well-equipped library, digitally designed mathematics lab, science lab, playground, and school garden.',
    fullDesc:
      'Students benefit from a well-equipped library that nurtures a love for reading beyond the syllabus, a digitally designed mathematics laboratory, practical science labs with microscopes, a spacious sports ground, and our very own school garden.',
    image: '/assets/facilities/facility-library.jpg',
    color: 'sky',
    icon: 'BookOpen',
  },
] as const;

export const CREATIVE_CLASSES = [
  {
    id: 'mathematical-magic',
    title: 'Mathematical Magic',
    tag: 'Vedic Maths • Abacus • Mental Arithmetic',
    summary:
      'Through our “Mathematical Magic” program, we make math fun and engaging, helping to erase any fears young children may have about the subject. Using interactive activities and real-world applications, we prepare them for the school years ahead with confidence, curiosity, and a love for learning.',
    detail:
      'Students visualize math through Vedic Maths, Abacus, and Mental Arithmetic — reducing fear and burden while strengthening concentration, memory, and visualization skills.',
    image: '/assets/classrooms/classroom-montessori-pegs.jpg',
    color: 'coral',
  },
  {
    id: 'innovative-learning',
    title: 'Innovative Learning',
    tag: 'Creative Study • Spoken English • STEM',
    summary:
      'We embrace Innovative Learning by incorporating creative teaching methods, modern technology, and hands-on experiences. Our approach encourages critical thinking, problem solving, and collaboration — inspiring students to explore, experiment, and think outside the box.',
    detail:
      'Includes Memory Boosters, Think Wide, Personality Development, and Spoken English classes conducted by qualified guest faculty to build lifelong confidence.',
    image: '/assets/activities/activity-robotics-model.jpg',
    color: 'sky',
  },
  {
    id: 'methodical-study',
    title: 'Methodical Study',
    tag: 'AV Projectors • Math Lab • Library',
    summary:
      'We emphasize Methodical Study, encouraging students to approach learning with structure and discipline. Classrooms are supported by audiovisual rooms featuring projectors, offering an engaging blend of structured learning and interactive technology.',
    detail:
      'Reinforced by our digitally designed Mathematics Laboratory, well-equipped library, regular assessments, and Saturday co-curricular competitions across four school houses.',
    image: '/assets/facilities/facility-av-smartroom.jpg',
    color: 'lavender',
  },
] as const;

export const ACTIVITIES_PROGRAMS = [
  {
    id: 'mathematical-magic',
    title: 'Mathematical Magic & Abacus',
    category: 'Numeracy & Logic',
    description:
      'Erasing fears of mathematics through Vedic Maths, Abacus, and Mental Arithmetic. Students learn to solve complex calculations with ease while strengthening memory, concentration, and visualization.',
    image: '/assets/classrooms/classroom-abacus-math.jpg',
    accent: 'coral',
  },
  {
    id: 'creative-study',
    title: 'Creative Study & Personality Development',
    category: 'Cognitive Growth',
    description:
      'Memory Boosters, Think Wide, and Personality Development programs crafted to bring out every child’s best — cultivating mental agility, confidence, and a positive attitude toward life’s challenges.',
    image: '/assets/classrooms/classroom-poster-teamwork.jpg',
    accent: 'lavender',
  },
  {
    id: 'sports',
    title: 'Sports & Physical Activities',
    category: 'Athletics & Teamwork',
    description:
      'Whether spiking a volleyball, playing throwball, sprinting on the track, or practicing hula-hoop coordination, students build physical strength, leadership, perseverance, and lasting friendships on our school ground.',
    image: '/assets/activities/activity-volleyball.jpg',
    accent: 'fresh',
  },
  {
    id: 'yoga-karate',
    title: 'Yoga & Karate Self-Defense',
    category: 'Mind & Body Fitness',
    description:
      'Guided yoga for Classes 4 to 10 (with students earning accolades during Dasara and Karnataka Rajyotsava) alongside karate training under dedicated instructors for integral fitness and self-defense.',
    image: '/assets/activities/activity-karate-group.jpg',
    accent: 'sky',
  },
  {
    id: 'coding-nie',
    title: 'Coding & Newspaper-in-Education (NIE)',
    category: 'Digital & Global Awareness',
    description:
      'Inspiring young minds to build websites through logical reasoning and web development, paired with Newspaper-in-Education (NIE) and fortnightly interactions with experts from diverse fields.',
    image: '/assets/facilities/facility-science-lab.jpg',
    accent: 'sunshine',
  },
  {
    id: 'art-singing',
    title: 'Art, Craft & Singing',
    category: 'Creative Expression',
    description:
      'Painting, drawing, clay sculpting, puppetry, and vocal music nurture imagination, fine motor skills, stage confidence, and joyful self-expression across every grade.',
    image: '/assets/activities/activity-clay-craft.jpg',
    accent: 'coral',
  },
  {
    id: 'gardening-fieldtrips',
    title: 'Gardening & Field Trips',
    category: 'Nature & Exploration',
    description:
      'Garden-based learning in our very own school garden connects children with nature and responsibility, while curated field trips provide real-world hands-on discovery outside the classroom.',
    image: '/assets/activities/activity-school-garden.jpg',
    accent: 'fresh',
  },
  {
    id: 'celebrations',
    title: 'Cultural Activities & School Celebrations',
    category: 'Unity & Tradition',
    description:
      'Every festival and national occasion is celebrated with warmth at SMES — from Dussehra and World Environment Day to traditional dances, cultural exhibitions, and Saturday four-house competitions.',
    image: '/assets/events/event-dussehra-celebration.jpg',
    accent: 'lavender',
  },
] as const;

export const DAY_IN_LIFE_STEPS = [
  {
    time: 'Morning Arrival',
    title: 'Reflection & Gratitude',
    description:
      'Every day at SMES begins together on the courtyard with a peaceful moment of reflection and gratitude, thanking the Almighty for new opportunities to learn and grow.',
    image: '/assets/events/event-morning-prayer-1.jpg',
  },
  {
    time: 'Core Learning',
    title: 'Enriching Classroom Discovery',
    description:
      'Across 7 structured 45-minute periods (9:00 AM to 3:15 PM), students dive into academics, Montessori apparatus, audio-visual sessions, and hands-on lab inquiry.',
    image: '/assets/classrooms/classroom-montessori-counting.jpg',
  },
  {
    time: 'Active Growth',
    title: 'Sports, Arts & Friendships',
    description:
      'Breaks, sports ground matches, yoga, karate, singing, and collaborative clubs foster community, physical vitality, and joy beyond textbooks.',
    image: '/assets/activities/activity-throwball.jpg',
  },
  {
    time: 'Closing Moment',
    title: 'Gratitude & Tomorrow’s Promise',
    description:
      'As the day draws to a close, students reflect on their learning, express gratitude once again, and head home ready for tomorrow’s discoveries.',
    image: '/assets/students/students-smiling-group.jpg',
  },
] as const;
