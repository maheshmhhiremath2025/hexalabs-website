import { Hero } from '../components/sections/home/Hero';
import { Catalogue } from '../components/sections/home/Catalogue';
import { UseCases } from '../components/sections/home/UseCases';
import { LmsBand } from '../components/sections/home/LmsBand';
import { HowItWorks } from '../components/sections/home/HowItWorks';
import { BatchTimeline } from '../components/sections/home/BatchTimeline';
import { TrainersSplit } from '../components/sections/home/TrainersSplit';
import { WhiteLabel } from '../components/sections/home/WhiteLabel';
import { AskHexa } from '../components/sections/home/AskHexa';
import { Security } from '../components/sections/home/Security';
import { CtaBand } from '../components/sections/CtaBand';

/**
 * Section rhythm: hero (canvas) → catalogue art cards (paper) → use cases carousel (short dark band)
 * → LMS (paper) → how it works (white) → batch steps (paper) → trainers (white) → white-label (paper) → Ask Hexa (white)
 * → security (paper) → CTA band (dark, text + illustration).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Catalogue />
      <UseCases />
      <LmsBand />
      <HowItWorks />
      <BatchTimeline />
      <TrainersSplit />
      <WhiteLabel />
      <AskHexa />
      <Security />
      <CtaBand illustration="il-cta-batch" />
    </>
  );
}
