import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';
import css from './CssModulesInputShowcase.module.css';

export default function CssModulesInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (text: string) => (
    <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
      {text}
    </span>
  );
  const rootCls = dark ? css.dark : '';
  const inpCls = (extra = '') => `${css.input} ${extra}`.trim();
  const taCls = (extra = '') => `${css.textarea} ${extra}`.trim();
  const selCls = (extra = '') => `${css.select} ${extra}`.trim();

  return (
    <>
      <Panel title="Text Inputs" subtitle="css modules (native)" icon={<Hash size={14} />} dark={dark}>
        <div className={`space-y-6 ${rootCls}`}>
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <input className={inpCls()} placeholder="Default" />
              <input className={inpCls()} placeholder="Disabled" disabled />
              <input className={inpCls(css.error)} placeholder="Error" />
            </div>
          </div>
          <div>
            {label('Types')}
            <div className="grid grid-cols-3 gap-4">
              <input className={inpCls()} placeholder="Text" />
              <input className={inpCls()} placeholder="Password" type="password" />
              <input className={inpCls()} placeholder="Search…" type="search" />
            </div>
          </div>
          <div>
            {label('With Label')}
            <div className="grid grid-cols-2 gap-4">
              <div className={css.field}>
                <label className={css.label} htmlFor="cm-username">Username</label>
                <input id="cm-username" className={inpCls()} placeholder="Enter username" />
              </div>
              <div className={css.field}>
                <label className={css.label} htmlFor="cm-email">Email (invalid)</label>
                <input id="cm-email" className={inpCls(css.error)} placeholder="Enter email" defaultValue="bad" />
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <div className={`grid lg:grid-cols-2 gap-6 ${rootCls}`}>
        <Panel title="Select" subtitle="css modules" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('Default')}
            <select className={selCls()}>
              <option value="">Choose…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
            {label('Disabled')}
            <select className={selCls()} disabled>
              <option value="">Disabled</option>
            </select>
          </div>
        </Panel>

        <Panel title="Textarea" subtitle="css modules" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <textarea className={taCls()} placeholder="Default textarea…" />
            <textarea className={taCls()} placeholder="Disabled" disabled />
            <textarea className={taCls(css.error)} placeholder="Error" />
          </div>
        </Panel>
      </div>
    </>
  );
}
