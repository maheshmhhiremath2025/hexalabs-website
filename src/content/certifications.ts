/**
 * Certifications page: official vendor exam vouchers, plus optional
 * practice labs before exam day.
 *
 * Add, remove or edit exams in `certifications` below. The exam finder, its
 * vendor filter, the hero vendor list and every "Request voucher" link
 * update automatically.
 *
 * Exam codes, names, levels and status were checked on 4 October 2026, on each
 * vendor's own site where it could be read. Oracle's pages could not be opened
 * at the time, so the Oracle rows (and their "free" flags) come from search
 * results that point to Oracle's pages; confirm them on Oracle MyLearn when the
 * list is next reviewed. Vendors rename and retire exams often, so check the
 * vendor's exam page again before changing a row. Leave `code` as '' when the
 * vendor publishes no exam code (Google Cloud and Databricks).
 */
import type { AccentTitle } from '../components/ui/Accent';
import { requestLink, type RequestTypeId } from './requestTypes';

/* ── Types ─────────────────────────────────────────────────────────────── */

export type VendorId = 'microsoft' | 'aws' | 'google' | 'oracle' | 'redhat' | 'cncf' | 'databricks';

/**
 * Our own grouping so visitors can scan by difficulty. Vendors use their own
 * words (AWS says "Foundational", Microsoft says "Fundamentals").
 * "Business" is AWS's own category for its business-focused exams.
 */
export type CertLevel = 'Fundamentals' | 'Business' | 'Associate' | 'Professional' | 'Expert' | 'Specialty';

/** The three kinds of HexaLabs environment. Each has its own page. */
export type PracticeKind = 'official' | 'sandbox' | 'machine';

/** A HexaLabs environment a learner can practise on before the exam. */
export type PracticeId =
  | 'official-azure'
  | 'official-aws'
  | 'sandbox-azure'
  | 'sandbox-aws'
  | 'sandbox-gcp'
  | 'sandbox-oci'
  | 'sandbox-databricks'
  | 'vm-linux'
  | 'vm-windows'
  | 'vm-kubernetes'
  | 'vm-openshift';

export const practiceOptions: Record<PracticeId, { label: string; href: string; kind: PracticeKind }> = {
  'official-azure': { label: 'Official Azure lab', href: '/official-labs#azure', kind: 'official' },
  'official-aws': { label: 'Official AWS lab', href: '/official-labs#aws', kind: 'official' },
  'sandbox-azure': { label: 'Azure sandbox', href: '/sandboxes?provider=azure#providers', kind: 'sandbox' },
  'sandbox-aws': { label: 'AWS sandbox', href: '/sandboxes?provider=aws#providers', kind: 'sandbox' },
  'sandbox-gcp': { label: 'GCP sandbox', href: '/sandboxes?provider=gcp#providers', kind: 'sandbox' },
  'sandbox-oci': { label: 'OCI sandbox', href: '/sandboxes?provider=oci#providers', kind: 'sandbox' },
  'sandbox-databricks': {
    label: 'Databricks sandbox',
    href: '/sandboxes?provider=databricks#providers',
    kind: 'sandbox',
  },
  'vm-linux': { label: 'Linux lab machine', href: '/labs?type=linux', kind: 'machine' },
  'vm-windows': { label: 'Windows lab machine', href: '/labs?type=windows', kind: 'machine' },
  'vm-kubernetes': { label: 'Kubernetes cluster', href: '/labs?type=kubernetes', kind: 'machine' },
  'vm-openshift': { label: 'OpenShift lab', href: '/labs?type=kubernetes', kind: 'machine' },
};

