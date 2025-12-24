import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  variant?: 'default' | 'primary' | 'accent';
  className?: string;
}

export function StatCard({ icon: Icon, label, value, variant = 'default', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:shadow-card-hover',
        variant === 'primary' && 'bg-primary text-primary-foreground shadow-glow',
        variant === 'accent' && 'bg-accent text-accent-foreground',
        variant === 'default' && 'bg-card shadow-card',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn(
            'text-sm font-medium',
            variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
          )}>
            {label}
          </p>
          <p className="text-2xl font-bold font-heading">{value}</p>
        </div>
        <div className={cn(
          'rounded-xl p-2.5',
          variant === 'primary' && 'bg-primary-foreground/20',
          variant === 'accent' && 'bg-accent-foreground/20',
          variant === 'default' && 'bg-primary/10'
        )}>
          <Icon className={cn(
            'h-5 w-5',
            variant === 'default' ? 'text-primary' : 'text-current'
          )} />
        </div>
      </div>
      
      {/* Decorative element */}
      <div className={cn(
        'absolute -right-4 -bottom-4 h-20 w-20 rounded-full opacity-10',
        variant === 'primary' && 'bg-primary-foreground',
        variant === 'accent' && 'bg-accent-foreground',
        variant === 'default' && 'bg-primary'
      )} />
    </div>
  );
}
