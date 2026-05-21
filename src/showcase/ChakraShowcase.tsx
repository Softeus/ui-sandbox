import { Button, IconButton, Theme } from '@chakra-ui/react';
import { Zap, Hash, Columns } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Constants ──────────────────────────────────────────────────────

const VARIANTS = [
  { key: 'solid',   label: 'Solid' },
  { key: 'subtle',  label: 'Subtle' },
  { key: 'surface', label: 'Surface' },
  { key: 'outline', label: 'Outline' },
  { key: 'ghost',   label: 'Ghost' },
  { key: 'plain',   label: 'Plain' },
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
    { key: 'icon',     extra: { icon: true } },
    { key: 'danger',   extra: { colorPalette: 'red' } },
  ];

  return (
    <Panel title="Variants × States" subtitle="chakra v3 (panda)" icon={<Hash size={14} />} dark={dark}>
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
                  {s.key === 'icon' ? (
                    <IconButton
                      variant={v.key as V}
                      aria-label="Zap"
                      size="sm"
                      colorPalette={s.key === 'danger' ? 'red' : undefined}
                    >
                      <Zap />
                    </IconButton>
                  ) : (
                    <Button
                      variant={v.key as V}
                      size="sm"
                      colorPalette={s.key === 'danger' ? 'red' : undefined}
                      {...(s.extra ?? {})}
                    >
                      {s.key === 'loading' ? 'Saving…' : s.key === 'danger' ? 'Delete' : 'Button'}
                    </Button>
                  )}
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
    <Panel title="Sizes" subtitle="chakra" icon={<Columns size={14} />} dark={dark}>
      <div className="grid grid-cols-5 gap-3">
        {SIZES.map(s => (
          <div key={s.key} className="flex flex-col items-center gap-2">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s.label}</span>
            <Button variant="solid" size={s.key} width="full">Btn</Button>
            <Button variant="outline" size={s.key} width="full">Btn</Button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function ChakraShowcase({ dark }: { dark: boolean }) {
  return (
    <Theme appearance={dark ? 'dark' : 'light'} colorPalette="blue">
      <Matrix dark={dark} />
      <Sizes dark={dark} />
    </Theme>
  );
}
