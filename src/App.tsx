import { useState, type JSX } from 'react';
import { ConfigProvider, theme } from 'antd';
import { Theme as RadixTheme } from '@radix-ui/themes';
import { Box, Sun, Moon, Columns, TextCursorInput } from 'lucide-react';
import '@radix-ui/themes/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';

// ── Button showcases ───────────────────────────────────────────────
import AntdShowcase from './showcase/AntdShowcase';
import RadixShowcase from './showcase/RadixShowcase';
import MantineShowcase from './showcase/MantineShowcase';
import BootstrapShowcase from './showcase/BootstrapShowcase';
import AriakitShowcase from './showcase/AriakitShowcase';
import MuiShowcase from './showcase/MuiShowcase';
import BlueprintShowcase from './showcase/BlueprintShowcase';
import TwShowcase from './showcase/TwShowcase';
import ChakraShowcase from './showcase/ChakraShowcase';
import ShadcnShowcase from './showcase/ShadcnShowcase';

// ── Input showcases ────────────────────────────────────────────────
import AntdInputShowcase from './showcase/AntdInputShowcase';
import RadixInputShowcase from './showcase/RadixInputShowcase';
import MantineInputShowcase from './showcase/MantineInputShowcase';
import BootstrapInputShowcase from './showcase/BootstrapInputShowcase';
import AriakitInputShowcase from './showcase/AriakitInputShowcase';
import MuiInputShowcase from './showcase/MuiInputShowcase';
import BlueprintInputShowcase from './showcase/BlueprintInputShowcase';
import TwInputShowcase from './showcase/TwInputShowcase';
import ChakraInputShowcase from './showcase/ChakraInputShowcase';
import ShadcnInputShowcase from './showcase/ShadcnInputShowcase';

// ─── Types ─────────────────────────────────────────────────────────

type Kit = 'antd' | 'radix' | 'mantine' | 'bootstrap' | 'ariakit' | 'mui' | 'blueprint' | 'chakra' | 'shadcn';
type CompType = 'buttons' | 'inputs';

// ─── Tab config ────────────────────────────────────────────────────

const KITS: { key: Kit; label: string; active: string }[] = [
  { key: 'antd',      label: 'Antd',       active: 'bg-blue-600 shadow-blue-600/25' },
  { key: 'radix',     label: 'Radix',      active: 'bg-indigo-600 shadow-indigo-600/25' },
  { key: 'mantine',   label: 'Mantine',    active: 'bg-pink-600 shadow-pink-600/25' },
  { key: 'bootstrap', label: 'Bootstrap',  active: 'bg-purple-600 shadow-purple-600/25' },
  { key: 'ariakit',   label: 'Ariakit',    active: 'bg-teal-600 shadow-teal-600/25' },
  { key: 'mui',       label: 'MUI',        active: 'bg-cyan-600 shadow-cyan-600/25' },
  { key: 'blueprint', label: 'Blueprint',  active: 'bg-orange-600 shadow-orange-600/25' },
  { key: 'chakra',    label: 'Chakra',     active: 'bg-green-600 shadow-green-600/25' },
  { key: 'shadcn',    label: 'shadcn/ui',  active: 'bg-stone-600 shadow-stone-600/25' },
];

const BTN: Record<Kit, (p: { dark: boolean }) => JSX.Element> = {
  antd: AntdShowcase, radix: RadixShowcase, mantine: MantineShowcase,
  bootstrap: BootstrapShowcase, ariakit: AriakitShowcase,
  mui: MuiShowcase, blueprint: BlueprintShowcase,
  chakra: ChakraShowcase, shadcn: ShadcnShowcase,
};

const INP: Record<Kit, (p: { dark: boolean }) => JSX.Element> = {
  antd: AntdInputShowcase, radix: RadixInputShowcase, mantine: MantineInputShowcase,
  bootstrap: BootstrapInputShowcase, ariakit: AriakitInputShowcase,
  mui: MuiInputShowcase, blueprint: BlueprintInputShowcase,
  chakra: ChakraInputShowcase, shadcn: ShadcnInputShowcase,
};

// ─── Theme helper ──────────────────────────────────────────────────

const th = (dark: boolean) => ({
  card:  dark ? 'border-white/[0.07] bg-white/[0.035]' : 'border-black/[0.07] bg-black/[0.02]',
  text:  dark ? 'text-white/45'                        : 'text-black/45',
  meta:  dark ? 'text-white/25'                        : 'text-black/25',
  idle:  dark ? 'text-white/40 hover:text-white/70 hover:bg-white/5' : 'text-black/40 hover:text-black/70 hover:bg-black/5',
  compIdle: dark ? 'text-white/30 border-transparent' : 'text-black/30 border-transparent',
});

// ═══════════════════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════════════════

export default function App() {
  const [kit, setKit] = useState<Kit>('antd');
  const [comp, setComp] = useState<CompType>('buttons');
  const [dark, setDark] = useState(true);
  const c = th(dark);

  const Showcase = (comp === 'buttons' ? BTN : INP)[kit];
  const TwShow = comp === 'buttons' ? TwShowcase : TwInputShowcase;

  return (
    <RadixTheme appearance={dark ? 'dark' : 'light'} accentColor="iris">
      <ConfigProvider theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
        <div className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${dark ? 'dark bg-[#08080e] text-white' : 'bg-zinc-50 text-zinc-900'}`}>

          {/* ══ HEADER ══ */}
          <header className="max-w-6xl mx-auto mb-6">
            <div className={`rounded-2xl border ${c.card} backdrop-blur-sm px-4 py-3`}>

              {/* Title row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Box size={16} className={dark ? 'text-white/25' : 'text-black/25'} />
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${c.text}`}>Component Lab</span>
                  <span className={`hidden sm:inline text-[9px] font-mono ${c.meta}`}>// design systems playground</span>
                </div>
                <button onClick={() => setDark(p => !p)} className={`p-2 rounded-lg transition ${c.idle}`}>
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>

              {/* Kit tabs */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {KITS.map(k => (
                  <button key={k.key} onClick={() => setKit(k.key)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${kit === k.key ? `${k.active} text-white shadow-lg` : c.idle}`}
                  >{k.label}</button>
                ))}
              </div>

              {/* Component type tabs */}
              <div className="flex gap-1">
                {([['buttons', 'Buttons', Columns], ['inputs', 'Inputs', TextCursorInput]] as const).map(([key, label, Icon]) => (
                  <button key={key} onClick={() => setComp(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${comp === key ? `${dark ? 'text-white bg-white/10' : 'text-black bg-black/10'}` : c.compIdle}`}
                  ><Icon size={14} />{label}</button>
                ))}
              </div>
            </div>
          </header>

          {/* ══ MAIN ══ */}
          <main className="max-w-6xl mx-auto space-y-6">
            <Showcase dark={dark} />
            <TwShow dark={dark} />
          </main>

        </div>
      </ConfigProvider>
    </RadixTheme>
  );
}
