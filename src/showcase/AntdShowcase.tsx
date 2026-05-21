import { Button as AntButton } from 'antd';
import { Zap, Hash, Columns, Square } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Types ──────────────────────────────────────────────────────────

// antd v6 Button accepts color/variant as string props — use as any to bypass strict union checks
type AColor = any;
type AVariant = any;

// ─── Constants ──────────────────────────────────────────────────────

const ANT_VARIANTS = [
  { key: 'solid', label: 'Solid' },
  { key: 'outlined', label: 'Outlined' },
  { key: 'dashed', label: 'Dashed' },
  { key: 'filled', label: 'Filled' },
  { key: 'text', label: 'Text' },
  { key: 'link', label: 'Link' },
] as const;

const MATRIX_STATES: { key: string; color: string; extra?: Record<string, unknown> }[] = [
  { key: 'normal', color: 'primary' },
  { key: 'disabled', color: 'primary', extra: { disabled: true } },
  { key: 'loading', color: 'primary', extra: { loading: true } },
  { key: 'icon', color: 'primary', extra: { icon: <Zap size={14} /> } },
  { key: 'danger', color: 'danger' },
  { key: 'ghost', color: 'primary', extra: { ghost: true } },
];

// ─── Variants × States Matrix ──────────────────────────────────────

function AntdMatrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Variants × States" subtitle="antd v6" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] gap-y-1" style={{ gridTemplateColumns: '85px repeat(6, 1fr)' }}>
          <MatrixHeader states={MATRIX_STATES.map(s => s.key)} dark={dark} />
          {ANT_VARIANTS.map(v => (
            <div key={v.key} className="contents">
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{v.label}</span>
              </div>
              {MATRIX_STATES.map(s => {
                // `ghost` is only valid for variant types that have a border/background
                const isGhostState = s.key === 'ghost';
                const skipGhost = isGhostState && (v.key === 'text' || v.key === 'link');
                const extra = skipGhost ? {} : (s.extra ?? {});
                return (
                  <div key={`${v.key}-${s.key}`} className="flex justify-center items-center h-12">
                    <AntButton
                      color={s.color as AColor}
                      variant={v.key as AVariant}
                      size="middle"
                      {...extra as Record<string, unknown>}
                    >
                      {s.key === 'danger' ? 'Delete' : 'Button'}
                    </AntButton>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Sizes ──────────────────────────────────────────────────────────

function AntdSizes({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const sizes = [
    { key: 'small' as const, label: 'Small' },
    { key: 'middle' as const, label: 'Medium' },
    { key: 'large' as const, label: 'Large' },
  ];
  return (
    <Panel title="Sizes" subtitle="antd" icon={<Columns size={14} />} dark={dark}>
      <div className="grid grid-cols-3 gap-6">
        {sizes.map(s => (
          <div key={s.key} className="flex flex-col items-center gap-3">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s.label}</span>
            <AntButton type="primary" size={s.key}>Primary</AntButton>
            <AntButton size={s.key}>Default</AntButton>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Edge Cases ─────────────────────────────────────────────────────

function AntdEdgeCases({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Shapes & Edge Cases" subtitle="antd" icon={<Square size={14} />} dark={dark}>
      <div className="space-y-5">
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Shape</span>
          <div className="flex flex-wrap gap-3 items-center">
            <AntButton type="primary">Default</AntButton>
            <AntButton type="primary" shape="round">Round</AntButton>
            <AntButton type="primary" shape="square">Sq</AntButton>
            <AntButton type="primary" shape="circle">C</AntButton>
          </div>
        </div>
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Icon placements</span>
          <div className="flex flex-wrap gap-3 items-center">
            <AntButton type="primary" icon={<Zap size={14} />} />
            <AntButton type="primary" icon={<Zap size={14} />}>Icon Start</AntButton>
            <AntButton type="primary" icon={<Zap size={14} />} iconPlacement="end">Icon End</AntButton>
          </div>
        </div>
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Modifiers</span>
          <div className="flex flex-wrap gap-3 items-center">
            <AntButton type="primary" danger>Danger Solid</AntButton>
            <AntButton danger>Danger Outlined</AntButton>
            <AntButton type="primary" ghost>Ghost Solid</AntButton>
            <AntButton ghost>Ghost Outlined</AntButton>
          </div>
        </div>
        <div>
          <span className={`block mb-3 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Block (full width)</span>
          <div className="flex flex-col gap-2">
            <AntButton type="primary" block>Block Primary</AntButton>
            <AntButton block>Block Default</AntButton>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function AntdShowcase({ dark }: { dark: boolean }) {
  return (
    <>
      <AntdMatrix dark={dark} />
      <div className="grid lg:grid-cols-2 gap-6">
        <AntdSizes dark={dark} />
        <AntdEdgeCases dark={dark} />
      </div>
    </>
  );
}
