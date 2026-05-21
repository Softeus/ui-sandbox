import { Select, NativeSelect, MantineProvider } from '@mantine/core';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function MantineSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  const selectData = ['Option A', 'Option B', 'Option C'];
  const nativeData = [
    { value: '', label: 'Choose…' },
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  return (
    <MantineProvider forceColorScheme={dark ? 'dark' : 'light'}>
      <Panel title="Select" subtitle="mantine" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-2 gap-4">
              <Select placeholder="Default" data={selectData} />
              <Select placeholder="Disabled" data={selectData} disabled />
            </div>
          </div>
          <div>
            {label('Variants')}
            <div className="grid grid-cols-2 gap-4">
              <Select placeholder="Default variant" data={selectData} />
              <Select placeholder="Filled variant" data={selectData} variant="filled" />
            </div>
          </div>
          <div>
            {label('Native HTML select')}
            <div className="grid grid-cols-2 gap-4">
              <NativeSelect data={nativeData} />
              <NativeSelect data={nativeData} disabled />
            </div>
          </div>
        </div>
      </Panel>
    </MantineProvider>
  );
}
