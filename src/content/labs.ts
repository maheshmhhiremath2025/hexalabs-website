/**
 * Lab machines page (/labs). Browser-based Windows, Linux, Kubernetes and
 * AI & data machines only.
 *
 * Official Azure / AWS course labs live in src/content on the /official-labs
 * page, and cloud sandboxes (Azure, AWS, GCP, OCI, Databricks, AI Foundry)
 * on the /sandboxes page. Do not add them here.
 *
 * Add, remove or edit entries in `labs` — the page, its filters and the
 * "Request this lab" links update automatically.
 */

import { requestLink, type RequestTypeId } from './requestTypes';

export type LabCategory = 'windows' | 'linux' | 'kubernetes' | 'ai';

/** Only the lab-machine options from requestTypes.ts belong on this page. */
export type LabRequestType = Extract<RequestTypeId, 'vm-windows' | 'vm-linux' | 'vm-kubernetes'>;

export type Lab = {
  id: string;
  title: string;
  /** Which filter buttons the lab appears under. */
  categories: LabCategory[];
  /** Short OS / platform tag shown in mono type, e.g. "Windows Server 2022". */
  platform: string;
  /** What trainers typically use it for, e.g. "Windows admin & PowerShell". */
  typicalUse: string;
  summary: string;
  /** Example access periods for this lab. Other periods can be agreed for a batch. */
  durations: string[];
  /** Pre-selects "Lab type" on the demo form when someone clicks "Request this lab". */
  requestType: LabRequestType;
};

/* ── Page hero ─────────────────────────────────────────────────────────── */

export const labsHero = {
  eyebrow: 'Lab machines',
  title: { before: 'Lab machines that open in a ', accent: 'browser', after: ' tab.' },
  body: 'Windows, Linux and Kubernetes machines for your course. We build one image with your software, then clone it so every learner gets an identical machine. Nothing to install, no VPN.',
};

/* ── Filters ───────────────────────────────────────────────────────────── */

export const labFilters: { id: LabCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'ai', label: 'AI & data' },
];

/* ── Catalogue ─────────────────────────────────────────────────────────── */

export const labs: Lab[] = [
  {
    id: 'windows-server-desktop',
    title: 'Windows Server desktop',
    categories: ['windows'],
    platform: 'Windows Server 2022',
    typicalUse: 'Windows admin & PowerShell',
    summary: 'A full Windows desktop in the browser with admin rights, ready for your course software.',
    durations: ['1 day', '1 week', '30 days'],
    requestType: 'vm-windows',
  },
  {
    id: 'windows-active-directory',
    title: 'Active Directory domain lab',
    categories: ['windows'],
    platform: 'Windows Server 2022 · multi-VM',
    typicalUse: 'Identity & AD courses',
    summary: 'A domain controller and member machines for the learner, to practise Active Directory, Group Policy and identity tools.',
    durations: ['1 week', '2 weeks'],
    requestType: 'vm-windows',
  },
  {
    id: 'windows-hyper-v',
    title: 'Windows with Hyper-V',
    categories: ['windows'],
    platform: 'Windows Server 2022 + Hyper-V',
    typicalUse: 'Virtualisation courses',
    summary: 'Nested virtualisation is switched on, so learners can create and run their own virtual machines inside the lab.',
    durations: ['1 week', '2 weeks'],
    requestType: 'vm-windows',
  },
  {
    id: 'ubuntu-desktop',
    title: 'Ubuntu developer desktop',
    categories: ['linux'],
    platform: 'Ubuntu 22.04 / 24.04',
    typicalUse: 'Python, Linux fundamentals',
    summary: 'Graphical desktop with terminal, browser and developer tools. Your packages pre-installed.',
    durations: ['1 day', '1 week', '30 days'],
    requestType: 'vm-linux',
  },
  {
    id: 'rhel-rocky',
    title: 'RHEL & Rocky Linux',
    categories: ['linux'],
    platform: 'RHEL / Rocky Linux',
    typicalUse: 'Linux system administration',
    summary: 'Enterprise Linux machines for system administration, SELinux, storage and services.',
    durations: ['1 week', '2 weeks', '30 days'],
    requestType: 'vm-linux',
  },
  {
    id: 'oracle-linux-db',
    title: 'Oracle Linux with Oracle Database',
    categories: ['linux'],
    platform: 'Oracle Linux 8 · DB 19c',
    typicalUse: 'DBA training',
    summary: 'Oracle Linux machine with Oracle Database 19c installed on a separate data disk.',
    durations: ['1 week', '2 weeks', '30 days'],
    requestType: 'vm-linux',
  },
  {
    id: 'kiro-jenkins-devops',
    title: 'Kiro IDE + Jenkins DevOps desktop',
    categories: ['linux'],
    platform: 'Ubuntu · Kiro · Jenkins',
    typicalUse: 'DevOps & CI/CD courses',
    summary: 'Ubuntu desktop with the Kiro IDE and Jenkins installed, for writing code and running build pipelines on one machine.',
    durations: ['1 week', '2 weeks'],
    requestType: 'vm-linux',
  },
  {
    id: 'aks-kubernetes',
    title: 'Kubernetes on AKS',
    categories: ['kubernetes'],
    platform: 'AKS + Ubuntu desktop',
    typicalUse: 'Kubernetes application courses',
    summary: 'A shared managed Kubernetes cluster with a namespace and quota per learner, plus kubectl on their desktop.',
    durations: ['1 week', '2 weeks'],
    requestType: 'vm-kubernetes',
  },
  {
    id: 'aro-openshift',
    title: 'OpenShift on ARO',
    categories: ['kubernetes'],
    platform: 'Azure Red Hat OpenShift',
    typicalUse: 'OpenShift developer course',
    summary: 'Shared OpenShift cluster with per-learner projects, logins and resource quotas.',
    durations: ['1 week', '2 weeks'],
    requestType: 'vm-kubernetes',
  },
  {
    id: 'azure-openai-dev',
    title: 'Generative AI app-building lab',
    categories: ['ai'],
    platform: 'Ubuntu + Azure OpenAI',
    typicalUse: 'Generative AI course',
    summary: 'Ubuntu machine with a browser-based code editor and a dedicated Azure OpenAI resource per learner.',
    durations: ['1 week', '2 weeks'],
    requestType: 'vm-linux',
  },
  {
    id: 'python-jupyter',
    title: 'Python & Jupyter data science desktop',
    categories: ['ai'],
    platform: 'Ubuntu · Python · Jupyter',
    typicalUse: 'Data science & ML courses',
    summary: 'Ubuntu desktop with Python and Jupyter ready to use. We add the libraries and datasets your course needs to the image.',
    durations: ['1 week', '2 weeks', '30 days'],
    requestType: 'vm-linux',
  },
];

