import { Button as RadixButton } from '@radix-ui/themes';
import { Zap, Hash, Columns, Square } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Constants ──────────────────────────────────────────────────────

const RADIX_VARIANTS = [
  { key: 'solid',   label: 'Solid' },
  { key: 'soft',    label: 'Soft' },
  { key: 'surface', label: 'Surface' },
  { key: 'outline', label: 'Outline' },
  { key: 'ghost',   label: 'Ghost' },
  { key: 'classic', label: 'Classic' },
] as const;

type RadixVariant = (typeof RADIX_VARIANTS)[number]['key'];

const MATRIX_STATES: { key: string; dangerColor?: boolean; extra?: Record<string, unknown> }[] = [
  { key: 'normal' },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'loading',  extra: { loading: true } },
  { key: 'icon' },
  { key: 'danger',   dangerColor: true },
  { key: 'hc',       extra: { highContrast: true } },
];

// ─── Variants × States Matrix ──────────────────────────────────────

function RadixMatrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Variants × States" subtitle="radix ui v3" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] gap-y-1" style={{ gridTemplateColumns: '85px repeat(6, 1fr)' }}>
          <MatrixHeader states={MATRIX_STATES.map(s => s.key)} dark={dark} />
          {RADIX_VARIANTS.map(v => (
            <div key={v.key} className="contents">
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{v.label}</span>
              </div>
              {MATRIX_STATES.map(s => {
                const isDanger = s.key === 'danger';
                const isHc = s.key === 'hc';
                return (
                  <div key={`${v.key}-${s.key}`} className="flex justify-center items-center h-12">
                    <RadixButton
                      variant={v.key as RadixVariant}
                      size="2"
                      disabled={s.key === 'disabled'}
                      loading={s.key === 'loading'}
                      color={isDanger ? 'red' : undefined}
                      highContrast={isHc}
                    >
                      {s.key === 'icon' ? <><Zap size={14} /> Button</> : isDanger ? 'Delete' : 'Button'}
                    </RadixButton>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Sizes ──────────────────────────────────────────────────────────

function RadixSizes({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const sizes = [
    { key: '1' as const, label: 'Size 1' },
    { key: '2' as const, label: 'Size 2' },
    { key: '3' as const, label: 'Size 3' },
    { key: '4' as const, label: 'Size 4' },
  ];
  return (
    <Panel title="Sizes" subtitle="radix" icon={<Columns size={14} />} dark={dark}>
      <div className="grid grid-cols-4 gap-4">
        {sizes.map(s => (
          <div key={s.key} className="flex flex-col items-center gap-3">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s.label}</span>
            <RadixButton variant="solid" size={s.key}>Solid</RadixButton>
            <RadixButton variant="outline" size={s.key}>Outline</RadixButton>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Edge Cases ─────────────────────────────────────────────────────

function RadixEdgeCases({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Radius & Color" subtitle="radix" icon={<Square size={14} />} dark={dark}>
      <div className="space-y-5">
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Radius</span>
          <div className="flex flex-wrap gap-3 items-center">
            {(['none', 'small', 'medium', 'large', 'full'] as const).map(r => (
              <RadixButton key={r} variant="solid" radius={r}>{r}</RadixButton>
            ))}
          </div>
        </div>
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Color palette (solid)</span>
          <div className="flex flex-wrap gap-2 items-center">
            {(['iris', 'blue', 'cyan', 'jade', 'green', 'amber', 'orange', 'tomato', 'red', 'pink', 'purple', 'plum', 'gray'] as const).map(c => (
              <RadixButton key={c} variant="solid" color={c} size="1">{c}</RadixButton>
            ))}
          </div>
        </div>
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Loading across variants</span>
          <div className="flex flex-wrap gap-3 items-center">
            {(['solid', 'soft', 'surface', 'outline', 'ghost', 'classic'] as const).map(v => (
              <RadixButton key={v} variant={v} loading>{v}</RadixButton>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function RadixShowcase({ dark }: { dark: boolean }) {
  return (
    <>
      <RadixMatrix dark={dark} />
      <div className="grid lg:grid-cols-2 gap-6">
        <RadixSizes dark={dark} />
        <RadixEdgeCases dark={dark} />
      </div>
    </>
  );
}
