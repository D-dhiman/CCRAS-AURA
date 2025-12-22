import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import WellnessCard from "@/components/WellnessCard";
import WellnessScore from "@/components/WellnessScore";
import DoshaBadge from "@/components/DoshaBadge";
import { 
  MapPin, 
  Cloud, 
  Droplets, 
  Wind, 
  Utensils, 
  Heart, 
  Activity, 
  ClipboardList,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-sm text-muted-foreground">Good Morning,</p>
          <h1 className="text-2xl font-display font-bold text-foreground">Priya</h1>
        </div>
        <DoshaBadge dosha="pitta" size="sm" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* Weather & Location Card */}
        <motion.div variants={itemVariants} className="wellness-card">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Mumbai, India</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold text-foreground">32°C</p>
                <p className="text-xs text-muted-foreground">Partly Cloudy</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-vata" />
              <div>
                <p className="text-lg font-semibold text-foreground">78%</p>
                <p className="text-xs text-muted-foreground">Humidity</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold text-foreground">Good</p>
                <p className="text-xs text-muted-foreground">AQI 45</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wellness Score & Dosha */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div className="wellness-card flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-2">Wellness Score</p>
            <WellnessScore score={78} size={100} />
          </div>
          <div className="wellness-card">
            <p className="text-sm text-muted-foreground mb-2">Today's Dosha</p>
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-4xl mb-2">🔥</span>
              <p className="font-display font-semibold text-foreground">Pitta</p>
              <p className="text-xs text-muted-foreground mt-1">Slightly elevated</p>
            </div>
          </div>
        </motion.div>

        {/* Alert Card */}
        <motion.div 
          variants={itemVariants} 
          className="wellness-card border-l-4 border-l-secondary"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <AlertTriangle className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Pitta Imbalance Alert</p>
              <p className="text-sm text-muted-foreground mt-1">
                High humidity today may increase Pitta. Stay cool and hydrated.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div variants={itemVariants}>
          <h2 className="section-title">Your Wellness Guide</h2>
          <div className="grid grid-cols-2 gap-3">
            <WellnessCard
              title="Food Advice"
              subtitle="What to eat today"
              icon={Utensils}
              iconColor="text-primary"
              onClick={() => navigate("/food-advice")}
            />
            <WellnessCard
              title="Health Issues"
              subtitle="Possible concerns"
              icon={Heart}
              iconColor="text-pitta"
              onClick={() => navigate("/health-problems")}
            />
            <WellnessCard
              title="Yoga & Lifestyle"
              subtitle="Today's routine"
              icon={Activity}
              iconColor="text-kapha"
              onClick={() => navigate("/yoga-lifestyle")}
            />
            <WellnessCard
              title="Health Log"
              subtitle="Track your day"
              icon={ClipboardList}
              iconColor="text-vata"
              onClick={() => navigate("/health-log")}
            />
          </div>
        </motion.div>

        {/* Quick Insights */}
        <motion.div variants={itemVariants}>
          <WellnessCard
            title="Weekly Trend"
            icon={TrendingUp}
            iconColor="text-accent"
            onClick={() => navigate("/insights")}
          >
            <p className="text-sm text-muted-foreground mt-2">
              Your wellness score improved by 12% this week. Keep it up!
            </p>
          </WellnessCard>
        </motion.div>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
