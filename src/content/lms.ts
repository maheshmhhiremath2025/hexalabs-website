/**
 * HexaLabs LMS page (/lms) — the white-label learning platform at learn.hexalabs.online.
 * Only features that are live on the LMS today. Plans and prices match the LMS
 * landing page (learn.hexalabs.online); change both together.
 */
import type { AccentTitle } from '../components/ui/Accent';
import { requestLink } from './requestTypes';

export const lmsUrl = 'https://learn.hexalabs.online';

export const lmsHero = {
  eyebrow: 'HexaLabs LMS',
  title: { before: 'Courses, live classes and ', accent: 'hands-on labs', after: ' in one LMS.' } satisfies AccentTitle,
  body: 'A white-label learning platform for training companies and corporate teams. Build courses with AI, run live sessions, open real cloud labs from inside a lesson, and issue certificates anyone can verify, on your own brand and domain.',
  primary: { label: 'Book an LMS demo', href: requestLink('lms', 'HexaLabs LMS') },
  secondary: { label: 'Sign in to the LMS', href: lmsUrl },
  imageAlt:
    'Illustration of an online course on a laptop surrounded by a quiz, a verified certificate, a live video class, a code editor and a leaderboard trophy.',
  /** Four cards overlapping the bottom of the hero. */
  cards: [
    { id: 'ai', title: 'AI course builder', line: 'Turn a topic into a course with lessons and a quiz in minutes.' },
    { id: 'live', title: 'Live sessions', line: 'Zoom, Teams or Meet classes with one-click Join and live status.' },
    { id: 'labs', title: 'Hands-on labs', line: 'Learners open their own cloud lab from inside the course.' },
    { id: 'certs', title: 'Verified certificates', line: 'PDF certificates with a QR code and a public check page.' },
  ] as const,
};

export const lmsFeatures = {
  eyebrow: 'Everything in the LMS',
  title: 'One platform for the whole training lifecycle.',
  accent: 'whole training lifecycle',
  intro: 'From building the course to proving the learner finished it.',
  items: [
    {
      id: 'courses',
      title: 'Courses & quizzes',
      body: 'Pages, files, videos up to 2 GB, assignments, forums and graded quizzes, with completion tracking on every activity.',
    },
    {
      id: 'ai',
      title: 'AI course & quiz generator',
      body: 'Enter a topic and audience; the LMS drafts sections, lesson pages and multiple-choice questions you can review and publish.',
    },
    {
      id: 'tutor',
      title: 'Hexa AI tutor',
      body: 'A chat assistant inside each course that answers learners’ questions about the material, any time.',
    },
    {
      id: 'labs',
      title: 'Hands-on cloud labs',
      body: 'A Lab activity in the course opens the learner’s own VM or sandbox, signed in automatically. Windows, Linux, Kubernetes, AWS, Azure and more.',
    },
    {
      id: 'live',
      title: 'Live sessions',
      body: 'Schedule classes on Zoom, Microsoft Teams or Google Meet. Learners see when a session is scheduled, live now or ended, and join in one click.',
    },
    {
      id: 'paths',
      title: 'Learning paths',
      body: 'Group courses into programs. Each course unlocks when the previous one is complete, and progress is tracked per learner.',
    },
    {
      id: 'code',
      title: 'Auto-graded coding tests',
      body: 'Learners write code in the quiz and it runs in a secure sandbox against your test cases: Python, Java, C, C++, JavaScript and PHP.',
    },
    {
      id: 'exam',
      title: 'Secure exam mode',
      body: 'Quizzes open in full screen with copy, paste and right-click blocked. Tab switches are logged, and the attempt can auto-submit after repeated switches.',
    },
    {
      id: 'certs',
      title: 'Certificates with QR verification',
      body: 'Branded PDF certificates issue automatically on completion. Employers scan the QR code or enter the code on a public page to confirm it is genuine.',
    },
    {
      id: 'reports',
      title: 'Reports & analytics',
      body: 'Live dashboards of completions, quiz scores, certificates and lab usage, per organisation and per learner.',
    },
    {
      id: 'engage',
      title: 'Points, badges & leaderboards',
      body: 'Learners earn points and levels for completing lessons, quizzes and courses, plus badges, on a leaderboard scoped to their organisation.',
    },
    {
      id: 'announce',
      title: 'Announcements & batches',
      body: 'Send a message to every learner by email and in-app notification, and group learners into batches.',
    },
  ] as const,
};

