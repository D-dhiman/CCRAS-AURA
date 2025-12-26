import { ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Patient } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PatientCardProps {
  patient: Patient;
  className?: string;
}

const stageColors: Record<Patient['currentStage'], string> = {
  Acute: 'bg-destructive/10 text-destructive border-destructive/20',
  'Post-operation': 'bg-warning/10 text-warning border-warning/20',
  Recovery: 'bg-info/10 text-info border-info/20',
  Chronic: 'bg-muted text-muted-foreground border-border',
  Stable: 'bg-success/10 text-success border-success/20',
};

export function PatientCard({ patient, className }: PatientCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <Link
      to={`/doctor/patient/${patient.id}`}
      className={cn(
        'group block rounded-2xl bg-card p-4 shadow-card transition-all duration-300 hover:shadow-card-hover active:scale-[0.98]',
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-lg font-heading">
          {patient.name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate font-heading">
              {patient.name}
            </h3>
            <Badge 
              variant="outline" 
              className={cn('text-xs shrink-0', stageColors[patient.currentStage])}
            >
              {patient.currentStage}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mt-0.5">
            {patient.age}y • {patient.gender} {patient.bloodGroup && `• ${patient.bloodGroup}`}
          </p>
          
          <p className="text-sm text-foreground/80 mt-1 truncate">
            {patient.primaryCondition}
          </p>
        </div>

        {/* Last visit & Arrow */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(patient.lastVisit)}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
