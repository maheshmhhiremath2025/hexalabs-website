import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { Seo } from './Seo';
import { ScrollManager } from './ScrollManager';

export function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Seo />
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* A page chunk that is not loaded yet shows an empty dark area for a moment. */}
        <Suspense fallback={<div className="min-h-screen bg-ink-950" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
