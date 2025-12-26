import { Home, Users, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/doctor-home' },
  { icon: Users, label: 'Patients', path: '/patient-list' },
  { icon: Search, label: 'Search', path: '/patient-list?search=true' },
  { icon: User, label: 'Profile', path: '/doctor-profile' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md safe-bottom">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/doctor/patients' && location.pathname.startsWith('/doctor/patient'));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200',
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'p-1.5 rounded-xl transition-all duration-200',
                isActive && 'bg-primary/10'
              )}>
                <item.icon className={cn('h-4 w-4', isActive && 'stroke-[2.5]')} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
