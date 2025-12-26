import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfileSetup from "./pages/ProfileSetup";
import DoshaQuiz from "./pages/DoshaQuiz";
import DoshaResult from "./pages/DoshaResult";
import Dashboard from "./pages/Dashboard";
import FoodAdvice from "./pages/FoodAdvice";
import HealthProblems from "./pages/HealthProblems";
import YogaLifestyle from "./pages/YogaLifestyle";
import HealthLog from "./pages/HealthLog";
import Insights from "./pages/Insights";
import ProfileSettings from "./pages/ProfileSettings";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";

// Doctor pages
import DoctorHome from "./pages/doctor/DoctorHome";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import PatientList from "./pages/doctor/PatientList";
import PatientProfile from "./pages/doctor/PatientProfile";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/dosha-quiz" element={<DoshaQuiz />} />
          <Route path="/dosha-result" element={<DoshaResult />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food-advice" element={<FoodAdvice />} />
          <Route path="/health-problems" element={<HealthProblems />} />
          <Route path="/yoga-lifestyle" element={<YogaLifestyle />} />
          <Route path="/health-log" element={<HealthLog />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/install" element={<Install />} />

           {/* Doctor routes */}
          <Route path="/doctor-home" element={<DoctorHome />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/doctor/patient/:patientId" element={<PatientProfile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
