import { type ReactNode } from 'react';
import { Zap, Loader2, Box } from 'lucide-react';
import { Panel, MatrixHeader, t, Legend } from './ShowcaseShared';

// ─── Button Variant Styles (Tailwind v4) ────────────────────────────

const TW_CONFIG = {
  filled: [
    'bg-white text-black',
    'hover:bg-white/90 active:bg-white/80',
    'disabled:bg-zinc-800 disabled:text-zinc-600',
    'focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/90',
  ].join(' '),
  outlined: [
    'border border-white/25 text-white/70',
    'hover:border-white/50 hover:text-white active:bg-white/10',
    'disabled:border-zinc-800 disabled:text-zinc-700',
    'focus-visible:ring-2 focus-visible:ring-white/30',
  ].join(' '),
  ghost: [
    'text-white/40',
    'hover:text-white/70 hover:bg-white/10 active:bg-white/15',
    'disabled:text-zinc-700',
    'focus-visible:ring-2 focus-visible:ring-white/30',
  ].join(' '),
  gradient: [
    'bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
    'hover:from-indigo-400 hover:to-purple-400 active:from-indigo-600 active:to-purple-700',
    'disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600',
    'focus-visible:ring-2 focus-visible:ring-indigo-400/50',
  ].join(' '),
  underline: [
    'text-white/40 underline underline-offset-4 decoration-white/20',
    'hover:text-white/70 hover:decoration-white/50 active:text-white/90',
    'disabled:text-zinc-700 disabled:decoration-zinc-800',
    'focus-visible:ring-2 focus-visible:ring-white/30',
  ].join(' '),
};

type TwVariant = keyof typeof TW_CONFIG;

// ─── TwBtn ──────────────────────────────────────────────────────────

function TwBtn({
  variant, children, disabled, loading, icon,
}: {
  variant: TwVariant; children: ReactNode; disabled?: boolean; loading?: boolean; icon?: ReactNode;
}) {
  const lightOverrides: Record<TwVariant, string> = {
    filled:    '',
    outlined:  '',
    ghost:     '',
    gradient:  '',
    underline: '',
  };

  return (
    <button
      className={
        `inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg ` +
        `text-sm font-medium transition-all duration-150 outline-none ${TW_CONFIG[variant]} ${lightOverrides[variant]} ` +
        `${disabled ? 'cursor-not-allowed' : ''}`
      }
      disabled={disabled}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}

// ─── TwSection ──────────────────────────────────────────────────────

function TwSection({ dark }: { dark: boolean }) {
  const variants = Object.keys(TW_CONFIG) as TwVariant[];
  const tc = t(dark);

  return (
    <Panel title="Custom Tailwind" subtitle="handcrafted" icon={<Box size={14} />} dark={dark}>
      <div className="space-y-6">
        {/* Matrix: variants × states */}
        <div className="overflow-x-auto">
          <div className="grid min-w-[560px] gap-y-1" style={{ gridTemplateColumns: '80px repeat(4, 1fr)' }}>
            <MatrixHeader states={['normal', 'disabled', 'loading', 'icon']} dark={dark} />
            {variants.map(v => (
              <div key={v} className="contents">
                <div className="flex items-center h-12">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{v}</span>
                </div>
                {(['normal', 'disabled', 'loading', 'icon'] as const).map(s => (
                  <div key={`${v}-${s}`} className="flex justify-center items-center h-12">
                    <TwBtn
                      variant={v}
                      disabled={s === 'disabled'}
                      loading={s === 'loading'}
                      icon={s === 'icon' ? <Zap size={14} /> : undefined}
                    >
                      {s === 'normal' ? 'Button' : s === 'icon' ? 'With Icon' : 'Button'}
                    </TwBtn>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive demo */}
        <div className={`pt-4 border-t ${tc.divider}`}>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.meta}`}>
            Interactive — hover / focus / click to test
          </span>
          <div className="flex flex-wrap gap-3 items-center">
            <TwBtn variant="filled" icon={<Zap size={14} />}>Launch</TwBtn>
            <TwBtn variant="gradient">Upgrade</TwBtn>
            <TwBtn variant="outlined">Learn More</TwBtn>
            <TwBtn variant="ghost">Skip</TwBtn>
            <TwBtn variant="underline">Terms</TwBtn>
            <div className={`w-px h-8 ${tc.dividerLine}`} />
            <TwBtn variant="filled" loading>Processing</TwBtn>
            <TwBtn variant="outlined" disabled>Unavailable</TwBtn>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function TwShowcase({ dark }: { dark: boolean }) {
  return (
    <>
      <TwSection dark={dark} />
      <Legend dark={dark} />
    </>
  );
}
