/**
 * Privacy policy and Terms of service, stored as structured content.
 * Rendered by src/pages/Legal.tsx.
 *
 * Text conventions:
 * - A plain string in `blocks` is a paragraph.
 * - `{ list: [...] }` is a bulleted list. An item can be a string or
 *   `{ term, text }`, where `term` is shown in bold before the text.
 * - Inline links use Markdown link syntax: the label in square brackets, then
 *   the href in round brackets. Internal paths, https: and mailto: all work.
 */
import { site } from './site';

export type LegalListItem = string | { term: string; text: string };
export type LegalBlock = string | { list: LegalListItem[] };

export type LegalSection = {
  /** Anchor id, used by the table of contents. Keep unique on the page. */
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  title: string;
  summary: string;
  lastUpdated: string;
  /** Same date in ISO form, for the <time> element. */
  lastUpdatedIso: string;
  sections: LegalSection[];
  cta: { title: string; body: string; label: string; href: string };
};

const email = site.contact.email;
const mail = `[${email}](mailto:${email})`;
const name = site.legalName;
const lastUpdated = '4 October 2026';
const lastUpdatedIso = '2026-10-04';

const providers = 'Microsoft Azure, Amazon Web Services (AWS), Google Cloud, Oracle Cloud Infrastructure and Databricks';

