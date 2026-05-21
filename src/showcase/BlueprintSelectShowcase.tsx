import { HTMLSelect } from '@blueprintjs/core';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function BlueprintSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  const options = (
    <>
      <option value="">Choose…</option>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </>
  );

  return (
    <Panel title="HTML Select" subtitle="blueprint" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
            <HTMLSelect defaultValue="" fill>
              {options}
            </HTMLSelect>
            <HTMLSelect disabled fill>
              <option value="">Disabled</option>
            </HTMLSelect>
          </div>
        </div>
        <div>
          {label('Minimal variant')}
          <div className="grid grid-cols-2 gap-4">
            <HTMLSelect defaultValue="" fill minimal>
              {options}
            </HTMLSelect>
            <HTMLSelect disabled fill minimal>
              <option value="">Disabled</option>
            </HTMLSelect>
          </div>
        </div>
      </div>
    </Panel>
  );
}
