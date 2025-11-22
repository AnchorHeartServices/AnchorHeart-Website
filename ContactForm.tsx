import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      await apiRequest('POST', '/api/contact', form);
      
      setStatus('success');
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try calling us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800" data-testid="contact-success">
        <CheckCircle2 className="mb-2 h-6 w-6"/>
        <h3 className="font-semibold mb-1">Message sent successfully!</h3>
        <p className="text-sm">We'll respond to your inquiry within the hour during business hours.</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="mt-4 text-sm text-emerald-700 hover:underline"
          data-testid="button-send-another"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800" data-testid="contact-error">
        <AlertCircle className="mb-2 h-6 w-6"/>
        <h3 className="font-semibold mb-1">Failed to send message</h3>
        <p className="text-sm mb-4">{errorMessage}</p>
        <p className="text-sm mb-4">Please call us directly at <a href="tel:17077548049" className="font-semibold hover:underline">(707) 754-8049</a></p>
        <button 
          onClick={() => setStatus('idle')} 
          className="text-sm text-red-700 hover:underline"
          data-testid="button-try-again"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4" noValidate>
      <label className="text-sm text-slate-700" htmlFor="name">Full name</label>
      <input 
        id="name" 
        name="name" 
        value={form.name} 
        onChange={onChange} 
        required 
        autoComplete="name" 
        placeholder="Full name" 
        className="rounded-lg border border-slate-300 px-3 py-2"
        data-testid="input-name"
        disabled={status === 'sending'}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm text-slate-700" htmlFor="email">Email</label>
          <input 
            id="email" 
            name="email" 
            value={form.email} 
            onChange={onChange} 
            required 
            type="email" 
            autoComplete="email" 
            placeholder="you@example.com" 
            className="rounded-lg border border-slate-300 px-3 py-2"
            data-testid="input-email"
            disabled={status === 'sending'}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-700" htmlFor="phone">Phone</label>
          <input 
            id="phone" 
            name="phone" 
            value={form.phone} 
            onChange={onChange} 
            type="tel" 
            autoComplete="tel" 
            placeholder="(707) 754-8049" 
            className="rounded-lg border border-slate-300 px-3 py-2"
            data-testid="input-phone"
            disabled={status === 'sending'}
          />
        </div>
      </div>

      <label className="text-sm text-slate-700" htmlFor="message">How can we help?</label>
      <textarea 
        id="message" 
        name="message" 
        value={form.message} 
        onChange={onChange} 
        required
        rows={4} 
        className="rounded-lg border border-slate-300 px-3 py-2"
        data-testid="input-message"
        disabled={status === 'sending'}
      />

      <button 
        type="submit" 
        className="rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white shadow hover:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed" 
        data-testid="button-submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