export const privacyPolicy: LegalDoc = {
  title: 'Privacy policy',
  summary: `What personal data ${name} collects through hexalabs.online and the labsoncloud.online portal, why we collect it, who we share it with and the choices you have.`,
  lastUpdated,
  lastUpdatedIso,
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      blocks: [
        `${name} runs the website at hexalabs.online and the lab portal at labsoncloud.online. Through them we provide cloud lab machines, cloud sandboxes, official course labs and official certification exam vouchers to training companies, corporate learning and development (L&D) teams and individual learners, mostly in India.`,
        `In this policy, “${name}”, “we”, “us” and “our” mean ${name}. “You” means anyone who visits the website, contacts us or uses the portal, including learners, trainers and organisation administrators.`,
        'When a training company or employer enrols you, that organisation decides why your lab access is set up and receives reports about it. Under the Digital Personal Data Protection Act, 2023 (DPDP Act), the organisation is usually the Data Fiduciary for that data, and we process it on its behalf under our contract with it. For data we collect for our own purposes, such as enquiries sent from the website, we are the Data Fiduciary.',
      ],
    },
    {
      id: 'what-we-collect',
      title: 'What we collect',
      blocks: [
        'We collect only what we need to run the service. The data falls into these groups.',
        {
          list: [
            {
              term: 'Enquiry details.',
              text: 'When you use the Book a demo form or email us: your name, work email, company, batch size, the labs you are interested in, a preferred demo date and your message.',
            },
            {
              term: 'Account details.',
              text: 'When an organisation or our team sets up portal access for you: your name, email address, organisation, training or batch, role (such as learner, trainer or administrator) and sign-in details.',
            },
            {
              term: 'Lab usage and activity.',
              text: 'The lab machines and sandboxes assigned to you, when they start and stop, hours used, sign-in times and actions you take in the portal, such as starting a machine or raising a support request.',
            },
            {
              term: 'Sandbox activity.',
              text: 'The cloud resources created in a sandbox, and the usage and cost figures the cloud provider reports for them.',
            },
            {
              term: 'Support messages.',
              text: 'Questions you send to us or to the Ask Hexa assistant in the portal, and the machine details attached to a support request.',
            },
            {
              term: 'Exam voucher details.',
              text: 'The learner’s name, email address and the exam a voucher is for, so that the voucher can be issued to the right person and tracked.',
            },
            {
              term: 'Billing details.',
              text: 'For organisations and individuals who buy from us: billing name and address, GSTIN where provided, quotes, orders, invoices and payment records.',
            },
            {
              term: 'Technical data.',
              text: 'IP address, browser and device type, and the server logs created when you load the website or use the portal.',
            },
          ],
        },
        'We do not ask for sensitive information such as bank account or card details, health information, biometric data or government identity numbers. Please do not send it to us.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and browser storage',
      blocks: [
        'The website at hexalabs.online does not set cookies. It does not use analytics, advertising or social media trackers, and its fonts are served from our own site rather than a third-party font service.',
        'The lab portal at labsoncloud.online uses cookies or browser storage that are needed to sign you in and keep your session secure. The portal cannot work without them. They are not used for advertising or to follow you on other websites.',
        'If we add analytics or any other non-essential cookies to the website in future, we will update this policy first and ask for your consent where the law requires it.',
      ],
    },
    {
      id: 'how-we-use',
      title: 'Why we use your data',
      blocks: [
        {
          list: [
            {
              term: 'To provide labs and sandboxes:',
              text: 'create your account, assign and start lab machines and sandboxes, apply time and usage limits, and end access on the agreed date.',
            },
            {
              term: 'To support you:',
              text: 'answer questions, fix problems with a lab and follow up on support requests.',
            },
            {
              term: 'To report to your organisation:',
              text: 'show the organisation that enrolled you which labs were used, by whom and for how long, and completion records where they are part of the service.',
            },
            {
              term: 'To issue exam vouchers:',
              text: 'send each voucher to the right learner and keep a record of it.',
            },
            {
              term: 'To keep the service secure:',
              text: 'detect misuse such as crypto-mining or attacks launched from a lab, protect accounts and investigate incidents.',
            },
            {
              term: 'To bill and keep records:',
              text: 'prepare quotes, orders and invoices, and meet tax and accounting rules.',
            },
            {
              term: 'To reply to enquiries:',
              text: 'arrange a demo and send you the information you asked for.',
            },
            {
              term: 'To send service messages:',
              text: 'for example account set-up, lab start dates, expiry reminders and changes to our policies.',
            },
          ],
        },
        'We do not sell personal data.',
      ],
    },
    {
      id: 'legal-basis',
      title: 'Legal basis and consent',
      blocks: [
        'We process personal data in line with the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000 and the rules made under them. We rely on the following grounds.',
        {
          list: [
            {
              term: 'Consent.',
              text: 'When you send us an enquiry or create an account yourself, you consent to us using your data for the purposes in this policy. You can withdraw consent at any time by writing to us. Withdrawal does not affect processing already done, but we may then be unable to keep providing the service to you.',
            },
            {
              term: 'Your organisation’s basis.',
              text: 'When a training company or employer enrols you, it is responsible for having a valid basis under the law, such as your consent or a purpose connected with your employment, to share your details with us. We use that data only to provide the service to that organisation.',
            },
            {
              term: 'Data given for a specific purpose.',
              text: 'Information you give us voluntarily for a particular purpose, such as billing details for an order, is used for that purpose.',
            },
            {
              term: 'Legal obligations.',
              text: 'We may process data to comply with a law, a court order or a lawful request from a government authority, and in other cases the DPDP Act permits.',
            },
          ],
        },
      ],
    },
    {
      id: 'sharing',
      title: 'Who we share it with',
      blocks: [
        'We share personal data only where it is needed to provide the service or where the law requires it.',
        {
          list: [
            {
              term: 'Cloud providers.',
              text: `Lab machines and sandboxes run on ${providers}. These providers host the labs and the data in them under their own security and privacy terms.`,
            },
            {
              term: 'Your organisation.',
              text: 'If a training company or employer enrolled you, its administrators and trainers can see your account details, the labs assigned to you and usage reports for that training.',
            },
            {
              term: 'Exam vendors and test delivery providers.',
              text: 'An exam voucher is used directly with the certification vendor or its test delivery provider. To book the exam you register with them, and they handle your data under their own terms and privacy policies. We share a learner’s details with a vendor only where the vendor needs them to issue or validate a voucher or to give access to an official lab.',
            },
            {
              term: 'Service providers.',
              text: 'Companies that help us run the business, such as email delivery, form handling, support tools including the Ask Hexa assistant, hosting of our own systems and accounting. They may use the data only to provide their service to us.',
            },
            {
              term: 'Legal requirements.',
              text: 'Courts, regulators, law enforcement agencies or other authorities where the law requires it, and professional advisers such as auditors and lawyers who are bound by confidentiality.',
            },
            {
              term: 'Business changes.',
              text: `If ${name} is reorganised, merged or sold, personal data may pass to the new owner, who must keep protecting it as this policy describes.`,
            },
          ],
        },
        'Depending on the course and the service, a lab or one of our providers may process data in a data centre outside India. Where that happens, we transfer data only as Indian law permits.',
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep it',
      blocks: [
        {
          list: [
            {
              term: 'Lab machines and sandboxes',
              text: 'are deleted, with everything stored in them, when the access period ends. A lab may also be reset or rebuilt from its starting image before then, for example to fix a fault.',
            },
            {
              term: 'Account and activity records',
              text: 'are kept for as long as needed for the contract with you or your organisation, for the reports the organisation needs and to resolve disputes. After that we delete or anonymise them.',
            },
            {
              term: 'Invoices and billing records',
              text: 'are kept for the periods set by tax and accounting laws.',
            },
            {
              term: 'Website enquiries',
              text: 'are kept while we discuss your request and for a reasonable time afterwards, unless you ask us to delete them sooner.',
            },
            {
              term: 'Security and system logs',
              text: 'are kept for as long as needed to investigate incidents and for the minimum periods set by Indian law, including directions issued by CERT-In under the IT Act, 2000.',
            },
          ],
        },
        'Once the purpose is served and no law requires us to keep the data, we delete it.',
      ],
    },
    {
      id: 'security',
      title: 'How we protect it',
      blocks: [
        'We use reasonable security practices suited to the data we handle, in line with the IT Act, 2000 and its rules. These include:',
        {
          list: [
            'encrypted connections (HTTPS) to the website and the portal;',
            'access to personal data limited to people who need it for their work;',
            'network and access controls on lab machines and sandboxes, and limits on what they can be used for;',
            'monitoring for misuse and security incidents.',
          ],
        },
        'No system is completely secure. If a personal data breach affects you, we will inform you and the relevant authorities as the law requires.',
      ],
    },
    {
      id: 'lab-data',
      title: 'Data inside lab machines',
      blocks: [
        'Lab machines and sandboxes are for training. Do not store personal data, customer data, passwords for your real accounts or other sensitive information in them.',
        'Do not use your employer’s production credentials, real customer data or your personal cloud accounts in a lab, unless your trainer has asked you to and your organisation allows it.',
        'We do not routinely look at the files or work inside your lab. We may access a lab machine or sandbox to give support you asked for, to fix a fault, or to investigate misuse or a security incident.',
        'Anything left in a lab when access ends is deleted and cannot be recovered.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      blocks: [
        'Subject to the DPDP Act and other applicable law, you have the right to:',
        {
          list: [
            {
              term: 'Access:',
              text: 'get a summary of the personal data we hold about you, how we use it and who we have shared it with.',
            },
            {
              term: 'Correction:',
              text: 'ask us to correct, complete or update inaccurate or incomplete data.',
            },
            {
              term: 'Erasure:',
              text: 'ask us to delete data we no longer need, unless the law requires us to keep it.',
            },
            {
              term: 'Withdraw consent:',
              text: 'where we rely on your consent, withdraw it at any time.',
            },
            {
              term: 'Nominate:',
              text: 'name another person to exercise your rights if you die or become unable to do so.',
            },
            {
              term: 'Grievance redressal:',
              text: 'raise a complaint with us about how your data is handled and receive a response.',
            },
          ],
        },
        `To use these rights, email ${mail} from the address linked to your account. We may ask you to confirm your identity before we act. We will respond within the period the law sets.`,
        'If an organisation enrolled you, we may pass your request to it, because it decides what data the training needs. We will tell you when we do this.',
        'If you are not satisfied with our response to a grievance, you may complain to the Data Protection Board of India.',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      blocks: [
        'The website and the portal are meant for organisations and adult learners. They are not directed at children under 18.',
        'A learner under 18 may use the portal only when enrolled by a school, college, training company or employer that supervises the training and has obtained verifiable consent from a parent or lawful guardian where the DPDP Act requires it. We do not knowingly collect personal data from children in any other way, and we do not track children or target advertising at them.',
        'If you believe a child has given us personal data without that consent, write to us and we will delete it.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        'We may update this policy when our services or the law change. The date at the top of this page shows the current version. If a change materially affects how we use your data, we will tell account holders by email or in the portal before it takes effect.',
      ],
    },
    {
      id: 'contact-grievance',
      title: 'Contact and Grievance Officer',
      blocks: [
        'For questions about this policy, to use your rights or to raise a grievance, contact our Grievance Officer.',
        {
          list: [
            { term: 'Email:', text: mail },
            { term: 'Subject line:', text: 'Privacy request or Grievance' },
          ],
        },
        'Please include your name, the email address linked to your account, the organisation that enrolled you (if any) and a short description of your request.',
        'Our [Terms of service](/terms) explain the rules for using the website and the portal.',
      ],
    },
  ],
  cta: {
    title: 'Questions about your data?',
    body: `Write to ${email} with your name, organisation and request. We reply by email.`,
    label: 'Email support',
    href: `mailto:${email}?subject=${encodeURIComponent('Privacy request')}`,
  },
};

export const termsOfService: LegalDoc = {
  title: 'Terms of service',
  summary: `The rules for using the ${name} website and the labsoncloud.online lab portal. They apply to organisations that buy from us, the people they enrol and individual learners.`,
  lastUpdated,
  lastUpdatedIso,
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance of these terms',
      blocks: [
        `By using hexalabs.online or labsoncloud.online, or by accepting a quote or order from us, you agree to these terms. If you use the service for an organisation, you confirm that you have authority to accept these terms on its behalf. If you do not agree, do not use the service.`,
        'If you have a signed agreement, quote or order with us that says something different, that document takes priority over these terms for the points it covers.',
        `In these terms, “${name}”, “we” and “us” mean ${name}. “Organisation” means a training company, employer or other body that buys access for its users. “User” means anyone who uses the portal, including learners, trainers and administrators. “Order” means a quote, order form, proposal or agreement accepted by both sides.`,
      ],
    },
    {
      id: 'services',
      title: 'The services',
      blocks: [
        {
          list: [
            {
              term: 'Lab machines:',
              text: 'Windows and Linux machines and Kubernetes clusters in the cloud, opened in a web browser.',
            },
            {
              term: 'Cloud sandboxes:',
              text: 'time-limited environments on Microsoft Azure, AWS, Google Cloud, Oracle Cloud Infrastructure, Databricks and Azure AI Foundry.',
            },
            {
              term: 'Official course labs:',
              text: 'lab environments for official Microsoft and AWS training courses.',
            },
            {
              term: 'Exam vouchers:',
              text: 'vouchers for official certification exams run by certification vendors.',
            },
            {
              term: 'Portal and support:',
              text: 'the labsoncloud.online portal, reports for organisations, the Ask Hexa assistant and our support team.',
            },
          ],
        },
        'The labs, number of users, dates, hours and limits for each organisation are set out in its order. We may improve or change features of the service over time. We will tell the organisation before we remove a feature that is central to an active order.',
      ],
    },
    {
      id: 'accounts',
      title: 'Accounts and organisations',
      blocks: [
        'Organisations must give us accurate details for the users they enrol and make sure they have the right to share those details with us, as our [Privacy policy](/privacy) explains.',
        'Organisation administrators are responsible for the users they add, the access they assign and the actions those users take in the portal. Organisations must make sure their users follow these terms.',
        {
          list: [
            'Keep your sign-in details private and do not share your account.',
            'Tell your organisation or us straight away if you think someone else has used your account.',
            'Use the service only for the training it was provided for.',
          ],
        },
        'We may refuse, suspend or close accounts that give false information or break these terms.',
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use of labs and sandboxes',
      blocks: [
        'Labs and sandboxes are for learning, practice and assessment. You must not use them, or help anyone else use them, to:',
        {
          list: [
            'mine cryptocurrency or run other compute-heavy workloads unrelated to the course;',
            'attack, scan, probe or test the security of any system outside your own lab environment, including other learners’ labs, our systems and the cloud providers’ platforms. Security tools and samples may be used only where the course requires it, and only against targets inside your own lab;',
            'send spam or bulk email, run open proxies or relays, or hide the source of network traffic;',
            'host, store or share content that is illegal, infringes anyone’s rights, or is abusive, obscene or harmful;',
            'go around or try to exceed usage limits, quotas, region or size restrictions, time caps or any other policy we apply;',
            'create accounts, keys or access that would outlast the lab, or copy lab images or course content for use elsewhere;',
            'resell, sublicense or share access with anyone who was not enrolled, unless you have a written partner agreement with us that allows it;',
            'break any law, including the IT Act, 2000, or the terms of the cloud provider whose platform the lab runs on.',
          ],
        },
        'We monitor labs and sandboxes for misuse. If we find activity that breaks these rules, we may stop the lab or sandbox at once and without notice, and we may report illegal activity to the authorities.',
      ],
    },
    {
      id: 'availability',
      title: 'Lab availability, limits and expiry',
      blocks: [
        'We work to keep labs available throughout the agreed access period. Labs run on public cloud platforms, so there may be interruptions from maintenance, cloud provider capacity or outages, or other events outside our control. Where we can, we tell affected organisations about planned maintenance in advance.',
        {
          list: [
            {
              term: 'Daily hour caps.',
              text: 'An order may limit how many hours a lab can run each day. When the cap is reached, the lab stops until the next day.',
            },
            {
              term: 'Idle auto-stop.',
              text: 'A lab left idle for a set time may stop on its own. You can start it again from the portal while your access is active.',
            },
            {
              term: 'Total hours.',
              text: 'Where an order includes a fixed number of lab hours, the lab stops when those hours are used.',
            },
            {
              term: 'End of access.',
              text: 'Access ends on the date agreed in the order. After that date the lab cannot be started.',
            },
            {
              term: 'Deletion of lab data.',
              text: 'When access ends, lab machines and everything on them are deleted. A lab may also be reset or rebuilt from its starting image during the access period, for example to fix a fault.',
            },
          ],
        },
        'You are responsible for saving your work. Copy any files, code or notes you want to keep to your own storage, such as a code repository, before access ends. We cannot recover data from a deleted lab.',
        'Extra days or hours are available only if agreed in writing, and may be charged.',
      ],
    },
    {
      id: 'sandboxes',
      title: 'Cloud sandboxes',
      blocks: [
        'A sandbox gives you access to a real cloud provider environment for a limited time, with limits on what you can create.',
        {
          list: [
            {
              term: 'Usage limits are enforced.',
              text: 'Limits may cover the services, regions, machine sizes, number of resources and spend allowed. Requests that break a limit are blocked, and resources that break one may be stopped or removed.',
            },
            {
              term: 'Resources are removed at expiry.',
              text: 'Everything created in a sandbox, including any data, is deleted when the sandbox ends.',
            },
            {
              term: 'Provider rules apply.',
              text: 'You must also follow the cloud provider’s acceptable use policy and terms while you use its platform.',
            },
            {
              term: 'No production use.',
              text: 'Do not run production workloads, store real customer data or connect a sandbox to live systems.',
            },
          ],
        },
        'If a user deliberately goes around sandbox limits, we may recover the extra cloud costs caused from the organisation that enrolled them, or from the user if they bought access directly.',
      ],
    },
    {
      id: 'official-labs-vouchers',
      title: 'Official labs and exam vouchers',
      blocks: [
        'Official course labs follow the course content and lab instructions published by the vendor. When the vendor changes or retires a course or lab, we may change or replace the lab to match.',
        {
          list: [
            'A voucher is used to book an exam directly with the certification vendor or its test delivery provider. You register with them and accept their terms, exam policies and privacy policy.',
            'A voucher can be used only for the exam or exams it was issued for, and only before its expiry date. Expiry dates are set by the vendor and we cannot extend them.',
            'Scheduling, rescheduling, cancellation, retake, identification and exam conduct rules are set by the vendor or test delivery provider.',
            'Vouchers are non-refundable and cannot be exchanged once issued, unless the vendor’s own policy allows a refund or exchange. Where it does, we will handle the request in line with that policy.',
            'A lost, expired or misused voucher cannot be replaced unless the vendor agrees.',
            'Keep voucher codes private. Anyone who has a code may be able to use it.',
          ],
        },
        `${name} does not write, set or score certification exams, and does not guarantee that any learner will pass an exam or achieve a particular result. Exam content, passing scores and certification decisions belong to the vendor.`,
        `Vendor, product and exam names are trademarks of their owners. Their use on our website or in our services does not mean that any vendor endorses ${name}.`,
      ],
    },
    {
      id: 'fees',
      title: 'Fees and payment',
      blocks: [
        {
          list: [
            'Fees, the services included, the number of users and the access period are as set out in the quote or order you accept.',
            'Prices on our website, including offers, are a guide. The price in your accepted quote or order is the one that applies.',
            'Prices exclude taxes unless the quote says otherwise. GST and any other applicable taxes are charged extra at the rates in force on the invoice date.',
            'We issue a tax invoice for each order. Payment is due within the time stated in the order or invoice.',
            'If you deduct tax at source (TDS), please send us the TDS certificate within the period the law requires.',
            'Cancellations and refunds for lab and sandbox orders follow the terms in the order. Exam vouchers follow the voucher terms above.',
            'If payment is overdue, we may suspend access after giving notice until the overdue amount is paid.',
          ],
        },
      ],
    },
    {
      id: 'suspension',
      title: 'Suspension and termination',
      blocks: [
        'We may suspend or end access for a user or an organisation, in whole or in part, if:',
        {
          list: [
            'they break these terms or the acceptable use rules;',
            'payment is overdue after notice;',
            'we need to protect the service, other users or a cloud provider’s platform; or',
            'the law or a competent authority requires it.',
          ],
        },
        'Where we can, we will give notice and a chance to fix the problem first. For serious misuse, such as crypto-mining, attacks or illegal content, we may act at once without notice.',
        'An organisation may end its use of the service as set out in its order. When access ends for any reason, labs and sandboxes are deleted as described above.',
        'The parts of these terms on fees owed, intellectual property, disclaimers, limitation of liability, indemnity and governing law continue to apply after access ends.',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      blocks: [
        `${name} owns, or holds licences for, the website, the portal, our lab images, the lab guides we write and our brand. We give you a limited, non-exclusive, non-transferable right to use them during your access period for the training they were provided for.`,
        'Course content, lab instructions and exam materials from Microsoft, AWS and other vendors belong to those vendors and are used under their terms.',
        'You keep ownership of your own work, such as code and files you create in a lab. You allow us to host and process it only as needed to run the service.',
        'You must not copy, sell, reverse engineer or build a competing service from the portal or our lab images, or remove any ownership notices.',
        'If you send us feedback or suggestions, we may use them without any obligation to you.',
      ],
    },
    {
      id: 'third-party',
      title: 'Third-party services',
      blocks: [
        `Labs and sandboxes run on platforms operated by ${providers}. Exam vouchers are used with certification vendors and their test delivery providers. These services have their own terms and policies, which you must follow when you use them through us.`,
        'We are not responsible for the acts, outages or policy changes of these third parties, but we will work with them to resolve problems that affect your labs.',
        'Links on our website to other websites are provided for convenience. We do not control those websites.',
      ],
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      blocks: [
        'We provide the service with reasonable skill and care. Apart from that and anything stated in your order, the service is provided “as is” and “as available”. To the extent the law allows, we give no other warranties, for example that labs will be free of interruptions or errors, or that the service will meet every specific need.',
        'Labs and sandboxes are training environments. They are not designed for production workloads or for storing important data.',
        'Information on our website, such as exam details, course codes and retirement dates, is given in good faith and can change when vendors update their programmes. Check the details with the vendor before you book an exam.',
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      blocks: [
        'Nothing in these terms limits any liability that cannot be limited under Indian law, such as liability for fraud.',
        'Subject to that, we are not liable for any indirect or consequential loss, or for loss of profit, revenue, business, goodwill or data, even if we were told such loss was possible.',
        'Our total liability for all claims arising from or connected with the service is limited to the fees paid to us for the affected service in the 12 months before the claim arose.',
        'We are not liable for delays or failures caused by events outside our reasonable control, such as cloud provider outages, internet or power failures, natural disasters, epidemics, government action or strikes.',
      ],
    },
    {
      id: 'indemnity',
      title: 'Indemnity',
      blocks: [
        `You agree to indemnify ${name} against claims, losses, penalties and reasonable costs, including legal fees, that arise from your or your users’ breach of these terms, misuse of labs or sandboxes, or breach of any law or third-party right.`,
        'We will tell you promptly about any such claim and give you reasonable help, at your cost, in dealing with it.',
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law and disputes',
      blocks: [
        'These terms are governed by the laws of India.',
        `If a dispute arises, please write to us at ${mail} first. Both sides will try to settle it in good faith by discussion.`,
        'If it cannot be settled that way, the courts of competent jurisdiction in India will have jurisdiction.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      blocks: [
        'We may update these terms when our services or the law change. The date at the top of this page shows the current version. If a change materially affects an active order, we will tell the organisation’s administrators by email or in the portal before it takes effect. Using the service after that date means you accept the updated terms.',
      ],
    },
    {
      id: 'general',
      title: 'General',
      blocks: [
        {
          list: [
            'If any part of these terms is found to be unenforceable, the rest still applies.',
            'If we do not enforce a right straight away, we can still enforce it later.',
            'You may not transfer your rights or obligations under these terms without our written consent.',
            'These terms, together with your order and our Privacy policy, are the whole agreement between us about the service.',
          ],
        },
      ],
    },
    {
      id: 'contact-us',
      title: 'Contact',
      blocks: [
        `For questions about these terms, write to ${mail}. For questions about personal data, see our [Privacy policy](/privacy).`,
      ],
    },
  ],
  cta: {
    title: 'Questions about these terms?',
    body: `Write to ${email} with your name, organisation and question. We reply by email.`,
    label: 'Email support',
    href: `mailto:${email}?subject=${encodeURIComponent('Question about the terms of service')}`,
  },
};

export const legalDocs = { privacy: privacyPolicy, terms: termsOfService } as const;
export type LegalKind = keyof typeof legalDocs;
