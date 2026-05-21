import { TextInput, PasswordInput, Select, NativeSelect, Textarea } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function MantineInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  const selectData = ['Option A', 'Option B', 'Option C'];
  const nativeData = [
    { value: '', label: 'Choose…' },
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ];

  return (
    <MantineProvider forceColorScheme={dark ? 'dark' : 'light'}>
      <Panel title="Text Inputs" subtitle="mantine" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <TextInput placeholder="Default" />
              <TextInput placeholder="Disabled" disabled />
              <TextInput placeholder="Error" error="This field is required" />
            </div>
          </div>
          <div>
            {label('Password / With icon')}
            <div className="grid grid-cols-3 gap-4">
              <PasswordInput placeholder="Password" />
              <TextInput placeholder="Search…" leftSection={<span className="opacity-60 text-xs">🔍</span>} />
              <TextInput placeholder="With label" label="Username" />
            </div>
          </div>
          <div>
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-4">
              {(['xs', 'sm', 'md'] as const).map(s => (
                <TextInput key={s} placeholder={`Size ${s}`} size={s} />
              ))}
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select / NativeSelect" subtitle="mantine" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('Select')}
            <Select placeholder="Default" data={selectData} />
            <Select placeholder="Disabled" data={selectData} disabled />
            {label('NativeSelect (HTML select)')}
            <NativeSelect data={nativeData} />
            <NativeSelect data={nativeData} disabled />
          </div>
        </Panel>

        <Panel title="Textarea" subtitle="mantine" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <Textarea placeholder="Default textarea…" />
            <Textarea placeholder="Disabled" disabled />
            <Textarea placeholder="Error" error="Too short" />
          </div>
        </Panel>
      </div>
    </MantineProvider>
  );
}
