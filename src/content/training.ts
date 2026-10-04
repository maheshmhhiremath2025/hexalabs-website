/** "For training companies" page copy. */

export const trainingHero = {
  eyebrow: 'For training companies',
  title: { before: 'Spend the first hour of class ', accent: 'teaching', after: ', not fixing laptops.' },
  body: 'HexaLabs gives every learner in your batch the same ready lab machine, in a browser tab, under your brand. You run the batch. We run the infrastructure.',
  primaryCta: { label: 'Book a demo', href: '/contact' },
  secondaryCta: { label: 'See lab catalogue', href: '/labs' },
};

export const problems = {
  eyebrow: 'The problem',
  title: 'Three things that go wrong in most lab-based batches.',
  rows: [
    {
      label: 'Setup time',
      problem: 'Someone spends days building lab machines by hand, then the first session goes on fixing them.',
      solution: 'Build one image with your software, clone it for the whole batch. Machines are ready before learners join.',
    },
    {
      label: 'Learner laptops',
      problem: 'Locked-down corporate laptops, no admin rights, blocked ports, too little memory to run a VM.',
      solution: 'The lab runs in the cloud. Learners need a browser and a normal HTTPS connection — nothing else.',
    },
    {
      label: 'Cost overrun',
      problem: 'Machines left running overnight and over the weekend. The cloud bill arrives after the batch ends.',
      solution: 'Idle auto-stop, per-learner daily hour limits and Spot-based infrastructure keep costs inside the plan.',
    },
  ],
};

export const deepDives = [
  {
    id: 'console',
    eyebrow: 'Lab Console',
    title: 'Deploy and control the whole batch.',
    body: 'Deploy 1 to 100+ identical machines from your image. Start them all before class, stop them at lunch, extend expiry for the learners who need more time. Status updates live, so you know which machines are ready.',
    points: ['Bulk start, stop and restart', 'Extend lab expiry per learner or per batch', 'Live VM status for every learner', 'Instructor role scoped to one batch'],
    screen: 'bulkDeploy' as const,
  },
  {
    id: 'reports',
    eyebrow: 'Reports & certificates',
    title: 'Know who did the work.',
    body: 'Every session is logged: who opened which machine, when, and for how long. Download usage and lab-activity reports as PDF for your client, and issue completion certificates at the end of the batch.',
    points: ['Activity log per learner and machine', 'Usage and lab-activity reports (PDF)', 'Completion certificates', 'Daily hour usage against each learner’s cap'],
    screen: 'usageReport' as const,
  },
  {
    id: 'support',
    eyebrow: 'Ask Hexa',
    title: 'Answer learner questions without a support queue.',
    body: 'Most lab questions are the same five: is my machine on, how long do I have, why is the screen blank. Ask Hexa answers them inside the portal using the learner’s real VM status, and escalates the rest to the platform team in one click.',
    points: ['Checks VM status, expiry and hours left', 'Step-by-step fixes for common issues', 'One-click escalation with machine details'],
    screen: 'askHexa' as const,
  },
];

export const partners = {
  eyebrow: 'White-label & partners',
  title: 'Sell labs under your own name.',
  whiteLabel: {
    title: 'White-label',
    body: 'Your logo, your colours and your domain on the login page, the portal and learner emails. Learners never need to know who runs the infrastructure.',
    points: ['Custom domain with SSL', 'Logo and brand colours', 'Branded learner emails'],
  },
  reseller: {
    title: 'Partner & reseller program',
    body: 'Partner accounts can create and manage several client organisations from one login. Each client stays isolated — their users, machines and reports are visible only to them and to you.',
    points: ['Multiple client organisations per partner', 'Per-client isolation', 'Your own pricing to your clients'],
    howToJoin: {
      title: 'How to become a partner',
      steps: [
        'Book a call and tell us about your clients and courses.',
        'We agree partner pricing and terms with you.',
        'We set up your partner account. You create client organisations and brand them.',
      ],
      cta: { label: 'Talk to us about partnering', href: '/contact?item=Partner%20program' },
    },
  },
};

export const faq = [
  {
    q: 'Do learners need to install anything?',
    a: 'No. Learners sign in to the portal and click Open in Browser. Labs run over standard HTTPS, so they work in Chrome, Edge, Firefox or Safari, and on most office networks without firewall changes.',
  },
  {
    q: 'How long does it take to set up a batch?',
    a: 'Machines from an existing image are usually ready within minutes of deployment. If your course needs a custom image with specific software, share the requirements a few working days before the batch so we can build and test it.',
  },
  {
    q: 'Can we use our own software and lab image?',
    a: 'Yes. We build one image with your tools and course files, test it with you, then clone it for every learner so the whole batch starts from the same machine.',
  },
  {
    q: 'What stops a learner leaving a machine running all week?',
    a: 'Two controls. Idle machines shut down automatically, and you can set a daily hour limit per learner — once it is used up, the machine stops until the limit resets at midnight.',
  },
  {
    q: 'What can our trainers see and do?',
    a: 'Trainers get the instructor role. They see every machine in their own batch with live status, can start and stop machines, and can check the activity log. They don’t see other batches or other customers.',
  },
  {
    q: 'Do you provide official Azure and AWS labs?',
    a: 'Yes. We provide official Microsoft Azure and AWS lab environments, plus cloud sandboxes (Azure, AWS, Google Cloud, Oracle Cloud, Databricks and Azure AI Foundry) and Kubernetes / OpenShift clusters. Official Azure and AWS labs are currently up to 30% off, and we can supply official certification exam vouchers for the batch.',
  },
  {
    q: 'What reports do we get at the end of a batch?',
    a: 'You can download usage and lab-activity reports as PDF — who used which machine and for how long — and issue completion certificates to learners.',
  },
  {
    q: 'Can we put our own brand on the portal or resell it?',
    a: 'Yes. White-label gives you your own logo, colours and domain. Through the partner program you can manage several client organisations from one account and set your own price to clients.',
  },
];
