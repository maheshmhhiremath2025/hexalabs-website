/**
 * Cloud sandboxes page (/sandboxes).
 * Edit text here — the page, its provider tabs and the "Request this sandbox"
 * links update automatically. Keep every line true: when a detail is not
 * certain, describe it in general terms rather than naming a mechanism.
 */

import type { AccentTitle } from '../components/ui/Accent';
import { requestLink, type RequestTypeId } from './requestTypes';

export type SandboxProviderId = 'azure' | 'aws' | 'gcp' | 'oci' | 'databricks' | 'ai-foundry';

/** A label/value row in the small spec card shown beside each provider. */
export type SandboxMockRow = {
  label: string;
  value: string;
};

export type SandboxProvider = {
  id: SandboxProviderId;
  /** Full provider name, used as the panel heading. */
  name: string;
  /** Short name for the tab on small screens. */
  shortName: string;
  /** What the learner works in, shown in mono type under the tab name. */
  unit: string;
  /** One line under the provider name. */
  summary: string;
  learnerGets: string[];
  guardrails: string[];
  /** Courses or exams trainers typically use it for. */
  typicalUse: string[];
  /** Demo-form type, so the form arrives pre-filled. */
  requestType: RequestTypeId;
  /** Plain spec card with the provider's key limits, as label/value text. */
  mock: { title: string; rows: SandboxMockRow[] };
};

export const sandboxesHero = {
  eyebrow: 'Cloud sandboxes',
  title: { before: 'The real cloud console, with ', accent: 'guardrails', after: ' for every learner.' } satisfies AccentTitle,
  body: 'Each learner gets their own sandbox on Azure, AWS, Google Cloud, Oracle Cloud, Databricks or Azure AI Foundry. They work in the real console. We set limits on what they can create, track spend and clean up when access ends.',
  primary: { label: 'Book a demo', href: requestLink('unsure', 'Cloud sandboxes') },
  secondary: { label: 'See the six providers', href: '/sandboxes#providers' },
  /** Decorative card beside the hero text. */
  card: {
    title: 'Every sandbox',
    rows: [
      { label: 'Sign-in', value: 'Own login' },
      { label: 'Limits', value: 'Set for the course' },
      { label: 'Spend', value: 'Tracked per learner' },
      { label: 'Access ends', value: 'On the agreed date' },
    ],
  },
};

export const providersSection = {
  eyebrow: 'Providers',
  title: 'Pick the cloud your course is built on.',
  intro: 'Every sandbox belongs to one learner. Choose a provider to see what the learner gets and the limits we set.',
  tabsLabel: 'Sandbox providers',
  labels: {
    learnerGets: 'What the learner gets',
    guardrails: 'Guardrails',
    typicalUse: 'Typical use',
    request: 'Request this sandbox',
  },
};

