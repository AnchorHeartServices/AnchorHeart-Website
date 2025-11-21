import Pill from '../Pill';
import { Shield } from 'lucide-react';

export default function PillExample() {
  return (
    <Pill>
      <Shield className="h-4 w-4" /> Insured • HCA Registry • CNA
    </Pill>
  );
}
