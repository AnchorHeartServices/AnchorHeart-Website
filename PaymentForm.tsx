import { useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, CreditCard, Building2, CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

interface PaymentFormProps {
  clientId?: string;
  amount: number;
  description?: string;
  onSuccess?: () => void;
}

function CardPaymentForm({ clientSecret, amount, onSuccess }: { clientSecret: string; amount: number; onSuccess?: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Payment failed',
          description: error.message,
        });
      } else if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Payment error',
        description: err.message || 'An unexpected error occurred',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-card-payment">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full"
        data-testid="button-submit-card-payment"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${(amount / 100).toFixed(2)}`
        )}
      </Button>
    </form>
  );
}

export function PaymentForm({ clientId, amount, description, onSuccess }: PaymentFormProps) {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>('ach');

  const achDiscount = 200; // $2.00 in cents
  const achAmount = amount - achDiscount;

  // Create PaymentIntent for card payments when card tab is selected
  const { data: paymentIntent, isLoading: isLoadingIntent } = useQuery({
    queryKey: ['/api/payments', 'card-intent', amount, clientId],
    queryFn: async () => {
      const res = await apiRequest('POST', '/api/payments', {
        clientId,
        amount,
        paymentMethod: 'card',
      });
      return await res.json();
    },
    enabled: selectedTab === 'card' && !!stripePromise,
  });

  const achPaymentMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/payments', {
        clientId,
        amount: achAmount,
        paymentMethod: 'ach',
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: 'ACH payment setup initiated',
        description: 'You will receive an email with instructions to connect your bank account.',
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Failed to set up ACH payment',
        description: error.message || 'Please try again or contact support.',
      });
    },
  });

  const handleACHRequest = () => {
    achPaymentMutation.mutate();
  };

  if (!stripePromise) {
    return (
      <Alert data-testid="alert-stripe-not-configured">
        <AlertDescription>
          Payment processing is not yet configured. Please contact support to set up payment options.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <DollarSign className="h-6 w-6 text-sky-600" />
          <h2 className="text-2xl font-bold text-slate-900">Payment Options</h2>
        </div>
        {description && (
          <p className="text-slate-600">{description}</p>
        )}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ach" data-testid="tab-ach">
            <Building2 className="h-4 w-4 mr-2" />
            Bank Transfer (ACH)
            <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Save $2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="card" data-testid="tab-card">
            <CreditCard className="h-4 w-4 mr-2" />
            Credit/Debit Card
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ach" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-sky-600" />
                Bank Transfer (ACH) - Recommended
              </CardTitle>
              <CardDescription>
                Save $2 per visit with our preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-900">$2 discount per visit</p>
                    <p className="text-sm text-emerald-700">Lowest processing fees mean better value for you</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-900">Automatic recurring payments</p>
                    <p className="text-sm text-emerald-700">Set it once and never worry about missing a payment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-900">Secure and reliable</p>
                    <p className="text-sm text-emerald-700">Bank-level security for your financial information</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-600">Original amount:</span>
                  <span className="font-medium">${(amount / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg text-emerald-700">
                  <span className="font-semibold">ACH discount:</span>
                  <span className="font-semibold">-${(achDiscount / 100).toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center text-2xl">
                    <span className="font-bold text-slate-900">You pay:</span>
                    <span className="font-bold text-sky-600">${(achAmount / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleACHRequest} 
                disabled={achPaymentMutation.isPending}
                className="w-full" 
                size="lg"
                data-testid="button-request-ach"
              >
                {achPaymentMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  'Set Up Bank Transfer Payment'
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                You'll receive an email with instructions to securely connect your bank account
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="card" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-sky-600" />
                Pay with Credit or Debit Card
              </CardTitle>
              <CardDescription>
                Convenient payment option with instant processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-700">Amount to pay:</span>
                  <span className="font-bold text-slate-900">${(amount / 100).toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Note: Bank transfer (ACH) saves you $2 per visit
                </p>
              </div>

              {isLoadingIntent ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : paymentIntent?.clientSecret ? (
                <Elements 
                  stripe={stripePromise} 
                  options={{
                    clientSecret: paymentIntent.clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#0ea5e9',
                      },
                    },
                  }}
                >
                  <CardPaymentForm 
                    clientSecret={paymentIntent.clientSecret}
                    amount={amount} 
                    onSuccess={onSuccess}
                  />
                </Elements>
              ) : (
                <Alert>
                  <AlertDescription>
                    Unable to initialize payment form. Please try again or contact support.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <p className="text-xs text-slate-500">
          All payments are processed securely through Stripe. We never store your complete payment information.
        </p>
      </div>
    </div>
  );
}
