import { TextField, TextArea, Select } from '@radix-ui/themes';
import { Search, User, Mail, Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function RadixInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  // Note: TextField.Root renders the <input> internally.
  // TextField.Input is NOT a separate component in Radix v3.
  // Pass all input props directly to TextField.Root.
  // Slots are placed as children and rendered after the input.

  const items = ['Option A', 'Option B', 'Option C'].map(v => (
    <Select.Item key={v} value={v}>{v}</Select.Item>
  ));

  return (
    <>
      <Panel title="Text Fields" subtitle="radix" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <TextField.Root placeholder="Default" />
              <TextField.Root placeholder="Disabled" disabled />
              <TextField.Root placeholder="Error" color="red" defaultValue="bad" />
            </div>
          </div>
          <div>
            {label('With Slots (icons)')}
            <div className="grid grid-cols-3 gap-4">
              <TextField.Root placeholder="Search">
                <TextField.Slot><Search size={14} /></TextField.Slot>
              </TextField.Root>
              <TextField.Root placeholder="Username">
                <TextField.Slot><User size={14} /></TextField.Slot>
              </TextField.Root>
              <TextField.Root placeholder="Email">
                <TextField.Slot><Mail size={14} /></TextField.Slot>
              </TextField.Root>
            </div>
          </div>
          <div>
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-4">
              {(['1', '2', '3'] as const).map(s => (
                <TextField.Root key={s} size={s} placeholder={`Size ${s}`} />
              ))}
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select" subtitle="radix" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <Select.Root defaultValue="">
              <Select.Trigger placeholder="Default" />
              <Select.Content>{items}</Select.Content>
            </Select.Root>
            <Select.Root defaultValue="-" disabled>
              <Select.Trigger placeholder="Disabled" />
              <Select.Content>
                <Select.Item value="-">Disabled</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </Panel>

        <Panel title="TextArea" subtitle="radix" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <TextArea placeholder="Default textarea…" />
            <TextArea placeholder="Disabled" disabled />
            <TextArea placeholder="Error" color="red" />
          </div>
        </Panel>
      </div>
    </>
  );
}
