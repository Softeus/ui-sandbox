import { InputGroup, HTMLSelect, TextArea } from '@blueprintjs/core';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function BlueprintInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <div className={dark ? 'bp5-dark' : ''}>
      <Panel title="Input Groups" subtitle="blueprint" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <InputGroup placeholder="Default" />
              <InputGroup placeholder="Disabled" disabled />
              <InputGroup placeholder="Error" intent="danger" />
            </div>
          </div>
          <div>
            {label('With icons / left/right elements')}
            <div className="grid grid-cols-3 gap-4">
              <InputGroup placeholder="Search…" leftIcon="search" />
              <InputGroup placeholder="Username" leftIcon="person" />
              <InputGroup placeholder="Password" type="password" />
            </div>
          </div>
          <div>
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-4">
              <InputGroup placeholder="Small" small />
              <InputGroup placeholder="Default" />
              <InputGroup placeholder="Large" large />
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="HTML Select" subtitle="blueprint" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <HTMLSelect defaultValue="" fill>
              <option value="" disabled>Choose…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </HTMLSelect>
            <HTMLSelect disabled fill>
              <option>Disabled</option>
            </HTMLSelect>
          </div>
        </Panel>

        <Panel title="TextArea" subtitle="blueprint" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <TextArea placeholder="Default textarea…" fill rows={3} />
            <TextArea placeholder="Disabled" disabled fill rows={2} />
            <TextArea placeholder="Error" intent="danger" fill rows={2} />
          </div>
        </Panel>
      </div>
    </div>
  );
}
