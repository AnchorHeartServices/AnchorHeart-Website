import { PaymentForm } from '@/components/PaymentForm';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Payment() {
  const [, setLocation] = useLocation();

  // Example: In real usage, this would come from URL params or context
  const amount = 10500; // $105.00 (3 hours at $35/hr)
  const description = "Payment for in-home care services";

  const handleSuccess = () => {
    setLocation('/payment-success');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4"
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">
              AnchorHeart Services Payment
            </h1>
            <p className="text-slate-600">
              Choose your preferred payment method
            </p>
          </div>
        </div>

        <PaymentForm 
          amount={amount}
          description={description}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
