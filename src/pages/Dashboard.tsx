import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import WellnessCard from "@/components/WellnessCard";
import WellnessScore from "@/components/WellnessScore";
import DoshaBadge from "@/components/DoshaBadge";
import { weatherAPI } from "@/lib/weatherapi";
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
  TrendingUp,
  Loader2
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [doshaData, setDoshaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Mumbai, India");

  // Fetch weather and dosha data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const result = await weatherAPI.getWeatherDosha(location);
      
      if (result.success) {
        setWeatherData(result.data.weather);
        setDoshaData(result.data.dosha);
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [location]);

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

  // Get weather condition icon
  const getWeatherIcon = (condition) => {
    const c = condition?.toLowerCase() || "";
    if (c.includes("clear")) return "☀️";
    if (c.includes("cloud")) return "☁️";
    if (c.includes("rain")) return "🌧️";
    if (c.includes("storm")) return "⛈️";
    if (c.includes("snow")) return "❄️";
    return "🌤️";
  };

  // Get dosha emoji
  const getDoshaEmoji = (dosha) => {
    const d = dosha?.toLowerCase() || "";
    if (d === "vata") return "💨";
    if (d === "pitta") return "🔥";
    if (d === "kapha") return "💧";
    return "🔥";
  };

  // Get AQI status (placeholder - you can add real AQI data later)
  const getAQIStatus = () => {
    return { status: "Good", value: 45 };
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
        {doshaData && (
          <DoshaBadge dosha={doshaData.dominant.toLowerCase()} size="sm" />
        )}
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="wellness-card border-l-4 border-l-red-500 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <p className="font-medium text-foreground">Failed to load data</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && weatherData && doshaData && (
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
              <span className="text-sm font-medium text-foreground">
                {weatherData.city}, {weatherData.country}
              </span>
              <span className="text-2xl ml-auto">{getWeatherIcon(weatherData.condition)}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {Math.round(weatherData.temp)}°C
                  </p>
                  <p className="text-xs text-muted-foreground">{weatherData.condition}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-vata" />
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {weatherData.humidity}%
                  </p>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {Math.round(weatherData.wind_speed)}
                  </p>
                  <p className="text-xs text-muted-foreground">km/h</p>
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
                <span className="text-4xl mb-2">{getDoshaEmoji(doshaData.dominant)}</span>
                <p className="font-display font-semibold text-foreground">
                  {doshaData.dominant}
                </p>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-vata">V:{doshaData.vata}%</span>
                  <span className="text-pitta">P:{doshaData.pitta}%</span>
                  <span className="text-kapha">K:{doshaData.kapha}%</span>
                </div>
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
                <p className="font-medium text-foreground">
                  {doshaData.dominant} Influence
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {doshaData.effects}. {doshaData.recommendations}.
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
      )}

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
