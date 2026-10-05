/**
 * Site-wide settings: brand, contact details, navigation and footer.
 * Edit text here — no component changes needed.
 * Anything in [SQUARE_BRACKETS] is a placeholder you still need to fill in.
 */

export type ImageSlot = {
  /** Path under /public. Run `npm run images` to create .webp/.avif next to it. */
  src: string;
  /** Set to true once the file exists in /public. Until then a coded fallback is shown. */
  ready: boolean;
  width: number;
  height: number;
  alt: string;
};

export const site = {
  name: 'HexaLabs',
  /** Public URL of this marketing site (set VITE_SITE_URL at build time). */
  url: (import.meta.env.VITE_SITE_URL || 'https://hexalabs.online').replace(/\/$/, ''),
  portalUrl: 'https://labsoncloud.online',
  portalLabel: 'labsoncloud.online',
  loginUrl: 'https://labsoncloud.online/login',
  tagline: 'Cloud labs your learners can open in a browser tab.',
  description:
    'Official Azure and AWS labs, cloud sandboxes and browser-based Windows and Linux lab machines for training companies, corporate L&D teams and learners. No installs, no VPN.',
  locale: 'en_IN',

  contact: {
    email: 'support@hexalabs.online',
  },

  /** Name shown in the footer copyright line and on the legal pages. */
  legalName: 'HexaLabs',
  copyrightYear: 2026,

  offer: {
    label: 'Official Azure & AWS labs — up to 30% off',
    /** Shorter version for phones, where the full label would be cut off. */
    labelCompact: 'Azure & AWS labs — up to 30% off',
    short: 'Up to 30% off',
    href: '/official-labs',
  },

  brand: {
    /**
     * Official HexaLabs logo: brain mark + wordmark + "Innovate. Create. Elevate.".
     * public/brand/logo.{png,webp,avif} are 405×112 (2× the 56px footer size).
     * Source: brand-source/hexalabs-logo-official.png.
     */
    logo: {
      src: '/brand/logo.png',
      ready: true,
      width: 405,
      height: 112,
      alt: 'HexaLabs — Innovate. Create. Elevate.',
    } satisfies ImageSlot,
    /** Hexa robot — the Ask Hexa assistant avatar. */
    assistant: {
      src: '/brand/hexa-robot.png',
      ready: true,
      width: 160,
      height: 160,
      alt: '',
    } satisfies ImageSlot,
  },
};

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };

/** The "Labs" dropdown in the header — one page per kind of lab. */
export const labsMenu: NavGroup = {
  label: 'Labs',
  items: [
    { label: 'Official labs', href: '/official-labs', description: 'Microsoft Azure and AWS official course labs' },
    { label: 'Cloud sandboxes', href: '/sandboxes', description: 'Azure, AWS, GCP, OCI, Databricks, AI Foundry' },
    { label: 'Lab machines', href: '/labs', description: 'Windows, Linux and Kubernetes in the browser' },
    { label: 'Certifications', href: '/certifications', description: 'Official exam vouchers: Microsoft, AWS, Google Cloud and more' },
  ],
};

export const mainNav: NavItem[] = [
  { label: 'For training companies', href: '/for-training-companies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export const headerCta = { label: 'Book a demo', href: '/contact' };

export const footer = {
  blurb:
    'Official cloud labs, sandboxes and browser-based lab machines. Built for training companies, corporate L&D teams and their learners.',
  columns: [
    {
      title: 'Labs',
      links: [
        { label: 'Official Azure labs', href: '/official-labs#azure' },
        { label: 'Official AWS labs', href: '/official-labs#aws' },
        { label: 'Cloud sandboxes', href: '/sandboxes' },
        { label: 'Lab machines', href: '/labs' },
        { label: 'Certifications', href: '/certifications' },
      ],
    },
    {
      title: 'Product',
      links: [
        { label: 'Lab Console', href: '/for-training-companies#console' },
        { label: 'Reports & certificates', href: '/for-training-companies#reports' },
        { label: 'Ask Hexa assistant', href: '/#ask-hexa' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'For training companies', href: '/for-training-companies' },
        { label: 'Partner program', href: '/for-training-companies#partners' },
        { label: 'Book a demo', href: '/contact' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Log in to the portal', href: 'https://labsoncloud.online/login' },
        { label: 'Contact us', href: '/contact' },
        { label: 'FAQ', href: '/for-training-companies#faq' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};
