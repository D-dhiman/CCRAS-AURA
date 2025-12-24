import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoctorHome from "./pages/doctor/DoctorHome";
import PatientList from "./pages/doctor/PatientList";
import PatientProfile from "./pages/doctor/PatientProfile";
import DoctorProfile from "./pages/doctor/DoctorProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/home" element={<DoctorHome />} />
          <Route path="/doctor/patients" element={<PatientList />} />
          <Route path="/doctor/patient/:patientId" element={<PatientProfile />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
