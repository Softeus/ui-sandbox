import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';
import styled from 'styled-components';

// ─── Styled native select ───────────────────────────────────────────

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

const SelectError = styled(Select)`
  border-color: #ef4444 !important;
  &:focus { box-shadow: 0 0 0 1px #ef4444; }
`;

// ─── Component ──────────────────────────────────────────────────────

export default function StyledSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (text: string) => (
    <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
      {text}
    </span>
  );

  return (
    <Panel title="Native &lt;select&gt;" subtitle="styled-components v6" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <option value="">Choose…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </Select>
            <Select disabled>
              <option value="">Disabled</option>
            </Select>
          </div>
        </div>
        <div>
          {label('Error')}
          <div className="space-y-4">
            <SelectError defaultValue="bad">
              <option value="bad">Invalid value</option>
              <option value="a">Option A</option>
            </SelectError>
          </div>
        </div>
      </div>
    </Panel>
  );
}
