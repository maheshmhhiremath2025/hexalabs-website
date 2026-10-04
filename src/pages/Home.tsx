import { Hero } from '../components/sections/home/Hero';
import { BatchTimeline } from '../components/sections/home/BatchTimeline';
import { CatalogueBento } from '../components/sections/home/CatalogueBento';
import { TrainersSplit } from '../components/sections/home/TrainersSplit';
import { WhiteLabel } from '../components/sections/home/WhiteLabel';
import { AskHexa } from '../components/sections/home/AskHexa';
import { Security } from '../components/sections/home/Security';
import { CtaBand } from '../components/sections/CtaBand';

export default function Home() {
  return (
    <>
      <Hero />
      <BatchTimeline />
      <CatalogueBento />
      <TrainersSplit />
      <WhiteLabel />
      <AskHexa />
      <Security />
      <CtaBand />
    </>
  );
}
