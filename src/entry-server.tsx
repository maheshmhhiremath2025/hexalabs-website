import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App, preloadAllPages } from './App';

export { preloadAllPages };

/** Used only at build time by scripts/prerender.mjs. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export { pages, notFoundMeta, defaultOgImage, jsonLdFor } from './content/seo';
export { site } from './content/site';
