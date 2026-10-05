import type { ArtName } from '../components/ui/Art';

/**
 * One entry per platform: its own artwork and its official mark.
 *
 * Logos: official marks from Simple Icons (public/logos/*.svg), used only to show
 * which platform a lab or exam is for. Microsoft (Azure, Windows), AWS and Oracle
 * restrict use of their logos outside partner programmes and architecture diagrams,
 * so for those we show the product name in its brand colour (`wordmark`) instead.
 * Every name and logo belongs to its owner — see the trademark note in the footer.
 */
export type Product = {
  label: string;
  art: ArtName;
  /** Path under /public to an official SVG mark, when the brand permits it. */
  logo?: string;
  /** Brand colour for the name badge when no logo is shown. */
  brandHex: string;
};

export const products = {
  // Clouds and sandboxes
  azure: { label: 'Microsoft Azure', art: 'p-azure', brandHex: '#0078D4' },
  aws: { label: 'AWS', art: 'p-aws', brandHex: '#232F3E' },
  gcp: { label: 'Google Cloud', art: 'p-gcp', logo: '/logos/googlecloud.svg', brandHex: '#4285F4' },
  oci: { label: 'Oracle Cloud', art: 'p-oci', brandHex: '#C74634' },
  databricks: { label: 'Databricks', art: 'p-databricks', logo: '/logos/databricks.svg', brandHex: '#FF3621' },
  'ai-foundry': { label: 'Azure AI Foundry', art: 'p-ai-foundry', brandHex: '#0078D4' },

  // Lab machines
  'windows-server': { label: 'Windows Server', art: 'p-windows-server', brandHex: '#0078D4' },
  'active-directory': { label: 'Active Directory', art: 'p-active-directory', brandHex: '#0078D4' },
  'hyper-v': { label: 'Hyper-V', art: 'p-hyper-v', brandHex: '#0078D4' },
  ubuntu: { label: 'Ubuntu', art: 'p-ubuntu', logo: '/logos/ubuntu.svg', brandHex: '#E95420' },
  rhel: { label: 'Red Hat Enterprise Linux', art: 'p-rhel', logo: '/logos/redhat.svg', brandHex: '#EE0000' },
  'oracle-db': { label: 'Oracle Database', art: 'p-oracle-db', brandHex: '#C74634' },
  kubernetes: { label: 'Kubernetes', art: 'p-kubernetes', logo: '/logos/kubernetes.svg', brandHex: '#326CE5' },
  openshift: { label: 'Red Hat OpenShift', art: 'p-openshift', logo: '/logos/openshift.svg', brandHex: '#EE0000' },
  'azure-openai': { label: 'Azure OpenAI', art: 'p-azure-openai', brandHex: '#0078D4' },
  jupyter: { label: 'Jupyter', art: 'p-jupyter', logo: '/logos/jupyter.svg', brandHex: '#F37626' },
  devops: { label: 'Jenkins', art: 'p-devops', logo: '/logos/jenkins.svg', brandHex: '#D24939' },

  // Certification vendors not covered above
  microsoft: { label: 'Microsoft', art: 'p-azure', brandHex: '#0078D4' },
  google: { label: 'Google Cloud', art: 'p-gcp', logo: '/logos/googlecloud.svg', brandHex: '#4285F4' },
  oracle: { label: 'Oracle', art: 'p-oci', brandHex: '#C74634' },
  redhat: { label: 'Red Hat', art: 'p-rhel', logo: '/logos/redhat.svg', brandHex: '#EE0000' },
  cncf: { label: 'CNCF', art: 'p-kubernetes', logo: '/logos/cncf.svg', brandHex: '#231F20' },
} satisfies Record<string, Product>;

export type ProductId = keyof typeof products;

/** Lab machine id (src/content/labs.ts) → product. */
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
