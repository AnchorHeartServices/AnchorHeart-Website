import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

export default function ServiceRequestForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    serviceType: '',
    schedulePreference: '',
    estimatedHoursPerWeek: '',
    preferredStartDate: '',
    agreedToTerms: false,
  });

  const createClientMutation = useMutation({
    mutationFn: async (requestData: typeof formData) => {
      // Store service request data in localStorage for pre-filling onboarding forms
      localStorage.setItem('serviceRequestData', JSON.stringify({
        firstName: requestData.firstName,
        lastName: requestData.lastName,
        phone: requestData.phone,
        email: requestData.email || '',
        serviceType: requestData.serviceType,
        schedulePreference: requestData.schedulePreference || '',
        hoursPerWeek: requestData.estimatedHoursPerWeek || '',
        startDate: requestData.preferredStartDate || '',
      }));

      // Create client record
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to create client' }));
        throw new Error(error.message || 'Failed to submit service request');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Service request submitted!",
        description: "Redirecting you to complete your onboarding...",
      });
      setTimeout(() => {
        setLocation(`/onboarding?clientId=${data.id}`);
      }, 1000);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Unable to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.serviceType) {
      toast({
        title: "Missing service type",
        description: "Please select the type of care service you need.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreedToTerms) {
      toast({
        title: "Agreement required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    createClientMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">First Name *</label>
          <Input
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="John"
            required
            data-testid="input-request-first-name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Last Name *</label>
          <Input
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Smith"
            required
            data-testid="input-request-last-name"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone Number *</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(707) 555-1234"
            required
            data-testid="input-request-phone"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            data-testid="input-request-email"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Service Type Needed *</label>
          <Select
            value={formData.serviceType}
            onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
            required
          >
            <SelectTrigger data-testid="select-request-service-type">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="companion">Companion Care / Light Support ($32/hr)</SelectItem>
              <SelectItem value="personal">Personal Care - CNA Level ($35/hr)</SelectItem>
              <SelectItem value="advanced">Advanced / Specialized Care ($40/hr)</SelectItem>
              <SelectItem value="overnight">Overnight Care ($240/night)</SelectItem>
              <SelectItem value="livein">Live-In Care ($400/day)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Schedule Preference</label>
          <Select
            value={formData.schedulePreference}
            onValueChange={(value) => setFormData({ ...formData, schedulePreference: value })}
          >
            <SelectTrigger data-testid="select-request-schedule">
              <SelectValue placeholder="Select schedule" />
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Estimated Hours per Week</label>
          <Input
            type="number"
            value={formData.estimatedHoursPerWeek}
            onChange={(e) => setFormData({ ...formData, estimatedHoursPerWeek: e.target.value })}
            placeholder="20"
            min="0"
            data-testid="input-request-hours"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Preferred Start Date</label>
          <Input
            type="date"
            value={formData.preferredStartDate}
            onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
            data-testid="input-request-start-date"
          />
        </div>
      </div>

      <div className="rounded-xl border-2 border-sky-200 bg-sky-50 p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="service-request-terms"
            checked={formData.agreedToTerms}
            onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
            className="mt-1"
            data-testid="checkbox-request-terms"
          />
          <label
            htmlFor="service-request-terms"
            className="text-sm text-slate-700 leading-relaxed cursor-pointer"
          >
            <span className="font-semibold">I agree to the Service Agreement and Terms</span>
            <p className="mt-1 text-xs text-slate-600">
              By checking this box, I acknowledge that I have read and agree to all terms outlined above, including visit minimums, cancellation policy, payment terms, and that all services are non-medical in nature. I understand that complete client intake information and electronic signature will be required during onboarding.
            </p>
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="submit"
          className="flex-1"
          disabled={createClientMutation.isPending || !formData.agreedToTerms}
          data-testid="button-submit-request"
        >
          {createClientMutation.isPending ? (
            'Processing...'
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Submit Request & Continue to Onboarding
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-center text-slate-500">
        After submission, you'll be guided through our secure digital onboarding to complete emergency contacts, medical information, and electronic signatures.
      </p>
    </form>
  );
}
