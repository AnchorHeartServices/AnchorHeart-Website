import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Rates from "@/pages/Rates";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";
import Onboarding from "@/pages/Onboarding";
import Payment from "@/pages/Payment";
import PaymentSuccess from "@/pages/PaymentSuccess";
import Caregiver from "@/pages/Caregiver";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import HealthInformationNotice from "@/pages/HealthInformationNotice";
import NonDiscrimination from "@/pages/NonDiscrimination";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/services" component={Services}/>
      <Route path="/rates" component={Rates}/>
      <Route path="/about" component={About}/>
      <Route path="/terms" component={Terms}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/onboarding" component={Onboarding}/>
      <Route path="/payment" component={Payment}/>
      <Route path="/payment-success" component={PaymentSuccess}/>
      <Route path="/caregiver" component={Caregiver}/>
      <Route path="/privacy" component={PrivacyPolicy}/>
      <Route path="/health-information" component={HealthInformationNotice}/>
      <Route path="/non-discrimination" component={NonDiscrimination}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
