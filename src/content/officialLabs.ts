/**
 * Official labs page (/official-labs).
 * All text on the page lives here. Edit the course lists below and the
 * tables, counts and "Request" links on the page update automatically.
 *
 * Every "Request" link opens the demo form pre-filled with the course name.
 */

import type { AccentTitle } from '../components/ui/Accent';
import { requestLink, type RequestTypeId } from './requestTypes';

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const officialHero = {
  eyebrow: 'Official labs',
  title: {
    before: 'Official Azure and AWS course labs, ',
    accent: 'ready',
    after: ' for your batch.',
  } satisfies AccentTitle,
  body: 'Run the lab exercises for official Microsoft Azure and AWS courses without building anything yourself. Every learner gets their own lab environment and opens it in a browser tab. You run the class.',
  actions: {
    primary: { label: 'Book a demo', href: requestLink('official-azure') },
    secondary: { label: 'See Azure courses', href: '#azure' },
  },
  /** Small panel on the right of the hero: the offer, then links down to each course list. */
  aside: {
    title: 'Courses on this page',
    /** Opens the demo form so the visitor can ask about the offer for their batch. */
    offerLink: {
      label: 'Ask about the offer',
      href: requestLink('official-azure', 'Official labs offer'),
    },
  },
};

/* ── Course lists ─────────────────────────────────────────────────────── */

export type OfficialCourse = {
  /**
   * Official course code shown in mono type, e.g. "AZ-104T00" (Microsoft).
   * Leave out when the vendor has no public course code (AWS).
   */
  code?: string;
  /** Exam the course prepares for, e.g. "AZ-104". Shown with the course code. */
  exam?: string;
  /** Official course title as the vendor publishes it. */
  name: string;
  /** Subject area, shown in place of the code when there is no code (AWS). */
  area?: string;
  /** Must match one of the vendor's `levels` ids below. */
  level: string;
};

export type OfficialVendor = {
  /** Anchor on the page: /official-labs#azure or #aws (used by the footer). */
  id: 'azure' | 'aws';
  eyebrow: string;
  title: string;
  intro: string;
  /** Heading of the first column: "Course code" for Azure, "Area" for AWS. */
  firstColumn: string;
  requestType: RequestTypeId;
  requestAllLabel: string;
  /** Level groups, in the order they appear on the page. */
  levels: { id: string; label: string }[];
  courses: OfficialCourse[];
};

/**
 * Microsoft Azure courses, listed by official course code (checked on
 * Microsoft Learn, 4 October 2026).
 * Retired and replaced: AZ-204 -> AI-200, AZ-500 -> SC-500,
 * AZ-800 and AZ-801 -> AZ-802, AI-900 -> AI-901, AI-102 -> AI-103.
 * Levels follow the certification level of the exam each course leads to.
 */
