import { Brain, Wind, Utensils, AlertTriangle, TreeDeciduous, Sun, Droplets, Info } from 'lucide-react';
import { WellnessConsideration } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface WellnessSectionProps {
  considerations: WellnessConsideration[];
}

const iconMap: Record<string, any> = {
  brain: Brain,
  wind: Wind,
  utensils: Utensils,
  'alert-triangle': AlertTriangle,
  trees: TreeDeciduous,
  sun: Sun,
  droplets: Droplets,
};

const categoryStyles: Record<WellnessConsideration['category'], { bg: string; border: string; icon: string }> = {
  meditation: { bg: 'bg-info/10', border: 'border-info/20', icon: 'text-info' },
  breathing: { bg: 'bg-primary/10', border: 'border-primary/20', icon: 'text-primary' },
  lifestyle: { bg: 'bg-success/10', border: 'border-success/20', icon: 'text-success' },
  avoid: { bg: 'bg-destructive/10', border: 'border-destructive/20', icon: 'text-destructive' },
};

export function WellnessSection({ considerations }: WellnessSectionProps) {
  if (considerations.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>No wellness considerations available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Disclaimer */}
      <div className="flex items-start gap-2 bg-muted/50 rounded-xl p-3 text-xs text-muted-foreground">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          These are supportive wellness considerations only. They are not medical prescriptions or treatment recommendations.
        </p>
      </div>

      {considerations.map((item, index) => {
        const Icon = iconMap[item.icon] || Brain;
        const styles = categoryStyles[item.category];
        
        return (
          <div
            key={index}
            className={cn(
              'rounded-xl border p-4 transition-all',
              styles.bg,
              styles.border
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn('rounded-lg p-2', styles.bg)}>
                <Icon className={cn('h-4 w-4', styles.icon)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm font-heading">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
