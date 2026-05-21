import { Form } from 'react-bootstrap';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function BootstrapSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  const opts = (
    <>
      <option value="">Choose…</option>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </>
  );

  return (
    <Panel title="Select" subtitle="bootstrap" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
            <Form.Select defaultValue="">{opts}</Form.Select>
            <Form.Select disabled>{opts}</Form.Select>
          </div>
        </div>
        <div>
          {label('Sizes')}
          <div className="grid grid-cols-3 gap-4">
            {(['sm', undefined, 'lg'] as const).map(size => (
              <Form.Select key={String(size)} size={size} defaultValue="">
                <option value="">{size ?? 'Default'}</option>
                <option value="a">Option A</option>
              </Form.Select>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
