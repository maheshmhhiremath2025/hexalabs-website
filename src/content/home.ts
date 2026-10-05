/**
 * Home page copy. Keep sentences short and specific. No hype words,
 * no exclamation marks. Wrap an accent phrase in `accent` (Instrument Serif).
 */

import type { AccentTitle } from '../components/ui/Accent';
import { officialVendors } from './officialLabs';

export const hero = {
  headline: { before: 'Every learner gets ', accent: 'their own', after: ' cloud lab.' } satisfies AccentTitle,
  subcopy:
    'Official Azure and AWS course labs, cloud sandboxes, Windows and Linux lab machines, and exam vouchers. Deploy one machine or a hundred, and run the whole batch from one console.',
  primaryCta: { label: 'Book a demo', href: '/contact' },
  secondaryCta: { label: 'For training companies', href: '/for-training-companies' },
  audience: {
    label: 'Built for',
    items: ['IT training companies', 'Corporate L&D teams', 'Individual learners'],
  },

  /** The four cards that overlap the bottom edge of the hero — one per kind of lab. */
  cards: [
    {
      id: 'official',
      title: 'Official labs',
      line: 'Microsoft Azure and AWS official course labs.',
      href: '/official-labs',
    },
    {
      id: 'sandboxes',
      title: 'Cloud sandboxes',
      line: 'Azure, AWS, GCP, OCI, Databricks and AI Foundry.',
      href: '/sandboxes',
    },
    {
      id: 'machines',
      title: 'Lab machines',
      line: 'Windows, Linux and Kubernetes in the browser.',
      href: '/labs',
    },
    {
      id: 'certifications',
      title: 'Certification vouchers',
      line: 'Official exam vouchers from seven vendors.',
      href: '/certifications',
    },
  ] as const,

  /** Visible caption under the diagram. It is also the text summary of the (aria-hidden) diagram. */
  caption:
    'Each learner signs in over HTTPS and gets their own environment. The trainer runs the batch from the console. Hour caps, idle auto-stop and auto clean-up apply to every lab.',

  /** Everything written inside the diagram. Keep labels short: they are set in a fixed-width font. */
  diagram: {
    learnersWide: ['learner 01', 'learner 02', 'learner 03', 'learner 30'],
    learnersNarrow: ['learner 01', 'learner 02', 'learner 30'],
    /** Index (in either list) of the learner whose route is traced in blue. */
    tracedLearner: 1,
    httpsTag: 'HTTPS',
    httpsNote: 'any browser · no VPN',
    entry: { name: 'HexaLabs', host: 'labsoncloud.online' },
    trainer: { label: 'trainer', notes: ['deploy 1–100+', 'bulk start · stop', 'usage reports'] },
    guardrails: ['hour caps', 'idle auto-stop', 'auto clean-up'],
    isolationTag: 'isolated per learner',
    groups: [
      {
        label: 'Cloud sandboxes',
        items: ['Azure', 'AWS', 'Google Cloud', 'Oracle Cloud', 'Databricks', 'Azure AI Foundry'],
      },
      {
        label: 'Lab machines',
        items: ['Windows Server', 'Ubuntu', 'RHEL · Rocky', 'Oracle Linux', 'Kubernetes · AKS', 'OpenShift · ARO'],
      },
    ],
    /** [group, item] of the environment the traced learner reaches. */
    tracedTarget: [0, 0] as const,
    official: {
      label: 'Official course labs',
      /** Counted from the official-labs page content, so it stays true when courses change. */
      count: `${officialVendors.azure.courses.length} Azure · ${officialVendors.aws.courses.length} AWS`,
      codesWide: 'AZ-104T00 · AZ-305T00 · AZ-400T00 · SC-200T00 · Architecting on AWS',
      codesNarrow: ['AZ-104T00 · AZ-305T00 · SC-200T00', 'Architecting on AWS'],
    },
  },
};

export const proofStrip = [
  'No installs or VPN',
  'Windows & Linux desktops',
  'Per-learner daily hour limits',
  'White-label for your brand',
];

