import { Input, Select } from 'antd';
import { User, Search, Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function AntdInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <>
      <Panel title="Text Inputs" subtitle="antd" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">

          {/* Default states */}
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Default" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Error" status="error" />
            </div>
          </div>

          {/* With icons / prefix / suffix */}
          <div>
            {label('Prefix / Suffix / Password')}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Username" prefix={<User size={14} />} />
              <Input placeholder="Search" suffix={<Search size={14} />} />
              <Input.Password placeholder="Password" />
            </div>
          </div>

          {/* Sizes */}
          <div>
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Small" size="small" />
              <Input placeholder="Middle" size="middle" />
              <Input placeholder="Large" size="large" />
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select" subtitle="antd" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <Select placeholder="Default" style={{ width: '100%' }} options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }, { value: 'c', label: 'Option C' }]} />
            <Select placeholder="Disabled" style={{ width: '100%' }} disabled options={[]} />
            <Select placeholder="Error" style={{ width: '100%' }} status="error" options={[{ value: 'x', label: '?' }]} />
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-3">
              <Select placeholder="Small" size="small" options={[{ value: 'a', label: 'Opt A' }]} />
              <Select placeholder="Middle" size="middle" options={[{ value: 'a', label: 'Opt A' }]} />
              <Select placeholder="Large" size="large" options={[{ value: 'a', label: 'Opt A' }]} />
            </div>
          </div>
        </Panel>

        <Panel title="TextArea & Search" subtitle="antd" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('TextArea')}
            <Input.TextArea placeholder="TextArea — default" rows={3} />
            <Input.TextArea placeholder="Disabled" disabled rows={2} />
            <Input.TextArea placeholder="Error" status="error" rows={2} />
            {label('Search')}
            <Input.Search placeholder="Search..." enterButton />
            <Input.Search placeholder="Disabled" enterButton disabled />
          </div>
        </Panel>
      </div>
    </>
  );
}
