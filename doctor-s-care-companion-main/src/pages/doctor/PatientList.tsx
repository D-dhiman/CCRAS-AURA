import { useState, useMemo } from 'react';
import { Search, UserPlus, Filter } from 'lucide-react';
import { DoctorLayout } from '@/components/doctor/DoctorLayout';
import { PatientCard } from '@/components/doctor/PatientCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { patients, Patient } from '@/data/mockData';

const stages: Patient['currentStage'][] = ['Acute', 'Post-operation', 'Recovery', 'Chronic', 'Stable'];

export default function PatientList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<Patient['currentStage'] | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.primaryCondition.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStage = !selectedStage || patient.currentStage === selectedStage;
      
      return matchesSearch && matchesStage;
    });
  }, [searchQuery, selectedStage]);

  return (
    <DoctorLayout>
      <div className="px-4 py-6 space-y-5 animate-fade-in">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-heading">Patients</h1>
            <p className="text-sm text-muted-foreground">{patients.length} total patients</p>
          </div>
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add New
          </Button>
        </header>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ID, or condition..."
            className="pl-10 bg-card"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <Button
            variant={selectedStage === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStage(null)}
            className="shrink-0"
          >
            <Filter className="h-3 w-3 mr-1" />
            All
          </Button>
          {stages.map((stage) => (
            <Badge
              key={stage}
              variant={selectedStage === stage ? 'default' : 'outline'}
              className="cursor-pointer py-1.5 px-3 shrink-0"
              onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
            >
              {stage}
            </Badge>
          ))}
        </div>

        {/* Patient List */}
        <div className="space-y-3">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No patients found</p>
              <p className="text-sm text-muted-foreground/70">Try a different search term</p>
            </div>
          ) : (
            filteredPatients.map((patient, index) => (
              <div
                key={patient.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PatientCard patient={patient} />
              </div>
            ))
          )}
        </div>
      </div>
    </DoctorLayout>
  );
}
