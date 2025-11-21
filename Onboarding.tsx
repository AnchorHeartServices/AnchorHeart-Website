import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Check, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IntakeForm from '@/components/onboarding/IntakeForm';
import EmergencyContactsForm from '@/components/onboarding/EmergencyContactsForm';
import MedicalInfoForm from '@/components/onboarding/MedicalInfoForm';
import ServiceAgreementForm from '@/components/onboarding/ServiceAgreementForm';
import SignatureForm from '@/components/onboarding/SignatureForm';
import ReviewAndSubmit from '@/components/onboarding/ReviewAndSubmit';

const STEPS = [
  { id: 1, name: 'Personal Information', component: IntakeForm },
  { id: 2, name: 'Emergency Contacts', component: EmergencyContactsForm },
  { id: 3, name: 'Medical Information', component: MedicalInfoForm },
  { id: 4, name: 'Service Agreement', component: ServiceAgreementForm },
  { id: 5, name: 'Signatures', component: SignatureForm },
  { id: 6, name: 'Review & Submit', component: ReviewAndSubmit },
];

export default function Onboarding() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [clientId, setClientId] = useState<string | null>(null);

  const createClientMutation = useMutation({
    mutationFn: () =>
      fetch('/api/clients', {
        method: 'POST',
      }).then(res => res.json()),
    onSuccess: (data) => {
      setClientId(data.id);
    },
  });

  useEffect(() => {
    createClientMutation.mutate();
  }, []);

  const { data: clientData } = useQuery({
    queryKey: [`/api/clients/${clientId}`],
    enabled: !!clientId,
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = () => {
    navigate('/');
  };

  if (!clientId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-700 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Starting your onboarding...</p>
        </div>
      </div>
    );
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900">Client Onboarding</h1>
          <p className="mt-1 text-sm text-slate-600">Complete all sections to get started with AnchorHeart Services</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep > step.id ? 'bg-sky-700 text-white' :
                    currentStep === step.id ? 'bg-sky-700 text-white' :
                    'bg-slate-200 text-slate-500'
                  }`} data-testid={`step-indicator-${step.id}`}>
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : <Circle className="h-3 w-3 fill-current" />}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`h-1 flex-1 ${currentStep > step.id ? 'bg-sky-700' : 'bg-slate-200'}`} />
                  )}
                </div>
                <span className={`mt-2 text-xs text-center ${
                  currentStep === step.id ? 'text-sky-700 font-semibold' : 'text-slate-500'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current step form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <CurrentStepComponent
            clientId={clientId}
            onNext={handleNext}
            onBack={handleBack}
            onComplete={handleComplete}
            currentStep={currentStep}
            totalSteps={STEPS.length}
          />
        </div>
      </div>
    </div>
  );
}
