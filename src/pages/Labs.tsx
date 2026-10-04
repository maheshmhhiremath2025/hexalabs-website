import { labsCta, labsHero } from '../content/labs';
import { PageHero } from '../components/sections/PageHero';
import { LabCatalogue } from '../components/sections/labs/LabCatalogue';
import { ImageProcess } from '../components/sections/labs/ImageProcess';
import { CtaBand } from '../components/sections/CtaBand';

export default function Labs() {
  return (
    <>
      <PageHero eyebrow={labsHero.eyebrow} title={labsHero.title} body={labsHero.body} />
      <LabCatalogue />
      <ImageProcess />
      <CtaBand title={labsCta.title} body={labsCta.body} cta={labsCta.cta} />
    </>
  );
}
