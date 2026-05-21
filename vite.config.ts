import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Heavy UI kits (MUI, Blueprint, Mantine) bring 2000–5000 modules each.
// Vite 8's dev optimizer stalls trying to pre-bundle them all.
// Excluding them keeps dev start instant — they serve as native ESM.
// `vite build` is unaffected (Rolldown handles all 8000+ modules fine).
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      // CJS-only packages that Vite must pre-bundle for proper ESM interop.
      'hoist-non-react-statics',
      'prop-types',
      'react-is',
      'react-bootstrap',
      '@radix-ui/react-icons',
    ],
  },
})
