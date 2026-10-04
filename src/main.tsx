import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './styles/index.css';

import { App, preloadPage } from './App';
import { normalisePath } from './content/seo';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Hydrate when this HTML was prerendered for the current URL. Otherwise (dev
// server, or nginx serving index.html as SPA fallback for another path)
// render fresh so React doesn't try to reuse markup for a different page.
// The current page's chunk is loaded first so hydration matches the HTML exactly.
const prerenderedFor = container.dataset.prerendered;
preloadPage(window.location.pathname).finally(() => {
  if (prerenderedFor && normalisePath(prerenderedFor) === normalisePath(window.location.pathname)) {
    hydrateRoot(container, app);
  } else {
    container.textContent = '';
    createRoot(container).render(app);
  }
});
