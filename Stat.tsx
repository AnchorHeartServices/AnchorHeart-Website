import { LucideIcon } from 'lucide-react';

interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function Stat({ icon: Icon, label, value }: StatProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <Icon className="h-6 w-6 text-sky-700"/>
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
        <div className="text-lg font-semibold text-slate-800">{value}</div>
      </div>
    </div>
  );
}
