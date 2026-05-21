import { Button, MantineProvider } from '@mantine/core';
import { Zap, Hash, Columns } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Constants ──────────────────────────────────────────────────────

const VARIANTS = [
  { key: 'filled',   label: 'Filled' },
  { key: 'light',    label: 'Light' },
  { key: 'outline',  label: 'Outline' },
  { key: 'subtle',   label: 'Subtle' },
  { key: 'gradient', label: 'Gradient' },
  { key: 'default',  label: 'Default' },
] as const;

type V = (typeof VARIANTS)[number]['key'];

const SIZES = [
  { key: 'xs' as const, label: 'XS' },
  { key: 'sm' as const, label: 'SM' },
  { key: 'md' as const, label: 'MD' },
  { key: 'lg' as const, label: 'LG' },
  { key: 'xl' as const, label: 'XL' },
];

// ─── Matrix ─────────────────────────────────────────────────────────

function Matrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const states: { key: string; extra?: Record<string, unknown> }[] = [
    { key: 'normal' },
    { key: 'disabled', extra: { disabled: true } },
    { key: 'loading',  extra: { loading: true } },
    { key: 'icon',     extra: { leftSection: <Zap size={14} /> } },
    { key: 'danger',   extra: { color: 'red' } },
  ];
  return (
    <Panel title="Variants × States" subtitle="mantine v7" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div className="grid min-w-[660px] gap-y-1" style={{ gridTemplateColumns: '85px repeat(5, 1fr)' }}>
          <MatrixHeader states={states.map(s => s.key)} dark={dark} />
          {VARIANTS.map(v => (
            <div key={v.key} className="contents">
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{v.label}</span>
              </div>
              {states.map(s => (
                <div key={`${v.key}-${s.key}`} className="flex justify-center items-center h-12">
                  <Button
                    variant={v.key as V}
                    size="sm"
                    color={s.key === 'danger' ? 'red' : undefined}
                    {...(s.extra ?? {})}
                    {...(v.key === 'gradient' ? { gradient: { from: 'indigo', to: 'cyan' }, color: undefined } : {})}
                  >
                    {s.key === 'icon' ? 'With Icon' : s.key === 'danger' ? 'Delete' : 'Button'}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Sizes ──────────────────────────────────────────────────────────

function Sizes({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Sizes" subtitle="mantine" icon={<Columns size={14} />} dark={dark}>
      <div className="grid grid-cols-5 gap-3">
        {SIZES.map(s => (
          <div key={s.key} className="flex flex-col items-center gap-2">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s.label}</span>
            <Button variant="filled" size={s.key} fullWidth>Btn</Button>
            <Button variant="light" size={s.key} fullWidth>Btn</Button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function MantineShowcase({ dark }: { dark: boolean }) {
  return (
    <MantineProvider forceColorScheme={dark ? 'dark' : 'light'}>
      <Matrix dark={dark} />
      <Sizes dark={dark} />
    </MantineProvider>
  );
}