/* ── Links to the other lab pages (shown under the filters) ────────────── */

export const otherLabPages = {
  official: {
    question: 'Looking for official Azure or AWS course labs?',
    label: 'See official labs',
    href: '/official-labs',
  },
  sandboxes: {
    question: 'Need a cloud account to explore on its own?',
    label: 'See cloud sandboxes',
    href: '/sandboxes',
  },
};

/** Last card in the grid: invites a custom image request. */
export const customImageCard = {
  platform: 'Your software',
  title: 'Don’t see your course?',
  body: 'Tell us what you teach and the tools learners need. We build a lab image for it, test it with your trainer and clone it for the batch.',
  points: ['Your tools pre-installed', 'Tested with your trainer', 'Cloned for every learner'],
  linkLabel: 'Request a custom lab',
  href: requestLink('unsure', 'Custom lab image'),
};

/* ── "One image, cloned for the whole batch" section ───────────────────── */

export const imageProcess = {
  eyebrow: 'How a batch is set up',
  title: { before: 'One image, cloned for the ', accent: 'whole', after: ' batch.' },
  intro:
    'Every learner works on a copy of the machine your trainer tested, so the batch starts with the same software and settings the trainer checked.',
  steps: [
    {
      title: 'Build the image',
      body: 'We install your software, sample files and settings on one machine, from your course outline.',
    },
    {
      title: 'Test it with your trainer',
      body: 'Your trainer logs in and runs through the exercises. We change the image until it is right.',
    },
    {
      title: 'Clone it for every learner',
      body: 'Each learner gets their own copy with the same software and settings, and their own login.',
    },
    {
      title: 'Run the batch with limits',
      body: 'Idle machines stop on their own, and daily hour limits per learner keep usage within the plan.',
    },
  ],
};

/* ── Closing band ──────────────────────────────────────────────────────── */

export const labsCta = {
  title: 'Need a lab that isn’t listed?',
  body: 'Send us the course outline and the software it needs. We’ll build the image, test it with your trainer and clone it for the batch.',
  cta: { label: 'Request a custom lab', href: requestLink('unsure', 'Custom lab image') },
};
