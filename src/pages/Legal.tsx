import type { ReactNode } from 'react';
import { site } from '../content/site';
import { legalDocs, type LegalBlock, type LegalKind, type LegalListItem } from '../content/legal';
import { Section } from '../components/ui/Section';
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
      <section aria-labelledby="page-title" className="surface-dark">
        <div className="container-site pt-14 pb-12 sm:pt-20">
          <h1 id="page-title" className="text-h1">
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
      </section>

      <Section tone="white" className="pt-12! lg:pt-16!">
        <div className="lg:grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-labelledby="toc-title"
            className="mb-12 border-b border-line pb-10 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:max-h-[calc(100vh-var(--header-h)-4rem)] lg:overflow-y-auto lg:-mx-1 lg:px-1 lg:mb-0 lg:self-start lg:border-b-0 lg:pb-0"
          >
            <p id="toc-title" className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-orange-500" />
              On this page
            </p>
            <ol className="mt-5 space-y-2.5 text-sm sm:columns-2 sm:gap-8 lg:columns-1">
              {doc.sections.map((s, i) => (
                <li key={s.id} className="break-inside-avoid">
                  <a href={`#${s.id}`} className="group flex gap-3 text-body hover:text-heading">
                    <span aria-hidden="true" className="font-mono text-micro leading-5 text-muted">
                      {pad(i + 1)}
                    </span>
                    <span className="group-hover:underline group-hover:underline-offset-3">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article aria-labelledby="page-title" className="max-w-[68ch] text-base leading-7 text-body">
            {doc.sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className={i === 0 ? '' : 'mt-12 border-t border-line pt-10'}
              >
                <h2 id={`${s.id}-title`} className="flex items-baseline gap-3 text-h3">
                  <span aria-hidden="true" className="font-mono text-sm font-normal text-muted">
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
      </Section>

      <CtaBand title={doc.cta.title} body={doc.cta.body} cta={{ label: doc.cta.label, href: doc.cta.href }} />
    </>
  );
}
