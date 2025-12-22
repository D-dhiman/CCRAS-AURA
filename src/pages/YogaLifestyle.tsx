import { motion } from "framer-motion";
import { ArrowLeft, Moon, Sun, Zap, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const YogaLifestyle = () => {
  const navigate = useNavigate();

  const yogaPoses = [
    { name: "Chandra Namaskar", english: "Moon Salutation", duration: "10 min", icon: "🌙", description: "Cooling sequence perfect for Pitta balance" },
    { name: "Shitali Pranayama", english: "Cooling Breath", duration: "5 min", icon: "💨", description: "Reduces body heat and calms the mind" },
    { name: "Supta Baddha Konasana", english: "Reclining Butterfly", duration: "5 min", icon: "🦋", description: "Opens hips and cools the body" },
    { name: "Shavasana", english: "Corpse Pose", duration: "10 min", icon: "🧘", description: "Deep relaxation to reduce Pitta" },
  ];

  const lifestyleTips = [
    { tip: "Avoid intense exercise between 10 AM - 2 PM", icon: Sun, category: "Activity" },
    { tip: "Opt for swimming or walking in nature", icon: Zap, category: "Activity" },
    { tip: "Take a 20-minute rest after lunch", icon: Coffee, category: "Rest" },
    { tip: "Practice meditation during sunset", icon: Moon, category: "Mindfulness" },
  ];

  const sleepRoutine = [
    { time: "8:00 PM", activity: "Light dinner, avoid heavy foods" },
    { time: "9:00 PM", activity: "Screen-free time, dim lights" },
    { time: "9:30 PM", activity: "Warm milk with cardamom" },
    { time: "10:00 PM", activity: "Apply coconut oil to feet and scalp" },
    { time: "10:30 PM", activity: "Ideal bedtime for Pitta types" },
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
          <h1 className="text-2xl font-display font-bold text-foreground">Yoga & Lifestyle</h1>
          <p className="text-sm text-muted-foreground">Today's wellness routine</p>
        </div>
      </motion.div>

      {/* Activity Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Recommended Activity Level</p>
            <p className="text-xl font-display font-semibold text-foreground mt-1">Light to Moderate</p>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-8 rounded-full bg-kapha" />
            <div className="w-3 h-8 rounded-full bg-kapha" />
            <div className="w-3 h-8 rounded-full bg-muted" />
            <div className="w-3 h-8 rounded-full bg-muted" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Due to high heat today, avoid intense workouts. Focus on gentle, cooling practices.
        </p>
      </motion.div>

      {/* Yoga Poses */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="section-title">Recommended Yoga</h2>
        <div className="space-y-3">
          {yogaPoses.map((pose, index) => (
            <motion.div
              key={pose.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
            >
              <span className="text-3xl">{pose.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{pose.name}</p>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {pose.duration}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{pose.english}</p>
                <p className="text-xs text-muted-foreground mt-1">{pose.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Daily Tips */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="section-title">Daily Lifestyle Tips</h2>
        <div className="wellness-card">
          <div className="space-y-4">
            {lifestyleTips.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                  <p className="text-sm text-foreground">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sleep Routine */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-24"
      >
        <h2 className="section-title">Evening Routine</h2>
        <div className="wellness-card">
          <div className="space-y-4">
            {sleepRoutine.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  {index < sleepRoutine.length - 1 && (
                    <div className="w-0.5 h-8 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-sm font-medium text-primary">{item.time}</p>
                  <p className="text-sm text-foreground">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <BottomNavigation />
    </div>
  );
};

export default YogaLifestyle;
