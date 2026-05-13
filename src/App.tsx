import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { Theme as RadixTheme } from '@radix-ui/themes';
import { Box, Sun, Moon } from 'lucide-react';
import '@radix-ui/themes/styles.css';

// Additional UI kit CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';

// Showcase components — one file per kit, all small & focused
import AntdShowcase from './showcase/AntdShowcase';
import RadixShowcase from './showcase/RadixShowcase';
import TwShowcase from './showcase/TwShowcase';
import MantineShowcase from './showcase/MantineShowcase';
import BootstrapShowcase from './showcase/BootstrapShowcase';
import AriakitShowcase from './showcase/AriakitShowcase';
import MuiShowcase from './showcase/MuiShowcase';
import BlueprintShowcase from './showcase/BlueprintShowcase';

// ─── Tab config ─────────────────────────────────────────────────────

type Kit = 'antd' | 'radix' | 'mantine' | 'bootstrap' | 'ariakit' | 'mui' | 'blueprint';

const KITS: { key: Kit; label: string; active: string }[] = [
  { key: 'antd',      label: 'Antd',       active: 'bg-blue-600 shadow-blue-600/25' },
  { key: 'radix',     label: 'Radix',      active: 'bg-indigo-600 shadow-indigo-600/25' },
  { key: 'mantine',   label: 'Mantine',    active: 'bg-pink-600 shadow-pink-600/25' },
  { key: 'bootstrap', label: 'Bootstrap',  active: 'bg-purple-600 shadow-purple-600/25' },
  { key: 'ariakit',   label: 'Ariakit',    active: 'bg-teal-600 shadow-teal-600/25' },
  { key: 'mui',       label: 'MUI',        active: 'bg-cyan-600 shadow-cyan-600/25' },
  { key: 'blueprint', label: 'Blueprint',  active: 'bg-orange-600 shadow-orange-600/25' },
];

const SHOWCASE: Record<Kit, (props: { dark: boolean }) => JSX.Element> = {
  antd:      AntdShowcase,
  radix:     RadixShowcase,
  mantine:   MantineShowcase,
  bootstrap: BootstrapShowcase,
  ariakit:   AriakitShowcase,
  mui:       MuiShowcase,
  blueprint: BlueprintShowcase,
};

// ─── Theme helper ───────────────────────────────────────────────────

const th = (dark: boolean) => ({
  card:  dark ? 'border-white/[0.07] bg-white/[0.035]' : 'border-black/[0.07] bg-black/[0.02]',
  text:  dark ? 'text-white/45'                        : 'text-black/45',
  meta:  dark ? 'text-white/25'                        : 'text-black/25',
  btnIdle: dark ? 'text-white/40 hover:text-white/70 hover:bg-white/5' : 'text-black/40 hover:text-black/70 hover:bg-black/5',
});

// ═════════════════════════════════════════════════════════════════════
//  APP
// ═════════════════════════════════════════════════════════════════════

export default function App() {
  const [kit, setKit] = useState<Kit>('antd');
  const [dark, setDark] = useState(true);
  const c = th(dark);

  const Showcase = SHOWCASE[kit];

  return (
    <RadixTheme appearance={dark ? 'dark' : 'light'} accentColor="iris">
      <ConfigProvider theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
        <div className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${dark ? 'bg-[#08080e] text-white' : 'bg-zinc-50 text-zinc-900'}`}>

          {/* ══ HEADER ══ */}
          <header className="max-w-6xl mx-auto mb-8">
            <div className={`rounded-2xl border ${c.card} backdrop-blur-sm px-4 py-3`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Box size={16} className={dark ? 'text-white/25' : 'text-black/25'} />
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${c.text}`}>Button Lab</span>
                  <span className={`hidden sm:inline text-[9px] font-mono ${c.meta}`}>// design systems playground</span>
                </div>
                <button
                  onClick={() => setDark(p => !p)}
                  className={`p-2 rounded-lg transition ${c.btnIdle}`}
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>

              {/* Kit tabs */}
              <div className="flex flex-wrap gap-1.5">
                {KITS.map(k => (
                  <button
                    key={k.key}
                    onClick={() => setKit(k.key)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${kit === k.key ? `${k.active} text-white shadow-lg` : c.btnIdle}`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* ══ MAIN ══ */}
          <main className="max-w-6xl mx-auto space-y-6">
            <Showcase dark={dark} />
            <TwShowcase dark={dark} />
          </main>

        </div>
      </ConfigProvider>
    </RadixTheme>
  );
}
