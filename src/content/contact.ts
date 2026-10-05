/** Book a demo / contact page copy and form options. */

export const contactHero = {
  eyebrow: 'Book a demo',
  title: { before: 'Show us the course. We’ll show you the ', accent: 'lab', after: '.' },
  body: 'Tell us what you teach, how many learners and when the batch starts. We’ll reply with a time for a short call and a lab you can try.',
};

export const batchSizes = ['1–10 learners', '11–30 learners', '31–60 learners', '61–100 learners', '100+ learners'];

export const nextSteps = [
  { title: 'We reply', body: 'Usually within one working day, with a few time slots.' },
  { title: 'Short call', body: 'We walk through the Lab Console and open a lab together.' },
  { title: 'Trial lab', body: 'We can set up a lab for your course so your trainer can test it first.' },
];

export const formCopy = {
  successTitle: 'Request received.',
  successBody: (name: string, email: string) =>
    `Thanks, ${name}. We’ll reply to ${email} with a few time slots for a call.`,
  genericError: 'Something went wrong sending the form. Please try again or email us.',
};
