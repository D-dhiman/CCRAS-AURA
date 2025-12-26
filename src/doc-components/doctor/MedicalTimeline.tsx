import { Calendar, User, Pill, MessageSquare, FileText } from 'lucide-react';
import { MedicalRecord } from '@/data/mockData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface MedicalTimelineProps {
  records: MedicalRecord[];
}

export function MedicalTimeline({ records }: MedicalTimelineProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No medical history available</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="space-y-3">
      {records.map((record, index) => (
        <AccordionItem
          key={record.id}
          value={record.id}
          className="border-none"
        >
          <AccordionTrigger className="bg-card rounded-xl px-4 py-3 shadow-card hover:no-underline hover:shadow-card-hover transition-all data-[state=open]:rounded-b-none">
            <div className="flex items-center gap-3 text-left w-full pr-4">
              {/* Timeline indicator */}
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                {index < records.length - 1 && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-border" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground font-heading">
                  {formatDate(record.date)}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {record.diagnosis}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="bg-card rounded-b-xl px-4 pb-4 shadow-card">
            <div className="pt-2 space-y-4 border-t border-border">
              {/* Doctor */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{record.doctorName}</span>
              </div>

              {/* Diagnosis */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Diagnosis</h4>
                <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
              </div>

              {/* Medicines */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Pill className="h-4 w-4 text-primary" />
                  Medicines Prescribed
                </h4>
                <div className="space-y-2">
                  {record.medicines.map((med, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg px-3 py-2">
                      <p className="font-medium text-sm text-foreground">{med.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {med.dosage} • {med.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advice */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Advice Given
                </h4>
                <p className="text-sm text-muted-foreground">{record.advice}</p>
              </div>

              {/* Notes */}
              {record.notes && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Doctor's Notes</p>
                  <p className="text-sm text-foreground">{record.notes}</p>
                </div>
              )}

              <Badge variant="outline" className="text-xs">
                Read-only record
              </Badge>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
