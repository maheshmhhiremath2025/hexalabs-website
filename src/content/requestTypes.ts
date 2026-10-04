/**
 * What a visitor can ask for on the demo form ("Lab type").
 * Every catalogue page links to /contact?type=<id>&item=<name> so the form
 * arrives pre-filled. Add an option here and it appears on the form.
 */

export type RequestTypeId =
  | 'official-azure'
  | 'official-aws'
  | 'sandbox-azure'
  | 'sandbox-aws'
  | 'sandbox-gcp'
  | 'sandbox-oci'
  | 'sandbox-databricks'
  | 'sandbox-ai-foundry'
  | 'vm-windows'
  | 'vm-linux'
  | 'vm-kubernetes'
  | 'certification'
  | 'unsure';

export type RequestTypeGroup = { label: string; options: { id: RequestTypeId; label: string }[] };

export const requestTypeGroups: RequestTypeGroup[] = [
  {
    label: 'Official labs',
    options: [
      { id: 'official-azure', label: 'Official Azure labs' },
      { id: 'official-aws', label: 'Official AWS labs' },
    ],
  },
  {
    label: 'Cloud sandboxes',
    options: [
      { id: 'sandbox-azure', label: 'Azure sandbox' },
      { id: 'sandbox-aws', label: 'AWS sandbox' },
      { id: 'sandbox-gcp', label: 'GCP sandbox' },
      { id: 'sandbox-oci', label: 'OCI sandbox' },
      { id: 'sandbox-databricks', label: 'Databricks sandbox' },
      { id: 'sandbox-ai-foundry', label: 'Azure AI Foundry sandbox' },
    ],
  },
  {
    label: 'Lab machines',
    options: [
      { id: 'vm-windows', label: 'Windows desktops' },
      { id: 'vm-linux', label: 'Linux desktops' },
      { id: 'vm-kubernetes', label: 'Kubernetes / OpenShift' },
    ],
  },
  {
    label: 'Other',
    options: [
      { id: 'certification', label: 'Certification vouchers' },
      { id: 'unsure', label: 'Not sure yet' },
    ],
  },
];

export const requestTypeOptions = requestTypeGroups.flatMap((g) => g.options);

export const isRequestType = (v: string | null): v is RequestTypeId =>
  !!v && requestTypeOptions.some((o) => o.id === v);

/** Build a pre-filled demo-form link, e.g. requestLink('sandbox-gcp', 'GCP sandbox'). */
export function requestLink(type: RequestTypeId, item?: string) {
  const q = new URLSearchParams({ type });
  if (item) q.set('item', item);
  return `/contact?${q.toString()}`;
}
