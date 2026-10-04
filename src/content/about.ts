/** About page copy. */

export const aboutHero = {
  eyebrow: 'About',
  title: { before: 'We build the lab, so trainers can ', accent: 'teach', after: '.' },
  body: 'HexaLabs runs cloud lab machines for training companies, corporate L&D teams and individual learners. Our portal, labsoncloud.online, is where batches are deployed, opened and tracked.',
};

export const whatWeDo = {
  eyebrow: 'What we do',
  title: 'One portal for every lab in a batch.',
  paragraphs: [
    'A training batch needs the same working machine for every learner, on day one, on whatever laptop they bring. That is the whole job of HexaLabs.',
    'We prepare Windows and Linux lab images, official Azure and AWS environments, Kubernetes and OpenShift clusters, and cloud sandboxes on Azure, AWS, Google Cloud, Oracle Cloud, Databricks and Azure AI Foundry. Trainers deploy them in bulk, learners open them in a browser tab, and admins see exactly how they were used.',
  ],
};

export const principles = {
  eyebrow: 'How we work',
  title: 'Three rules we build the platform around.',
  items: [
    {
      title: 'The lab opens in a browser, every time.',
      body: 'No client software, no VPN, no port changes. If a learner can open a website, they can open their lab.',
    },
    {
      title: 'Costs stay inside the plan.',
      body: 'Idle auto-stop, daily hour limits and Spot-based infrastructure are on by default, not extras.',
    },
    {
      title: 'Problems reach a person quickly.',
      body: 'Ask Hexa handles the common questions. Anything else goes to the platform team with the machine details attached.',
    },
  ],
};

/** Who the platform is built for — the three audiences, in priority order. */
export const audiences = {
  eyebrow: 'Who we work with',
  title: 'Built for the people who run training.',
  items: [
    {
      title: 'IT training companies',
      body: 'Instructor-led batches on Azure, AWS, Linux, Windows and Kubernetes. One lab per learner, ready before class, under your brand.',
    },
    {
      title: 'Corporate L&D teams',
      body: 'Internal upskilling programs where laptops are locked down. Labs run in the cloud and open over HTTPS, with reports for every cohort.',
    },
    {
      title: 'Individual learners',
      body: 'Practice on a real machine or cloud sandbox before an exam, without installing anything on your own computer.',
    },
  ],
  contact: {
    text: 'Questions about HexaLabs? Write to',
  },
};
