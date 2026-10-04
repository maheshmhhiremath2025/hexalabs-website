import type { ComponentType } from 'react';

type Loader<P> = () => Promise<{ default: ComponentType<P> }>;

export type Loadable<P> = ComponentType<P> & { preload: () => Promise<void> };

/**
 * Route-level code splitting that works with prerendered HTML.
 *
 * Unlike React.lazy, a page whose chunk was preloaded renders synchronously,
 * so main.tsx can preload the current route and then hydrate without the
 * markup mismatching. Pages not yet loaded suspend (Suspense in Layout)
 * while their chunk downloads on client-side navigation.
 */
export function loadable<P extends object>(loader: Loader<P>): Loadable<P> {
  let Component: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;

  const preload = () => {
    pending ??= loader().then((m) => {
      Component = m.default;
    });
    return pending;
  };

  function LoadablePage(props: P) {
    if (Component) return <Component {...props} />;
    throw preload();
  }
  LoadablePage.preload = preload;
  return LoadablePage as Loadable<P>;
}
