/**
 * Website assistant "Hexa" (bottom-right chat). Answers come from /api/hexa-chat,
 * which only uses facts from src/content; leads go to /api/lead.
 */
import { batchSizes } from './contact';

export const hexa = {
  name: 'Hexa',
  role: 'HexaLabs assistant',
  launcherLabel: 'Ask Hexa',
  /** Small bubble above the launcher, shown once per visit after a short delay. */
  teaser: 'Planning a batch? Ask me about labs, sandboxes or vouchers.',
  teaserDelayMs: 9000,
  welcome:
    'Hi, I’m Hexa, the HexaLabs assistant. Ask me about official Azure and AWS labs, cloud sandboxes, lab machines or exam vouchers. When you’re ready, I can set up a demo for your batch.',
  starters: ['Book a demo', 'How does pricing work?', 'Which cloud sandboxes do you offer?', 'Do you sell exam vouchers?'],
  /** Quick replies that open the details form instead of asking the AI. */
  formTriggers: ['book a demo', 'talk to sales', 'get a quote', 'request a quote', 'contact the team', 'contact sales', 'share my details'],
  formIntro: 'Share a few details and the team will reply within one working day.',
  inputPlaceholder: 'Ask Hexa a question…',
  unavailable:
    'I can’t answer questions right now, but the team can. Leave your details below and we’ll reply within one working day.',
  note: 'Hexa is an AI assistant and can make mistakes.',
  form: {
    title: 'Book a demo',
    name: 'Your name',
    email: 'Work email',
    company: 'Company or institute',
    phone: 'Phone (optional)',
    interest: 'What do you need?',
    interests: [
      'Official Azure / AWS course labs',
      'Cloud sandboxes',
      'Lab machines (Windows, Linux, Kubernetes)',
      'Certification exam vouchers',
      'White-label / partner program',
      'Not sure yet',
    ],
    batchSize: 'Batch size',
    batchSizes,
    date: 'Start date (optional)',
    submit: 'Send to the team',
    sending: 'Sending…',
    consent: 'We use these details only to reply to you.',
  },
  thanks: (name: string, email: string) =>
    `Thanks, ${name}. The team will email ${email} within one working day. Anything else I can help with meanwhile?`,
  sendError: 'Sorry, that didn’t go through. Please try again, or email support@hexalabs.online.',
};
