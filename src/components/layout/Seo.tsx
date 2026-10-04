import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { defaultOgImage, metaFor, normalisePath } from '../../content/seo';
import { site } from '../../content/site';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/**
 * Keeps <title>, description, canonical and social tags in sync on client-side
 * navigation. The prerender step writes the same tags into each static HTML file.
 */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaFor(pathname);
    const url = `${site.url}${normalisePath(pathname) === '/' ? '/' : normalisePath(pathname)}`;
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', `${site.url}${meta.ogImage ?? defaultOgImage}`);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
}