export const batchSteps = {
  eyebrow: 'How a batch runs',
  title: 'From course outline to a room full of running labs, in four steps.',
  /** Words in `title` set in the accent gradient. */
  accent: 'four steps',
  steps: [
    {
      title: 'Create cohort',
      body: 'Name the training, set the dates and add learners by email. Each learner gets their own login.',
      detail: 'training: az104-batch-b2',
    },
    {
      title: 'Deploy machines',
      body: 'Pick an image and deploy 1 to 100+ identical machines in one go. Your software comes pre-installed.',
      detail: '30 × Windows Server 2022',
    },
    {
      title: 'Learners open the lab',
      body: 'Learners sign in at labsoncloud.online and click Open in Browser. Nothing to download.',
      detail: 'Open in Browser →',
    },
    {
      title: 'Track usage & download reports',
      body: 'See who used which machine and for how long. Download usage reports and completion certificates as PDF.',
      detail: 'usage-report.pdf',
    },
  ],
};

export const catalogue = {
  eyebrow: 'Lab catalogue',
  title: 'Pick the stack your course teaches.',
  accent: 'stack',
  action: { label: 'See all lab machines', href: '/labs' },
  /** The four cards on the home page — one per kind of environment, each with one illustration. */
  cards: [
    {
      id: 'official',
      /** Transparent illustration on the card (public/illustrations). */
      illustration: 'official-labs',
      chip: 'Azure · AWS',
      title: 'Official course labs',
      line: 'Official lab environments for Microsoft Azure and AWS classroom courses, from fundamentals to expert.',
      tags: ['AZ-900', 'AZ-104', 'AI-200', 'AZ-305', 'AZ-400', 'AI-103', 'Architecting on AWS', 'Developing on AWS'],
      offer: true,
      href: '/official-labs',
    },
    {
      id: 'sandboxes',
      illustration: 'sandboxes',
      chip: 'Six providers',
      title: 'Cloud sandboxes',
      line: 'Real cloud consoles for each learner, with limits on services, hours and spend.',
      tags: ['Azure', 'AWS', 'Google Cloud', 'Oracle Cloud', 'Databricks', 'Azure AI Foundry'],
      offer: false,
      href: '/sandboxes',
    },
    {
      id: 'machines',
      illustration: 'lab-machines',
      chip: 'In the browser',
      title: 'Lab machines',
      line: 'Windows Server and Linux desktops with admin rights, plus AKS and ARO clusters with a namespace and quota per learner.',
      tags: ['Windows Server 2022', 'Ubuntu', 'Rocky', 'RHEL', 'Oracle Linux', 'AKS · ARO'],
      offer: false,
      href: '/labs',
    },
    {
      id: 'certifications',
      illustration: 'certifications',
      chip: 'Seven vendors',
      title: 'Certification vouchers',
      line: 'Official exam vouchers for a whole batch or a single learner, with practice labs before exam day.',
      tags: ['Microsoft', 'AWS', 'Google Cloud', 'Oracle', 'Red Hat', 'CNCF', 'Databricks'],
      offer: false,
      href: '/certifications',
    },
  ] as const,
  intro:
    'Each learner gets their own machine or sandbox, so one learner’s mistakes stay in their own lab.',
  certifications: {
    text: 'Preparing learners for an exam?',
    linkLabel: 'Get official certification exam vouchers',
    href: '/certifications',
  },
  tiles: {
    azure: {
      name: 'Official Azure labs',
      line: 'Official lab environments for Microsoft Azure courses, from fundamentals to expert.',
      courses: [
        { code: 'AZ-900', name: 'Azure Fundamentals' },
        { code: 'AZ-104', name: 'Azure Administrator' },
        { code: 'AI-200', name: 'Azure AI Cloud Developer' },
        { code: 'AZ-305', name: 'Azure Solutions Architect' },
        { code: 'AZ-400', name: 'DevOps Engineer' },
        { code: 'AI-103', name: 'Azure AI Apps and Agents' },
      ],
      href: '/official-labs#azure',
    },
    aws: {
      name: 'Official AWS labs',
      line: 'Official lab environments for AWS classroom courses.',
      codes: ['Architecting on AWS', 'Developing on AWS'],
      href: '/official-labs#aws',
    },
    windows: {
      name: 'Windows Server desktops',
      line: 'A full Windows Server 2022 desktop in the browser, with admin rights.',
      href: '/labs?type=windows',
    },
    linux: {
      name: 'Linux desktops',
      line: 'Graphical desktop and terminal on the distro your course uses.',
      distros: ['Ubuntu', 'Rocky', 'RHEL', 'Oracle Linux'],
      href: '/labs?type=linux',
    },
    kubernetes: {
      name: 'Kubernetes & OpenShift',
      line: 'AKS and ARO clusters with a namespace and quota per learner.',
      href: '/labs?type=kubernetes',
    },
    sandbox: {
      name: 'Cloud sandboxes',
      line: 'Real cloud consoles for each learner, with limits on services, hours and spend.',
      providers: ['Azure', 'AWS', 'Google Cloud', 'Oracle Cloud', 'Databricks', 'Azure AI Foundry'],
      href: '/sandboxes',
    },
  },
};

