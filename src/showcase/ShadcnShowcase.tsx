import { Button } from '@/components/ui/button';
import { Zap, Hash, Columns } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Constants ──────────────────────────────────────────────────────

const VARIANTS = [
  { key: 'default',     label: 'Default' },
  { key: 'secondary',   label: 'Secondary' },
  { key: 'outline',     label: 'Outline' },
  { key: 'ghost',       label: 'Ghost' },
  { key: 'destructive', label: 'Destructive' },
  { key: 'link',        label: 'Link' },
] as const;

type V = (typeof VARIANTS)[number]['key'];

const SIZES = [
  { key: 'xs' as const, label: 'XS' },
  { key: 'sm' as const, label: 'SM' },
  { key: 'default' as const, label: 'MD' },
  { key: 'lg' as const, label: 'LG' },
];

// ─── Matrix ─────────────────────────────────────────────────────────

function Matrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const states: { key: string; extra?: Record<string, unknown> }[] = [
    { key: 'normal' },
    { key: 'disabled', extra: { disabled: true } },
    { key: 'loading',  extra: { disabled: true } },
    { key: 'icon',     extra: { icon: true } },
    { key: 'danger',   extra: { className: '!border-destructive !text-destructive' } },
  ];

  return (
    <Panel title="Variants × States" subtitle="shadcn/ui (base-ui)" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div className="grid min-w-[660px] gap-y-1" style={{ gridTemplateColumns: '85px repeat(5, 1fr)' }}>
          <MatrixHeader states={states.map(s => s.key)} dark={dark} />
          {VARIANTS.map(v => (
            <div key={v.key} className="contents">
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{v.label}</span>
              </div>
              {states.map(s => (
                <div key={`${v.key}-${s.key}`} className="flex justify-center items-center h-12">
                  <Button
                    variant={v.key as V}
                    size="sm"
                    className={s.key === 'danger' ? '!border-destructive !text-destructive' : undefined}
                    {...(s.key === 'disabled' || s.key === 'loading' ? { disabled: true } : {})}
                  >
                    {s.key === 'loading' ? (
                      <><Zap size={14} className="animate-spin" /> Wait…</>
                    ) : s.key === 'icon' ? (
                      <><Zap size={14} /> With Icon</>
                    ) : s.key === 'danger' ? (
                      'Delete'
                    ) : (
                      'Button'
                    )}
                  </Button>
                </div>
              ))}
            </div>
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
    <Panel title="Sizes" subtitle="shadcn" icon={<Columns size={14} />} dark={dark}>
      <div className="grid grid-cols-4 gap-3">
        {SIZES.map(s => (
          <div key={s.key} className="flex flex-col items-center gap-2">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s.label}</span>
            <Button variant="default" size={s.key}>Btn</Button>
            <Button variant="outline" size={s.key}>Btn</Button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function ShadcnShowcase({ dark }: { dark: boolean }) {
  return (
    <>
      <Matrix dark={dark} />
      <Sizes dark={dark} />
    </>
  );
}
