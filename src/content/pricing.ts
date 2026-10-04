/**
 * Pricing page. Lab prices depend on the course, so tiers show "Contact for pricing"
 * (`price: null`). To publish a price later, set e.g. price: '₹X' and unit: 'per learner / week'.
 */

export type Tier = {
  id: string;
  name: string;
  forWho: string;
  price: string | null;
  unit?: string;
  featuresIntro?: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

export const pricingHero = {
  eyebrow: 'Pricing',
  title: { before: 'A written quote for ', accent: 'every batch', after: '.' },
  body: 'Lab pricing depends on the machine size, the hours learners use and how long the batch runs. Tell us the course and we’ll send a written quote.',
};

export const offerBanner = {
  label: 'Current offer',
  title: 'Official Azure & AWS labs — up to 30% off',
  body: 'Applies to official Microsoft Azure and AWS lab environments. Ask for the current terms when you book a demo.',
  cta: { label: 'See official labs', href: '/official-labs' },
};

export const tiers: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    forWho: 'For a first batch or a pilot.',
    price: null,
    features: [
      'Browser-based Windows and Linux lab machines',
      'Lab Console for trainers',
      'Bulk start and stop',
      'Idle auto-stop',
      'Usage reports (PDF)',
      'Email support',
    ],
    cta: { label: 'Get a quote', href: '/contact?plan=starter' },
  },
  {
    id: 'pro',
    name: 'Pro',
    forWho: 'For training companies running batches every month.',
    price: null,
    featuresIntro: 'Everything in Starter, plus',
    features: [
      'Official Azure and AWS labs',
      'Kubernetes and OpenShift labs',
      'Per-learner daily hour limits',
      'Instructor role',
      'Activity log and completion certificates',
      'Ask Hexa assistant for learners',
    ],
    cta: { label: 'Get a quote', href: '/contact?plan=pro' },
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    forWho: 'For corporate L&D teams and resellers.',
    price: null,
    featuresIntro: 'Everything in Pro, plus',
    features: [
      'White-label: logo, colours and domain',
      'Partner account with multiple client organisations',
      'Custom lab images built with you',
      'Cloud sandboxes: Azure, AWS, GCP, OCI, Databricks, AI Foundry',
      'Named contact on the platform team',
    ],
    cta: { label: 'Get a quote', href: '/contact?plan=enterprise' },
  },
];

export const priceFactors = {
  title: 'What changes the price',
  items: [
    { term: 'Machine size', body: 'CPU and memory per learner. A Linux terminal lab costs less than a Windows desktop with Visual Studio.' },
    { term: 'Hours used', body: 'Daily hour limits and idle auto-stop decide how many machine-hours the batch actually uses.' },
    { term: 'Batch length', body: 'A two-day workshop and a six-week program are priced differently.' },
    { term: 'Licensing', body: 'Windows Server and some vendor software carry their own licence costs.' },
  ],
};