export const trainers = {
  eyebrow: 'For trainers & admins',
  title: 'Run the whole batch from one console.',
  accent: 'one console',
  body: 'The trainer sees every learner’s machine on one screen. Start the batch before class, give extra days to someone who fell behind, and let the platform stop machines nobody is using.',
  checklist: [
    { title: 'Bulk start and stop', body: 'Start or stop one machine or the whole batch in a single action.' },
    { title: 'Extend lab expiry', body: 'Add days for one learner or the full cohort.' },
    { title: 'Daily hour limits', body: 'Cap each learner at a set number of hours a day. Resets at midnight.' },
    { title: 'Idle auto-stop', body: 'Machines with no activity shut down on their own.' },
    { title: 'Instructor role', body: 'Trainers see the machines in their own batch, nothing else.' },
    { title: 'Activity log', body: 'Every start, stop and session, with time and duration.' },
  ],
};

export const whiteLabel = {
  eyebrow: 'White-label',
  title: 'Your logo. Your colours. Your domain.',
  accent: 'Your domain.',
  action: { label: 'For training companies', href: '/for-training-companies' },
  body: 'Training companies run the portal under their own brand. Learners sign in on your domain, see your logo and get emails from your name.',
  points: ['Custom domain with SSL', 'Logo and colours on every screen', 'Branded learner emails'],
  caption: 'Two example brand kits. Each organisation gets its own — no code changes.',
  themes: [
    {
      name: 'Acme Training',
      initials: 'AT',
      domain: 'labs.acmetraining.example',
      color: '#0E7C66',
      colorFg: '#FFFFFF',
      tint: '#E7F4F1',
    },
    {
      name: 'Northwind Academy',
      initials: 'NA',
      domain: 'learn.northwind.example',
      color: '#B4232A',
      colorFg: '#FFFFFF',
      tint: '#FBECEC',
    },
  ],
};

export const askHexa = {
  eyebrow: 'Ask Hexa',
  title: 'A lab assistant that knows the learner’s machine.',
  accent: 'knows',
  body: 'Ask Hexa sits inside the portal. It checks a learner’s VM status, lab expiry and hours left today, walks them through common fixes, and hands the issue to the platform team in one click — with the machine details already attached.',
  prompts: ['Start my lab', 'How many hours do I have left?', 'When does my lab expire?'],
  chat: {
    learner: 'My lab says “No session available”. What should I do?',
    assistantIntro: 'Your machine az104-lab-07 is running. This message usually means the desktop session is still starting after boot.',
    steps: ['Wait about 60 seconds.', 'Click Refresh in the lab tab.', 'Still showing? I can pass it to the platform team.'],
    status: { vm: 'az104-lab-07', state: 'Running', hours: '2h 40m left today' },
    escalate: 'Contact platform team',
  },
};

