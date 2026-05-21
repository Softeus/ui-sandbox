import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';
import * as ve from './VanillaInputShowcase.css';

export default function VanillaInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (text: string) => (
    <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{text}</span>
  );

  return (
    <>
      <Panel title="Text Inputs" subtitle="vanilla-extract (zero-runtime)" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <input className={ve.input} placeholder="Default" />
              <input className={ve.input} placeholder="Disabled" disabled />
              <input className={`${ve.input} ${ve.error}`} placeholder="Error" />
            </div>
          </div>
          <div>
            {label('Types')}
            <div className="grid grid-cols-3 gap-4">
              <input className={ve.input} placeholder="Text" />
              <input className={ve.input} placeholder="Password" type="password" />
              <input className={ve.input} placeholder="Search…" type="search" />
            </div>
          </div>
          <div>
            {label('With Label')}
            <div className="grid grid-cols-2 gap-4">
              <div className={ve.field}>
                <label className={ve.label}>Username</label>
                <input className={ve.input} placeholder="Enter username" />
              </div>
              <div className={ve.field}>
                <label className={ve.label}>Email (invalid)</label>
                <input className={`${ve.input} ${ve.error}`} placeholder="Enter email" defaultValue="bad" />
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select" subtitle="vanilla-extract" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('Default')}
            <select className={ve.select}>
              <option value="">Choose…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
            {label('Disabled')}
            <select className={ve.select} disabled>
              <option value="">Disabled</option>
            </select>
          </div>
        </Panel>

        <Panel title="Textarea" subtitle="vanilla-extract" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <textarea className={ve.textarea} placeholder="Default textarea…" />
            <textarea className={ve.textarea} placeholder="Disabled" disabled />
            <textarea className={`${ve.textarea} ${ve.error}`} placeholder="Error" />
          </div>
        </Panel>
      </div>
    </>
  );
}
