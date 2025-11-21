import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';

interface MedicalInfoFormProps {
  clientId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function MedicalInfoForm({ clientId, onNext, onBack }: MedicalInfoFormProps) {
  const { data: clientData } = useQuery({
    queryKey: [`/api/clients/${clientId}`],
  });

  const existing = (clientData as any)?.medicalInformation || {};

  const [formData, setFormData] = useState({
    primaryPhysician: existing.primaryPhysician || '',
    physicianPhone: existing.physicianPhone || '',
    diagnoses: existing.diagnoses || [],
    medications: existing.medications || [],
    allergies: existing.allergies || [],
    mobilityLevel: existing.mobilityLevel || '',
    assistanceNeeded: existing.assistanceNeeded || [],
    cognitiveStatus: existing.cognitiveStatus || '',
    specialNeeds: existing.specialNeeds || '',
    dietaryRestrictions: existing.dietaryRestrictions || '',
    religiousCultural: existing.religiousCultural || '',
    preferredLanguage: existing.preferredLanguage || '',
  });

  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newAllergy, setNewAllergy] = useState('');

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      fetch(`/api/clients/${clientId}/medical-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}`] });
      onNext();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const addDiagnosis = () => {
    if (newDiagnosis.trim()) {
      setFormData({ ...formData, diagnoses: [...formData.diagnoses, newDiagnosis.trim()] });
      setNewDiagnosis('');
    }
  };

  const removeDiagnosis = (index: number) => {
    setFormData({ ...formData, diagnoses: formData.diagnoses.filter((_, i) => i !== index) });
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setFormData({ ...formData, medications: [...formData.medications, newMedication.trim()] });
      setNewMedication('');
    }
  };

  const removeMedication = (index: number) => {
    setFormData({ ...formData, medications: formData.medications.filter((_, i) => i !== index) });
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData({ ...formData, allergies: [...formData.allergies, newAllergy.trim()] });
      setNewAllergy('');
    }
  };

  const removeAllergy = (index: number) => {
    setFormData({ ...formData, allergies: formData.allergies.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Medical Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Medical History</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Primary Physician</label>
              <Input
                value={formData.primaryPhysician}
                onChange={(e) => setFormData({ ...formData, primaryPhysician: e.target.value })}
                data-testid="input-physician"
              />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Physician Phone</label>
              <Input
                type="tel"
                value={formData.physicianPhone}
                onChange={(e) => setFormData({ ...formData, physicianPhone: e.target.value })}
                data-testid="input-physician-phone"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-700 mb-1 block">Diagnoses</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newDiagnosis}
                onChange={(e) => setNewDiagnosis(e.target.value)}
                placeholder="Add diagnosis"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDiagnosis())}
                data-testid="input-diagnosis"
              />
              <Button type="button" onClick={addDiagnosis} data-testid="button-add-diagnosis">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.diagnoses.map((diagnosis, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-sky-50 text-sky-700 rounded-md text-sm" data-testid={`diagnosis-${index}`}>
                  {diagnosis}
                  <button type="button" onClick={() => removeDiagnosis(index)} data-testid={`button-remove-diagnosis-${index}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-700 mb-1 block">Medications</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                placeholder="Add medication"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMedication())}
                data-testid="input-medication"
              />
              <Button type="button" onClick={addMedication} data-testid="button-add-medication">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.medications.map((medication, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-sky-50 text-sky-700 rounded-md text-sm" data-testid={`medication-${index}`}>
                  {medication}
                  <button type="button" onClick={() => removeMedication(index)} data-testid={`button-remove-medication-${index}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-700 mb-1 block">Allergies</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add allergy"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
                data-testid="input-allergy"
              />
              <Button type="button" onClick={addAllergy} data-testid="button-add-allergy">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.allergies.map((allergy, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-sky-50 text-sky-700 rounded-md text-sm" data-testid={`allergy-${index}`}>
                  {allergy}
                  <button type="button" onClick={() => removeAllergy(index)} data-testid={`button-remove-allergy-${index}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Care Needs</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Mobility Level</label>
              <Select
                value={formData.mobilityLevel}
                onValueChange={(value) => setFormData({ ...formData, mobilityLevel: value })}
              >
                <SelectTrigger data-testid="select-mobility">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="independent">Independent</SelectItem>
                  <SelectItem value="uses-walker">Uses Walker/Cane</SelectItem>
                  <SelectItem value="wheelchair">Wheelchair</SelectItem>
                  <SelectItem value="bed-bound">Bed-bound</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Cognitive Status</label>
              <Select
                value={formData.cognitiveStatus}
                onValueChange={(value) => setFormData({ ...formData, cognitiveStatus: value })}
              >
                <SelectTrigger data-testid="select-cognitive">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alert">Alert & Oriented</SelectItem>
                  <SelectItem value="mild-confusion">Mild Confusion</SelectItem>
                  <SelectItem value="dementia">Dementia</SelectItem>
                  <SelectItem value="alzheimers">Alzheimer's</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-700 mb-1 block">Special Needs or Concerns</label>
            <Textarea
              value={formData.specialNeeds}
              onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
              rows={3}
              data-testid="textarea-special-needs"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Preferences</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Dietary Restrictions</label>
              <Input
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                placeholder="e.g., Low sodium, Diabetic"
                data-testid="input-dietary"
              />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1 block">Preferred Language</label>
              <Input
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                placeholder="e.g., English, Spanish"
                data-testid="input-language"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-700 mb-1 block">Religious/Cultural Considerations</label>
            <Input
              value={formData.religiousCultural}
              onChange={(e) => setFormData({ ...formData, religiousCultural: e.target.value })}
              data-testid="input-religious"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} data-testid="button-back">
            Back
          </Button>
          <Button type="submit" disabled={saveMutation.isPending} data-testid="button-next">
            {saveMutation.isPending ? 'Saving...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
}
