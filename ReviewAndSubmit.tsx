import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewAndSubmitProps {
  clientId: string;
  onBack: () => void;
  onComplete: () => void;
}

export default function ReviewAndSubmit({ clientId, onBack, onComplete }: ReviewAndSubmitProps) {
  const { toast } = useToast();
  const { data: packet, isLoading } = useQuery({
    queryKey: [`/api/clients/${clientId}`],
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/clients/${clientId}/submit`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to submit packet' }));
        throw new Error(error.message || 'Failed to submit packet');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Clear service request data from localStorage after successful submission
      if (typeof window !== 'undefined') {
        localStorage.removeItem('serviceRequestData');
      }
      onComplete();
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Error",
        description: error.message || "Failed to submit packet. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const data = packet as any;
  const intake = data?.intake;
  const emergencyContacts = data?.emergencyContacts || [];
  const medicalInfo = data?.medicalInformation;
  const serviceAgreement = data?.serviceAgreement;
  const signatures = data?.signatures || [];

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Review & Submit</h2>
      <p className="text-sm text-slate-600 mb-6">Please review all information before submitting</p>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Personal Information</h3>
          {intake ? (
            <div className="grid gap-2 text-sm">
              <div><span className="text-slate-600">Name:</span> <span className="font-medium">{intake.firstName} {intake.lastName}</span></div>
              <div><span className="text-slate-600">DOB:</span> <span className="font-medium">{intake.dateOfBirth}</span></div>
              <div><span className="text-slate-600">Phone:</span> <span className="font-medium">{intake.phone}</span></div>
              <div><span className="text-slate-600">Address:</span> <span className="font-medium">{intake.address}, {intake.city}, {intake.state} {intake.zipCode}</span></div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Not completed</p>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Emergency Contacts</h3>
          {emergencyContacts.length > 0 ? (
            <div className="space-y-2">
              {emergencyContacts.map((contact: any) => (
                <div key={contact.id} className="text-sm">
                  <span className="font-medium">{contact.name}</span> ({contact.relationship}) - {contact.phone}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Not completed</p>
          )}
        </div>

        {/* Medical Information */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Medical Information</h3>
          {medicalInfo ? (
            <div className="grid gap-2 text-sm">
              {medicalInfo.primaryPhysician && <div><span className="text-slate-600">Physician:</span> <span className="font-medium">{medicalInfo.primaryPhysician}</span></div>}
              {medicalInfo.diagnoses?.length > 0 && <div><span className="text-slate-600">Diagnoses:</span> <span className="font-medium">{medicalInfo.diagnoses.join(', ')}</span></div>}
              {medicalInfo.medications?.length > 0 && <div><span className="text-slate-600">Medications:</span> <span className="font-medium">{medicalInfo.medications.join(', ')}</span></div>}
              {medicalInfo.mobilityLevel && <div><span className="text-slate-600">Mobility:</span> <span className="font-medium">{medicalInfo.mobilityLevel}</span></div>}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Not completed</p>
          )}
        </div>

        {/* Service Agreement */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Service Agreement</h3>
          {serviceAgreement ? (
            <div className="grid gap-2 text-sm">
              <div><span className="text-slate-600">Service Type:</span> <span className="font-medium">{serviceAgreement.serviceType}</span></div>
              {serviceAgreement.hoursPerWeek && <div><span className="text-slate-600">Hours/Week:</span> <span className="font-medium">{serviceAgreement.hoursPerWeek}</span></div>}
              {serviceAgreement.startDate && <div><span className="text-slate-600">Start Date:</span> <span className="font-medium">{serviceAgreement.startDate}</span></div>}
              {serviceAgreement.agreedToTerms && (
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Terms accepted</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Not completed</p>
          )}
        </div>

        {/* Signatures */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Signatures</h3>
          {signatures.length > 0 ? (
            <div className="space-y-2">
              {signatures.map((sig: any) => (
                <div key={sig.id} className="flex items-center gap-2 text-sm text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Signed by {sig.signerName}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Not completed</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 border-2 border-sky-200 bg-sky-50 rounded-lg">
        <p className="text-sm text-sky-900">
          By submitting this packet, you confirm that all information provided is accurate and complete.
          AnchorHeart Services will contact you within 48 hours to schedule your first visit.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} data-testid="button-back">
          Back
        </Button>
        <Button onClick={() => submitMutation.mutate()} disabled={submitMutation.isPending} data-testid="button-submit">
          {submitMutation.isPending ? 'Submitting...' : 'Submit Packet'}
        </Button>
      </div>
    </div>
  );
}
