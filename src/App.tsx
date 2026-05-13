import { useState } from 'react';
import { Button as AntButton, ConfigProvider, theme, Space, Card as AntCard } from 'antd';
import { Theme as RadixTheme, Button as RadixButton, Flex, Card as RadixCard, Text } from '@radix-ui/themes';
import { Sun, Moon, Layout, Box } from 'lucide-react';
import '@radix-ui/themes/styles.css';

export default function App() {
  const [lib, setLib] = useState<'antd' | 'radix'>('antd');
  const [dark, setDark] = useState(true);

  return (
    <RadixTheme appearance={dark ? 'dark' : 'light'} accentColor="iris">
      <ConfigProvider theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
        
        <div className={`min-h-screen p-8 transition-all ${dark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
          
          {/* Твоя панель переключения */}
          <div className="max-w-2xl mx-auto mb-12 flex items-center justify-between p-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl">
            <div className="flex gap-1">
              <button onClick={() => setLib('antd')} className={`px-6 py-2 rounded-xl transition ${lib === 'antd' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'}`}>Ant Design</button>
              <button onClick={() => setLib('radix')} className={`px-6 py-2 rounded-xl transition ${lib === 'radix' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10'}`}>Radix UI</button>
            </div>
            <button onClick={() => setDark(!dark)} className="p-3 bg-white/10 rounded-xl hover:scale-110 active:scale-95 transition">
              {dark ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} />}
            </button>
          </div>

          {/* Арена для тестов */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            
            {/* Блок Кнопок */}
            <div className="p-6 rounded-3xl border border-white/5 bg-white/5 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-tighter mb-6 opacity-40 flex items-center gap-2">
                <Box size={14} /> Buttons Philosophy
              </h3>
              
              {lib === 'antd' ? (
                <Space direction="vertical" className="w-full">
                  <AntButton type="primary" block size="large">Ant Primary</AntButton>
                  <AntButton block size="large" ghost>Ant Ghost</AntButton>
                  <AntButton type="dashed" block>Ant Dashed</AntButton>
                </Space>
              ) : (
                <Flex direction="column" gap="3">
                  <RadixButton size="3" variant="solid">Radix Solid</RadixButton>
                  <RadixButton size="3" variant="soft">Radix Soft</RadixButton>
                  <RadixButton size="3" variant="outline">Radix Outline</RadixButton>
                </Flex>
              )}
            </div>

            {/* Блок Карточек/Токенов */}
            <div className="p-6 rounded-3xl border border-white/5 bg-white/5 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-tighter mb-6 opacity-40 flex items-center gap-2">
                <Layout size={14} /> Design Tokens
              </h3>
              
              {lib === 'antd' ? (
                <AntCard title="Ant Card" size="small">
                  Консервативные скругления и системные тени.
                </AntCard>
              ) : (
                <RadixCard size="2">
                  <Text as="div" size="2" weight="bold">Radix Card</Text>
                  <Text as="div" size="2" color="gray">Более мягкий, "воздушный" вайб.</Text>
                </RadixCard>
              )}

              {/* Тест чистого Tailwind */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                <p className="text-sm font-medium">Tailwind Token Test</p>
                <div className="mt-2 h-2 w-full bg-indigo-500 rounded-full" />
              </div>
            </div>

          </div>
        </div>
      </ConfigProvider>
    </RadixTheme>
  );
}