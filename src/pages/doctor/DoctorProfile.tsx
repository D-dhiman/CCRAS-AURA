import { Mail, Phone, Briefcase, LogOut, Shield, Bell, HelpCircle } from 'lucide-react';
import { DoctorLayout } from '@/doc-components/doctor/DoctorLayout';
import { Button } from '@/doc-components/ui/button';
import { Separator } from '@/doc-components/ui/separator';
import { currentDoctor } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function DoctorProfile() {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <DoctorLayout>
      <div className="px-4 py-6 space-y-6 animate-fade-in">
        {/* Profile Header */}
        <header className="text-center space-y-4">
          <div className="mx-auto h-24 w-24 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-glow font-heading">
            {currentDoctor.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground font-heading">
              {currentDoctor.name}
            </h1>
            <p className="text-primary font-medium">
              {currentDoctor.specialization}
            </p>
          </div>
        </header>

        {/* Profile Info Card */}
        <section className="bg-card rounded-2xl shadow-card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Contact Information
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{currentDoctor.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{currentDoctor.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="text-sm font-medium text-foreground">{currentDoctor.experience}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Settings Section */}
        <section className="bg-card rounded-2xl shadow-card overflow-hidden">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-5 pt-5 pb-3">
            Settings
          </h2>
          
          <div>
            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-secondary/50 transition-colors text-left">
              <div className="h-9 w-9 rounded-full bg-info/10 flex items-center justify-center">
                <Bell className="h-4 w-4 text-info" />
              </div>
              <span className="text-sm font-medium text-foreground">Notifications</span>
            </button>
            
            <Separator />
            
            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-secondary/50 transition-colors text-left">
              <div className="h-9 w-9 rounded-full bg-success/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-success" />
              </div>
              <span className="text-sm font-medium text-foreground">Privacy & Security</span>
            </button>
            
            <Separator />
            
            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-secondary/50 transition-colors text-left">
              <div className="h-9 w-9 rounded-full bg-warning/10 flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-warning" />
              </div>
              <span className="text-sm font-medium text-foreground">Help & Support</span>
            </button>
          </div>
        </section>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground">
          AyuCare Doctor Portal v1.0.0
        </p>
      </div>
    </DoctorLayout>
  );
}
