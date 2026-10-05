import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { CircleCheck, TriangleAlert } from 'lucide-react';
import { batchSizes, formCopy } from '../../../content/contact';
import { isRequestType, requestTypeGroups, requestTypeOptions } from '../../../content/requestTypes';
import { site } from '../../../content/site';

type Values = {
  name: string;
  email: string;
  company: string;
  batchSize: string;
  labTypes: string[];
  preferredDate: string;
  message: string;
  /** Honeypot — hidden from people, bots tend to fill it. */
  website: string;
};

type Errors = Partial<Record<keyof Values, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'emailed' | 'error';

const endpoint = (import.meta.env.VITE_DEMO_ENDPOINT ?? '').trim();
/** Plain-text summary of the request, used for the email fallback. */
function emailBody(v: Values) {
  const types = v.labTypes.map((t) => requestTypeOptions.find((o) => o.id === t)?.label ?? t).join(', ');
  return [
    `Name: ${v.name.trim()}`,
    `Work email: ${v.email.trim()}`,
    `Company: ${v.company.trim()}`,
    `Batch size: ${v.batchSize}`,
    `Lab type: ${types}`,
    `Preferred demo date: ${v.preferredDate || 'Not set'}`,
    '',
    v.message.trim(),
  ].join('\n');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const empty: Values = {
  name: '',
  email: '',
  company: '',
  batchSize: '',
  labTypes: [],
  preferredDate: '',
  message: '',
  website: '',
};

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter your work email.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter an email like name@company.com.';
  if (!v.company.trim()) e.company = 'Enter your company or institute.';
  if (!v.batchSize) e.batchSize = 'Choose a batch size.';
  if (v.labTypes.length === 0) e.labTypes = 'Choose at least one lab type.';
  if (v.preferredDate && v.preferredDate < todayISO()) e.preferredDate = 'Choose today or a later date.';
  if (v.message.length > 2000) e.message = 'Keep the message under 2,000 characters.';
  return e;
}

const fieldOrder: (keyof Values)[] = ['name', 'email', 'company', 'batchSize', 'labTypes', 'preferredDate', 'message'];

