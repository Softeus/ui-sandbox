import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

const opts = ['Option A', 'Option B', 'Option C'];

export default function MuiSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  const theme = createTheme({ palette: { mode: dark ? 'dark' : 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <Panel title="Select" subtitle="mui v6" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('Variants (outlined / filled / standard)')}
            <div className="grid grid-cols-3 gap-4">
              <FormControl fullWidth size="small">
                <InputLabel>Outlined</InputLabel>
                <Select label="Outlined" defaultValue="">
                  {opts.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" variant="filled">
                <InputLabel>Filled</InputLabel>
                <Select label="Filled" defaultValue="">
                  {opts.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel>Standard</InputLabel>
                <Select label="Standard" defaultValue="">
                  {opts.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <FormControl fullWidth size="small">
                <InputLabel>Default</InputLabel>
                <Select label="Default" defaultValue="">
                  {opts.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" disabled>
                <InputLabel>Disabled</InputLabel>
                <Select label="Disabled" defaultValue="">
                  <MenuItem value="">—</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" error>
                <InputLabel>Error</InputLabel>
                <Select label="Error" defaultValue="">
                  {opts.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </Panel>
    </ThemeProvider>
  );
}
