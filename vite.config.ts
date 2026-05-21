import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// Heavy UI kits (MUI, Blueprint, Mantine) bring 2000–5000 modules each.
// Vite 8's dev optimizer stalls trying to pre-bundle them all.
// Excluding them keeps dev start instant — they serve as native ESM.
// `vite build` is unaffected (Rolldown handles all 8000+ modules fine).
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
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
