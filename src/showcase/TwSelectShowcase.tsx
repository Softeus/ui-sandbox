import { Box } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

// ─── Shared Tailwind select class ───────────────────────────────────

const SELECT =
  'w-full px-3 py-2 rounded-lg text-sm bg-zinc-800/50 border border-white/20 text-white ' +
  'hover:border-white/40 focus:border-white/60 focus:outline-none focus:ring-1 focus:ring-white/30 ' +
  'disabled:border-zinc-800 disabled:text-zinc-600 ' +
  'transition-all duration-150';

// ─── Component ─────────────────────────────────────────────────────

export default function TwSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <Panel title="Custom Tailwind Select" subtitle="handcrafted" icon={<Box size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
            <select className={SELECT} defaultValue="">
              <option value="" disabled>Choose an option…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
            <select className={SELECT} disabled defaultValue="">
              <option value="">Disabled</option>
            </select>
          </div>
        </div>
        <div>
          {label('Sizes')}
          <div className="grid grid-cols-3 gap-4">
            <select className="w-full px-2 py-1.5 rounded-md text-xs bg-zinc-800/50 border border-white/20 text-white focus:border-white/60 focus:outline-none transition-all">
              <option>Small</option>
              <option value="a">Option A</option>
            </select>
            <select className={SELECT}>
              <option value="">Medium</option>
              <option value="a">Option A</option>
            </select>
            <select className="w-full px-4 py-3 rounded-xl text-base bg-zinc-800/50 border border-white/20 text-white focus:border-white/60 focus:outline-none transition-all">
              <option value="">Large</option>
              <option value="a">Option A</option>
            </select>
          </div>
        </div>
      </div>
    </Panel>
  );
}
