import { Users, CalendarClock, ClipboardList, UserPlus, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DoctorLayout } from '@/doc-components/doctor/DoctorLayout';
import { StatCard } from '@/doc-components/doctor/StatCard';
import { PatientCard } from '@/doc-components/doctor/PatientCard';
import { Button } from '@/doc-components/ui/button';
import { currentDoctor, dashboardStats, patients } from '@/data/mockData';

export default function DoctorHome() {
  const recentPatients = patients.slice(0, 3);

  return (
    <DoctorLayout>
      <div className="px-4 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <header className="space-y-1">
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground font-heading">
                {currentDoctor.name}
              </h1>
              <p className="text-sm text-primary font-medium">
                {currentDoctor.specialization}
              </p>
            </div>
            <Link to="/doctor-profile">
              <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow">
                {currentDoctor.name.split(' ')[1]?.charAt(0) || 'D'}
              </div>
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Users}
            label="Patients Today"
            value={dashboardStats.patientsToday}
            variant="primary"
            className="col-span-1"
          />
          <StatCard
            icon={CalendarClock}
            label="Follow-ups"
            value={dashboardStats.followUpsPending}
            variant="default"
            className="col-span-1"
          />
          <StatCard
            icon={ClipboardList}
            label="Recent Appointments"
            value={dashboardStats.recentAppointments}
            variant="default"
            className="col-span-2"
          />
        </section>

        {/* Quick Actions */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground font-heading">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link to="/patient-list" className="block">
              <div className="bg-card rounded-xl p-4 shadow-card text-center transition-all hover:shadow-card-hover active:scale-95">
                <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-foreground">View Patients</p>
              </div>
            </Link>
            <Link to="/patient-list?new=true" className="block">
              <div className="bg-card rounded-xl p-4 shadow-card text-center transition-all hover:shadow-card-hover active:scale-95">
                <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-accent" />
                </div>
                <p className="text-xs font-medium text-foreground">Add Patient</p>
              </div>
            </Link>
            <Link to="/patient-list?search=true" className="block">
              <div className="bg-card rounded-xl p-4 shadow-card text-center transition-all hover:shadow-card-hover active:scale-95">
                <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Search className="h-5 w-5 text-success" />
                </div>
                <p className="text-xs font-medium text-foreground">Search</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Recent Patients */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground font-heading">Recent Patients</h2>
            <Link to="/patient-list">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentPatients.map((patient, index) => (
              <div 
                key={patient.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PatientCard patient={patient} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </DoctorLayout>
  );
}