export type Certification = {
  vendor: VendorId;
  /** Exam code as the vendor prints it, e.g. "AZ-104". '' when the vendor uses no code. */
  code: string;
  /** Official exam or certification name as the vendor publishes it. */
  name: string;
  /** Optional second line: the certification it leads to, or a prerequisite. */
  detail?: string;
  level: CertLevel;
  /** 'beta' = new exam still in beta. 'retiring' = last exam date announced. */
  status?: 'beta' | 'retiring';
  /** Last exam date for a retiring exam, e.g. "30 Nov 2026". */
  lastDate?: string;
  /** Where to practise. Left out when no HexaLabs environment fits the exam. */
  practice?: PracticeId;
  /**
   * The vendor lists the exam as free, so no voucher is needed. The row's
   * request link then asks for a practice environment instead. Needs `practice`.
   */
  free?: boolean;
};

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const certHero = {
  eyebrow: 'Certifications',
  title: { before: 'Official certification exam vouchers, with labs to ', accent: 'practise', after: ' on.' } satisfies AccentTitle,
  body: 'Vouchers for official exams from Microsoft, AWS, Google Cloud, Oracle, Red Hat, CNCF / Linux Foundation, Databricks and other certification vendors. Order them through HexaLabs for a whole batch or a single learner, and add hands-on practice labs before exam day.',
  primaryCta: { label: 'Request vouchers', href: requestLink('certification') },
  secondaryCta: { label: 'Find your exam', href: '#exams' },
  /** Vendor list next to the hero text. Each row filters the exam finder. */
  vendorPanel: {
    title: 'Popular vendors, and more on request',
    countLabel: (n: number) => `${n} ${n === 1 ? 'exam' : 'exams'}`,
    srPrefix: 'Show exams from',
    /** Last pill: any certification vendor not in the list. */
    other: { label: 'Other vendors', href: requestLink('certification', 'Voucher from another vendor') },
  },
};

/* ── Exam finder ───────────────────────────────────────────────────────── */

export const examFinder = {
  eyebrow: 'Exam finder',
  title: 'Find the exam. Request the voucher.',
  intro:
    'Current exams from our most-requested vendors. Pick a vendor to narrow the list. Each row links to a pre-filled voucher request and, where one fits, to a lab environment to practise on. Need a different vendor or exam? Ask us: we supply vouchers for other certification programmes too.',
  /** Column headings (wide screens). Each row also carries screen-reader labels. */
  columns: {
    code: 'Exam code',
    name: 'Exam and certification',
    level: 'Level',
    practiceOn: 'Practise on',
    request: 'Voucher',
  },
  requestLabel: 'Request voucher',
  /** Shown instead of "Request voucher" on exams the vendor lists as free. */
  freeRequestLabel: 'Request practice lab',
  /** Screen-reader text added after "Request voucher", before the exam name. */
  requestSrPrefix: 'for',
  /** Screen-reader text when the vendor uses no exam code. */
  noCodeSr: 'None',
  /** Shown in the "Practise on" column when no HexaLabs environment fits the exam. */
  noPractice: 'Ask us about practice options',
  betaLabel: 'Beta',
  retiringLabel: 'Retiring',
  /** Screen-reader name of the vendor filter buttons. */
  filterLabel: 'Filter exams by vendor',
  allLabel: 'All',
  /** Live count next to the filters, e.g. "Showing 22 of 75 exams". */
  showing: (shown: number, total: number) => `Showing ${shown} of ${total} exams`,
  /** Count next to each vendor heading, e.g. "4 exams". */
  groupCount: (n: number) => `${n} ${n === 1 ? 'exam' : 'exams'}`,
  notListed: {
    before: 'Exam or vendor not listed?',
    link: 'Tell us the exam code',
    href: requestLink('certification'),
    after: 'and we will check voucher availability with the vendor.',
  },
};

/** Filter chips. Order here is the order on the page. */
export const vendors: { id: VendorId; label: string }[] = [
  { id: 'microsoft', label: 'Microsoft' },
  { id: 'aws', label: 'AWS' },
  { id: 'google', label: 'Google Cloud' },
  { id: 'oracle', label: 'Oracle' },
  { id: 'redhat', label: 'Red Hat' },
  { id: 'cncf', label: 'CNCF / Linux Foundation' },
  { id: 'databricks', label: 'Databricks' },
];

const ms = (
  code: string,
  name: string,
  level: CertLevel,
  detail: string | undefined,
  practice?: PracticeId,
): Certification => ({ vendor: 'microsoft', code, name, level, detail, practice });

