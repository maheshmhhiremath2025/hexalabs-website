import { Route, Routes } from 'react-router';
import { LazyMotion, MotionConfig } from 'motion/react';
import { Layout } from './components/layout/Layout';
import { loadable } from './loadable';
import { normalisePath } from './content/seo';
import NotFound from './pages/NotFound';

/**
 * Routes. Each page is its own chunk (see loadable.tsx). main.tsx preloads the
 * current page before hydrating; the prerender step preloads all of them.
 * When adding a route, add it to `pages` below and its title/description in src/content/seo.ts.
 */
const Home = loadable(() => import('./pages/Home'));
const OfficialLabs = loadable(() => import('./pages/OfficialLabs'));
const Sandboxes = loadable(() => import('./pages/Sandboxes'));
const Labs = loadable(() => import('./pages/Labs'));
const Certifications = loadable(() => import('./pages/Certifications'));
const TrainingCompanies = loadable(() => import('./pages/TrainingCompanies'));
const Pricing = loadable(() => import('./pages/Pricing'));
const About = loadable(() => import('./pages/About'));
const Contact = loadable(() => import('./pages/Contact'));
const Legal = loadable(() => import('./pages/Legal'));

const pages: Record<string, { preload: () => Promise<void> }> = {
  '/': Home,
  '/official-labs': OfficialLabs,
  '/sandboxes': Sandboxes,
  '/labs': Labs,
  '/certifications': Certifications,
  '/for-training-companies': TrainingCompanies,
  '/pricing': Pricing,
  '/about': About,
  '/contact': Contact,
  '/privacy': Legal,
  '/terms': Legal,
};

/** Load the chunk for a path (no-op for unknown paths, which render NotFound). */
export const preloadPage = (path: string) => pages[normalisePath(path)]?.preload() ?? Promise.resolve();

/** Load every page chunk — used by the prerender step. */
export const preloadAllPages = () => Promise.all(Object.values(pages).map((p) => p.preload()));

const loadMotionFeatures = () => import('./motion-features').then((m) => m.default);

export function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="official-labs" element={<OfficialLabs />} />
            <Route path="sandboxes" element={<Sandboxes />} />
            <Route path="labs" element={<Labs />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="for-training-companies" element={<TrainingCompanies />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Legal kind="privacy" />} />
            <Route path="terms" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MotionConfig>
    </LazyMotion>
  );
}
