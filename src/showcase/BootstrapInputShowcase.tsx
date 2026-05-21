import { Form } from 'react-bootstrap';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

const opts = [<option key="x" value="">Choose…</option>, <option key="a" value="a">Option A</option>, <option key="b" value="b">Option B</option>, <option key="c" value="c">Option C</option>];

export default function BootstrapInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <div data-bs-theme={dark ? 'dark' : 'light'}>
      <Panel title="Text Inputs" subtitle="bootstrap" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <Form.Control placeholder="Default" />
              <Form.Control placeholder="Disabled" disabled />
              <Form.Control placeholder="Error" isInvalid />
            </div>
          </div>
          <div>
            {label('With labels / feedback')}
            <div className="grid grid-cols-3 gap-4">
              <div><Form.Label className="text-[10px] mb-1">Email</Form.Label><Form.Control placeholder="email@example.com" /></div>
              <div><Form.Label className="text-[10px] mb-1">Password</Form.Label><Form.Control type="password" placeholder="Password" /></div>
              <div><Form.Label className="text-[10px] mb-1">Error</Form.Label><Form.Control placeholder="Bad value" isInvalid /><Form.Control.Feedback type="invalid">Invalid value</Form.Control.Feedback></div>
            </div>
          </div>
          <div>
            {label('Sizes')}
            <div className="grid grid-cols-3 gap-4">
              <Form.Control placeholder="Small" size="sm" />
              <Form.Control placeholder="Default" />
              <Form.Control placeholder="Large" size="lg" />
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select" subtitle="bootstrap" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <Form.Select defaultValue="">{opts}</Form.Select>
            <Form.Select disabled>{opts}</Form.Select>
          </div>
        </Panel>

        <Panel title="Textarea" subtitle="bootstrap" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <Form.Control as="textarea" rows={3} placeholder="Default textarea…" />
            <Form.Control as="textarea" rows={2} placeholder="Disabled" disabled />
            <Form.Control as="textarea" rows={2} placeholder="Error" isInvalid />
          </div>
        </Panel>
      </div>
    </div>
  );
}
