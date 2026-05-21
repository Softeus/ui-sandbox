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
import CssModulesShowcase from './showcase/CssModulesShowcase';
import StyledShowcase from './showcase/StyledShowcase';
import VanillaShowcase from './showcase/VanillaShowcase';

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
import CssModulesInputShowcase from './showcase/CssModulesInputShowcase';
import StyledInputShowcase from './showcase/StyledInputShowcase';
import VanillaInputShowcase from './showcase/VanillaInputShowcase';

// ─── Types ─────────────────────────────────────────────────────────

type Kit = 'antd' | 'radix' | 'mantine' | 'bootstrap' | 'ariakit' | 'mui' | 'blueprint' | 'chakra' | 'shadcn' | 'css-modules' | 'styled' | 'vanilla';
type CompType = 'buttons' | 'inputs';

// ─── Tab config ────────────────────────────────────────────────────

const KITS: { key: Kit; label: string; active: string; approach: string; approachBrief: string }[] = [
  { key: 'antd',       label: 'Antd',       active: 'bg-blue-600 shadow-blue-600/25',
    approach: 'Runtime CSS-in-JS',       approachBrief: 'Стили генерируются в рантайме через JS (cssinjs)' },
  { key: 'radix',      label: 'Radix',      active: 'bg-indigo-600 shadow-indigo-600/25',
    approach: 'Design Tokens + CSS vars', approachBrief: 'Темизация через CSS custom properties, без JS-оверхеда' },
  { key: 'mantine',    label: 'Mantine',    active: 'bg-pink-600 shadow-pink-600/25',
    approach: 'Runtime CSS-in-JS',       approachBrief: 'Стили через Emotion: JS-объекты → style tags в рантайме' },
  { key: 'bootstrap',  label: 'Bootstrap',  active: 'bg-purple-600 shadow-purple-600/25',
    approach: 'Static CSS Framework',    approachBrief: 'Предкомпилированный CSS + компоненты-обёртки (react-bootstrap)' },
  { key: 'ariakit',    label: 'Ariakit',    active: 'bg-teal-600 shadow-teal-600/25',
    approach: 'Headless / Behavioral',   approachBrief: 'Только логика и accessibility — ноль стилей, 100% контроль дизайна' },
  { key: 'mui',        label: 'MUI',        active: 'bg-cyan-600 shadow-cyan-600/25',
    approach: 'Runtime CSS-in-JS',       approachBrief: 'Material Design через Emotion: styled(), sx prop, ThemeProvider' },
  { key: 'blueprint',  label: 'Blueprint',  active: 'bg-orange-600 shadow-orange-600/25',
    approach: 'Static CSS (SASS)',       approachBrief: 'CSS-фреймворк на SASS + React-компоненты (desktop-first)' },
  { key: 'chakra',     label: 'Chakra',     active: 'bg-green-600 shadow-green-600/25',
    approach: 'Compile-time CSS-in-JS',  approachBrief: 'Panda CSS: стили компилируются в статический CSS на сборке' },
  { key: 'shadcn',     label: 'shadcn/ui',  active: 'bg-stone-600 shadow-stone-600/25',
    approach: 'Copy-paste Components',   approachBrief: 'Не npm-пакет: готовые компоненты копируются в проект (Base UI)' },
  { key: 'css-modules', label: 'CSS Modules', active: 'bg-yellow-600 shadow-yellow-600/25',
    approach: 'CSS Modules (native)',    approachBrief: 'Scoped CSS на этапе сборки: имена классов хэшируются, ноль JS' },
  { key: 'styled',     label: 'SC',          active: 'bg-pink-500 shadow-pink-500/25',
    approach: 'Tagged Template CSS-in-JS', approachBrief: 'CSS пишется буквально как CSS внутри JS (styled-components v6)' },
  { key: 'vanilla',    label: 'Vanilla Ext', active: 'bg-violet-500 shadow-violet-500/25',
    approach: 'Zero-runtime CSS-in-JS',  approachBrief: 'TypeScript-first: стили компилируются, runtime — чистый CSS' },
];

const BTN: Record<Kit, (p: { dark: boolean }) => JSX.Element> = {
  antd: AntdShowcase, radix: RadixShowcase, mantine: MantineShowcase,
  bootstrap: BootstrapShowcase, ariakit: AriakitShowcase,
  mui: MuiShowcase, blueprint: BlueprintShowcase,
  chakra: ChakraShowcase, shadcn: ShadcnShowcase,
  'css-modules': CssModulesShowcase, styled: StyledShowcase, vanilla: VanillaShowcase,
};

const INP: Record<Kit, (p: { dark: boolean }) => JSX.Element> = {
  antd: AntdInputShowcase, radix: RadixInputShowcase, mantine: MantineInputShowcase,
  bootstrap: BootstrapInputShowcase, ariakit: AriakitInputShowcase,
  mui: MuiInputShowcase, blueprint: BlueprintInputShowcase,
  chakra: ChakraInputShowcase, shadcn: ShadcnInputShowcase,
  'css-modules': CssModulesInputShowcase, styled: StyledInputShowcase, vanilla: VanillaInputShowcase,
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
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {KITS.map(k => (
                  <button key={k.key} onClick={() => setKit(k.key)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${kit === k.key ? `${k.active} text-white shadow-lg` : c.idle}`}
                  >{k.label}</button>
                ))}
              </div>

              {/* {approach indicator — selected kit} */}
              {(() => {
                const cur = KITS.find(k => k.key === kit);
                return cur ? (
                  <div className={`flex items-center gap-2 text-[9px] font-mono leading-relaxed ${dark ? 'text-white/30' : 'text-black/30'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cur.active.split(' ')[0]}`} />
                    <span className="font-bold text-white/60">{cur.approach}</span>
                    <span className={`hidden sm:inline ${c.meta}`}>— {cur.approachBrief}</span>
                  </div>
                ) : null;
              })()}

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
            <div>
              <div className={`flex items-center gap-2 mb-3 text-[9px] font-mono ${dark ? 'text-white/30' : 'text-black/30'}`}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-amber-400" />
                <span className="font-bold text-white/60">Utility-first CSS</span>
                <span className={`hidden sm:inline ${c.meta}`}>— Tailwind CSS: atomic-утилиты, JIT-компиляция, ноль рантайма</span>
              </div>
              <TwShow dark={dark} />
            </div>
          </main>

        </div>
      </ConfigProvider>
    </RadixTheme>
  );
}