export const providers: SandboxProvider[] = [
  {
    id: 'azure',
    name: 'Microsoft Azure',
    shortName: 'Azure',
    unit: 'Entra ID · resource groups',
    summary: 'A Microsoft Entra ID sign-in and resource groups that belong to one learner.',
    learnerGets: [
      'Their own Microsoft Entra ID sign-in to the Azure portal',
      'Their own resource groups to create, change and delete resources in',
      'A sandbox they can relaunch after it expires, when the trainer allows it',
    ],
    guardrails: [
      'Resource limits per sandbox: up to 3 virtual machines, 1 load balancer and 1 application gateway',
      'Extra VMs are stopped automatically, and extra load balancers or application gateways are removed',
      'Azure Policy restricts which services and VM sizes can be used',
      'A daily hour cap and a countdown to the end of access',
      'The sandbox expires at the end of access and its resources are removed',
    ],
    typicalUse: ['AZ-900 practice', 'AZ-104 practice'],
    requestType: 'sandbox-azure',
    mock: {
      title: 'Azure limits',
      rows: [
        { label: 'Virtual machines', value: 'up to 3' },
        { label: 'Load balancers', value: 'up to 1' },
        { label: 'Application gateways', value: 'up to 1' },
      ],
    },
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    shortName: 'AWS',
    unit: 'Console · tagged resources',
    summary: 'An AWS sandbox where every resource is traced back to the learner who created it.',
    learnerGets: [
      'Their own sign-in to the AWS Management Console',
      'Room to build with the AWS services the course needs',
    ],
    guardrails: [
      'Resources are tagged to the learner who created them',
      'A budget per learner, with alerts that track spend',
      'What a learner can create is limited to what the course needs',
      'Access ends on the agreed date and resources are removed',
    ],
    typicalUse: ['Cloud Practitioner (CLF-C02) practice', 'Solutions Architect Associate (SAA-C03) practice'],
    requestType: 'sandbox-aws',
    mock: {
      title: 'AWS guardrails',
      rows: [
        { label: 'Spend', value: 'Budget per learner' },
        { label: 'Resources', value: 'Tagged to the learner' },
      ],
    },
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    shortName: 'GCP',
    unit: 'Project per learner',
    summary: 'A Google Cloud project per learner with resource limits, so they use the real console safely.',
    learnerGets: [
      'Their own Google Cloud project, opened from a login link in the portal',
      'Sign-in with their own Google account',
      'Start-here steps, the region to use and a countdown to the end of access',
    ],
    guardrails: [
      'A list of allowed services and a list of restricted services for each lab template',
      'A daily hour cap, with the hours left shown to the learner',
      'Spend is tracked for each learner’s project',
      'The project is removed at the end of access',
    ],
    typicalUse: ['Cloud Digital Leader practice', 'Associate Cloud Engineer practice'],
    requestType: 'sandbox-gcp',
    mock: {
      title: 'GCP guardrails',
      rows: [
        { label: 'Daily cap', value: 'Hours per day, per learner' },
        { label: 'Services', value: 'Allowed and restricted lists' },
      ],
    },
  },
  {
    id: 'oci',
    name: 'Oracle Cloud Infrastructure',
    shortName: 'OCI',
    unit: 'Compartment per learner',
    summary: 'A compartment per learner, with quotas and shape limits enforced automatically.',
    learnerGets: [
      'Their own compartment in Oracle Cloud',
      'Their own sign-in to the OCI console',
    ],
    guardrails: [
      'Deployed from a template with allowed services (compute, storage, networking, Autonomous Database, Functions and more) and blocked ones (Exadata, bare metal, GPU instances, FastConnect, GoldenGate)',
      'Shape limits are enforced automatically. Instances outside the allowed shapes are removed',
      'A session time limit, plus daily and total hour caps per learner',
      'After the batch end date, the learner’s sandbox user is deleted',
    ],
    typicalUse: ['OCI Foundations Associate practice', 'OCI Architect Associate practice'],
    requestType: 'sandbox-oci',
    mock: {
      title: 'OCI guardrails',
      rows: [
        { label: 'Session limit', value: 'Set per template' },
        { label: 'Daily and total caps', value: 'Set per learner' },
        { label: 'Out-of-policy instances', value: 'Removed' },
      ],
    },
  },
  {
    id: 'databricks',
    name: 'Databricks',
    shortName: 'Databricks',
    unit: 'Workspace access',
    summary: 'Databricks workspace access per learner, with limits on the compute they can start.',
    learnerGets: [
      'Their own access to a Databricks workspace',
      'Notebooks and compute for the course exercises',
    ],
    guardrails: [
      'Limits on the compute a learner can start',
      'Spend is tracked for each learner',
      'Access is removed at the end of the batch',
    ],
    typicalUse: ['Data Engineer Associate practice', 'Spark and notebooks practice'],
    requestType: 'sandbox-databricks',
    mock: {
      title: 'Databricks guardrails',
      rows: [
        { label: 'Compute', value: 'Within set limits' },
        { label: 'Workspace access', value: 'Own sign-in' },
      ],
    },
  },
  {
    // "Azure AI Foundry" is the client's name for this sandbox. The summary gives Microsoft's new name once.
    id: 'ai-foundry',
    name: 'Azure AI Foundry',
    shortName: 'AI Foundry',
    unit: 'Dedicated AI resource',
    summary:
      'A dedicated Azure OpenAI resource per learner in Azure AI Foundry (now called Microsoft Foundry), for deploying and calling models.',
    learnerGets: [
      'Their own Azure OpenAI / AI Foundry resource',
      'Rights to deploy models and call them from their own code',
    ],
    guardrails: [
      'Model quota is set per learner',
      'Spend is tracked for each learner',
      'The resource is removed at the end of access',
    ],
    typicalUse: ['AI-901 practice', 'AI-103 practice', 'Generative AI course'],
    requestType: 'sandbox-ai-foundry',
    mock: {
      title: 'AI Foundry guardrails',
      rows: [
        { label: 'AI resource', value: 'One per learner' },
        { label: 'Model quota', value: 'Set per learner' },
      ],
    },
  },
];