const azure: OfficialVendor = {
  id: 'azure',
  eyebrow: 'Microsoft Azure',
  title: 'Official Azure course labs',
  intro:
    'Lab environments for Microsoft Azure courses, from fundamentals to expert level. Courses are listed by Microsoft course code, with the exam each one prepares for. Each learner gets their own environment, separate from the rest of the batch.',
  firstColumn: 'Course code',
  requestType: 'official-azure',
  requestAllLabel: 'Request Azure labs',
  levels: [
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'associate', label: 'Associate' },
    { id: 'specialty', label: 'Specialty' },
    { id: 'expert', label: 'Expert' },
  ],
  courses: [
    { code: 'AZ-900T00', exam: 'AZ-900', name: 'Introduction to Cloud Infrastructure', level: 'fundamentals' },
    { code: 'AI-901T00', exam: 'AI-901', name: 'Introduction to AI in Azure', level: 'fundamentals' },
    { code: 'DP-900T00', exam: 'DP-900', name: 'Introduction to Microsoft Azure Data', level: 'fundamentals' },
    {
      code: 'SC-900T00',
      exam: 'SC-900',
      name: 'Introduction to Microsoft Security, Compliance, and Identity',
      level: 'fundamentals',
    },

    { code: 'AZ-104T00', exam: 'AZ-104', name: 'Microsoft Azure Administrator', level: 'associate' },
    { code: 'AI-200T00', exam: 'AI-200', name: 'Develop AI cloud solutions on Azure', level: 'associate' },
    { code: 'AI-103T00', exam: 'AI-103', name: 'Develop AI apps and agents on Azure', level: 'associate' },
    {
      code: 'AI-300T00',
      exam: 'AI-300',
      name: 'Operationalize machine learning and generative AI solutions',
      level: 'associate',
    },
    {
      code: 'SC-500T00',
      exam: 'SC-500',
      name: 'Implement end-to-end security controls for cloud and AI workloads',
      level: 'associate',
    },
    {
      code: 'AZ-700T00',
      exam: 'AZ-700',
      name: 'Design and Implement Microsoft Azure Network Solutions',
      level: 'associate',
    },
    { code: 'AZ-802T00', exam: 'AZ-802', name: 'Administer Windows Server', level: 'associate' },
    {
      code: 'DP-300T00',
      exam: 'DP-300',
      name: 'Implement scalable database solutions using Azure SQL',
      level: 'associate',
    },
    {
      code: 'DP-600T00',
      exam: 'DP-600',
      name: 'Implement analytics solutions using Microsoft Fabric',
      level: 'associate',
    },
    {
      code: 'SC-200T00',
      exam: 'SC-200',
      name: 'Defend against cyberthreats with Microsoft’s security operations platform',
      level: 'associate',
    },
    { code: 'SC-300T00', exam: 'SC-300', name: 'Microsoft Identity and Access Administrator', level: 'associate' },

    {
      code: 'AZ-140T00',
      exam: 'AZ-140',
      name: 'Configure and Operate Microsoft Azure Virtual Desktop',
      level: 'specialty',
    },

    { code: 'AZ-305T00', exam: 'AZ-305', name: 'Design Microsoft Azure Infrastructure Solutions', level: 'expert' },
    { code: 'AZ-400T00', exam: 'AZ-400', name: 'Design and Implement Microsoft DevOps solutions', level: 'expert' },
  ],
};

/**
 * AWS classroom courses, with names and levels as listed in the AWS
 * classroom training catalogue (checked 4 October 2026). AWS courses have
 * no public course codes, so the first column shows the subject area instead.
 */