export const certifications: Certification[] = [
  /* Microsoft — names are the official exam titles; the line below is the certification. */
  ms('AZ-900', 'Microsoft Azure Fundamentals', 'Fundamentals', 'Microsoft Certified: Azure Fundamentals', 'official-azure'),
  ms('AI-901', 'Microsoft Azure AI Fundamentals', 'Fundamentals', 'Microsoft Certified: Azure AI Fundamentals', 'official-azure'),
  ms('DP-900', 'Microsoft Azure Data Fundamentals', 'Fundamentals', 'Microsoft Certified: Azure Data Fundamentals', 'official-azure'),
  ms(
    'SC-900',
    'Microsoft Security, Compliance, and Identity Fundamentals',
    'Fundamentals',
    'Microsoft Certified: Security, Compliance, and Identity Fundamentals',
    'official-azure',
  ),
  ms('AZ-104', 'Microsoft Azure Administrator', 'Associate', 'Microsoft Certified: Azure Administrator Associate', 'official-azure'),
  ms('AI-200', 'Microsoft Certified: Azure AI Cloud Developer Associate', 'Associate', undefined, 'official-azure'),
  ms('AI-103', 'Microsoft Certified: Azure AI Apps and Agents Developer Associate', 'Associate', undefined, 'official-azure'),
  ms('AI-300', 'Microsoft Certified: Machine Learning Operations Engineer Associate', 'Associate', undefined, 'official-azure'),
  ms('SC-500', 'Microsoft Certified: Cloud and AI Security Engineer Associate', 'Associate', undefined, 'official-azure'),
  ms(
    'AZ-700',
    'Designing and Implementing Microsoft Azure Networking Solutions',
    'Associate',
    'Microsoft Certified: Azure Network Engineer Associate',
    'official-azure',
  ),
  ms(
    'AZ-802',
    'Administering Windows Server',
    'Associate',
    'Microsoft Certified: Windows Server Hybrid Administrator Associate',
    'vm-windows',
  ),
  ms(
    'DP-300',
    'Administering Microsoft Azure SQL Solutions',
    'Associate',
    'Microsoft Certified: Azure Database Administrator Associate',
    'official-azure',
  ),
  ms(
    'DP-600',
    'Implementing Analytics Solutions Using Microsoft Fabric',
    'Associate',
    'Microsoft Certified: Fabric Analytics Engineer Associate',
    'official-azure',
  ),
  ms(
    'DP-700',
    'Implementing Data Engineering Solutions Using Microsoft Fabric',
    'Associate',
    'Microsoft Certified: Fabric Data Engineer Associate',
    'sandbox-azure',
  ),
  ms(
    'DP-750',
    'Implementing Data Engineering Solutions Using Azure Databricks',
    'Associate',
    'Microsoft Certified: Azure Databricks Data Engineer Associate',
    'sandbox-databricks',
  ),
  ms(
    'SC-200',
    'Microsoft Security Operations Analyst',
    'Associate',
    'Microsoft Certified: Security Operations Analyst Associate',
    'official-azure',
  ),
  ms(
    'SC-300',
    'Microsoft Identity and Access Administrator',
    'Associate',
    'Microsoft Certified: Identity and Access Administrator Associate',
    'official-azure',
  ),
  ms(
    'SC-401',
    'Microsoft Information Security Administrator',
    'Associate',
    'Microsoft Certified: Information Security Administrator Associate',
  ),
  ms(
    'AZ-140',
    'Configuring and Operating Microsoft Azure Virtual Desktop',
    'Specialty',
    'Microsoft Certified: Azure Virtual Desktop Specialty',
    'official-azure',
  ),
  ms(
    'AZ-305',
    'Designing Microsoft Azure Infrastructure Solutions',
    'Expert',
    'Microsoft Certified: Azure Solutions Architect Expert. Needs Azure Administrator Associate first.',
    'official-azure',
  ),
  ms(
    'AZ-400',
    'Designing and Implementing Microsoft DevOps Solutions',
    'Expert',
    'Microsoft Certified: DevOps Engineer Expert',
    'official-azure',
  ),
  ms(
    'SC-100',
    'Microsoft Cybersecurity Architect',
    'Expert',
    'Microsoft Certified: Cybersecurity Architect Expert. Needs SC-200, SC-300 or SC-500 first.',
    'sandbox-azure',
  ),

  /* AWS */
  { vendor: 'aws', code: 'CLF-C02', name: 'AWS Certified Cloud Practitioner', level: 'Fundamentals', practice: 'official-aws' },
  { vendor: 'aws', code: 'AIF-C01', name: 'AWS Certified AI Practitioner', level: 'Fundamentals', practice: 'sandbox-aws' },
  {
    vendor: 'aws',
    code: 'AIB-C01',
    name: 'AWS Certified AI Business Strategist',
    level: 'Business',
    status: 'beta',
    practice: 'sandbox-aws',
  },
  {
    vendor: 'aws',
    code: 'SAA-C03',
    name: 'AWS Certified Solutions Architect – Associate',
    level: 'Associate',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'DVA-C02',
    name: 'AWS Certified Developer – Associate',
    detail: 'DVA-C03 replaces it from 1 Dec 2026.',
    level: 'Associate',
    status: 'retiring',
    lastDate: '30 Nov 2026',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'SOA-C03',
    name: 'AWS Certified CloudOps Engineer – Associate',
    detail: 'Formerly SysOps Administrator – Associate.',
    level: 'Associate',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'DEA-C01',
    name: 'AWS Certified Data Engineer – Associate',
    level: 'Associate',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'MLA-C02',
    name: 'AWS Certified Machine Learning Engineer – Associate',
    detail: 'Updated version. Booked as ME1-C02 during the beta. Generally available from 14 Jan 2027.',
    level: 'Associate',
    status: 'beta',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'MLA-C01',
    name: 'AWS Certified Machine Learning Engineer – Associate',
    detail: 'English version has ended. Japanese, Korean and Simplified Chinese continue until MLA-C02 replaces it.',
    level: 'Associate',
    status: 'retiring',
    lastDate: '14 Jan 2027',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'SAP-C02',
    name: 'AWS Certified Solutions Architect – Professional',
    detail: 'SAP-C03 replaces it from 17 Nov 2026.',
    level: 'Professional',
    status: 'retiring',
    lastDate: '16 Nov 2026',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'DOP-C02',
    name: 'AWS Certified DevOps Engineer – Professional',
    level: 'Professional',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'AIP-C01',
    name: 'AWS Certified Generative AI Developer – Professional',
    level: 'Professional',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'SCS-C03',
    name: 'AWS Certified Security – Specialty',
    level: 'Specialty',
    practice: 'official-aws',
  },
  {
    vendor: 'aws',
    code: 'ANS-C01',
    name: 'AWS Certified Advanced Networking – Specialty',
    detail: 'No replacement exam announced.',
    level: 'Specialty',
    status: 'retiring',
    lastDate: '31 Dec 2026',
    practice: 'sandbox-aws',
  },

  /* Google Cloud — Google publishes no exam codes. */
  { vendor: 'google', code: '', name: 'Cloud Digital Leader', level: 'Fundamentals', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Generative AI Leader', level: 'Fundamentals', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Associate Cloud Engineer', level: 'Associate', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Associate Data Practitioner', level: 'Associate', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Associate Google Workspace Administrator', level: 'Associate' },
  { vendor: 'google', code: '', name: 'Professional Cloud Architect', level: 'Professional', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Professional Cloud Developer', level: 'Professional', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Professional Cloud DevOps Engineer', level: 'Professional', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Professional Data Engineer', level: 'Professional', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Professional Cloud Database Engineer', level: 'Professional', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Professional Cloud Network Engineer', level: 'Professional', practice: 'sandbox-gcp' },
  { vendor: 'google', code: '', name: 'Professional Cloud Security Engineer', level: 'Professional', practice: 'sandbox-gcp' },
  {
    vendor: 'google',
    code: '',
    name: 'Professional Security Operations Engineer',
    level: 'Professional',
    practice: 'sandbox-gcp',
  },
  {
    vendor: 'google',
    code: '',
    name: 'Professional Machine Learning Engineer',
    level: 'Professional',
    practice: 'sandbox-gcp',
  },

  /* Oracle — OCI exam codes carry a year suffix that changes each year. */
  {
    vendor: 'oracle',
    code: '1Z0-1085-26',
    name: 'Oracle Cloud Infrastructure Foundations Associate',
    detail: 'Oracle lists this exam as free, so no voucher is needed.',
    free: true,
    level: 'Fundamentals',
    practice: 'sandbox-oci',
  },
  {
    vendor: 'oracle',
    code: '1Z0-1122-26',
    name: 'Oracle Cloud Infrastructure AI Foundations Associate',
    detail: 'Oracle lists this exam as free, so no voucher is needed.',
    free: true,
    level: 'Fundamentals',
    practice: 'sandbox-oci',
  },
  {
    vendor: 'oracle',
    code: '1Z0-1072-26',
    name: 'Oracle Cloud Infrastructure Architect Associate',
    detail: 'Oracle lists this exam as free, so no voucher is needed.',
    free: true,
    level: 'Associate',
    practice: 'sandbox-oci',
  },
  {
    vendor: 'oracle',
    code: '1Z0-071',
    name: 'Oracle Database SQL',
    detail: 'Oracle Database SQL Certified Associate',
    level: 'Associate',
    practice: 'vm-linux',
  },
  {
    vendor: 'oracle',
    code: '1Z0-997-26',
    name: 'Oracle Cloud Infrastructure Architect Professional',
    level: 'Professional',
    practice: 'sandbox-oci',
  },
  {
    vendor: 'oracle',
    code: '1Z0-1127-26',
    name: 'Oracle Cloud Infrastructure Generative AI Professional',
    level: 'Professional',
    practice: 'sandbox-oci',
  },

  /* Red Hat — all exams are hands-on. */
  {
    vendor: 'redhat',
    code: 'EX200',
    name: 'Red Hat Certified System Administrator (RHCSA) exam',
    level: 'Associate',
    practice: 'vm-linux',
  },
  {
    vendor: 'redhat',
    code: 'EX188',
    name: 'Red Hat Certified Developer in Cloud-native Applications exam',
    level: 'Associate',
    practice: 'vm-linux',
  },
  {
    vendor: 'redhat',
    code: 'EX280',
    name: 'Red Hat Certified System Administrator in OpenShift exam',
    level: 'Associate',
    practice: 'vm-openshift',
  },
  {
    vendor: 'redhat',
    code: 'EX294',
    name: 'Red Hat Certified Advanced System Administrator in Ansible (RHCASA - Ansible) exam',
    detail: 'With RHCSA, leads to Red Hat Certified Engineer in Ansible.',
    level: 'Professional',
    practice: 'vm-linux',
  },
  {
    vendor: 'redhat',
    code: 'EX342',
    name: 'Red Hat Certified Advanced System Administrator in Enterprise Linux (RHCASA - Enterprise Linux) exam',
    detail: 'With RHCSA, leads to Red Hat Certified Engineer in Enterprise Linux.',
    level: 'Professional',
    practice: 'vm-linux',
  },
  {
    vendor: 'redhat',
    code: 'EX380',
    name: 'Red Hat Certified Advanced System Administrator in OpenShift (RHCASA - OpenShift) exam',
    detail: 'With EX280, leads to Red Hat Certified Engineer in OpenShift.',
    level: 'Professional',
    practice: 'vm-openshift',
  },
  {
    vendor: 'redhat',
    code: 'EX288',
    name: 'Red Hat Certified Advanced Developer in Cloud-native Applications exam',
    detail: 'With EX188, leads to Red Hat Certified Engineer in Cloud-native Applications.',
    level: 'Professional',
    practice: 'vm-openshift',
  },

  /* CNCF / Linux Foundation — the short name is the exam's identifier. */
  {
    vendor: 'cncf',
    code: 'KCNA',
    name: 'Kubernetes and Cloud Native Associate',
    level: 'Associate',
    practice: 'vm-kubernetes',
  },
  {
    vendor: 'cncf',
    code: 'KCSA',
    name: 'Kubernetes and Cloud Native Security Associate',
    level: 'Associate',
    practice: 'vm-kubernetes',
  },
  {
    vendor: 'cncf',
    code: 'CKA',
    name: 'Certified Kubernetes Administrator',
    level: 'Professional',
    practice: 'vm-kubernetes',
  },
  {
    vendor: 'cncf',
    code: 'CKAD',
    name: 'Certified Kubernetes Application Developer',
    level: 'Professional',
    practice: 'vm-kubernetes',
  },
  {
    vendor: 'cncf',
    code: 'CKS',
    name: 'Certified Kubernetes Security Specialist',
    detail: 'Needs a passed CKA. It does not have to be current.',
    level: 'Specialty',
    practice: 'vm-kubernetes',
  },

  /* Databricks — Databricks publishes no exam codes. */
  {
    vendor: 'databricks',
    code: '',
    name: 'Databricks Certified Data Engineer Associate',
    level: 'Associate',
    practice: 'sandbox-databricks',
  },
  {
    vendor: 'databricks',
    code: '',
    name: 'Databricks Certified Data Analyst Associate',
    level: 'Associate',
    practice: 'sandbox-databricks',
  },
  {
    vendor: 'databricks',
    code: '',
    name: 'Databricks Certified Machine Learning Associate',
    level: 'Associate',
    practice: 'sandbox-databricks',
  },
  {
    vendor: 'databricks',
    code: '',
    name: 'Databricks Certified Generative AI Engineer Associate',
    level: 'Associate',
    practice: 'sandbox-databricks',
  },
  {
    vendor: 'databricks',
    code: '',
    name: 'Databricks Certified Associate Developer for Apache Spark',
    level: 'Associate',
    practice: 'sandbox-databricks',
  },
  {
    vendor: 'databricks',
    code: '',
    name: 'Databricks Certified Data Engineer Professional',
    level: 'Professional',
    practice: 'sandbox-databricks',
  },
  {
    vendor: 'databricks',
    code: '',
    name: 'Databricks Certified Machine Learning Professional',
    level: 'Professional',
    practice: 'sandbox-databricks',
  },
];

/** Exam label used in links and screen-reader text, e.g. "AZ-104 Microsoft Azure Administrator". */
export const certLabel = (c: Certification) => (c.code ? `${c.code} ${c.name}` : c.name);

/** Request-form type for each practice environment (OpenShift is on the Kubernetes option). */
const practiceRequestType: Record<PracticeId, RequestTypeId> = {
  'official-azure': 'official-azure',
  'official-aws': 'official-aws',
  'sandbox-azure': 'sandbox-azure',
  'sandbox-aws': 'sandbox-aws',
  'sandbox-gcp': 'sandbox-gcp',
  'sandbox-oci': 'sandbox-oci',
  'sandbox-databricks': 'sandbox-databricks',
  'vm-linux': 'vm-linux',
  'vm-windows': 'vm-windows',
  'vm-kubernetes': 'vm-kubernetes',
  'vm-openshift': 'vm-kubernetes',
};

/**
 * Pre-filled request-form link for one exam: a voucher request, or a practice
 * lab request when the vendor lists the exam as free.
 */
export const certRequestHref = (c: Certification) =>
  c.free && c.practice
    ? requestLink(practiceRequestType[c.practice], `${certLabel(c)} practice`)
    : requestLink('certification', `${certLabel(c)} voucher`);

/** Number of exams listed for one vendor. */
export const vendorCount = (id: VendorId) => certifications.filter((c) => c.vendor === id).length;

/* ── How vouchers work ─────────────────────────────────────────────────── */

export const voucherSteps = {
  eyebrow: 'How it works',
  title: 'How vouchers work with HexaLabs',
  intro: 'Four steps from your first message to exam day. You tell us who is sitting which exam. We handle the vouchers.',
  steps: [
    {
      title: 'Tell us the exams and the number of learners',
      body: 'Send the exam codes, how many vouchers you need and roughly when learners plan to sit the exam. One learner or a full batch.',
    },
    {
      title: 'We supply the official vouchers',
      body: 'You receive one voucher per exam attempt, for the vendor’s own exam. Each voucher has an expiry date set by the vendor, so plan exam dates before you order.',
    },
    {
      title: 'Learners book with the vendor’s test provider',
      body: 'Each learner redeems their voucher and books a slot on the vendor’s exam system, online or at a test centre where the vendor offers one.',
    },
    {
      title: 'Practise before exam day',
      body: 'Optional. Add an official lab, a cloud sandbox or a lab machine for each learner, so they can work through the hands-on tasks before they sit the exam.',
    },
  ],
  table: {
    title: 'Where learners book, by vendor',
    caption: 'Exam delivery and booking for each vendor',
    columns: { vendor: 'Vendor', provider: 'Exam delivered by', book: 'Where learners book', sit: 'How they sit it' },
    rows: [
      {
        vendor: 'Microsoft',
        provider: 'Pearson VUE',
        book: 'From the exam page on Microsoft Learn',
        sit: 'Test centre or online proctored',
      },
      {
        vendor: 'AWS',
        provider: 'Pearson VUE',
        book: 'From the learner’s AWS Certification Account',
        sit: 'Test centre or online proctored',
      },
      {
        vendor: 'Google Cloud',
        provider: 'Pearson VUE',
        book: 'Through Google Cloud’s certification portal',
        sit: 'Test centre or online proctored',
      },
      {
        vendor: 'Oracle',
        provider: 'Oracle University (English exams)',
        book: 'Through Oracle MyLearn',
        sit: 'Online proctored',
      },
      {
        vendor: 'Red Hat',
        provider: 'Red Hat',
        book: 'In Red Hat’s own exam scheduler',
        sit: 'Remote exam or testing station',
      },
      {
        vendor: 'CNCF / Linux Foundation',
        provider: 'Linux Foundation, proctored by PSI',
        book: 'From the Linux Foundation training portal',
        sit: 'Online proctored only',
      },
      {
        vendor: 'Databricks',
        provider: 'Kryterion',
        book: 'Through Kryterion’s Webassessor',
        sit: 'Test centre or online proctored',
      },
    ],
    note: 'Microsoft, AWS and Google Cloud ask for any change at least 24 hours before the exam. A missed exam can use up the voucher.',
  },
};

/* ── Vouchers + practice labs ──────────────────────────────────────────── */

export const pairing = {
  eyebrow: 'Vouchers + practice labs',
  title: { before: 'Sit the exam ', accent: 'prepared', after: ', not just booked.' } satisfies AccentTitle,
  intro:
    'Order vouchers on their own, or pair each one with a practice environment. Learners work through the hands-on tasks on their own copy, then book the exam when they are ready.',
  diagram: {
    caption: 'What each learner gets',
    parts: [
      { label: 'Voucher', detail: 'One per learner, for the official exam' },
      { label: 'Practice environment', detail: 'Official lab, sandbox or lab machine' },
      { label: 'Exam day', detail: 'Booked with the vendor’s test provider' },
    ],
  },
  /** The three HexaLabs environments. Exam examples are taken from the list above. */
  destinations: [
    {
      kind: 'official' as PracticeKind,
      name: 'Official labs',
      body: 'Lab environments for Microsoft Azure and AWS official courses.',
      href: '/official-labs',
      linkLabel: 'See official labs',
    },
    {
      kind: 'sandbox' as PracticeKind,
      name: 'Cloud sandboxes',
      body: 'The real Azure, AWS, Google Cloud, OCI or Databricks console, with limits on what each learner can create.',
      href: '/sandboxes',
      linkLabel: 'See cloud sandboxes',
    },
    {
      kind: 'machine' as PracticeKind,
      name: 'Lab machines',
      body: 'Windows, Linux, Kubernetes and OpenShift, opened in a browser tab.',
      href: '/labs',
      linkLabel: 'See lab machines',
    },
  ],
  examplesLabel: 'Fits exams such as',
};

/** Up to `max` current exam codes practised on one kind of environment, one vendor at a time. */
export function practiceExamples(kind: PracticeKind, max = 5) {
  const byVendor = vendors.map((v) =>
    certifications
      .filter((c) => c.vendor === v.id && c.code && !c.status && c.practice && practiceOptions[c.practice].kind === kind)
      .map((c) => c.code),
  );
  const out: string[] = [];
  const longest = Math.max(...byVendor.map((l) => l.length));
  for (let i = 0; i < longest && out.length < max; i++) {
    byVendor.forEach((list) => {
      if (list[i] && out.length < max) out.push(list[i]);
    });
  }
  return out;
}

/* ── Small print ───────────────────────────────────────────────────────── */

export const disclaimer = {
  title: 'About vendor exams',
  paragraphs: [
    'Exam names, codes and certification titles are trademarks of their vendors. Listing an exam does not mean the vendor endorses HexaLabs.',
    'Each vendor sets its own exam content, prices, retake rules and voucher expiry dates. Those rules apply to every voucher.',
    'Vendors add, update and retire exams often. We review this list regularly; it was last checked in October 2026. Check the exam page on the vendor’s site before booking.',
    'HexaLabs does not guarantee exam results. Levels are our own grouping to help you scan the list; vendors use their own terms.',
  ],
};

/* ── Closing band ──────────────────────────────────────────────────────── */

export const certCta = {
  title: 'Planning certifications for a batch?',
  body: 'Tell us the exams and the number of learners. We will confirm the vouchers and, if you want them, set up practice labs before exam day.',
  cta: { label: 'Request vouchers', href: requestLink('certification') },
};
