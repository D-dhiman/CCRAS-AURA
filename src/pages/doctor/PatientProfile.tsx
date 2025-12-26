import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Droplet, Activity, User, FileText, PlusCircle, Leaf } from 'lucide-react';
import { DoctorLayout } from '@/doc-components/doctor/DoctorLayout';
import { MedicalTimeline } from '@/doc-components/doctor/MedicalTimeline';
import { WellnessSection } from '@/doc-components/doctor/WellnessSection';
import { ConsultationForm } from '@/doc-components/doctor/ConsultationForm';
import { Badge } from '@/doc-components/ui/badge';
import { Button } from '@/doc-components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/doc-components/ui/tabs';
import { patients, patientRecords, wellnessConsiderations, Patient } from '@/data/mockData';
import { cn } from '@/lib/utils';

const stageColors: Record<Patient['currentStage'], string> = {
  Acute: 'bg-destructive text-destructive-foreground',
  'Post-operation': 'bg-warning text-warning-foreground',
  Recovery: 'bg-info text-info-foreground',
  Chronic: 'bg-muted text-muted-foreground',
  Stable: 'bg-success text-success-foreground',
};

export default function PatientProfile() {
  const { patientId } = useParams<{ patientId: string }>();
  
  const patient = patients.find(p => p.id === patientId);
  const records = patientRecords[patientId || ''] || [];
  const wellness = wellnessConsiderations[patientId || ''] || [];

  if (!patient) {
    return (
      <DoctorLayout>
        <div className="px-4 py-6 text-center">
          <User className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h1 className="text-xl font-semibold text-foreground font-heading">Patient not found</h1>
          <p className="text-muted-foreground mt-2">The requested patient does not exist.</p>
          <Link to="/patient-list">
            <Button className="mt-4">Back to Patients</Button>
          </Link>
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div className="animate-fade-in">
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Link to="/doctor/patients">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-foreground font-heading truncate">
                {patient.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {patient.age}y • {patient.gender}
              </p>
            </div>
            <Badge className={cn('shrink-0', stageColors[patient.currentStage])}>
              {patient.currentStage}
            </Badge>
          </div>

          {/* Patient Quick Info */}
          <div className="flex items-center gap-4 text-sm">
            {patient.bloodGroup && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Droplet className="h-4 w-4 text-destructive" />
                <span>{patient.bloodGroup}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Activity className="h-4 w-4 text-primary" />
              <span className="truncate">{patient.primaryCondition}</span>
            </div>
          </div>
        </header>

        {/* Content Tabs */}
        <Tabs defaultValue="history" className="px-4 py-4">
          <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-secondary/50">
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm py-2.5 text-xs sm:text-sm gap-1.5"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger 
              value="consultation"
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm py-2.5 text-xs sm:text-sm gap-1.5"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">New Visit</span>
            </TabsTrigger>
            <TabsTrigger 
              value="wellness"
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm py-2.5 text-xs sm:text-sm gap-1.5"
            >
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Wellness</span>
            </TabsTrigger>
          </TabsList>

          {/* Medical History Tab */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground font-heading">
                Medical History
              </h2>
              <span className="text-sm text-muted-foreground">
                {records.length} records
              </span>
            </div>
            <MedicalTimeline records={records} />
          </TabsContent>

          {/* New Consultation Tab */}
          <TabsContent value="consultation" className="mt-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground font-heading">
                Add New Consultation
              </h2>
              <p className="text-sm text-muted-foreground">
                Record today's visit and treatment
              </p>
            </div>
            <ConsultationForm patientId={patient.id} />
          </TabsContent>

          {/* Wellness Tab */}
          <TabsContent value="wellness" className="mt-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground font-heading flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Supportive Wellness Considerations
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Safe practices and precautions for this patient
              </p>
            </div>
            <WellnessSection considerations={wellness} />
          </TabsContent>
        </Tabs>
      </div>
    </DoctorLayout>
  );
}
