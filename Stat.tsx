import Stat from '../Stat';
import { Clock, Heart, Shield } from 'lucide-react';

export default function StatExample() {
  return (
    <div className="grid max-w-lg grid-cols-3 gap-3">
      <Stat icon={Clock} label="Response time" value="Same‑week starts"/>
      <Stat icon={Heart} label="Client satisfaction" value="5★ feedback"/>
      <Stat icon={Shield} label="Coverage" value="$1M / $3M"/>
    </div>
  );
}
