import { Zap, Hash, Columns } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';
import css from './CssModulesShowcase.module.css';

// ─── Constants ──────────────────────────────────────────────────────

const VARIANTS = [
  { key: 'primary',   label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'outline',   label: 'Outline' },
  { key: 'ghost',     label: 'Ghost' },
  { key: 'danger',    label: 'Danger' },
  { key: 'link',      label: 'Link' },
] as const;

type V = (typeof VARIANTS)[number]['key'];

const SIZES = [
  { key: 'sm' as const, label: 'SM' },
  { key: 'md' as const, label: 'MD' },
  { key: 'lg' as const, label: 'LG' },
  { key: 'xl' as const, label: 'XL' },
];

// ─── Helpers ────────────────────────────────────────────────────────

function btnClass(variant: V, extra: string[] = []): string {
  return [css.btn, css[variant], ...extra].join(' ');
}

// ─── Matrix ─────────────────────────────────────────────────────────

function Matrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const rootCls = dark ? css.dark : '';
  const states: { key: string; extra?: Record<string, unknown> }[] = [
    { key: 'normal' },
    { key: 'disabled', extra: { disabled: true } },
    { key: 'loading',  extra: { disabled: true } },
    { key: 'icon',     extra: { icon: true } },
    { key: 'danger',   extra: { className: css.isDanger } },
  ];

  return (
    <Panel title="Variants × States" subtitle="css modules (native)" icon={<Hash size={14} />} dark={dark}>
      <div className={`overflow-x-auto ${rootCls}`}>
        <div className="grid min-w-[660px] gap-y-1" style={{ gridTemplateColumns: '85px repeat(5, 1fr)' }}>
          <MatrixHeader states={states.map(st => st.key)} dark={dark} />
          {VARIANTS.map(v => (
            <div key={v.key} className="contents">
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{v.label}</span>
              </div>
              {states.map(st => {
                const extraCls = st.extra?.className ? [st.extra.className as string] : [];
                const iconOnly = st.key === 'icon';
                const loading = st.key === 'loading';
                const disabled = st.key === 'disabled' || st.key === 'loading';
                return (
                  <div key={`${v.key}-${st.key}`} className="flex justify-center items-center h-12">
                    <button
                      className={btnClass(v.key as V, extraCls)}
                      disabled={disabled}
                    >
                      {loading && <span className={css.spinner} />}
                      {iconOnly ? <Zap size={14} /> : null}
                      {loading ? 'Wait…' : iconOnly ? '' : st.key === 'danger' ? 'Delete' : 'Button'}
                    </button>
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

function Sizes({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const rootCls = dark ? css.dark : '';
  return (
    <Panel title="Sizes" subtitle="css modules" icon={<Columns size={14} />} dark={dark}>
      <div className={`grid grid-cols-4 gap-3 ${rootCls}`}>
        {SIZES.map(sz => (
          <div key={sz.key} className="flex flex-col items-center gap-2">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{sz.label}</span>
            <button className={btnClass('primary', [css[sz.key]])}>Btn</button>
            <button className={btnClass('outline', [css[sz.key]])}>Btn</button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function CssModulesShowcase({ dark }: { dark: boolean }) {
  return (
    <>
      <Matrix dark={dark} />
      <Sizes dark={dark} />
    </>
  );
}
