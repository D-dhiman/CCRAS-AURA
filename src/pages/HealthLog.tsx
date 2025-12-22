import { motion } from "framer-motion";
import { ArrowLeft, Moon, Flame, Brain, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "@/hooks/use-toast";

const HealthLog = () => {
  const navigate = useNavigate();
  const [sleepQuality, setSleepQuality] = useState<number | null>(null);
  const [digestion, setDigestion] = useState<number | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const ratings = [
    { value: 1, label: "Poor", emoji: "😔" },
    { value: 2, label: "Fair", emoji: "😐" },
    { value: 3, label: "Good", emoji: "🙂" },
    { value: 4, label: "Great", emoji: "😊" },
    { value: 5, label: "Excellent", emoji: "😄" },
  ];

  const handleSave = () => {
    setSaved(true);
    toast({
      title: "Health log saved!",
      description: "Your daily wellness data has been recorded.",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

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
          <h1 className="text-2xl font-display font-bold text-foreground">Health Log</h1>
          <p className="text-sm text-muted-foreground">Track your daily wellness</p>
        </div>
      </motion.div>

      {/* Date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <p className="text-lg font-display font-semibold text-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </motion.div>

      {/* Sleep Quality */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="wellness-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-vata/10">
              <Moon className="w-5 h-5 text-vata" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Sleep Quality</h3>
              <p className="text-sm text-muted-foreground">How did you sleep last night?</p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                onClick={() => setSleepQuality(rating.value)}
                className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  sleepQuality === rating.value
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted border-2 border-transparent"
                }`}
              >
                <span className="text-2xl">{rating.emoji}</span>
                <span className="text-xs text-muted-foreground">{rating.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Digestion */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="wellness-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-pitta/10">
              <Flame className="w-5 h-5 text-pitta" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Digestion</h3>
              <p className="text-sm text-muted-foreground">How was your digestion today?</p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                onClick={() => setDigestion(rating.value)}
                className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  digestion === rating.value
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted border-2 border-transparent"
                }`}
              >
                <span className="text-2xl">{rating.emoji}</span>
                <span className="text-xs text-muted-foreground">{rating.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stress / Mood */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="wellness-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-kapha/10">
              <Brain className="w-5 h-5 text-kapha" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Stress & Mood</h3>
              <p className="text-sm text-muted-foreground">How are you feeling mentally?</p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                onClick={() => setMood(rating.value)}
                className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  mood === rating.value
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted border-2 border-transparent"
                }`}
              >
                <span className="text-2xl">{rating.emoji}</span>
                <span className="text-xs text-muted-foreground">{rating.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-24"
      >
        <Button
          variant="wellness"
          size="lg"
          className="w-full"
          onClick={handleSave}
          disabled={!sleepQuality || !digestion || !mood || saved}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved!
            </>
          ) : (
            "Save Today's Log"
          )}
        </Button>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default HealthLog;
