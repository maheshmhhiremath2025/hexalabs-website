/**
 * One entry per platform, each with its genuine official logo (public/logos/official/*.svg).
 *
 * Sources: Microsoft Azure Architecture Icons V24 and the Entra icon pack (Azure,
 * AI Foundry, Azure OpenAI, AKS, Entra ID), Wikimedia Commons originals of the vendor
 * files (Windows, Microsoft, AWS, Google Cloud, Oracle, Databricks, Ubuntu, Python,
 * Linux Foundation), and each project's own brand repo (Kubernetes/CNCF, Red Hat,
 * OpenShift, Rocky Linux, Jupyter, Jenkins, Kiro). Logos are only used to show which
 * platform a lab or exam is for. Every name and logo belongs to its owner — see the
 * trademark note in the footer.
 */
export type Product = {
  label: string;
  /** Shorter name for tight captions (logo grids). Defaults to `label`. */
  short?: string;
  /** Path under /public to the official logo (full colour, works on white). */
  officialLogo: string;
  /** Width ÷ height of the logo's viewBox, so tiles can size it without distortion. */
  logoAspect: number;
  /** Compact square crop of the official mark for tiny chips (only where the full logo is wide). */
  markLogo?: string;
  /** True when the logo already spells the name (AWS, Oracle, Databricks…): chips can drop the visible text. */
  wordmark?: boolean;
  /** Brand colour, used for the soft tint behind the logo. */
  brandHex: string;
};

const L = (file: string) => `/logos/official/${file}.svg`;

export const products = {
  // Clouds and sandboxes
  azure: { label: 'Microsoft Azure', short: 'Azure', officialLogo: L('azure'), logoAspect: 1, brandHex: '#0078D4' },
  aws: { label: 'AWS', officialLogo: L('aws'), logoAspect: 304 / 182, wordmark: true, brandHex: '#FF9900' },
  gcp: { label: 'Google Cloud', officialLogo: L('gcp'), logoAspect: 180.01 / 145, brandHex: '#4285F4' },
  oci: { label: 'Oracle Cloud', short: 'OCI', officialLogo: L('oracle'), logoAspect: 233 / 32, markLogo: L('oracle-mark'), wordmark: true, brandHex: '#C74634' },
  databricks: {
    label: 'Databricks',
    officialLogo: L('databricks'),
    logoAspect: 106.849 / 44.617,
    markLogo: L('databricks-mark'),
    wordmark: true,
    brandHex: '#FF3621',
  },
  'ai-foundry': { label: 'Azure AI Foundry', short: 'AI Foundry', officialLogo: L('ai-foundry'), logoAspect: 1, brandHex: '#5B5FC7' },

  // Lab machines
  'windows-server': { label: 'Windows Server', officialLogo: L('windows'), logoAspect: 1, brandHex: '#0078D4' },
  'active-directory': { label: 'Active Directory', officialLogo: L('entra-id'), logoAspect: 1, brandHex: '#0078D4' },
  // Microsoft publishes no Hyper-V logo, so the Hyper-V lab uses the official Windows logo.
  'hyper-v': { label: 'Hyper-V', officialLogo: L('windows'), logoAspect: 1, brandHex: '#0078D4' },
  ubuntu: { label: 'Ubuntu', officialLogo: L('ubuntu'), logoAspect: 1038.905 / 1600, brandHex: '#E95420' },
  rhel: { label: 'Red Hat Enterprise Linux', short: 'RHEL', officialLogo: L('redhat'), logoAspect: 192 / 145, brandHex: '#EE0000' },
  rocky: { label: 'Rocky Linux', officialLogo: L('rocky'), logoAspect: 1, brandHex: '#10B981' },
  'oracle-db': { label: 'Oracle Database', officialLogo: L('oracle'), logoAspect: 233 / 32, markLogo: L('oracle-mark'), wordmark: true, brandHex: '#C74634' },
  kubernetes: { label: 'Kubernetes', officialLogo: L('kubernetes'), logoAspect: 230.1 / 223.35, brandHex: '#326CE5' },
  aks: { label: 'Azure Kubernetes Service', officialLogo: L('aks'), logoAspect: 1, brandHex: '#7B3FE4' },
  openshift: { label: 'Red Hat OpenShift', officialLogo: L('openshift'), logoAspect: 1, brandHex: '#EE0000' },
  'azure-openai': { label: 'Azure OpenAI', officialLogo: L('azure-openai'), logoAspect: 1, brandHex: '#0078D4' },
  jupyter: { label: 'Jupyter', officialLogo: L('jupyter'), logoAspect: 39 / 51, brandHex: '#F37626' },
  python: { label: 'Python', officialLogo: L('python'), logoAspect: 1, brandHex: '#3776AB' },
  devops: { label: 'Jenkins', officialLogo: L('jenkins'), logoAspect: 226 / 312, brandHex: '#D24939' },
  kiro: { label: 'Kiro', officialLogo: L('kiro'), logoAspect: 1, brandHex: '#9046FF' },

  // Certification vendors not covered above
  microsoft: { label: 'Microsoft', officialLogo: L('microsoft'), logoAspect: 1, brandHex: '#05A6F0' },
  google: { label: 'Google Cloud', officialLogo: L('gcp'), logoAspect: 180.01 / 145, brandHex: '#4285F4' },
  oracle: { label: 'Oracle', officialLogo: L('oracle'), logoAspect: 233 / 32, markLogo: L('oracle-mark'), wordmark: true, brandHex: '#C74634' },
  redhat: { label: 'Red Hat', officialLogo: L('redhat'), logoAspect: 192 / 145, brandHex: '#EE0000' },
  cncf: { label: 'CNCF', officialLogo: L('cncf'), logoAspect: 1, brandHex: '#0086FF' },
  linuxfoundation: {
    label: 'The Linux Foundation',
    officialLogo: L('linuxfoundation'),
    logoAspect: 119 / 40,
    wordmark: true,
    brandHex: '#003764',
  },
} satisfies Record<string, Product>;

