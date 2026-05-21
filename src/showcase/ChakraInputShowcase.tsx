import { Input, Textarea, NativeSelect, Field, Theme } from '@chakra-ui/react';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function ChakraInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  const nativeData = [
    { value: '', label: 'Choose…' },
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ];

  return (
    <Theme appearance={dark ? 'dark' : 'light'} colorPalette="blue">
      <Panel title="Text Inputs" subtitle="chakra v3" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Default" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Error" invalid />
            </div>
          </div>
          <div>
            {label('Variants')}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Outline" variant="outline" />
              <Input placeholder="Subtle" variant="subtle" />
              <Input placeholder="Flushed" variant="flushed" />
            </div>
          </div>
          <div>
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-4">
              {(['xs', 'sm', 'md'] as const).map(s => (
                <Input key={s} placeholder={`Size ${s}`} size={s} />
              ))}
            </div>
          </div>
          <div>
            {label('Field (with label + error)')}
            <div className="grid grid-cols-2 gap-4">
              <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input placeholder="Enter username" />
                <Field.HelperText>Choose a unique name.</Field.HelperText>
              </Field.Root>
              <Field.Root invalid>
                <Field.Label>Email</Field.Label>
                <Input placeholder="Enter email" defaultValue="bad" />
                <Field.ErrorText>Invalid email address.</Field.ErrorText>
              </Field.Root>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="NativeSelect" subtitle="chakra" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('Default')}
            <NativeSelect.Root>
              <NativeSelectField>
                {nativeData.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </NativeSelectField>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {label('Disabled')}
            <NativeSelect.Root disabled>
              <NativeSelectField>
                {nativeData.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </NativeSelectField>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </div>
        </Panel>

        <Panel title="Textarea" subtitle="chakra" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <Textarea placeholder="Default textarea…" />
            <Textarea placeholder="Disabled" disabled />
            <Textarea placeholder="Error" invalid />
          </div>
        </Panel>
      </div>
    </Theme>
  );
}
