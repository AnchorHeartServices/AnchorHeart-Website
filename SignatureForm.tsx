import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import SignatureCapture from '@/components/SignatureCapture';
import { CheckCircle2 } from 'lucide-react';

interface SignatureFormProps {
  clientId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SignatureForm({ clientId, onNext, onBack }: SignatureFormProps) {
  const [showCapture, setShowCapture] = useState(false);

  const { data: signatures = [] } = useQuery<any[]>({
    queryKey: [`/api/clients/${clientId}/signatures`],
    queryFn: async () => {
      const response = await fetch(`/api/clients/${clientId}/signatures`);
      return response.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: { signatureData: string; signerName: string }) =>
      fetch(`/api/clients/${clientId}/signatures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signatureType: 'client',
          signatureData: data.signatureData,
          signerName: data.signerName,
          signerRelationship: 'self',
        }),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/signatures`] });
      setShowCapture(false);
    },
  });

  const handleSave = (signatureData: string, signerName: string) => {
    saveMutation.mutate({ signatureData, signerName });
  };

  const hasClientSignature = signatures.some((sig: any) => sig.signatureType === 'client');

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Electronic Signature</h2>
      <p className="text-sm text-slate-600 mb-6">
        Please provide your electronic signature to authorize this service agreement
      </p>

      {showCapture ? (
        <SignatureCapture
          onSave={handleSave}
          onCancel={() => setShowCapture(false)}
        />
      ) : (
        <div className="space-y-4">
          {hasClientSignature ? (
            <div className="p-6 border border-emerald-200 bg-emerald-50 rounded-lg flex items-start gap-3" data-testid="signature-complete">
              <CheckCircle2 className="h-6 w-6 text-emerald-700 mt-0.5" />
              <div>
                <div className="font-semibold text-emerald-900">Signature Captured</div>
                <div className="text-sm text-emerald-700 mt-1">
                  Signed by: {signatures.find((s: any) => s.signatureType === 'client')?.signerName}
                </div>
                <div className="text-xs text-emerald-600 mt-1">
                  {new Date(signatures.find((s: any) => s.signatureType === 'client')?.signedAt).toLocaleString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 border-2 border-dashed border-slate-300 rounded-lg text-center">
              <p className="text-slate-600 mb-4">No signature captured yet</p>
              <Button onClick={() => setShowCapture(true)} data-testid="button-add-signature">
                Add Signature
              </Button>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onBack} data-testid="button-back">
              Back
            </Button>
            <Button onClick={onNext} disabled={!hasClientSignature} data-testid="button-next">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
