import { Button, Icon } from '@blueprintjs/core';
import { Hash, Square, Columns } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Constants ──────────────────────────────────────────────────────

const INTENTS: { key: string; label: string }[] = [
  { key: 'none',    label: 'None' },
  { key: 'primary', label: 'Primary' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'danger',  label: 'Danger' },
];

const STATES: { key: string; extra?: Record<string, unknown> }[] = [
  { key: 'normal' },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'loading',  extra: { loading: true } },
  { key: 'icon',     extra: { icon: 'star' as const } },
  { key: 'danger',   extra: { intent: 'danger' } },
];

const SIZES: { key?: 'small' | 'large'; label: string; props: Record<string, boolean> }[] = [
  { key: undefined,  label: 'Regular', props: {} },
  { key: 'small',    label: 'Small',   props: { small: true } },
  { key: 'large',    label: 'Large',   props: { large: true } },
];

// ─── Matrix ─────────────────────────────────────────────────────────

function Matrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Intent × States" subtitle="blueprintjs v6" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div
          className="grid gap-y-1"
          style={{ gridTemplateColumns: `90px repeat(${STATES.length}, 1fr)`, minWidth: '560px' }}
        >
          <MatrixHeader states={STATES.map(s => s.key)} dark={dark} />
          {INTENTS.map(inv => (
            <>
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{inv.label}</span>
              </div>
              {STATES.map(st => {
                const isIcon = st.key === 'icon';
                const isDanger = st.key === 'danger';
                return (
                  <div key={`${inv.key}-${st.key}`} className="flex justify-center items-center h-12">
                    <Button
                      intent={inv.key}
                      {...(st.extra ?? {})}
                    >
                      {isIcon ? <><Icon icon="star" style={{marginRight: 4}} /> Button</> : isDanger ? 'Delete' : 'Button'}
                    </Button>
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Modifiers ──────────────────────────────────────────────────────

function Modifiers({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Modifiers" subtitle="blueprint" icon={<Square size={14} />} dark={dark}>
      <div className="space-y-4">
        <div>
          <span className={`block mb-2 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Variant modifiers</span>
          <div className="flex flex-wrap gap-3 items-center">
            <Button intent="primary">Default</Button>
            <Button intent="primary" outlined>Outlined</Button>
            <Button intent="primary" minimal>Minimal</Button>
          </div>
        </div>
        <div>
          <span className={`block mb-2 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Sizes</span>
          <div className="flex flex-wrap gap-3 items-center">
            {SIZES.map(s => (
              <Button key={s.label} intent="primary" {...s.props}>{s.label}</Button>
            ))}
          </div>
        </div>
        <div>
          <span className={`block mb-2 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Icon + Fill</span>
          <div className="flex flex-wrap gap-3 items-center">
            <Button icon="add" intent="primary" />
            <Button icon="add" intent="primary">Add</Button>
            <Button icon="edit" intent="primary" rightIcon="chevron-right">Edit</Button>
            <Button intent="primary" fill style={{ maxWidth: 280 }}>Fill</Button>
          </div>
        </div>
        <div>
          <span className={`block mb-2 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Loading variants</span>
          <div className="flex flex-wrap gap-3 items-center">
            {(['none', 'primary', 'success', 'warning', 'danger'] as const).map(inv => (
              <Button key={inv} intent={inv} loading>{inv}</Button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Colors Section ─────────────────────────────────────────────────

function ColorsSection({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Colors" subtitle="all intents" icon={<Columns size={14} />} dark={dark}>
      <div className="flex flex-wrap gap-2 items-center">
        {(['none', 'primary', 'success', 'warning', 'danger'] as const).map(inv => (
          <Button key={inv} intent={inv}>{inv}</Button>
        ))}
      </div>
      <div className={`mt-4 pt-3 border-t ${tc.divider}`}>
        <span className={`block mb-2 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Outlined</span>
        <div className="flex flex-wrap gap-2 items-center">
          {(['none', 'primary', 'success', 'warning', 'danger'] as const).map(inv => (
            <Button key={inv} intent={inv} outlined>{inv}</Button>
          ))}
        </div>
      </div>
      <div className={`mt-4 pt-3 border-t ${tc.divider}`}>
        <span className={`block mb-2 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>Minimal</span>
        <div className="flex flex-wrap gap-2 items-center">
          {(['none', 'primary', 'success', 'warning', 'danger'] as const).map(inv => (
            <Button key={inv} intent={inv} minimal>{inv}</Button>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function BlueprintShowcase({ dark }: { dark: boolean }) {
  return (
    <div className={dark ? 'bp5-dark' : ''}>
      <Matrix dark={dark} />
      <div className="grid lg:grid-cols-2 gap-6">
        <Modifiers dark={dark} />
        <ColorsSection dark={dark} />
      </div>
    </div>
  );
}
