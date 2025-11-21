import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';

interface EmergencyContactsFormProps {
  clientId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function EmergencyContactsForm({ clientId, onNext, onBack }: EmergencyContactsFormProps) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [address, setAddress] = useState('');

  const { data: contacts = [] } = useQuery<any[]>({
    queryKey: [`/api/clients/${clientId}/emergency-contacts`],
  });

  const addMutation = useMutation({
    mutationFn: (data: any) =>
      fetch(`/api/clients/${clientId}/emergency-contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/emergency-contacts`] });
      setName('');
      setRelationship('');
      setPhone('');
      setAlternatePhone('');
      setAddress('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (contactId: string) =>
      fetch(`/api/clients/${clientId}/emergency-contacts/${contactId}`, {
        method: 'DELETE',
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/emergency-contacts`] });
    },
  });

  const handleAdd = () => {
    if (!name || !relationship || !phone) return;
    addMutation.mutate({
      name,
      relationship,
      phone,
      alternatePhone: alternatePhone || null,
      address: address || null,
      isPrimary: contacts.length === 0,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Emergency Contacts</h2>
      <p className="text-sm text-slate-600 mb-6">Add at least one emergency contact</p>

      {/* Contact list */}
      {contacts.length > 0 && (
        <div className="mb-6 space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg" data-testid={`contact-${contact.id}`}>
              <div>
                <div className="font-medium text-slate-900">{contact.name}</div>
                <div className="text-sm text-slate-600">{contact.relationship} • {contact.phone}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteMutation.mutate(contact.id)}
                data-testid={`button-delete-contact-${contact.id}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add new contact form */}
      <div className="space-y-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
        <h3 className="text-sm font-semibold text-slate-900">Add Emergency Contact</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-slate-700 mb-1 block">Name *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              data-testid="input-contact-name"
            />
          </div>
          <div>
            <label className="text-sm text-slate-700 mb-1 block">Relationship *</label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger data-testid="select-relationship">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-slate-700 mb-1 block">Phone *</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Primary phone"
              data-testid="input-contact-phone"
            />
          </div>
          <div>
            <label className="text-sm text-slate-700 mb-1 block">Alternate Phone</label>
            <Input
              type="tel"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
              placeholder="Optional"
              data-testid="input-contact-alt-phone"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-700 mb-1 block">Address</label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Optional"
            data-testid="input-contact-address"
          />
        </div>
        <Button
          onClick={handleAdd}
          disabled={!name || !relationship || !phone || addMutation.isPending}
          data-testid="button-add-contact"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Contact
        </Button>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} data-testid="button-back">
          Back
        </Button>
        <Button onClick={onNext} disabled={contacts.length === 0} data-testid="button-next">
          Next
        </Button>
      </div>
    </div>
  );
}
