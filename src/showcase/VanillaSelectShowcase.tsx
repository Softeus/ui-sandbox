import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';
import * as ve from './VanillaInputShowcase.css';

export default function VanillaSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (text: string) => (
    <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{text}</span>
  );

  return (
    <Panel title="Native &lt;select&gt;" subtitle="vanilla-extract" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
            <select className={ve.select}>
              <option value="">Choose…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
            <select className={ve.select} disabled>
              <option value="">Disabled</option>
            </select>
          </div>
        </div>
        <div>
          {label('Error')}
          <div className="space-y-4">
            <select className={`${ve.select} ${ve.error}`} defaultValue="bad">
              <option value="bad">Invalid value</option>
              <option value="a">Option A</option>
            </select>
          </div>
        </div>
      </div>
    </Panel>
  );
}