export function DemoForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [params] = useSearchParams();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  // Client-only setup (keeps prerendered HTML identical): date minimum and
  // pre-selection from links like /contact?type=sandbox-gcp&item=GCP%20sandbox or ?plan=pro.
  useEffect(() => {
    setMinDate(todayISO());
    const type = params.get('type');
    const item = params.get('item')?.slice(0, 120);
    const plan = params.get('plan');
    setValues((v) => ({
      ...v,
      labTypes: isRequestType(type) ? Array.from(new Set([...v.labTypes, type])) : v.labTypes,
      message:
        v.message ||
        (item
          ? `I’m interested in: ${item}.`
          : plan
            ? `I’m interested in the ${plan[0].toUpperCase()}${plan.slice(1)} plan.`
            : ''),
    }));
  }, [params]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleLab = (labId: string) =>
    set('labTypes', values.labTypes.includes(labId) ? values.labTypes.filter((x) => x !== labId) : [...values.labTypes, labId]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      const target =
        firstInvalid === 'labTypes'
          ? formRef.current?.querySelector<HTMLInputElement>('input[name="labTypes"]')
          : formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(firstInvalid))}`);
      target?.focus();
      return;
    }

    // Honeypot filled: act as if it worked, send nothing.
    if (values.website) {
      setSubmitted({ name: values.name.trim(), email: values.email.trim() });
      setStatus('success');
      return;
    }

    // No form endpoint configured: open the visitor's email app with the
    // request filled in, addressed to support. Set VITE_DEMO_ENDPOINT to post JSON instead.
    if (!endpoint) {
      const subject = `Demo request: ${values.company.trim()} (${values.batchSize})`;
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody(values))}`;
      setSubmitted({ name: values.name.trim(), email: values.email.trim() });
      setStatus('emailed');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          batchSize: values.batchSize,
          labTypes: values.labTypes.map((t) => requestTypeOptions.find((o) => o.id === t)?.label ?? t),
          preferredDate: values.preferredDate || null,
          message: values.message.trim(),
          source: 'hexalabs-website',
          page: window.location.href,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted({ name: values.name.trim(), email: values.email.trim() });
      setStatus('success');
      setValues(empty);
    } catch (err) {
      console.error('[DemoForm] submit failed', err);
      setStatus('error');
    }
  }

  if (status === 'emailed' && submitted) {
    return (
      <div role="status" className="card p-8 sm:p-10">
        <CircleCheck className="h-8 w-8 text-success" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="mt-4 text-h3">{formCopy.emailFallbackTitle}</h2>
        <p className="mt-2 text-body">{formCopy.emailFallbackBody(site.contact.email)}</p>
        <a href={`mailto:${site.contact.email}`} className="link mt-4 inline-block font-medium">
          {site.contact.email}
        </a>
      </div>
    );
  }

  if (status === 'success' && submitted) {
    return (
      <div role="status" className="card p-8 sm:p-10">
        <CircleCheck className="h-8 w-8 text-success" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="mt-4 text-h3">{formCopy.successTitle}</h2>
        <p className="mt-2 text-body">{formCopy.successBody(submitted.name, submitted.email)}</p>
      </div>
    );
  }

  const describedBy = (k: keyof Values) => (errors[k] ? id(`${k}-error`) : undefined);
  const Err = ({ k }: { k: keyof Values }) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className="field-error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-label="Book a demo"
      className="card p-6 sm:p-10"
    >
      {!endpoint && import.meta.env.DEV ? (
        <div role="note" className="mb-6 rounded-xl border border-dashed border-line-strong p-4 text-sm text-body">
          <span className="mr-2 rounded bg-paper-50 px-1.5 py-0.5 font-mono text-micro text-ink-950">DEV</span>
          Dev only: <code className="font-mono">VITE_DEMO_ENDPOINT</code> is not set, so submitting opens an email to {site.contact.email}.
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="field-label">
            Name
          </label>
          <input
            id={id('name')}
            name="name"
            autoComplete="name"
            className="field mt-2"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy('name')}
            required
          />
          <Err k="name" />
        </div>

        <div>
          <label htmlFor={id('email')} className="field-label">
            Work email
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className="field mt-2"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            required
          />
          <Err k="email" />
        </div>

        <div>
          <label htmlFor={id('company')} className="field-label">
            Company or institute
          </label>
          <input
            id={id('company')}
            name="company"
            autoComplete="organization"
            className="field mt-2"
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy('company')}
            required
          />
          <Err k="company" />
        </div>

        <div>
          <label htmlFor={id('batchSize')} className="field-label">
            Batch size
          </label>
          <select
            id={id('batchSize')}
            name="batchSize"
            className="field mt-2"
            value={values.batchSize}
            onChange={(e) => set('batchSize', e.target.value)}
            aria-invalid={!!errors.batchSize}
            aria-describedby={describedBy('batchSize')}
            required
          >
            <option value="" disabled>
              Choose…
            </option>
            {batchSizes.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <Err k="batchSize" />
        </div>
      </div>

      <fieldset className="mt-6" aria-describedby={describedBy('labTypes')}>
        <legend className="field-label">Lab type</legend>
        <p className="mt-1 text-sm text-muted">Choose all that apply.</p>
        <div className="mt-3 space-y-4">
          {requestTypeGroups.map((group) => (
            <div key={group.label} role="group" aria-label={group.label}>
              <p aria-hidden="true" className="font-mono text-micro text-slate-500 uppercase">
                {group.label}
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {group.options.map((opt) => {
                  const checked = values.labTypes.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors duration-300 ${
                        checked ? 'border-blue-600 bg-blue-600/6 text-heading shadow-[0_0_0_1px_var(--blue-600)]' : 'border-line-strong bg-white text-body hover:border-slate-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="labTypes"
                        value={opt.id}
                        checked={checked}
                        onChange={() => toggleLab(opt.id)}
                        className="h-4 w-4 accent-blue-600"
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Err k="labTypes" />
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('preferredDate')} className="field-label">
            Preferred demo date <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={id('preferredDate')}
            name="preferredDate"
            type="date"
            min={minDate}
            className="field mt-2"
            value={values.preferredDate}
            onChange={(e) => set('preferredDate', e.target.value)}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={describedBy('preferredDate')}
          />
          <Err k="preferredDate" />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={id('message')} className="field-label">
          Message <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={4}
          className="field mt-2"
          placeholder="Course, start date, anything your learners need installed."
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy('message')}
        />
        <Err k="message" />
      </div>

      {/* Honeypot: invisible to people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input
          id={id('website')}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      {status === 'error' ? (
        <p role="alert" className="mt-6 flex gap-2 rounded-xl bg-canvas p-3 text-sm text-error">
          <TriangleAlert className="h-4 w-4 flex-none" strokeWidth={1.5} aria-hidden="true" />
          <span>
            {formCopy.genericError} Email:{' '}
            <span className="font-medium">{site.contact.email}</span>
          </span>
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We use these details only to reply to you.</p>
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Book a demo'}
        </button>
      </div>
    </form>
  );
}
