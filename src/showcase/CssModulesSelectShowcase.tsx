import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';
import css from './CssModulesInputShowcase.module.css';

export default function CssModulesSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (text: string) => (
    <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
      {text}
    </span>
  );
  const selCls = (extra = '') => `${css.select} ${extra}`.trim();

  return (
    <Panel title="Native &lt;select&gt;" subtitle="css modules" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
            <select className={selCls()}>
              <option value="">Choose…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
            <select className={selCls()} disabled>
              <option value="">Disabled</option>
            </select>
          </div>
        </div>
        <div>
          {label('Error')}
          <div className="space-y-4">
            <select className={selCls(css.error)} defaultValue="bad">
              <option value="bad">Invalid value</option>
              <option value="a">Option A</option>
            </select>
          </div>
        </div>
      </div>
    </Panel>
  );
}
