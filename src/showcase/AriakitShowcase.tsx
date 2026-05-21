import { type ReactNode } from 'react';
import { Button as AriaButton } from '@ariakit/react';
import { Zap, Loader2, Hash, Columns, Square } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Styled Ariakit Button ──────────────────────────────────────────
// Ariakit is headless — all visual design comes from Tailwind classes.
// This shows the "build your own design system" approach.

const STYLES = {
  primary: [
    'bg-blue-600 text-white',
    'hover:bg-blue-500 active:bg-blue-700',
    'disabled:bg-zinc-800 disabled:text-zinc-600',
    'focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080e]',
  ].join(' '),
  secondary: [
    'bg-zinc-800 text-zinc-200',
    'hover:bg-zinc-700 active:bg-zinc-900',
    'disabled:bg-zinc-900 disabled:text-zinc-700',
    'focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080e]',
  ].join(' '),
  outline: [
    'border border-zinc-600 text-zinc-300',
    'hover:border-blue-500 hover:text-blue-400 active:bg-zinc-800',
    'disabled:border-zinc-800 disabled:text-zinc-700',
    'focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080e]',
  ].join(' '),
  ghost: [
    'text-zinc-400',
    'hover:text-white hover:bg-zinc-800 active:bg-zinc-700',
    'disabled:text-zinc-700',
    'focus-visible:ring-2 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080e]',
  ].join(' '),
  danger: [
    'bg-red-600 text-white',
    'hover:bg-red-500 active:bg-red-700',
    'disabled:bg-zinc-800 disabled:text-zinc-600',
    'focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080e]',
  ].join(' '),
  gradient: [
    'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
    'hover:from-violet-500 hover:to-indigo-500 active:from-violet-700 active:to-indigo-700',
    'disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600',
    'focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080e]',
  ].join(' '),
};

type StyleKey = keyof typeof STYLES;

function Btn({
  style, children, disabled, loading, icon,
}: {
  style: StyleKey; children: ReactNode; disabled?: boolean; loading?: boolean; icon?: ReactNode;
}) {
  return (
    <AriaButton
      disabled={disabled}
      className={
        `inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg ` +
        `text-sm font-medium leading-none transition-all duration-150 outline-none ` +
        `${STYLES[style]} ${disabled ? 'cursor-not-allowed' : ''}`
      }
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </AriaButton>
  );
}

// ─── Matrix ─────────────────────────────────────────────────────────

const STYLE_KEYS: StyleKey[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'gradient'];
const STYLE_LABELS: Record<StyleKey, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  outline: 'Outline',
  ghost: 'Ghost',
  danger: 'Danger',
  gradient: 'Gradient',
};

function Matrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const states: { key: string; extra?: { disabled?: boolean; loading?: boolean; icon?: ReactNode; style?: StyleKey } }[] = [
    { key: 'normal' },
    { key: 'disabled', extra: { disabled: true } },
    { key: 'loading',  extra: { loading: true } },
    { key: 'icon',     extra: { icon: <Zap size={14} /> } },
    { key: 'danger',   extra: { style: 'danger' } },
  ];

  // Danger shown via style='danger' — already a row variant; skip column.
  const displayStates = states.filter(s => s.key !== 'danger');

  return (
    <Panel title="Variants × States" subtitle="ariakit + tailwind" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div
          className="grid gap-y-1"
          style={{ gridTemplateColumns: `90px repeat(${displayStates.length}, 1fr)`, minWidth: '480px' }}
        >
          <MatrixHeader states={displayStates.map(s => s.key)} dark={dark} />
          {STYLE_KEYS.map(sk => (
            <div key={sk} className="contents">
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
                  {STYLE_LABELS[sk]}
                </span>
              </div>
              {displayStates.map(st => (
                <div key={`${sk}-${st.key}`} className="flex justify-center items-center h-12">
                  <Btn
                    style={sk}
                    disabled={sk === 'danger' ? undefined : st.extra?.disabled}
                    loading={st.extra?.loading}
                    icon={st.extra?.icon}
                  >
                    {st.key === 'icon' ? 'With Icon' : st.key === 'danger' ? 'Delete' : 'Button'}
                  </Btn>
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

const SIZES = [
  { label: 'SM', cls: 'px-2.5 py-1.5 text-xs rounded-md' },
  { label: 'MD', cls: 'px-4 py-2 text-sm rounded-lg' },
  { label: 'LG', cls: 'px-5 py-2.5 text-base rounded-xl' },
  { label: 'XL', cls: 'px-6 py-3 text-lg rounded-xl' },
];

function Sizes({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Sizes" subtitle="ariakit + tw" icon={<Columns size={14} />} dark={dark}>
      <div className="grid grid-cols-4 gap-4">
        {SIZES.map(s => (
          <div key={s.label} className="flex flex-col items-center gap-3">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s.label}</span>
            <AriaButton className={`${STYLES.primary} ${s.cls} font-medium leading-none transition-all duration-150 outline-none`}>
              Button
            </AriaButton>
            <AriaButton className={`${STYLES.outline} ${s.cls} font-medium leading-none transition-all duration-150 outline-none`}>
              Button
            </AriaButton>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Edge Cases ─────────────────────────────────────────────────────

function EdgeCases({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Edge Cases" subtitle="ariakit" icon={<Square size={14} />} dark={dark}>
      <div className="space-y-4">
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
            Icon placements
          </span>
          <div className="flex flex-wrap gap-3 items-center">
            <Btn style="primary" icon={<Zap size={14} />}>Start</Btn>
            <Btn style="primary">End<Zap size={14} className="ml-1.5" /></Btn>
            <Btn style="primary" icon={<Zap size={14} />} />
            <Btn style="primary" loading>Loading</Btn>
            <Btn style="outline" loading>Loading</Btn>
          </div>
        </div>
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
            fullWidth + custom elements
          </span>
          <div className="flex flex-col gap-2 max-w-md">
            <AriaButton className={`${STYLES.primary} w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 outline-none`}>
              Full Width Primary
            </AriaButton>
            <AriaButton className={`${STYLES.secondary} w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 outline-none flex items-center justify-center gap-2`}>
              <Zap size={14} /> Full Width Secondary
            </AriaButton>
            <AriaButton
              as="a"
              href="#"
              className={`${STYLES.ghost} inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 outline-none`}
              onClick={e => e.preventDefault()}
            >
              Rendered as &lt;a&gt; (link)
            </AriaButton>
          </div>
        </div>
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
            Feature highlights
          </span>
          <ul className="text-[11px] leading-relaxed opacity-60 font-mono space-y-1">
            <li>✓ Headless — 100% design control via Tailwind</li>
            <li>✓ Full ARIA support (role=button, keyboard nav, focus management)</li>
            <li>✓ Polymorphic — renders as any HTML element via <code>as</code> prop</li>
            <li>✓ <code>accessibleWhenDisabled</code> — disabled element stays in tab order</li>
            <li>✓ No CSS imports, no theme providers, no extra weight</li>
          </ul>
        </div>
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function AriakitShowcase({ dark }: { dark: boolean }) {
  return (
    <>
      <Matrix dark={dark} />
      <div className="grid lg:grid-cols-2 gap-6">
        <Sizes dark={dark} />
        <EdgeCases dark={dark} />
      </div>
    </>
  );
}
