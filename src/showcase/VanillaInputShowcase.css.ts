import { style } from '@vanilla-extract/css';

// ─── Shared input base ──────────────────────────────────────────────

const inputBase = {
  width: '100%',
  padding: '7px 10px',
  border: '1px solid #3f3f46',
  borderRadius: 8,
  background: 'transparent',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 13,
  outline: 'none',
  transition: 'border-color .15s',
  selectors: {
    '&::placeholder': { color: '#71717a' },
    '&:focus': { borderColor: '#3b82f6' },
    '&:disabled': { opacity: .4, cursor: 'not-allowed' },
  },
};

export const input = style(inputBase);

export const textarea = style({
  ...inputBase,
  minHeight: 72,
  resize: 'vertical',
  fieldSizing: 'content' as const,
});

export const select = style({
  ...inputBase,
  cursor: 'pointer',
  appearance: 'auto' as const,
});

export const error = style({
  borderColor: '#ef4444 !important',
  selectors: {
    '&:focus': { boxShadow: '0 0 0 1px #ef4444' },
  },
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const label = style({
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.05em',
  opacity: .6,
});
