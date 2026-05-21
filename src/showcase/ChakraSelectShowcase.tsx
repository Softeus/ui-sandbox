import { ChakraProvider, createSystem, defaultConfig, NativeSelect, Theme } from '@chakra-ui/react';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

const system = createSystem(defaultConfig, { preflight: false } as any);

const data = [
  { value: '', label: 'Choose…' },
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

export default function ChakraSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <ChakraProvider value={system}>
      <Theme appearance={dark ? 'dark' : 'light'} colorPalette="blue">
        <Panel title="Native Select" subtitle="chakra v3" icon={<Hash size={14} />} dark={dark}>
          <div className="space-y-6">
            <div>
              {label('States')}
              <div className="grid grid-cols-3 gap-4">
                <NativeSelect.Root>
                  <NativeSelect.Field>
                    {data.map(d => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <NativeSelect.Root disabled>
                  <NativeSelect.Field>
                    <option value="">Disabled</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <NativeSelect.Root>
                  <NativeSelect.Field aria-invalid="true">
                    <option value="">Error</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </div>
            </div>
            <div>
              {label('Sizes')}
              <div className="grid grid-cols-3 gap-4">
                {(['xs', 'sm', 'md'] as const).map(s => (
                  <NativeSelect.Root key={s} size={s}>
                    <NativeSelect.Field>
                      {data.map(d => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </Theme>
    </ChakraProvider>
  );
}
