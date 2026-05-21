import { type ReactNode } from 'react';

// ─── State Badge Config ─────────────────────────────────────────────

export const STATE_META: Record<string, { label: string; cls: string; dot: string }> = {
  normal:    { label: 'Default',    cls: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/[0.08]', dot: 'bg-emerald-400' },
  disabled:  { label: 'Disabled',   cls: 'border-zinc-500/30 text-zinc-400 bg-zinc-500/[0.08]',         dot: 'bg-zinc-400' },
  loading:   { label: 'Loading',    cls: 'border-amber-500/30 text-amber-400 bg-amber-500/[0.08]',      dot: 'bg-amber-400' },
  icon:      { label: 'With Icon',  cls: 'border-sky-500/30 text-sky-400 bg-sky-500/[0.08]',            dot: 'bg-sky-400' },
  danger:    { label: 'Danger',     cls: 'border-red-500/30 text-red-400 bg-red-500/[0.08]',            dot: 'bg-red-400' },
  ghost:     { label: 'Ghost',      cls: 'border-violet-500/30 text-violet-400 bg-violet-500/[0.08]',   dot: 'bg-violet-400' },
  hc:        { label: 'Hi-Contrast',cls: 'border-white/[0.40] text-white bg-white/[0.12]',              dot: 'bg-white' },
};

// ─── Theme Helper ───────────────────────────────────────────────────

export function t(dark: boolean) {
  return {
    card: dark
      ? 'border-white/[0.07] bg-white/[0.035]'
      : 'border-black/[0.07] bg-black/[0.02]',
    label: dark ? 'text-white/45' : 'text-black/45',
    meta: dark ? 'text-white/25' : 'text-black/25',
    sublabel: dark ? 'text-white/30' : 'text-black/30',
    divider: dark ? 'border-white/[0.07]' : 'border-black/[0.06]',
    dividerLine: dark ? 'bg-white/10' : 'bg-black/10',
  };
}

// ─── Badge ──────────────────────────────────────────────────────────

export function Badge({ state, dark: _dark }: { state: string; dark: boolean }) {
  const m = STATE_META[state];
  if (!m) return null;
  return (
    <span
      className={
        `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] ` +
        `text-[9px] font-mono font-bold uppercase tracking-[0.15em] border ${m.cls}`
      }
    >
      <span className={`w-1 h-1 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

// ─── Panel ──────────────────────────────────────────────────────────

export function Panel({
  title, subtitle, icon, children, dark,
}: {
  title: string; subtitle?: string; icon?: ReactNode; children: ReactNode; dark: boolean;
}) {
  const tc = t(dark);
  return (
    <div className={`rounded-2xl border ${tc.card} backdrop-blur-sm overflow-hidden`}>
      <div className={`px-5 py-3 border-b ${tc.divider} flex items-center gap-3`}>
        {icon && <span className={dark ? 'text-white/30' : 'text-black/30'}>{icon}</span>}
        <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${tc.label}`}>
          {title}
        </span>
        {subtitle && (
          <span className={`hidden sm:inline text-[9px] font-mono ${tc.meta}`}>// {subtitle}</span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Matrix Header ──────────────────────────────────────────────────

export function MatrixHeader({ states, dark }: { states: string[]; dark: boolean }) {
  return (
    <>
      <div />
      {states.map((s) => (
        <div key={s} className="pb-2 flex justify-center">
          <Badge state={s} dark={dark} />
        </div>
      ))}
    </>
  );
}

// ─── Legend ─────────────────────────────────────────────────────────

export function Legend({ dark }: { dark: boolean }) {
  return (
    <p className={`text-[10px] font-mono text-center leading-loose ${dark ? 'text-white/15' : 'text-black/15'}`}>
      <span className="opacity-60">
        ◆ all buttons are live — hover, focus, and click to test every state &nbsp;•&nbsp;
        no CSS simulations, only real component states
      </span>
    </p>
  );
}

// ─── Icon Sizes helper ──────────────────────────────────────────────

export const ICON_SIZES = {
  sm: 12,
  md: 14,
  lg: 16,
} as const;
