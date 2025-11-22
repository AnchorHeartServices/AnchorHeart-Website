import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function ServiceCard({ icon: Icon, title, desc }: ServiceCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <Icon className="mb-3 h-7 w-7 text-sky-700"/>
      <h3 className="mb-1 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}
