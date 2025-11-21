import FAQItem from '../FAQItem';

export default function FAQItemExample() {
  return (
    <div className="space-y-3">
      <FAQItem 
        q="Are you a home health agency?" 
        a={<span>AnchorHeart provides non‑medical home care. For skilled nursing or therapy, we coordinate with your chosen home health or hospice team.</span>} 
      />
      <FAQItem 
        q="Do you accept insurance?" 
        a={<span>Private pay at time of service. We can provide superbills for possible long‑term care policy reimbursement.</span>} 
      />
      <FAQItem 
        q="Is there a contract?" 
        a={<span>No long‑term contract. Only a simple service agreement, visit minimums, and a 24‑hour cancellation policy.</span>} 
      />
    </div>
  );
}
