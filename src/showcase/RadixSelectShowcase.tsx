import { Select, Text } from '@radix-ui/themes';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

const items = ['Option A', 'Option B', 'Option C'].map(v => (
  <Select.Item key={v} value={v}>{v}</Select.Item>
));

export default function RadixSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <Panel title="Select" subtitle="radix" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
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
        </div>
        <div>
          {label('With label')}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <Text size="1" color="gray">Framework</Text>
              <Select.Root defaultValue="radix">
                <Select.Trigger />
                <Select.Content>{items}</Select.Content>
              </Select.Root>
            </label>
            <label className="flex flex-col gap-1.5">
              <Text size="1" color="gray">Disabled</Text>
              <Select.Root defaultValue="" disabled>
                <Select.Trigger placeholder="—" />
                <Select.Content>
                  <Select.Item value="-">—</Select.Item>
                </Select.Content>
              </Select.Root>
            </label>
          </div>
        </div>
      </div>
    </Panel>
  );
}
