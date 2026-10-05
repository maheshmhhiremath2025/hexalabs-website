import type { ReactNode } from 'react';
import { site } from '../content/site';
import { legalDocs, type LegalBlock, type LegalKind, type LegalListItem } from '../content/legal';
import { Art } from '../components/ui/Art';
import { Chip } from '../components/ui/Chip';
import { SmartLink } from '../components/ui/SmartLink';
import { CtaBand } from '../components/sections/CtaBand';

type Props = { kind: LegalKind };

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Turns Markdown-style links in content strings into links. Everything else stays plain text. */
function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK_RE)) {
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    out.push(
      <SmartLink key={start} href={match[2]} className="link underline decoration-line-strong">
        {match[1]}
      </SmartLink>,
    );
    last = start + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function ListItem({ item }: { item: LegalListItem }) {
  if (typeof item === 'string') return <li>{renderInline(item)}</li>;
  return (
    <li>
      <strong className="font-medium text-heading">{item.term}</strong> {renderInline(item.text)}
    </li>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p>{renderInline(block)}</p>;
  return (
    <ul className="list-disc space-y-3 pl-5 marker:text-muted">
      {block.list.map((item) => (
        <ListItem key={typeof item === 'string' ? item : item.term + item.text} item={item} />
      ))}
    </ul>
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function Legal({ kind }: Props) {
  const doc = legalDocs[kind];

  return (
    <>
      {/* Light header on the canvas: chip, light-weight h1, summary, date */}
      <section aria-labelledby="page-title" className="surface-paper">
        <div className="container-site grid grid-cols-12 items-center gap-x-6 gap-y-8 pt-12 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
          <div className="col-span-12 lg:col-span-8">
            <p>
              <Chip tone="soft">Legal</Chip>
            </p>
            <h1 id="page-title" className="display mt-5 text-h1">
              {doc.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-body">{doc.summary}</p>
            <p className="mt-6 font-mono text-micro text-muted">
              {site.legalName}
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              Last updated: <time dateTime={doc.lastUpdatedIso}>{doc.lastUpdated}</time>
            </p>
          </div>
          <div aria-hidden="true" className="col-span-4 hidden lg:block">
            <div className="overflow-hidden rounded-[20px] shadow-card">
              <Art name="security" priority sizes="(min-width: 1024px) 360px, 0px" className="aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      {/* The document on a white inset panel */}
      <div className="px-2 pb-16 sm:px-3 lg:pb-24">
        <div className="surface-white rounded-[20px] shadow-card sm:rounded-panel">
          <div className="container-site py-10 sm:py-14 lg:py-20">
            <div className="lg:grid lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
              <nav
                aria-labelledby="toc-title"
                className="mb-12 rounded-card bg-raised p-5 sm:p-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:mb-0 lg:max-h-[calc(100vh-var(--header-h)-3rem)] lg:self-start lg:overflow-y-auto"
              >
                <p id="toc-title" className="eyebrow flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  On this page
                </p>
                <ol className="mt-4 space-y-1 text-sm sm:columns-2 sm:gap-6 lg:columns-1">
                  {doc.sections.map((s, i) => (
                    <li key={s.id} className="break-inside-avoid">
                      <a
                        href={`#${s.id}`}
                        className="group flex gap-3 rounded-lg px-2 py-1.5 text-body transition-colors duration-300 hover:bg-white hover:text-heading"
                      >
                        <span aria-hidden="true" className="font-mono text-micro leading-5 text-muted">
                          {pad(i + 1)}
                        </span>
                        <span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <article aria-labelledby="page-title" className="max-w-[68ch] text-base leading-7 text-body">
                {doc.sections.map((s, i) => (
                  <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={i === 0 ? '' : 'mt-12 border-t border-line pt-10'}>
                    <h2 id={`${s.id}-title`} className="flex items-baseline gap-3 text-h3 font-medium">
                      <span aria-hidden="true" className="font-mono text-sm font-normal text-blue-600">
                        {pad(i + 1)}
                      </span>
                      <span>{s.title}</span>
                    </h2>
                    <div className="mt-4 space-y-4">
                      {s.blocks.map((block, j) => (
                        <Block key={j} block={block} />
                      ))}
                    </div>
                  </section>
                ))}
              </article>
            </div>
          </div>
        </div>
      </div>

      <CtaBand title={doc.cta.title} body={doc.cta.body} cta={{ label: doc.cta.label, href: doc.cta.href }} art="white-label" chip="Contact" />
    </>
  );
}
