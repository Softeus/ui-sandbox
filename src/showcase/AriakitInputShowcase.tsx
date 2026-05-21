import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

const INPUT =
  'w-full px-3 py-2 rounded-lg text-sm bg-transparent border ' +
  'border-zinc-600 text-white placeholder-zinc-500 ' +
  'hover:border-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 ' +
  'disabled:border-zinc-800 disabled:text-zinc-600 disabled:placeholder-zinc-700 ' +
  'transition-colors duration-150';

const INPUT_ERR =
  'w-full px-3 py-2 rounded-lg text-sm bg-transparent border ' +
  'border-red-500/60 text-white placeholder-red-400/50 ' +
  'focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 ' +
  'transition-colors duration-150';

const SELECT =
  'w-full px-3 py-2 rounded-lg text-sm bg-zinc-800 border border-zinc-600 text-white ' +
  'hover:border-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 ' +
  'disabled:border-zinc-800 disabled:text-zinc-600 ' +
  'transition-colors duration-150';

export default function AriakitInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <>
      <Panel title="Text Inputs" subtitle="tailwind-styled" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <input className={INPUT} placeholder="Default" />
              <input className={INPUT} placeholder="Disabled" disabled />
              <input className={INPUT_ERR} placeholder="Error" defaultValue="bad value" />
            </div>
          </div>
          <div>
            {label('With icon / password')}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
                <input className={`${INPUT} pl-8`} placeholder="Search…" />
              </div>
              <input className={INPUT} type="password" placeholder="Password" />
              <input className={INPUT} placeholder="With value" defaultValue="Hello" />
            </div>
          </div>
          <div>
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-4">
              <input className="w-full px-2 py-1.5 rounded-md text-xs bg-transparent border border-zinc-600 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none transition-colors" placeholder="Small" />
              <input className={INPUT} placeholder="Medium" />
              <input className="w-full px-4 py-3 rounded-lg text-base bg-transparent border border-zinc-600 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none transition-colors" placeholder="Large" />
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select" subtitle="tailwind-styled" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
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
        </Panel>

        <Panel title="Textarea" subtitle="tailwind-styled" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <textarea className={`${INPUT} resize-y min-h-[60px]`} placeholder="Default textarea…" rows={3} />
            <textarea className={INPUT} placeholder="Disabled" disabled rows={2} />
            <textarea className={INPUT_ERR} placeholder="Error" defaultValue="bad" rows={2} />
          </div>
        </Panel>
      </div>
    </>
  );
}
