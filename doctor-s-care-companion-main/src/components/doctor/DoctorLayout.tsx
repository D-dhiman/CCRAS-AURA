import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface DoctorLayoutProps {
  children: ReactNode;
}

export function DoctorLayout({ children }: DoctorLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-24 safe-top">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
