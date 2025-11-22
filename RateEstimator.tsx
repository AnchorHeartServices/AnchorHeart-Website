import { useState, useMemo } from 'react';
import { DollarSign } from 'lucide-react';

export default function RateEstimator() {
  const [hours, setHours] = useState(4);
  const [service, setService] = useState("companion");
  const [holiday, setHoliday] = useState(false);
  const [night, setNight] = useState(false);

  const base = useMemo(() => ({ companion: 32, personal: 35, advanced: 40 }[service as keyof typeof rateMap] || 32), [service]);
  const multiplier = 1 + (holiday ? 0.5 : 0) + (night ? 0.15 : 0);
  const fmt = useMemo(() => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }), []);
  const total = useMemo(() => fmt.format(base * multiplier * hours), [base, multiplier, hours, fmt]);

  const rateMap = { companion: 32, personal: 35, advanced: 40 };

  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6" data-testid="rate-estimator">
      <div className="mb-4 flex items-center gap-2 text-sky-900">
        <DollarSign className="h-5 w-5"/> <span className="font-semibold">Instant Price Estimator</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-slate-700" htmlFor="service">
          Service Level
          <select 
            id="service" 
            value={service} 
            onChange={e => setService(e.target.value)} 
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            data-testid="select-service"
          >
            <option value="companion">Companion Care / Light Support</option>
            <option value="personal">Personal Care (CNA-Level)</option>
            <option value="advanced">Advanced / Specialized Care</option>
          </select>
        </label>
        <label className="text-sm text-slate-700" htmlFor="hours">
          Hours (per visit)
          <input 
            id="hours" 
            type="range" 
            min={2} 
            max={12} 
            value={hours} 
            onChange={e => setHours(parseInt(e.target.value))} 
            className="mt-2 w-full"
            data-testid="input-hours"
          />
          <div className="mt-1 text-sm text-slate-600">{hours} hour(s)</div>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input 
            type="checkbox" 
            checked={holiday} 
            onChange={e => setHoliday(e.target.checked)} 
            aria-label="Holiday"
            data-testid="checkbox-holiday"
          /> Holiday
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input 
            type="checkbox" 
            checked={night} 
            onChange={e => setNight(e.target.checked)} 
            aria-label="Overnight (10p–6a)"
            data-testid="checkbox-night"
          /> Overnight (10p–6a)
        </label>
      </div>
      <div className="mt-4 rounded-xl bg-white p-4 text-right text-slate-800 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-slate-500">Estimated Visit Total</div>
        <div className="text-2xl font-bold" data-testid="text-total">{total}</div>
        <div className="text-xs text-slate-500">Final invoice reflects actual time, visit minimums & mileage (if applicable). Overnight and live-in are billed as flat rates.</div>
      </div>
    </div>
  );
}