export type ProductId = keyof typeof products;

/** Typed accessor (keeps optional fields visible on every entry). */
export const product = (id: ProductId): Product => products[id];

/**
 * The compact official mark for small square badges (chips, pills, logo rows): the
 * square mark where the full logo is a wide wordmark (Oracle "O", Databricks bricks),
 * else the logo itself. `aspect` is width ÷ height of what is returned.
 */
export const productMark = (id: ProductId): { src: string; aspect: number } => {
  const p = product(id);
  return p.markLogo ? { src: p.markLogo, aspect: 1 } : { src: p.officialLogo, aspect: p.logoAspect };
};

/** Lab machine id (src/content/labs.ts) → its main product. */
export const labProduct: Record<string, ProductId> = {
  'windows-server-desktop': 'windows-server',
  'windows-active-directory': 'active-directory',
  'windows-hyper-v': 'hyper-v',
  'ubuntu-desktop': 'ubuntu',
  'rhel-rocky': 'rhel',
  'oracle-linux-db': 'oracle-db',
  'kiro-jenkins-devops': 'devops',
  'aks-kubernetes': 'kubernetes',
  'aro-openshift': 'openshift',
  'azure-openai-dev': 'azure-openai',
  'python-jupyter': 'jupyter',
};

/** Labs that bundle more than one product show each official logo (main product first). */
export const labLogos: Record<string, ProductId[]> = {
  'windows-active-directory': ['windows-server'],
  'rhel-rocky': ['rhel', 'rocky'],
  'kiro-jenkins-devops': ['kiro', 'devops'],
  'aks-kubernetes': ['kubernetes', 'aks'],
  'azure-openai-dev': ['azure-openai', 'ubuntu'],
  'python-jupyter': ['python', 'jupyter'],
};

/** Official logos for a lab card: its bundle if it has one, else its main product. */
export const logosForLab = (labId: string): ProductId[] => {
  if (labLogos[labId]) return labLogos[labId];
  const main = labProduct[labId];
  return main ? [main] : [];
};
