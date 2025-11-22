import { useState, useMemo, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  q: string;
  a: ReactNode;
}

export default function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const id = useMemo(() => q.toLowerCase().replace(/\W+/g, "-"), [q]);
  
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        data-testid={`button-faq-${id}`}
      >
        <span className="font-medium text-slate-900" id={id}>{q}</span>
        {open ? <ChevronUp className="h-5 w-5 text-slate-500"/> : <ChevronDown className="h-5 w-5 text-slate-500"/>}
      </button>
      {open && (
        <div id={`${id}-panel`} className="border-t border-slate-100 p-4 text-slate-600" role="region" aria-labelledby={id}>
          {a}
        </div>
      )}
    </div>
  );
}
