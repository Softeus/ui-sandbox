import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Hash } from 'lucide-react';
import { Panel, t } from './ShowcaseShared';

export default function ShadcnInputShowcase({ dark }: { dark: boolean }) {
  const tc = t(dark);
  const label = (s: string) => (
    <span className={`block mb-1.5 text-[9px] font-mono font-bold uppercase tracking-wider ${tc.sublabel}`}>
      {s}
    </span>
  );

  return (
    <>
      <Panel title="Text Inputs" subtitle="shadcn/ui (base-ui)" icon={<Hash size={14} />} dark={dark}>
        <div className="space-y-6">
          <div>
            {label('States')}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Default" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Error" aria-invalid="true" />
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
              <div className="grid gap-1.5">
                <Label htmlFor="sh-username">Username</Label>
                <Input id="sh-username" placeholder="Enter username" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="sh-email">Email (invalid)</Label>
                <Input id="sh-email" placeholder="Enter email" defaultValue="bad" aria-invalid="true" />
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Select" subtitle="shadcn" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('Default')}
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
            {label('Disabled')}
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Disabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Panel>

        <Panel title="Textarea" subtitle="shadcn" icon={undefined} dark={dark}>
          <div className="space-y-4">
            {label('States')}
            <Textarea placeholder="Default textarea…" />
            <Textarea placeholder="Disabled" disabled />
            <Textarea placeholder="Error" aria-invalid="true" />
          </div>
        </Panel>
      </div>
    </>
  );
}
