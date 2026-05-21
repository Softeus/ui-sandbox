import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Zap, Hash, Columns, Square } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Constants ──────────────────────────────────────────────────────

const VARIANTS = [
  { key: 'contained', label: 'Contained' },
  { key: 'outlined',  label: 'Outlined' },
  { key: 'text',      label: 'Text' },
] as const;

type V = (typeof VARIANTS)[number]['key'];

const COLORS = [
  { key: 'primary',   label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'success',   label: 'Success' },
  { key: 'error',     label: 'Error' },
  { key: 'info',      label: 'Info' },
  { key: 'warning',   label: 'Warning' },
];

const SIZES = [
  { key: 'small' as const, label: 'SM' },
  { key: 'medium' as const, label: 'MD' },
  { key: 'large' as const, label: 'LG' },
];

// ─── Variants Matrix ────────────────────────────────────────────────

const iconSm = <Zap size={16} />;

function VariantsMatrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const states = [
    { key: 'normal' },
    { key: 'disabled', extra: { disabled: true } },
    { key: 'loading' },
    { key: 'icon',     extra: { startIcon: iconSm } },
  ];
  return (
    <Panel title="Variants × Colors" subtitle="mui v6" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div
          className="grid gap-y-1"
          style={{ gridTemplateColumns: `90px repeat(${states.length}, 1fr)`, minWidth: '500px' }}
        >
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
                    size="small"
                    disabled={s.key === 'disabled' || s.key === 'loading'}
                    {...(s.extra ?? {})}
                  >
                    {s.key === 'icon' ? 'With Icon' : 'Button'}
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

// ─── Color Palette ──────────────────────────────────────────────────

function ColorPalette({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const states: { key: string; extra?: Record<string, unknown> }[] = [
    { key: 'normal' },
    { key: 'disabled', extra: { disabled: true } },
    { key: 'icon',     extra: { startIcon: iconSm } },
  ];
  return (
    <Panel title="Color Palette" subtitle="mui — contained" icon={<Square size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div
          className="grid gap-y-1"
          style={{ gridTemplateColumns: `90px repeat(${states.length}, 1fr)`, minWidth: '400px' }}
        >
          <MatrixHeader states={states.map(s => s.key)} dark={dark} />
          {COLORS.map(c => (
            <div key={c.key} className="contents">
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{c.label}</span>
              </div>
              {states.map(s => (
                <div key={`${c.key}-${s.key}`} className="flex justify-center items-center h-12">
                  <Button
                    variant="contained"
                    color={c.key as any}
                    size="small"
                    disabled={s.key === 'disabled'}
                    {...(s.extra ?? {})}
                  >
                    {s.key === 'icon' ? 'With Icon' : 'Button'}
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
    <Panel title="Sizes & Edge Cases" subtitle="mui" icon={<Columns size={14} />} dark={dark}>
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-4">
          {SIZES.map(s => (
            <div key={s.key} className="flex flex-col items-center gap-2">
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s.label}</span>
              <Button variant="contained" size={s.key}>Contained</Button>
              <Button variant="outlined" size={s.key}>Outlined</Button>
            </div>
          ))}
        </div>
        <div className={`pt-3 border-t ${tc.divider}`}>
          <span className={`block mb-2 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Full width & Link</span>
          <div className="flex flex-col gap-2">
            <Button variant="contained" fullWidth>Full Width Button</Button>
            <div className="flex gap-3">
              <Button variant="text" color="error">Error Text</Button>
              <Button variant="outlined" color="success">Success Outlined</Button>
              <Button variant="contained" color="warning">Warning Contained</Button>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function MuiShowcase({ dark }: { dark: boolean }) {
  const theme = createTheme({
    palette: { mode: dark ? 'dark' : 'light' },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <VariantsMatrix dark={dark} />
      <div className="grid lg:grid-cols-2 gap-6">
        <ColorPalette dark={dark} />
        <Sizes dark={dark} />
      </div>
    </ThemeProvider>
  );
}
