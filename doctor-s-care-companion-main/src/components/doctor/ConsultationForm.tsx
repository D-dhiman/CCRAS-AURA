import { useState } from 'react';
import { Plus, Trash2, Save, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Medicine {
  name: string;
  dosage: string;
  duration: string;
}

interface ConsultationFormProps {
  patientId: string;
  onSave?: (data: any) => void;
}

export function ConsultationForm({ patientId, onSave }: ConsultationFormProps) {
  const { toast } = useToast();
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: '', dosage: '', duration: '' }
  ]);
  const [advice, setAdvice] = useState('');
  const [notes, setNotes] = useState('');

  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
  };

  const removeMedicine = (index: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const updateMedicine = (index: number, field: keyof Medicine, value: string) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!diagnosis.trim()) {
      toast({
        title: 'Diagnosis required',
        description: 'Please enter a diagnosis or condition.',
        variant: 'destructive',
      });
      return;
    }

    const consultationData = {
      patientId,
      date: new Date().toISOString(),
      diagnosis,
      medicines: medicines.filter(m => m.name.trim()),
      advice,
      notes,
    };

    // In real app, this would save to backend
    console.log('Saving consultation:', consultationData);
    
    toast({
      title: 'Consultation saved',
      description: 'The medical record has been added successfully.',
    });

    // Reset form
    setDiagnosis('');
    setMedicines([{ name: '', dosage: '', duration: '' }]);
    setAdvice('');
    setNotes('');

    onSave?.(consultationData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Date */}
      <div className="bg-secondary/50 rounded-xl px-4 py-3">
        <p className="text-xs text-muted-foreground">Consultation Date</p>
        <p className="font-medium text-foreground font-heading">{today}</p>
      </div>

      {/* Diagnosis */}
      <div className="space-y-2">
        <Label htmlFor="diagnosis">Diagnosis / Condition *</Label>
        <Input
          id="diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Enter diagnosis or condition"
          className="bg-card"
        />
      </div>

      {/* Medicines */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-primary" />
            Medicines Prescribed
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addMedicine}
            className="text-primary hover:text-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {medicines.map((med, index) => (
            <div key={index} className="bg-card rounded-xl p-3 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Medicine {index + 1}
                </span>
                {medicines.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMedicine(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Input
                value={med.name}
                onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                placeholder="Medicine name"
                className="bg-background"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={med.dosage}
                  onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                  placeholder="Dosage"
                  className="bg-background"
                />
                <Input
                  value={med.duration}
                  onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                  placeholder="Duration"
                  className="bg-background"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advice */}
      <div className="space-y-2">
        <Label htmlFor="advice">Lifestyle / Recovery Advice</Label>
        <Textarea
          id="advice"
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          placeholder="Dietary recommendations, activities, precautions..."
          rows={3}
          className="bg-card resize-none"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Private notes for reference..."
          rows={2}
          className="bg-card resize-none"
        />
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" size="lg">
        <Save className="h-4 w-4 mr-2" />
        Save Consultation
      </Button>
    </form>
  );
}
