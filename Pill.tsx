import { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
}

export default function Pill({ children }: PillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm backdrop-blur" data-testid="pill-badge">
      {children}
    </span>
  );
}
