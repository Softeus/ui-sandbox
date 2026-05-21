import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

const SELECT =
  'w-full px-3 py-2 rounded-lg text-sm bg-zinc-800 border border-zinc-600 text-white ' +
  'hover:border-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 ' +
  'disabled:border-zinc-800 disabled:text-zinc-600 ' +
  'transition-colors duration-150';

export default function AriakitSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <Panel title="Native &lt;select&gt;" subtitle="tailwind-styled" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
            <select className={SELECT} defaultValue="">
              <option value="" disabled>Choose…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
            <select className={SELECT} disabled>
              <option>Disabled</option>
            </select>
          </div>
        </div>
        <div>
          {label('Multi-select (native)')}
          <div className="space-y-4">
            <select className={`${SELECT} min-h-[80px]`} multiple>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </div>
        </div>
      </div>
    </Panel>
  );
}