/** Link for the "Request this sandbox" button on each provider panel. */
export const sandboxRequestLink = (p: SandboxProvider) => requestLink(p.requestType, `${p.shortName} sandbox`);

export const guardrailsSection = {
  eyebrow: 'Guardrails',
  title: 'Guardrails on every sandbox.',
  intro: 'Learners work in the real cloud, so we set limits before the batch starts. The details differ by provider. These are the controls we use.',
  items: [
    {
      term: 'Own login per learner',
      body: 'Each learner signs in with their own account. Nobody shares a password, and each learner’s work stays separate.',
    },
    {
      term: 'Limits on what can be created',
      body: 'Policies and quotas set which services and sizes a learner can use. Anything outside the limits is refused or removed.',
    },
    {
      term: 'Spend control',
      body: 'Spend is tracked for each learner, not only for the batch as a whole.',
    },
    {
      term: 'Daily and total hour caps',
      body: 'Where the provider allows it, each learner gets a set number of hours per day, and optionally in total. Learners can see how much time is left.',
    },
    {
      term: 'Automatic expiry and clean-up',
      body: 'Access ends on the date you agree with us. The sandbox and the resources in it are removed.',
    },
  ],
};

export type ChoiceId = 'sandbox' | 'machine' | 'official';

export const comparisonSection = {
  eyebrow: 'Choosing',
  title: 'Sandbox or lab machine?',
  intro: 'Three kinds of lab, for three kinds of course. If you are not sure, tell us the course and we will suggest one.',
  tableCaption: 'Cloud sandbox, lab machine and official lab compared',
  rowHeader: 'Compare',
  columns: [
    {
      id: 'sandbox' as ChoiceId,
      name: 'Cloud sandbox',
      link: { label: 'Compare providers', href: '/sandboxes#providers' },
    },
    {
      id: 'machine' as ChoiceId,
      name: 'Lab machine',
      link: { label: 'Browse lab machines', href: '/labs' },
    },
    {
      id: 'official' as ChoiceId,
      name: 'Official lab',
      link: { label: 'See official labs', href: '/official-labs' },
      /** Shows the site-wide offer marker (site.offer.short). */
      offer: true,
    },
  ],
  rows: [
    {
      label: 'What the learner gets',
      cells: {
        sandbox: 'Their own login to the real cloud console, with limits.',
        machine: 'A Windows or Linux desktop in a browser tab, with your course software installed.',
        official: 'The lab environment for an official Microsoft Azure or AWS course.',
      },
    },
    {
      label: 'Choose it when',
      cells: {
        sandbox: 'Learners must practise in the console itself: networks, VMs, storage, data or AI models.',
        machine: 'The course is about software, not a cloud account. For example Linux, Windows Server, databases or Kubernetes.',
        official: 'You deliver an official Microsoft or AWS course and need the labs that go with it.',
      },
    },
    {
      label: 'Example',
      cells: {
        sandbox: 'AZ-104 practice in the Azure portal',
        machine: 'Linux system administration on RHEL',
        official: 'An official Azure administrator course',
      },
    },
  ] satisfies { label: string; cells: Record<ChoiceId, string> }[],
};

export const sandboxesCta = {
  title: 'Tell us the course. We’ll set up the sandboxes.',
  body: 'Share the cloud, the number of learners and the dates. We’ll come back with the limits we recommend and a written quote.',
  cta: { label: 'Book a demo', href: requestLink('unsure', 'Cloud sandboxes') },
};

