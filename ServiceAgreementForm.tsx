import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface ServiceAgreementFormProps {
  clientId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function ServiceAgreementForm({ clientId, onNext, onBack }: ServiceAgreementFormProps) {
  const { toast } = useToast();
  const { data: clientData } = useQuery({
    queryKey: [`/api/clients/${clientId}`],
  });

  const existing = (clientData as any)?.serviceAgreement || {};

  // Check localStorage for service request data to pre-fill
  const serviceRequestData = typeof window !== 'undefined' 
    ? (() => {
        try {
          const stored = localStorage.getItem('serviceRequestData');
          if (stored) {
            return JSON.parse(stored);
          }
        } catch (e) {
          // Silently ignore parsing errors - form will use default values
        }
        return null;
      })()
    : null;

  const [formData, setFormData] = useState({
    serviceType: existing.serviceType || serviceRequestData?.serviceType || '',
    hoursPerWeek: existing.hoursPerWeek || serviceRequestData?.hoursPerWeek || '',
    schedulePreference: existing.schedulePreference || serviceRequestData?.schedulePreference || '',
    startDate: existing.startDate || serviceRequestData?.startDate || '',
    paymentMethod: existing.paymentMethod || '',
    billingAddress: existing.billingAddress || '',
    agreedToTerms: existing.agreedToTerms || false,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/clients/${clientId}/service-agreement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to save service agreement' }));
        throw new Error(error.message || 'Failed to save service agreement');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}`] });
      onNext();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save service agreement. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      toast({
        title: "Agreement required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    saveMutation.mutate({
      ...formData,
      hoursPerWeek: formData.hoursPerWeek ? parseInt(formData.hoursPerWeek) : null,
      agreedAt: formData.agreedToTerms ? new Date().toISOString() : null,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Service Agreement</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Service Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Service Type *</label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
              >
                <SelectTrigger data-testid="select-service-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="companion">Companion Care / Light Support</SelectItem>
                  <SelectItem value="personal">Personal Care (CNA-Level)</SelectItem>
                  <SelectItem value="advanced">Advanced / Specialized Care</SelectItem>
                  <SelectItem value="overnight">Overnight Care</SelectItem>
                  <SelectItem value="livein">Live-In Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Estimated Hours per Week</label>
              <Input
                type="number"
                value={formData.hoursPerWeek}
                onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                placeholder="e.g., 20"
                data-testid="input-hours-per-week"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Schedule Preference</label>
              <Select
                value={formData.schedulePreference}
                onValueChange={(value) => setFormData({ ...formData, schedulePreference: value })}
              >
                <SelectTrigger data-testid="select-schedule">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="nights">Nights</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Preferred Start Date</label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                data-testid="input-start-date"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Payment Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Payment Method</label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger data-testid="select-payment-method">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="auto-pay">Auto-Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Billing Address</label>
              <Input
                value={formData.billingAddress}
                onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                placeholder="Same as client address or enter different"
                data-testid="input-billing-address"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <h3 className="text-sm font-semibold text-slate-900">Terms and Conditions</h3>
          <div className="text-sm text-slate-600 space-y-2 max-h-40 overflow-y-auto">
            <p>By agreeing to these terms, you acknowledge:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>All services are provided on a non-medical basis</li>
              <li>Rates are subject to holiday and overnight premiums as specified</li>
              <li>Minimum visit times apply based on service level</li>
              <li>24-hour cancellation notice is required</li>
              <li>Payment is due at time of service unless other arrangements are made</li>
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreedToTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
              data-testid="checkbox-terms"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions
            </label>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} data-testid="button-back">
            Back
          </Button>
          <Button type="submit" disabled={!formData.agreedToTerms || saveMutation.isPending} data-testid="button-next">
            {saveMutation.isPending ? 'Saving...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
}
