import { style } from '@vanilla-extract/css';

// ─── Base button ────────────────────────────────────────────────────

export const btn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  border: '1px solid transparent',
  fontFamily: 'inherit',
  fontWeight: 500,
  lineHeight: 1,
  cursor: 'pointer',
  outline: 'none',
  transition: 'background .15s, color .15s, border-color .15s, box-shadow .15s',
  whiteSpace: 'nowrap',
  selectors: {
    '&:focus-visible': { boxShadow: '0 0 0 2px rgba(59,130,246,.5)' },
    '&:disabled': { cursor: 'not-allowed', opacity: .45, pointerEvents: 'none' },
  },
});

// ─── Variants ───────────────────────────────────────────────────────

export const primary = style({
  background: '#2563eb', color: '#fff', borderColor: '#2563eb',
  selectors: { '&:hover:not(:disabled)': { background: '#1d4ed8' } },
});

export const secondary = style({
  background: '#52525b', color: '#e4e4e7', borderColor: '#52525b',
  selectors: { '&:hover:not(:disabled)': { background: '#3f3f46' } },
});

export const outline = style({
  background: 'transparent', color: '#a1a1aa', borderColor: '#52525b',
  selectors: { '&:hover:not(:disabled)': { borderColor: '#3b82f6', color: '#60a5fa' } },
});

export const ghost = style({
  background: 'transparent', color: '#a1a1aa', borderColor: 'transparent',
  selectors: { '&:hover:not(:disabled)': { background: 'rgba(255,255,255,.06)', color: '#fff' } },
});

export const dangerV = style({
  background: '#dc2626', color: '#fff', borderColor: '#dc2626',
  selectors: { '&:hover:not(:disabled)': { background: '#b91c1c' } },
});

export const link = style({
  background: 'transparent', color: '#60a5fa', borderColor: 'transparent',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  selectors: { '&:hover:not(:disabled)': { color: '#93c5fd' } },
});

export const variantMap = { primary, secondary, outline, ghost, danger: dangerV, link } as const;
export type VariantKey = keyof typeof variantMap;

// ─── Sizes ──────────────────────────────────────────────────────────

export const sizeSm = style({ padding: '4px 10px', fontSize: 12, borderRadius: 6 });
export const sizeMd = style({ padding: '6px 14px', fontSize: 13, borderRadius: 8 });
export const sizeLg = style({ padding: '8px 18px', fontSize: 14, borderRadius: 10 });
export const sizeXl = style({ padding: '10px 22px', fontSize: 15, borderRadius: 12 });

export const sizeMap = { sm: sizeSm, md: sizeMd, lg: sizeLg, xl: sizeXl } as const;
export type SizeKey = keyof typeof sizeMap;

// ─── Spinner ────────────────────────────────────────────────────────

export const spinner = style({
  display: 'inline-block',
  width: 12,
  height: 12,
  border: '2px solid currentColor',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  animation: 've-spin .5s linear infinite',
});
