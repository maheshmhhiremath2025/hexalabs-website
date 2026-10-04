/**
 * Home page copy. Keep sentences short and specific. No hype words,
 * no exclamation marks. Wrap an accent phrase in `accent` (Instrument Serif).
 */

export const hero = {
  headline: { before: 'Cloud labs your learners can open in a ', accent: 'browser tab', after: '.' },
  subcopy:
    'Windows, Linux, Azure and AWS lab machines for your training batches. Ready in minutes, opened from any laptop, with nothing to install.',
  primaryCta: { label: 'Book a demo', href: '/contact' },
  secondaryCta: { label: 'See official labs', href: '/official-labs' },
  footnote: 'Runs in any modern browser over HTTPS. No client, no VPN.',
  visualSummary: 'One trainer action deploys 30 identical lab machines, and each learner opens theirs in a browser tab.',
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

export const finalCta = {
  title: 'Running a batch next week?',
  body: 'Tell us the course, batch size and start date. We’ll show you the labs running on a short call.',
  cta: { label: 'Book a demo', href: '/contact' },
};
