import { motion } from "framer-motion";
import { ArrowLeft, User, RefreshCw, Bell, FileText, LogOut, ChevronRight, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import DoshaBadge from "@/components/DoshaBadge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    { icon: Edit, label: "Edit Profile", action: () => navigate("/profile-setup") },
    { icon: RefreshCw, label: "Retake Dosha Quiz", action: () => navigate("/dosha-quiz") },
    { icon: FileText, label: "Disclaimer & Terms", action: () => {} },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-6"
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Profile & Settings</h1>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-display font-semibold text-foreground">Priya Sharma</h2>
            <p className="text-sm text-muted-foreground">priya.sharma@email.com</p>
            <div className="mt-2">
              <DoshaBadge dosha="pitta" size="sm" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="wellness-card mb-6"
      >
        <h3 className="font-medium text-foreground mb-4">Your Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Age</span>
            <span className="text-foreground">28 years</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gender</span>
            <span className="text-foreground">Female</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Location</span>
            <span className="text-foreground">Mumbai, India</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Lifestyle</span>
            <span className="text-foreground">Working Professional</span>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="wellness-card mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Daily Notifications</p>
              <p className="text-sm text-muted-foreground">Get wellness reminders</p>
            </div>
          </div>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="wellness-card mb-6"
      >
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-muted/50 border border-border mb-6"
      >
        <p className="text-xs text-muted-foreground text-center">
          AURA provides wellness guidance based on Ayurvedic principles. 
          This is not medical advice. Always consult healthcare professionals for medical concerns.
        </p>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-24"
      >
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-destructive/20 text-destructive hover:bg-destructive/5 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default ProfileSettings;
