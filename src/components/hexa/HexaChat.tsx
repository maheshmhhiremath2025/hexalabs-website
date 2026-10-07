import { Fragment, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowUp, CircleCheck, X } from 'lucide-react';
import { hexa } from '../../content/hexa';
import { SmartLink } from '../ui/SmartLink';
import { HexaAvatar } from './HexaAvatar';

type Role = 'user' | 'assistant';
type Msg =
  | { kind: 'text'; role: Role; content: string }
  | { kind: 'form' }
  | { kind: 'sent'; content: string };

type Lead = { name: string; email: string; company: string; phone: string; interest: string; batchSize: string; date: string; website: string };

const STORE = 'hexa-chat-v1';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const emptyLead: Lead = { name: '', email: '', company: '', phone: '', interest: '', batchSize: '', date: '', website: '' };

/** Site pages Hexa may link to (anything else is left as plain text). */
const PAGE_LINK = /(^|[\s(])(\/(?:official-labs|sandboxes|labs|certifications|pricing|for-training-companies|contact|about|privacy|terms)(?:[#?][\w=&%.-]*)?)(?=$|[\s).,;:!?])/g;
const TOKEN = /(\bhttps?:\/\/[^\s),]+[^\s),.]|\b(?:store\.|learn\.)?(?:hexalabs|labsoncloud)\.online\b|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

/** Plain-text reply → paragraphs and "- " bullets, with site paths, URLs and emails linked. */
function RichText({ text }: { text: string }) {
  const linkify = (s: string, key: string): ReactNode[] => {
    const out: ReactNode[] = [];
    // First split on site paths, then on URLs/emails inside the remaining text.
    let last = 0;
    s.replace(PAGE_LINK, (m, pre: string, path: string, offset: number) => {
      out.push(...plainLinks(s.slice(last, offset) + pre, `${key}-t${offset}`));
      out.push(
        <SmartLink key={`${key}-p${offset}`} href={path} className="hexa-link">
          {path}
        </SmartLink>,
      );
      last = offset + m.length;
      return m;
    });
    out.push(...plainLinks(s.slice(last), `${key}-end`));
    return out;
  };
  const plainLinks = (s: string, key: string): ReactNode[] =>
    s.split(TOKEN).map((part, i) => {
      if (!part) return null;
      if (/^https?:\/\//.test(part)) {
        return (
          <a key={`${key}-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="hexa-link">
            {part.replace(/^https?:\/\//, '')}
          </a>
        );
      }
      if (/^(?:store\.|learn\.)?(?:hexalabs|labsoncloud)\.online$/.test(part)) {
        return (
          <a key={`${key}-${i}`} href={`https://${part}`} target="_blank" rel="noopener noreferrer" className="hexa-link">
            {part}
          </a>
        );
      }
      if (/@/.test(part) && !/\s/.test(part)) {
        return (
          <a key={`${key}-${i}`} href={`mailto:${part}`} className="hexa-link">
            {part}
          </a>
        );
      }
      return <Fragment key={`${key}-${i}`}>{part}</Fragment>;
    });

  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = (k: number) => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul${k}`} className="space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-none rounded-full bg-current opacity-60" />
            <span>{linkify(b, `b${k}-${i}`)}</span>
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };
  lines.forEach((l, i) => {
    const bullet = l.match(/^[-•*]\s+(.*)$/);
    if (bullet) bullets.push(bullet[1]);
    else {
      flush(i);
      blocks.push(<p key={`p${i}`}>{linkify(l, `l${i}`)}</p>);
    }
  });
  flush(lines.length);
  return <div className="space-y-2">{blocks}</div>;
}

function loadStored(): Msg[] {
  try {
    const raw = sessionStorage.getItem(STORE);
    const parsed = raw ? (JSON.parse(raw) as Msg[]) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : [{ kind: 'text', role: 'assistant', content: hexa.welcome }];
  } catch {
    return [{ kind: 'text', role: 'assistant', content: hexa.welcome }];
  }
}

/** The details form shown inside the chat. */
function LeadForm({
  onSent,
  transcript,
  autoFocus = false,
}: {
  onSent: (name: string, email: string) => void;
  transcript: () => { role: Role; content: string }[];
  /** Move focus to the first field (only when the visitor opened the form). */
  autoFocus?: boolean;
}) {
  const uid = useId();
  const firstRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) firstRef.current?.focus();
  }, [autoFocus]);
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const f = hexa.form;
  const set = (k: keyof Lead, v: string) => setLead((l) => ({ ...l, [k]: v }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (lead.name.trim().length < 2 || !EMAIL_RE.test(lead.email.trim()) || !lead.company.trim()) {
      setError('Please add your name, a valid work email and your company.');
      return;
    }
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          source: 'hexa-chat',
          name: lead.name.trim(),
          email: lead.email.trim(),
          company: lead.company.trim(),
          phone: lead.phone.trim(),
          interest: lead.interest,
          batchSize: lead.batchSize,
          preferredDate: lead.date,
          transcript: transcript(),
          page: window.location.href,
          website: lead.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      onSent(lead.name.trim(), lead.email.trim());
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      setError(/name|email|company|phone/i.test(msg) ? msg : hexa.sendError);
      setSending(false);
    }
  }

  const field = 'hexa-field';
  return (
    <form onSubmit={submit} noValidate aria-label={f.title} className="hexa-form">
      <p className="text-sm font-medium text-heading">{f.title}</p>
      <p className="mt-0.5 text-xs text-body">{hexa.formIntro}</p>
      <div className="mt-3 grid gap-2">
        <label className="sr-only" htmlFor={`${uid}-n`}>{f.name}</label>
        <input ref={firstRef} id={`${uid}-n`} className={field} placeholder={f.name} autoComplete="name" value={lead.name} onChange={(e) => set('name', e.target.value)} maxLength={120} required />
        <label className="sr-only" htmlFor={`${uid}-e`}>{f.email}</label>
        <input id={`${uid}-e`} className={field} placeholder={f.email} type="email" autoComplete="email" value={lead.email} onChange={(e) => set('email', e.target.value)} maxLength={160} required />
        <label className="sr-only" htmlFor={`${uid}-c`}>{f.company}</label>
        <input id={`${uid}-c`} className={field} placeholder={f.company} autoComplete="organization" value={lead.company} onChange={(e) => set('company', e.target.value)} maxLength={160} required />
        <label className="sr-only" htmlFor={`${uid}-p`}>{f.phone}</label>
        <input id={`${uid}-p`} className={field} placeholder={f.phone} type="tel" autoComplete="tel" value={lead.phone} onChange={(e) => set('phone', e.target.value)} maxLength={40} />
        <label className="sr-only" htmlFor={`${uid}-i`}>{f.interest}</label>
        <select id={`${uid}-i`} className={field} value={lead.interest} onChange={(e) => set('interest', e.target.value)}>
          <option value="">{f.interest}</option>
          {f.interests.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <label className="sr-only" htmlFor={`${uid}-b`}>{f.batchSize}</label>
          <select id={`${uid}-b`} className={field} value={lead.batchSize} onChange={(e) => set('batchSize', e.target.value)}>
            <option value="">{f.batchSize}</option>
            {f.batchSizes.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor={`${uid}-d`}>{f.date}</label>
          <input id={`${uid}-d`} className={field} type="date" title={f.date} aria-label={f.date} value={lead.date} onChange={(e) => set('date', e.target.value)} />
        </div>
        {/* Honeypot: hidden from people, bots tend to fill it. */}
        <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" value={lead.website} onChange={(e) => set('website', e.target.value)} />
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-xs text-[#b42318]">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={sending} className="hexa-submit mt-3">
        {sending ? f.sending : f.submit}
      </button>
      <p className="mt-2 text-[11px] leading-4 text-muted">
        {f.consent}{' '}
        <SmartLink href="/privacy" className="underline">
          Privacy
        </SmartLink>
      </p>
    </form>
  );
}

/**
 * Hexa chat panel (lazy-loaded when the launcher opens). Keeps the conversation
 * for the visit in sessionStorage, asks /api/hexa-chat for answers and shows the
 * details form when the visitor is ready.
 */
export default function HexaChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>(loadStored);
  const [quick, setQuick] = useState<string[]>(() => (loadStored().length > 1 ? [] : hexa.starters));
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [focusForm, setFocusForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const titleId = useId();

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-40)));
    } catch {
      /* storage unavailable: the chat still works for this page view */
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // On phones the panel covers the page: make the rest of the page inert while it is open.
  useEffect(() => {
    const root = panelRef.current?.closest('.hexa-root');
    const parent = root?.parentElement;
    if (!root || !parent) return;
    const mq = window.matchMedia('(width < 40rem)');
    const siblings = () => Array.from(parent.children).filter((el): el is HTMLElement => el !== root && el instanceof HTMLElement);
    const sync = () => siblings().forEach((el) => (el.inert = mq.matches));
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      siblings().forEach((el) => (el.inert = false));
    };
  }, []);

  const hasOpenForm = messages.some((m) => m.kind === 'form');
  const sent = messages.some((m) => m.kind === 'sent');

  const transcript = () =>
    messages.filter((m): m is Extract<Msg, { kind: 'text' }> => m.kind === 'text').map(({ role, content }) => ({ role, content }));

  function showForm(extra?: Msg) {
    setMessages((m) => [...m.filter((x) => x.kind !== 'form'), ...(extra ? [extra] : []), { kind: 'form' }]);
  }

  async function ask(textIn: string) {
    const q = textIn.trim().slice(0, 1000);
    if (!q || busy) return;
    setInput('');
    setQuick([]);
    const userMsg: Msg = { kind: 'text', role: 'user', content: q };

    // Buttons like "Book a demo" open the form straight away (and move focus into it).
    if (hexa.formTriggers.includes(q.toLowerCase())) {
      setFocusForm(true);
      showForm(userMsg);
      return;
    }
    inputRef.current?.focus();

    const next = [...messages, userMsg];
    setMessages(next);
    setBusy(true);
    try {
      const history = next
        .filter((m): m is Extract<Msg, { kind: 'text' }> => m.kind === 'text')
        .slice(-12)
        .map(({ role, content }) => ({ role, content }));
      const res = await fetch('/api/hexa-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; showLeadForm?: boolean; quickReplies?: string[]; error?: string };
      if (!res.ok || !data.reply) {
        const reply: Msg = { kind: 'text', role: 'assistant', content: res.status === 429 && data.error ? data.error : hexa.unavailable };
        if (sent) setMessages((m) => [...m, reply]);
        else showForm(reply);
        return;
      }
      const reply: Msg = { kind: 'text', role: 'assistant', content: data.reply };
      const formNext = (data.showLeadForm || hasOpenForm) && !sent;
      if (data.showLeadForm && !sent) showForm(reply);
      else setMessages((m) => [...m, reply]);
      // With the form on screen (or already sent), drop "Book a demo"-style chips.
      const chips = (data.quickReplies ?? []).filter((q) => !(formNext || sent) || !hexa.formTriggers.includes(q.toLowerCase()));
      setQuick(chips.slice(0, 3));
    } catch {
      const reply: Msg = { kind: 'text', role: 'assistant', content: hexa.unavailable };
      if (sent) setMessages((m) => [...m, reply]);
      else showForm(reply);
    } finally {
      setBusy(false);
    }
  }

  function onSent(name: string, email: string) {
    setMessages((m) => [...m.filter((x) => x.kind !== 'form'), { kind: 'sent', content: hexa.thanks(name, email) }]);
    setQuick([]);
    setFocusForm(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Don't send while an input-method composition (e.g. Hindi or Tamil keyboards) is in progress.
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void ask(input);
    }
  }

  // Screen readers hear only Hexa's newest reply (or that Hexa is typing), not the whole log.
  const lastBot = [...messages].reverse().find((m) => m.kind === 'sent' || (m.kind === 'text' && m.role === 'assistant'));
  const liveText = busy ? 'Hexa is typing' : lastBot && 'content' in lastBot ? lastBot.content : '';

  return (
    <section
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="hexa-panel"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      <p className="sr-only" role="status" aria-live="polite">
        {liveText}
      </p>
      <header className="hexa-head">
        <HexaAvatar size={40} />
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="text-base leading-tight font-medium text-white">
            {hexa.name}
          </h2>
          <p className="flex items-center gap-1.5 text-xs text-slate-300">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            {hexa.role}
          </p>
        </div>
        <button type="button" onClick={onClose} className="hexa-icon-btn" aria-label="Close chat">
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </header>

      <div ref={scrollRef} className="hexa-body" role="log" aria-live="off" aria-label="Conversation">
        {messages.map((m, i) =>
          m.kind === 'form' ? (
            // One stable key: moving the form keeps what the visitor already typed.
            sent ? null : <LeadForm key="lead-form" onSent={onSent} transcript={transcript} autoFocus={focusForm} />
          ) : m.kind === 'sent' ? (
            <div key={i} className="hexa-row">
              <HexaAvatar size={28} />
              <div className="hexa-bubble hexa-bot">
                <p className="flex items-start gap-2">
                  <CircleCheck className="mt-0.5 h-4 w-4 flex-none text-[#16a34a]" strokeWidth={2} aria-hidden="true" />
                  <span>{m.content}</span>
                </p>
              </div>
            </div>
          ) : m.role === 'assistant' ? (
            <div key={i} className="hexa-row">
              <HexaAvatar size={28} />
              <div className="hexa-bubble hexa-bot">
                <RichText text={m.content} />
              </div>
            </div>
          ) : (
            <div key={i} className="hexa-row justify-end">
              <div className="hexa-bubble hexa-user">{m.content}</div>
            </div>
          ),
        )}
        {busy ? (
          <div className="hexa-row">
            <HexaAvatar size={28} />
            <div className="hexa-bubble hexa-bot">
              <span className="hexa-typing" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        ) : null}
        {!busy && (quick.length > 0 || (!hasOpenForm && !sent)) ? (
          <div className="flex flex-wrap gap-1.5 pl-9">
            {quick.map((q) => (
              <button key={q} type="button" className="hexa-chip" onClick={() => void ask(q)}>
                {q}
              </button>
            ))}
            {!hasOpenForm && !sent && !quick.some((q) => hexa.formTriggers.includes(q.toLowerCase())) ? (
              <button
                type="button"
                className="hexa-chip hexa-chip-accent"
                onClick={() => {
                  setFocusForm(true);
                  showForm();
                }}
              >
                Book a demo
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <form
        className="hexa-compose"
        onSubmit={(e) => {
          e.preventDefault();
          void ask(input);
        }}
      >
        <label htmlFor={`${titleId}-input`} className="sr-only">
          Message Hexa
        </label>
        <textarea
          id={`${titleId}-input`}
          ref={inputRef}
          rows={1}
          value={input}
          maxLength={1000}
          placeholder={hexa.inputPlaceholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="hexa-input"
        />
        <button type="submit" className="hexa-send" disabled={!input.trim() || busy} aria-label="Send">
          <ArrowUp className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        </button>
      </form>
      <p className="hexa-note">{hexa.note}</p>
    </section>
  );
}
