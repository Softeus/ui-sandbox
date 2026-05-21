import styled from 'styled-components';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

// ─── Styled components ──────────────────────────────────────────────

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .05em;
  opacity: .6;
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 7px 10px;
  border: 1px solid ${({ $error }) => $error ? '#ef4444' : '#3f3f46'};
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: 13px;
  outline: none;
  transition: border-color .15s;

  &::placeholder { color: #71717a; }
  &:focus { border-color: #3b82f6; }
  &:disabled { opacity: .4; cursor: not-allowed; }
`;

const Textarea = styled.textarea<{ $error?: boolean }>`
  width: 100%;
  min-height: 72px;
  padding: 7px 10px;
  border: 1px solid ${({ $error }) => $error ? '#ef4444' : '#3f3f46'};
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: 13px;
  outline: none;
  transition: border-color .15s;
  resize: vertical;
  field-sizing: content;

  &::placeholder { color: #71717a; }
  &:focus { border-color: #3b82f6; }
  &:disabled { opacity: .4; cursor: not-allowed; }
`;

const Select = styled.select`
  width: 100%;
  padding: 7px 10px;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  transition: border-color .15s;
  appearance: auto;

  &:focus { border-color: #3b82f6; }
  &:disabled { opacity: .4; cursor: not-allowed; }
`;

// ─── Component ──────────────────────────────────────────────────────

export default function StyledInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (text: string) => (
    <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
      {text}
    </span>
  );

  return (
    <>
      <Panel title="Text Inputs" subtitle="styled-components v6" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Default" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Error" $error />
            </div>
          </div>
          <div>
            {label('Types')}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Text" />
              <Input placeholder="Password" type="password" />
              <Input placeholder="Search…" type="search" />
            </div>
          </div>
          <div>
            {label('With Label')}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label>Username</Label>
                <Input placeholder="Enter username" />
              </Field>
              <Field>
                <Label>Email (invalid)</Label>
                <Input placeholder="Enter email" defaultValue="bad" $error />
              </Field>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select" subtitle="styled-components" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('Default')}
            <Select>
              <option value="">Choose…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </Select>
            {label('Disabled')}
            <Select disabled>
              <option value="">Disabled</option>
            </Select>
          </div>
        </Panel>

        <Panel title="Textarea" subtitle="styled-components" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <Textarea placeholder="Default textarea…" />
            <Textarea placeholder="Disabled" disabled />
            <Textarea placeholder="Error" $error />
          </div>
        </Panel>
      </div>
    </>
  );
}
