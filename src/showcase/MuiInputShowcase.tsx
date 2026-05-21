import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

const opts = ['Option A', 'Option B', 'Option C'];

export default function MuiInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  const theme = createTheme({ palette: { mode: dark ? 'dark' : 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <Panel title="Text Fields" subtitle="mui v6" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('Variants (outlined / filled / standard)')}
            <div className="grid grid-cols-3 gap-4">
              <TextField label="Outlined" variant="outlined" size="small" />
              <TextField label="Filled" variant="filled" size="small" />
              <TextField label="Standard" variant="standard" />
            </div>
          </div>
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <TextField label="Default" size="small" />
              <TextField label="Disabled" size="small" disabled />
              <TextField label="Error" size="small" error helperText="Required" />
            </div>
          </div>
          <div>
            {label('With icon / password')}
            <div className="grid grid-cols-3 gap-4">
              <TextField label="Search" size="small" InputProps={{ startAdornment: <span className="text-xs opacity-50 mr-1">🔍</span> }} />
              <TextField label="Password" type="password" size="small" />
              <TextField label="With value" size="small" defaultValue="Hello" />
            </div>
          </div>
          <div>
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-4">
              {(['small', 'medium'] as const).map(s => (
                <TextField key={s} label={s} size={s} />
              ))}
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select" subtitle="mui" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
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
          </div>
        </Panel>

        <Panel title="Textarea" subtitle="mui" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <TextField label="Default" multiline rows={3} fullWidth />
            <TextField label="Disabled" multiline rows={2} disabled fullWidth />
            <TextField label="Error" multiline rows={2} error helperText="Too short" fullWidth />
          </div>
        </Panel>
      </div>
    </ThemeProvider>
  );
}