const aws: OfficialVendor = {
  id: 'aws',
  eyebrow: 'Amazon Web Services',
  title: 'Official AWS course labs',
  intro:
    'Lab environments for AWS classroom courses, from the essentials to architecture, data and machine learning. Each learner gets their own environment, separate from the rest of the batch.',
  firstColumn: 'Area',
  requestType: 'official-aws',
  requestAllLabel: 'Request AWS labs',
  levels: [
    { id: 'fundamental', label: 'Fundamental' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ],
  courses: [
    { name: 'AWS Cloud Practitioner Essentials', area: 'Cloud basics', level: 'fundamental' },
    { name: 'AWS Technical Essentials', area: 'Cloud basics', level: 'fundamental' },
    { name: 'AWS Security Essentials', area: 'Security', level: 'fundamental' },

    { name: 'Architecting on AWS', area: 'Architecture', level: 'intermediate' },
    { name: 'Developing on AWS', area: 'Development', level: 'intermediate' },
    { name: 'Developing Serverless Solutions on AWS', area: 'Development', level: 'intermediate' },
    { name: 'Cloud Operations on AWS', area: 'Operations', level: 'intermediate' },
    { name: 'DevOps Engineering on AWS', area: 'DevOps', level: 'intermediate' },
    { name: 'Security Engineering on AWS', area: 'Security', level: 'intermediate' },
    {
      name: 'Running Containers on Amazon Elastic Kubernetes Service (Amazon EKS)',
      area: 'Containers',
      level: 'intermediate',
    },
    { name: 'Building Data Lakes on AWS', area: 'Data', level: 'intermediate' },
    { name: 'Data Engineering on AWS', area: 'Data', level: 'intermediate' },
    { name: 'Practical Data Science with Amazon SageMaker', area: 'Machine learning', level: 'intermediate' },
    { name: 'Machine Learning Engineering on AWS', area: 'Machine learning', level: 'intermediate' },
    { name: 'MLOps Engineering on AWS', area: 'Machine learning', level: 'intermediate' },
    { name: 'Migrating to AWS', area: 'Migration', level: 'intermediate' },

    { name: 'Advanced Architecting on AWS', area: 'Architecture', level: 'advanced' },
    { name: 'Data Warehousing on AWS', area: 'Data', level: 'advanced' },
    { name: 'Developing Generative AI Applications on AWS', area: 'Generative AI', level: 'advanced' },
  ],
};

export const officialVendors = { azure, aws };

/** Text used on every course row. */
export const courseRow = {
  requestLabel: 'Request',
  /** Shown before the exam code under each Azure course code, e.g. "Exam AZ-104". */
  examLabel: 'Exam',
  /** Column labels above the list (wide screens only). The first column label is set per vendor. */
  columns: { course: 'Course', request: 'Labs' },
  /** Shown above each level group, e.g. "4 courses". */
  countLabel: (n: number) => (n === 1 ? '1 course' : `${n} courses`),
  /** Prompt under each list. */
  missing: {
    text: 'Teaching a course that isn’t listed?',
    linkLabel: 'Tell us the course',
  },
};

/** Name sent to the demo form, e.g. "AZ-104T00 Microsoft Azure Administrator". */
export function courseItemName(course: OfficialCourse) {
  return course.code ? `${course.code} ${course.name}` : course.name;
}

/** Pre-filled demo-form link for one course row. */
export function courseRequestLink(vendor: OfficialVendor, course: OfficialCourse) {
  return requestLink(vendor.requestType, courseItemName(course));
}

/* ── How a batch runs ─────────────────────────────────────────────────── */

export const officialSteps = {
  eyebrow: 'How it works',
  title: 'How an official lab batch runs',
  intro:
    'Four steps from your first message to the last day of class. You tell us about the batch. We handle the lab setup.',
  steps: [
    {
      title: 'Share the course and the batch',
      body: 'Send the course, the start and end dates, and how many learners will attend.',
    },
    {
      title: 'We prepare the labs',
      body: 'We set up a lab environment for the course’s lab exercises, one for each learner.',
    },
    {
      title: 'Learners open their labs',
      body: 'Learners sign in at labsoncloud.online and open their lab in a browser tab. Nothing to install.',
    },
    {
      title: 'Trainers manage the batch',
      body: 'Trainers track lab usage, extend access for anyone who needs more time and download reports for the batch.',
    },
  ],
};

/* ── What is included ─────────────────────────────────────────────────── */

/** One line in the included / not included lists, with an optional link after the text. */
export type ScopeItem = { text: string; link?: { label: string; href: string } };

export const officialScope = {
  eyebrow: 'What’s included',
  title: 'Labs, not the whole course.',
  intro: 'We provide the lab environments. Your training team delivers the course.',
  included: {
    heading: 'Included',
    items: [
      { text: 'A lab environment for each learner, set up for the course’s lab exercises' },
      { text: 'Browser access from labsoncloud.online, with nothing to install' },
      { text: 'Trainer access to track lab usage and give extra lab time' },
      { text: 'Lab usage reports for the batch' },
    ] satisfies ScopeItem[],
  },
  excluded: {
    heading: 'Not included unless agreed in your order',
    items: [
      { text: 'Exam vouchers', link: { label: 'See certifications', href: '/certifications' } },
      { text: 'Official courseware and learner guides' },
      { text: 'Trainers or course delivery' },
    ] satisfies ScopeItem[],
  },
  note: 'Microsoft and Azure are trademarks of the Microsoft group of companies. AWS and Amazon Web Services are trademarks of Amazon.com, Inc. or its affiliates. Course names and codes are used only to identify the course each lab supports. Their use does not imply endorsement by Microsoft or Amazon Web Services.',
};

/* ── Closing band ─────────────────────────────────────────────────────── */

export const officialCta = {
  title: 'Running an official Azure or AWS batch?',
  body: 'Tell us the course, the dates and the batch size. We’ll confirm the lab setup and the current offer on a short call.',
  cta: { label: 'Book a demo', href: requestLink('official-azure') },
};
