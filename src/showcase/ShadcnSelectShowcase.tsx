import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ShadcnSelectShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>{s}</span>;

  return (
    <Panel title="Select" subtitle="shadcn/ui" icon={<Hash size={14} />} dark={dark}>
      <div className="space-y-6">
        <div>
          {label('States')}
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an option…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
                <SelectItem value="c">Option C</SelectItem>
              </SelectContent>
            </Select>
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Disabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          {label('With Placeholder')}
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a framework…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="react">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Panel>
  );
}
