import ServiceCard from '../ServiceCard';
import { FileText, Ambulance, Calendar } from 'lucide-react';

export default function ServiceCardExample() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ServiceCard 
        icon={FileText} 
        title="Daily living support" 
        desc="Bathing & hygiene, dressing, mobility/transfer assistance, meal prep & feeding, light housekeeping, medication reminders, companionship."
      />
      <ServiceCard 
        icon={Ambulance} 
        title="Complex care" 
        desc="Dementia/cognitive support, fall‑prevention, Hoyer/transfer assistance, skin care & repositioning, vitals monitoring within CNA scope."
      />
      <ServiceCard 
        icon={Calendar} 
        title="Respite & routines" 
        desc="Short‑term relief for family caregivers, post‑hospital routines, safe transport accompaniment to appointments & errands."
      />
    </div>
  );
}