export const security = {
  eyebrow: 'Security & reliability',
  title: 'Plain controls, applied to every lab.',
  accent: 'every lab',
  intro: 'No badges we haven’t earned. Here is what the platform actually does.',
  items: [
    {
      term: 'Role-based access',
      body: 'Five roles — super-admin, organisation admin, partner, instructor and learner. Each sees only what it needs.',
    },
    {
      term: 'Per-organisation isolation',
      body: 'Organisations can’t see each other’s users, machines or reports.',
    },
    {
      term: 'Auto-shutdown',
      body: 'Idle machines stop on their own. Daily hour caps stop runaway usage.',
    },
    {
      term: 'SSL everywhere',
      body: 'The portal and every lab URL are served over HTTPS.',
    },
    {
      term: 'Activity log',
      body: 'Every start, stop and session is recorded with user, machine and time.',
    },
    {
      term: 'Cost control',
      body: 'Spot-based infrastructure, idle auto-stop and daily caps keep lab costs down.',
    },
  ],
};

/**
 * "Use case" cards in the dark photo band, each with one illustration (`image`: il-uc-*,
 * cut from one 3×2 artwork — see Art.tsx).
 * Generic setups built only from the offerings described on this site — no customers,
 * numbers or results.
 */
export const useCases = {
  eyebrow: 'Use cases',
  title: 'Ways to run your next batch.',
  accent: 'next batch',
  intro: 'Typical setups, built from the labs, sandboxes and vouchers on this site.',
  items: [
    {
      chip: 'Official labs',
      title: 'Run an AZ-104 batch for 30 learners',
      body: 'An official Azure lab environment for every learner, opened from any browser with nothing to install.',
      href: '/official-labs#azure',
      image: 'il-uc-batch',
    },
    {
      chip: 'Cloud sandbox',
      title: 'Give each learner an OCI sandbox',
      body: 'Their own compartment and console sign-in, with allowed services, shape limits and daily hour caps.',
      href: '/sandboxes?provider=oci#providers',
      image: 'il-uc-oci',
    },
    {
      chip: 'Lab machines',
      title: 'Deploy 30 identical Windows Server machines',
      body: 'We build one image with your software, then clone it so every learner gets the same machine.',
      href: '/labs?type=windows',
      image: 'il-uc-windows',
    },
    {
      chip: 'Kubernetes',
      title: 'Teach Kubernetes with a namespace per learner',
      body: 'A managed AKS cluster with a namespace and quota per learner, plus kubectl on their desktop.',
      href: '/labs?type=kubernetes',
      image: 'il-uc-kubernetes',
    },
    {
      chip: 'Certifications',
      title: 'Pair a course with exam vouchers',
      body: 'Order official vouchers for the whole batch or one learner, and add practice labs before exam day.',
      href: '/certifications',
      image: 'il-uc-vouchers',
    },
    {
      chip: 'White-label',
      title: 'Run the labs under your own brand',
      body: 'Learners sign in on your domain, see your logo and get emails from your name.',
      href: '/for-training-companies',
      image: 'il-uc-whitelabel',
    },
  ],
} as const;

/** "How it works" band: text beside the flow panel (Learners → HexaLabs → isolated labs). */
export const howItWorks = {
  eyebrow: 'How it works',
  title: 'One sign-in. An isolated lab for every learner.',
  accent: 'isolated',
  roles: [
    { title: 'Learners', body: 'Sign in over HTTPS from any browser. No installs, no VPN.' },
    { title: 'Trainer', body: 'Deploys 1 to 100+ labs, starts and stops the batch, downloads usage reports.' },
    { title: 'Platform', body: 'Hour caps, idle auto-stop and auto clean-up on every lab.' },
  ],
};

export const finalCta = {
  title: 'Running a batch next week?',
  body: 'Tell us the course, batch size and start date. We’ll show you the labs running on a short call.',
  cta: { label: 'Book a demo', href: '/contact' },
};
