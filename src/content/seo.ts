import { site } from './site';
import { faq } from './training';

/**
 * Per-page <title> and meta description. Used by the prerender step (static
 * HTML for crawlers and social cards) and by the client on navigation.
 */
export type PageMeta = {
  path: string;
  title: string;
  description: string;
  /** Path under /public for the social card image (1200×630). */
  ogImage?: string;
  /** Include in sitemap.xml */
  sitemap?: boolean;
  priority?: number;
};

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'HexaLabs',
    description:
      'Windows, Linux, Azure and AWS lab machines for training batches. Deploy 1–100+ identical labs, open them in the browser, track usage. No installs or VPN.',
    sitemap: true,
    priority: 1.0,
  },
  {
    path: '/official-labs',
    title: 'Official labs | HexaLabs',
    description:
      'Official lab environments for Microsoft Azure and AWS courses, ready for instructor-led batches. Bulk access, usage reports and up to 30% off.',
    sitemap: true,
    priority: 0.9,
  },
  {
    path: '/sandboxes',
    title: 'Cloud sandboxes | HexaLabs',
    description:
      'Per-learner cloud sandboxes with guardrails: Azure, AWS, Google Cloud, Oracle Cloud, Databricks and Azure AI Foundry. Real consoles, limited spend, automatic expiry.',
    sitemap: true,
    priority: 0.9,
  },
  {
    path: '/labs',
    title: 'Lab machines | HexaLabs',
    description:
      'Browser-based lab machines for training batches: Windows Server 2022, Ubuntu, RHEL, Rocky and Oracle Linux desktops, plus AKS and OpenShift clusters.',
    sitemap: true,
    priority: 0.9,
  },
  {
    path: '/certifications',
    title: 'Certification vouchers | HexaLabs',
    description:
      'Official exam vouchers for Microsoft, AWS, Google Cloud, Oracle, Red Hat, CNCF and Databricks certifications, with optional practice labs before exam day.',
    sitemap: true,
    priority: 0.8,
  },
  {
    path: '/for-training-companies',
    title: 'For training companies | HexaLabs',
    description:
      'Run instructor-led batches on ready lab machines: bulk deploy, daily hour limits, idle auto-stop, PDF usage reports, white-label and a partner program.',
    sitemap: true,
    priority: 0.9,
  },
  {
    path: '/pricing',
    title: 'Pricing | HexaLabs',
    description:
      'Starter, Pro and Enterprise plans for cloud labs. Official Azure & AWS labs currently up to 30% off. Get a written quote for your batch.',
    sitemap: true,
    priority: 0.8,
  },
  {
    path: '/about',
    title: 'About | HexaLabs',
    description:
      'HexaLabs runs browser-based cloud lab machines for training companies, corporate L&D teams and learners, through the labsoncloud.online portal.',
    sitemap: true,
    priority: 0.5,
  },
  {
    path: '/contact',
    title: 'Book a demo | HexaLabs',
    description:
      'Tell us the course, batch size and start date. We’ll show you HexaLabs cloud labs running on a short call.',
    sitemap: true,
    priority: 0.7,
  },
  {
    path: '/privacy',
    title: 'Privacy | HexaLabs',
    description: 'How HexaLabs collects and uses personal data.',
    sitemap: true,
    priority: 0.2,
  },
  {
    path: '/terms',
    title: 'Terms | HexaLabs',
    description: 'Terms that apply to the HexaLabs website and lab platform.',
    sitemap: true,
    priority: 0.2,
  },
];

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Page not found | HexaLabs',
  description: 'This page does not exist. Browse the HexaLabs lab catalogue or book a demo.',
};

export const defaultOgImage = '/og/og-default.png';

export function normalisePath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function metaFor(path: string): PageMeta {
  const p = normalisePath(path);
  return pages.find((m) => m.path === p) ?? notFoundMeta;
}

const isPlaceholder = (v: string) => /^\[.*\]$/.test(v);

/** JSON-LD blocks for a page. */
export function jsonLdFor(path: string): object[] {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/logo.png`,
    description: site.description,
  };
  if (!isPlaceholder(site.contact.email)) org.email = site.contact.email;

  const blocks: object[] = [org];

  if (normalisePath(path) === '/for-training-companies') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }
  return blocks;
}
