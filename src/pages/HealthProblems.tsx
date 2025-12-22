import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, Lightbulb, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const HealthProblems = () => {
  const navigate = useNavigate();

  const healthIssues = [
    {
      issue: "Acidity & Heartburn",
      emoji: "🔥",
      why: "High Pitta combined with humid weather increases stomach acid production and heat in the digestive system.",
      solutions: [
        "Drink aloe vera juice in the morning",
        "Avoid spicy and fried foods today",
        "Practice Shitali Pranayama (cooling breath)",
        "Have fennel seeds after meals",
      ],
    },
    {
      issue: "Skin Irritation",
      emoji: "😰",
      why: "Heat and humidity can cause Pitta-related skin issues like rashes, acne, or irritation.",
      solutions: [
        "Apply coconut oil or aloe vera gel",
        "Wear loose, breathable cotton clothing",
        "Avoid direct sun exposure during peak hours",
        "Drink cooling drinks like buttermilk",
      ],
    },
    {
      issue: "Poor Sleep Quality",
      emoji: "😴",
      why: "Elevated Pitta can cause difficulty falling asleep or waking up feeling hot and restless.",
      solutions: [
        "Take a cool shower before bed",
        "Drink warm milk with cardamom",
        "Avoid screen time 1 hour before sleep",
        "Practice gentle meditation or moon breathing",
      ],
    },
    {
      issue: "Irritability & Stress",
      emoji: "😤",
      why: "Pitta imbalance often manifests as frustration, impatience, or short temper, especially in hot weather.",
      solutions: [
        "Take breaks in cool, shaded areas",
        "Practice 10 minutes of meditation",
        "Avoid intense workouts during afternoon",
        "Spend time near water or nature",
      ],
    },
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
          <h1 className="text-2xl font-display font-bold text-foreground">Health Concerns</h1>
          <p className="text-sm text-muted-foreground">Issues you may face today</p>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border mb-6"
      >
        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Disclaimer:</span> This is wellness guidance based on Ayurvedic principles, not medical advice. Consult a healthcare professional for serious concerns.
        </p>
      </motion.div>

      {/* Health Issues */}
      <div className="space-y-4 mb-24">
        {healthIssues.map((item, index) => (
          <motion.div
            key={item.issue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="wellness-card"
          >
            {/* Issue Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {item.issue}
                </h3>
              </div>
            </div>

            {/* Why it may happen */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/10 mb-4">
              <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Why this may happen</p>
                <p className="text-sm text-muted-foreground mt-1">{item.why}</p>
              </div>
            </div>

            {/* Solutions */}
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Ayurvedic Solutions</p>
                <ul className="space-y-2">
                  {item.solutions.map((solution, sIndex) => (
                    <li key={sIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HealthProblems;
