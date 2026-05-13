import { Button } from 'react-bootstrap';
import { Hash, Columns } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Constants ──────────────────────────────────────────────────────

const VARIANTS = [
  { key: 'primary',   label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'success',   label: 'Success' },
  { key: 'danger',    label: 'Danger' },
  { key: 'warning',   label: 'Warning' },
  { key: 'info',      label: 'Info' },
  { key: 'light',     label: 'Light' },
  { key: 'dark',      label: 'Dark' },
] as const;

type V = (typeof VARIANTS)[number]['key'];

const OUTLINE_VARIANTS: { key: string; label: string }[] = [
  { key: 'outline-primary',   label: 'Outline Primary' },
  { key: 'outline-secondary', label: 'Outline Secondary' },
  { key: 'outline-danger',    label: 'Outline Danger' },
  { key: 'outline-success',   label: 'Outline Success' },
];

const SIZES: { key?: 'sm' | 'lg'; label: string }[] = [
  { key: 'sm', label: 'SM' },
  { key: undefined, label: 'MD' },
  { key: 'lg', label: 'LG' },
];

// ─── Matrix ─────────────────────────────────────────────────────────

function Matrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const states: { key: string; extra?: Record<string, unknown> }[] = [
    { key: 'normal' },
    { key: 'disabled', extra: { disabled: true } },
    { key: 'loading',  extra: { disabled: true } }, // Bootstrap has no built-in loading spinner; use disabled
    { key: 'icon' },
    { key: 'danger' }, // already covered by variant row
  ];

  // For Bootstrap's icon state, we use a small icon via text
  const showIcon = (label: string) => `★ ${label}`;

  const allVariants = [...VARIANTS, ...OUTLINE_VARIANTS];

  return (
    <Panel title="Variants × States" subtitle="react-bootstrap v2 + bs5" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div
          className="grid gap-y-1"
          style={{ gridTemplateColumns: `130px repeat(${states.length}, 1fr)`, minWidth: '600px' }}
        >
          <MatrixHeader states={states.map(s => s.key)} dark={dark} />
          {allVariants.map(v => (
            <>
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
                  {v.label}
                </span>
              </div>
              {states.map(s => (
                <div key={`${v.key}-${s.key}`} className="flex justify-center items-center h-12">
                  <Button
                    variant={v.key as V}
                    size="sm"
                    disabled={s.key === 'disabled' || s.key === 'loading'}
                    active={false}
                  >
                    {s.key === 'loading' ? '⏳ Wait…' : s.key === 'icon' ? showIcon('Btn') : s.key === 'danger' ? 'Delete' : 'Button'}
                  </Button>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Sizes ──────────────────────────────────────────────────────────

function Sizes({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Sizes & Link" subtitle="bootstrap" icon={<Columns size={14} />} dark={dark}>
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-4">
          {SIZES.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s.label}</span>
              <Button variant="primary" size={s.key}>Primary</Button>
              <Button variant="outline-primary" size={s.key}>Outline</Button>
            </div>
          ))}
        </div>
        <div className={`pt-3 border-t ${tc.divider}`}>
          <span className={`block mb-2 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Link variant</span>
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="link">Link Button</Button>
            <Button variant="link" disabled>Link Disabled</Button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function BootstrapShowcase({ dark }: { dark: boolean }) {
  return (
    <div data-bs-theme={dark ? 'dark' : 'light'}>
      <Matrix dark={dark} />
      <div className="grid lg:grid-cols-2 gap-6">
        <Sizes dark={dark} />
        {/* empty cell or note */}
        <Panel title="Notes" subtitle="" icon={undefined} dark={dark}>
          <p className="text-[11px] leading-relaxed opacity-60 font-mono">
            Bootstrap 5 has no built-in loading spinner for buttons.<br />
            Use disabled + CSS spinner or the Spinner component.<br />
            Icon support requires manual markdown or react-bootstrap's Spinner.
          </p>
        </Panel>
      </div>
    </div>
  );
}
