import { Select } from 'antd';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

const data = ['Option A', 'Option B', 'Option C'];

export default function AntdSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <Panel title="Select" subtitle="antd" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-3 gap-4">
            <Select
              placeholder="Default"
              style={{ width: '100%' }}
              options={data.map(v => ({ value: v, label: v }))}
            />
            <Select
              placeholder="Disabled"
              style={{ width: '100%' }}
              disabled
              options={[]}
            />
            <Select
              placeholder="Error"
              style={{ width: '100%' }}
              status="error"
              options={[{ value: 'x', label: '?' }]}
            />
          </div>
        </div>
        <div>
          {label('Sizes')}
          <div className="grid grid-cols-3 gap-4">
            <Select placeholder="Small" size="small" options={[{ value: 'a', label: 'Opt A' }]} />
            <Select placeholder="Middle" size="middle" options={[{ value: 'a', label: 'Opt A' }]} />
            <Select placeholder="Large" size="large" options={[{ value: 'a', label: 'Opt A' }]} />
          </div>
        </div>
      </div>
    </Panel>
  );
}
