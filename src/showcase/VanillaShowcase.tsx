import { Zap, Hash, Columns } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';
import * as ve from './VanillaShowcase.css';

// ─── Types ──────────────────────────────────────────────────────────

type V = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
type S = 'sm' | 'md' | 'lg' | 'xl';

// ─── Constants ──────────────────────────────────────────────────────

const VARIANTS: { key: V; label: string }[] = [
  { key: 'primary',   label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'outline',   label: 'Outline' },
  { key: 'ghost',     label: 'Ghost' },
  { key: 'danger',    label: 'Danger' },
  { key: 'link',      label: 'Link' },
];

const SIZES: { key: S; label: string }[] = [
  { key: 'sm', label: 'SM' },
  { key: 'md', label: 'MD' },
  { key: 'lg', label: 'LG' },
  { key: 'xl', label: 'XL' },
];

// ─── Helpers ────────────────────────────────────────────────────────

function btnClass(variant: V, size: S, extra: string[] = []): string {
  return [ve.btn, ve.variantMap[variant], ve.sizeMap[size], ...extra].join(' ');
}

// ─── Matrix ─────────────────────────────────────────────────────────

function Matrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const states: { key: string; disabled?: boolean; loading?: boolean; icon?: boolean }[] = [
    { key: 'normal' },
    { key: 'disabled', disabled: true },
    { key: 'loading',  loading: true, disabled: true },
    { key: 'icon',     icon: true },
    { key: 'danger' },
  ];

  return (
    <Panel title="Variants × States" subtitle="vanilla-extract (zero-runtime)" icon={<Hash size={14} />} dark={dark}>
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
                  <button
                    className={btnClass(v.key, 'sm')}
                    disabled={s.disabled}
                  >
                    {s.loading && <span className={ve.spinner} />}
                    {s.icon ? <Zap size={14} /> : null}
                    {s.loading ? 'Wait…' : s.icon ? '' : s.key === 'danger' ? 'Delete' : 'Button'}
                  </button>
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
    <Panel title="Sizes" subtitle="vanilla-extract" icon={<Columns size={14} />} dark={dark}>
      <div className="grid grid-cols-4 gap-3">
        {SIZES.map(sz => (
          <div key={sz.key} className="flex flex-col items-center gap-2">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{sz.label}</span>
            <button className={btnClass('primary', sz.key)}>Btn</button>
            <button className={btnClass('outline', sz.key)}>Btn</button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function VanillaShowcase({ dark }: { dark: boolean }) {
  return (
    <>
      <Matrix dark={dark} />
      <Sizes dark={dark} />
    </>
  );
}