export const lmsSteps = {
  eyebrow: 'How it works',
  title: 'From a topic to a certified learner, in four steps.',
  accent: 'four steps',
  steps: [
    { title: 'Set up your portal', body: 'Your logo, colours and domain with automatic HTTPS. Add learners one by one or by CSV upload.' },
    { title: 'Build the course', body: 'Start from the AI generator or your own material. Add videos, quizzes, coding tests, live sessions and labs.' },
    { title: 'Teach and practise', body: 'Learners join live classes, open their own cloud lab from the lesson and take secure quizzes.' },
    { title: 'Certify and report', body: 'Certificates issue on completion with QR verification. Download reports on progress and lab usage.' },
  ],
};

export const lmsWhiteLabel = {
  eyebrow: 'White-label',
  title: 'Every client gets their own branded LMS.',
  accent: 'their own',
  body: 'Run the LMS for many clients from one platform. Each organisation is isolated and sees only its own learners, courses and reports.',
  points: [
    'Own domain (e.g. learn.yourcompany.com) with automatic HTTPS',
    'Logo, colours, name and support email on every page',
    'Welcome and enrolment emails from your own address',
    'Client admins manage their own learners and enrolments',
  ],
};

export type LmsPlan = {
  id: string;
  name: string;
  forWho: string;
  price: string;
  unit: string;
  features: string[];
  highlighted?: boolean;
  cta: { label: string; href: string };
};

export const lmsPlans = {
  eyebrow: 'LMS plans',
  title: 'Pick the plan that fits each client.',
  accent: 'each client',
  intro: 'Each organisation you onboard runs on its own plan. Upgrade any time.',
  note: 'Prices exclude GST. Billed monthly, cancel any time.',
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      forWho: 'For small teams getting started.',
      price: '₹1,999',
      unit: 'per organisation / month',
      features: ['Courses, content and quizzes', 'Completion certificates', 'Branded learner emails', 'Up to 50 learners', 'Up to 10 courses'],
      cta: { label: 'Get started', href: requestLink('lms', 'LMS Basic plan') },
    },
    {
      id: 'pro',
      name: 'Pro',
      forWho: 'For growing training programs.',
      price: '₹5,999',
      unit: 'per organisation / month',
      features: ['Everything in Basic', 'Live sessions (Zoom, Teams, Meet)', 'Learning paths', 'Reports and analytics', 'Up to 250 learners', 'Up to 50 courses'],
      highlighted: true,
      cta: { label: 'Choose Pro', href: requestLink('lms', 'LMS Pro plan') },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      forWho: 'For hands-on labs and full white-label.',
      price: '₹8,999',
      unit: 'per organisation / month',
      features: ['Everything in Pro', 'Hands-on cloud labs in courses', 'Your own domain', 'Your own email server (SMTP)', 'Unlimited learners and courses', 'Priority support and onboarding'],
      cta: { label: 'Talk to sales', href: requestLink('lms', 'LMS Enterprise plan') },
    },
  ] satisfies LmsPlan[],
};

/** Home-page section that introduces the LMS and links to /lms. */
export const lmsHome = {
  eyebrow: 'New · HexaLabs LMS',
  title: 'Teach the course and run the lab in one place.',
  accent: 'one place',
  body: 'HexaLabs LMS is our white-label learning platform: courses, live classes, AI course builder, coding tests and verified certificates, with hands-on cloud labs opening right inside the lesson.',
  points: ['AI course & quiz generator', 'Live sessions on Zoom, Teams or Meet', 'Labs inside the course', 'QR-verified certificates'],
  primary: { label: 'Explore the LMS', href: '/lms' },
  secondary: { label: 'See LMS plans', href: '/lms#plans' },
};

export const lmsCta = {
  title: 'Launch your branded training portal.',
  body: 'See courses, live sessions, labs and certificates running on a short call. We’ll set up a trial portal on your brand.',
  cta: { label: 'Book an LMS demo', href: requestLink('lms', 'HexaLabs LMS') },
};
