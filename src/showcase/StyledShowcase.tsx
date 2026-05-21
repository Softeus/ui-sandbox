import styled, { css } from 'styled-components';
import { Zap, Hash, Columns } from 'lucide-react';
import { Panel, MatrixHeader, t } from './ShowcaseShared';

// ─── Variant styles ─────────────────────────────────────────────────

const variantStyles = {
  primary: css`
    background: #2563eb; color: #fff; border-color: #2563eb;
    &:hover:not(:disabled) { background: #1d4ed8; }
  `,
  secondary: css`
    background: #52525b; color: #e4e4e7; border-color: #52525b;
    &:hover:not(:disabled) { background: #3f3f46; }
  `,
  outline: css`
    background: transparent; color: #a1a1aa; border-color: #52525b;
    &:hover:not(:disabled) { border-color: #3b82f6; color: #60a5fa; }
  `,
  ghost: css`
    background: transparent; color: #a1a1aa; border-color: transparent;
    &:hover:not(:disabled) { background: rgba(255,255,255,.06); color: #fff; }
  `,
  danger: css`
    background: #dc2626; color: #fff; border-color: #dc2626;
    &:hover:not(:disabled) { background: #b91c1c; }
  `,
  link: css`
    background: transparent; color: #60a5fa; border-color: transparent;
    text-decoration: underline; text-underline-offset: 3px;
    &:hover:not(:disabled) { color: #93c5fd; }
  `,
};

type V = keyof typeof variantStyles;

const sizeStyles = {
  sm: css`padding: 4px 10px; font-size: 12px; border-radius: 6px;`,
  md: css`padding: 6px 14px; font-size: 13px; border-radius: 8px;`,
  lg: css`padding: 8px 18px; font-size: 14px; border-radius: 10px;`,
  xl: css`padding: 10px 22px; font-size: 15px; border-radius: 12px;`,
};

const ButtonRoot = styled.button<{ $variant: V; $size: keyof typeof sizeStyles }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid transparent;
  font-family: inherit;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  outline: none;
  transition: background .15s, color .15s, border-color .15s, box-shadow .15s;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(59,130,246,.5);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: .45;
    pointer-events: none;
  }

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
`;

const Spinner = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: sc-spin .5s linear infinite;

  @keyframes sc-spin {
    to { transform: rotate(360deg); }
  }
`;

// ─── Constants ──────────────────────────────────────────────────────

const VARIANTS: { key: V; label: string }[] = [
  { key: 'primary',   label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'outline',   label: 'Outline' },
  { key: 'ghost',     label: 'Ghost' },
  { key: 'danger',    label: 'Danger' },
  { key: 'link',      label: 'Link' },
];

const SIZES = [
  { key: 'sm' as const, label: 'SM' },
  { key: 'md' as const, label: 'MD' },
  { key: 'lg' as const, label: 'LG' },
  { key: 'xl' as const, label: 'XL' },
];

// ─── Matrix ─────────────────────────────────────────────────────────

function Matrix({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const states: { key: string; icon?: boolean; loading?: boolean; disabled?: boolean; variant?: V }[] = [
    { key: 'normal' },
    { key: 'disabled', disabled: true },
    { key: 'loading', loading: true, disabled: true },
    { key: 'icon', icon: true },
    { key: 'danger' },
  ];

  return (
    <Panel title="Variants × States" subtitle="styled-components v6" icon={<Hash size={14} />} dark={dark}>
      <div className="overflow-x-auto">
        <div className="grid min-w-[660px] gap-y-1" style={{ gridTemplateColumns: '85px repeat(5, 1fr)' }}>
          <MatrixHeader states={states.map(s => s.key)} dark={dark} />
          {VARIANTS.map(v => (
            <div key={v.key} className="contents">
              <div className="flex items-center h-12">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{v.label}</span>
              </div>
              {states.map(s => {
                const variant = s.variant ?? v.key;
                return (
                  <div key={`${v.key}-${s.key}`} className="flex justify-center items-center h-12">
                    <ButtonRoot
                      $variant={variant}
                      $size="sm"
                      disabled={s.disabled}
                    >
                      {s.loading && <Spinner />}
                      {s.icon ? <Zap size={14} /> : null}
                      {s.loading ? 'Wait…' : s.icon ? '' : s.key === 'danger' ? 'Delete' : 'Button'}
                    </ButtonRoot>
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

function Sizes({ dark }: { dark: boolean }) {
  const tc = t(dark);
  return (
    <Panel title="Sizes" subtitle="styled-components" icon={<Columns size={14} />} dark={dark}>
      <div className="grid grid-cols-4 gap-3">
        {SIZES.map(sz => (
          <div key={sz.key} className="flex flex-col items-center gap-2">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{sz.label}</span>
            <ButtonRoot $variant="primary" $size={sz.key}>Btn</ButtonRoot>
            <ButtonRoot $variant="outline" $size={sz.key}>Btn</ButtonRoot>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Export ─────────────────────────────────────────────────────────

export default function StyledShowcase({ dark }: { dark: boolean }) {
  return (
    <>
      <Matrix dark={dark} />
      <Sizes dark={dark} />
    </>
  );
}
